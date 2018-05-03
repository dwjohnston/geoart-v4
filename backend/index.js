'use strict';

const express = require('express');
const assert = require('assert');

const imageDataURI = require('image-data-uri');
const shortid = require('shortid');


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const bodyParser = require("body-parser");
const Storage = require("@google-cloud/storage")
const projectId = "geoart-195205"

const storage = new Storage({
  projectId: projectId
});


const bucket = storage.bucket("geoart-images");

console.log("starting...");

const app = express();
app.use(bodyParser.json({
  limit: 500000
})); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('views', "./views");
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:id', (req, res) => {
  let id = req.params['id'];

  res.render('index', { imageUrl:  id });
});

/* in the future we'll make this more restful, for now, lets just get the AWS bucket save working*/
app.post("/api/saveimage", (req, res) => {

  console.log("save image");
  console.log(req.body);

  let image =imageDataURI.decode(req.body.image);
  let id = shortid.generate();

  let blob = bucket.file(id + ".png");
  let blobStream = blob.createWriteStream() ;

  blobStream.on("error", err=> {
    //handle error
    console.log("error");
  });

  blobStream.on('finish', () => {

    console.log("finish");
    res.status(200).end();
  });


  blobStream.end(image.dataBuffer);




//   var params = {
//     Body: image.dataBuffer,
//     ACL: "public-read",
//     Bucket: "dj-test-bucket",
//       ContentEncoding: 'base64',
//       ContentType: 'image/png',
//
//       Metadata: {
//   'Content-Type': 'image/png'
// },
//     Key: [id, ".png"].join(""),
//   };
//   S3.putObject(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else    {
//       console.log(data);
//       let dbObj = {
//         id: id,
//       }
//     }
//   });



});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
