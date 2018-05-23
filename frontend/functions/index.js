const express = require('express'); 
const functions = require('firebase-functions');
const admin = require("firebase-admin"); 
var serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geoart-v4.firebaseio.com"
});


var defaultStorage = admin.storage();
var bucket = defaultStorage.bucket('geoart-v4.appspot.com');


//const firebase = "firebase"; 
//const config = require( "../src/store/api-key"; 
    
//const fireApp = firebase.initializeApp(config);


const app = express();
const path = require('path');
const fs = require('fs')
const bodyParser = require("body-parser");
const shortid = require('shortid');
const imageDataURI = require('image-data-uri');

const DEFAULT_WIDTH  = 500; 
const DEFAULT_HEIGHT = 500; 

const progress = require('progress-stream');





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


    let file = bucket.file(id + ".png");
    file.getMetadata((err, metadata, apiResponse) => {

      file.makePublic().then((a) => {
        let result = data.replace(/\$OG_IMAGE/g, "https://storage.googleapis.com/geoart-v4.appspot.com/"+id+".png"); 
        result = result.replace(/\$OG_URL/g, "https://geoart-v4.firebaseapp.com/"+ id); 
        
        
        if (metadata) {
          console.log("metadata");
          console.log(metadata.metadata); 
          result = result.replace(/\$OG_WIDTH/g, metadata.metadata.width || DEFAULT_WIDTH);
          result = result.replace(/\$OG_HEIGHT/g, metadata.metadata.height || DEFAULT_HEIGHT);
        }
        //response.set('Cache-Control', 'public, max-age=600, s-maxage=1200'); 
        response.set('Cache-Control', 'no-cache'); 
        response.send(result);
  
      }); 





    }); 

});

};


app.get('/:id', (request, response) =>  {
  console.log("foo"); 
    indexGet (request, response, request.params['id']); 
  });

  app.get('/', (request, response) =>  {
    indexGet (request, response, "S1oh1J7k7");
  });


  app.post("/api/saveimage", (req, res) => {


    console.log('saveaaaa image"');



    //This here converts the data uri into an image object
    let image =imageDataURI.decode(req.body.image);
    let id = shortid.generate();
  
    //console.log(image); 

    console.log(image.dataBuffer.length); 
    //console.log(image.dataBuffer.toString());
    // let stat = fs.statSync(image.dataBuffer.toString());
    // var str = progress({
    //     length: stat.size,
    //     time: 100 /* ms */
    // });

    // console.log("aa");
    // str.on('progress', (p) => {
    //   console.log("progress", p); 
    // });

    let blob = bucket.file(id + ".png");


      let blobStream = blob.createWriteStream() ;

      let str = progress({
        size: image.dataBuffer.length, 
        time: 100, 
      }); 


      blob.createReadStream().pipe(str).pipe(blobStream);


      //blobStream.pipe(str)


    str.on('progress', (p) => {
      console.log("progress", p); 
    });
  
      //console.log(blobStream);

      blobStream.on("error", err=> {
        //handle error
        console.log("error");
      });
    
      blobStream.on('finish', () => {
    
        console.log("finish");
  
        blob.makePublic().then(() => {
  
          console.log("make public"); 


          blob.setMetadata({metadata: {
            width: req.body.width, 
            height: req.body.height, 
          }}, (err, apiResponse) =>  {


            console.log(apiResponse); 
            res.send(id);

          }); 
      
        });
  
      });
    
    
      blobStream.end(image.dataBuffer);



  });


app.use(express.static(path.resolve(__dirname, '../build')));



//exports.expressapp=app; 

exports.app = functions.https.onRequest(app);