'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const imageDataURI = require("image-data-uri");

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const shortid = require('shortid');



// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

//TODO: this should be set via environment variable
const s3Prefix = "https://s3-ap-southeast-2.amazonaws.com/dj-test-bucket/";

//const url = 'mongodb://mongo/my-app';
const url = "mongodb://docker:27017/myapp";

console.log("starting...");

MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db("foo");

  // App
  const app = express();
  app.set('views', "./views");
  app.set('view engine', 'pug');

  app.use(bodyParser.json());

  app.get('/test', (req, res) => {

    res.send("hello world");

  });

  app.get('/:id', (req, res) => {

    let id = req.params['id'];
    let s3Prefix = "https://s3-ap-southeast-2.amazonaws.com/dj-test-bucket/"
    res.render('index', { imageUrl: s3Prefix+ id })
  });


  app.get('/api/all', (req, res) => {

    let collection = db.collection('records').find().toArray((err, docs) => {
      res.send(docs);
    });






  });

  /* in the future we'll make this more restful, for now, lets just get the AWS bucket save working*/
  app.post("/api/saveimage", (req, res) => {

    console.log("save image");

    console.log(req.body);

    let image =imageDataURI.decode(req.body.image);
    let id = shortid.generate();

    var params = {
      Body: image.dataBuffer,
      ACL: "public-read",
      Bucket: "dj-test-bucket",
        ContentEncoding: 'base64',
        ContentType: 'image/png',

        Metadata: {
    'Content-Type': 'image/png'
},
      Key: [id, ".png"].join(""),
    };
    S3.putObject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else    {
        console.log(data);

        let dbObj = {
          id: id,
        }


        db.collection('records').insertOne(dbObj, (err, response) => {

          assert.equal(null, err);
          console.log(response);
          res.status(201).send([s3Prefix,id, ".png"].join(""));

        });





      }

    });



  });

  app.listen(PORT, HOST);
  console.log(`Running on http://${HOST}:${PORT}`);
});
