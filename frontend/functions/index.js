const express = require('express'); 

const functions = require('firebase-functions');
const admin = require("firebase-admin"); 
var serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoart-v4.firebaseio.com"
});

console.log(serviceAccount); 

const app = express();
const path = require('path');
const fs = require('fs')
const bodyParser = require("body-parser");
const shortid = require('shortid');
const imageDataURI = require('image-data-uri');



var defaultStorage = admin.storage();
var bucket = defaultStorage.bucket('geoart-v4-images');


app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({
  limit: 500000
})); // for parsing application/json


let indexGet = (request, response, id) => {

  console.log(id);
  const filePath = path.resolve(__dirname, './', 'index.html');
  // // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    if (id) {
      result = data.replace(/\$OG_IMAGE/g, "https://storage.googleapis.com/geoart-v4-images/"+ id + ".png"); 
    }

    //response.set('Cache-Control', 'public, max-age=600, s-maxage=1200'); 
    response.set('Cache-Control', 'no-cache'); 
    response.send(result);
});

};


app.get('/:id', (request, response) =>  {
  console.log("foo"); 
    indexGet (request, response, request.params['id']); 
  });

  app.get('/', (request, response) =>  {
    indexGet (request, response, "000");
  });


  app.post("/api/saveimage", (req, res) => {


    console.log('saveaaaa image"');

    //This here converts the data uri into an image object
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

      blob.makePublic().then(() => {
        res.send(id);
      });

    });
  
  
    blobStream.end(image.dataBuffer);

  });


app.use(express.static(path.resolve(__dirname, '../build')));



//exports.expressapp=app; 

exports.app = functions.https.onRequest(app);