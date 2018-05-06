const express = require('express'); 

const functions = require('firebase-functions');


const app = express();
const path = require('path');
const fs = require('fs')


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

app.use(express.static(path.resolve(__dirname, '../build')));


//app.listen(port, () => console.log(`Listening on port ${port}`));


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);