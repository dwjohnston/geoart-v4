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
var bucket = defaultStorage.bucket('images');


app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({
  limit: 500000
})); // for parsing application/json


let basicGet = (request, response, id) => {
  const filePath = path.resolve(__dirname, './', 'index.html');
  // // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    
    // replace the special strings with server generated strings

    if (id) {
      data = data.replace(/\$OG_TITLE/g, id);
      data = data.replace(/\$OG_DESCRIPTION/g, id);
      result = data.replace(/\$OG_IMAGE/g, id);
    }
    else {

      //Replace with standard stuff. 
      data = data.replace(/\$OG_TITLE/g, "");
      data = data.replace(/\$OG_DESCRIPTION/g, "");
      result = data.replace(/\$OG_IMAGE/g, "");
    }

    response.set('Cache-Control', 'public, max-age=600, s-maxage=1200'); 
    response.send(result);
});

};


app.get('/:id', (request, response) =>  {
    basicGet(request, response,request.params['id']); 
  });

  app.get('/', (request, response) =>  {
    basicGet(request, response);
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
      res.status(200).end();
    });
  
  
    blobStream.end(image.dataBuffer);
  



    res.send("aa");
  });


app.use(express.static(path.resolve(__dirname, '../build')));



//exports.expressapp=app; 

exports.app = functions.https.onRequest(app);