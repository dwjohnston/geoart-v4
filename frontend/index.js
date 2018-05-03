const express = require('express'); 

const app = express();
const port = process.env.PORT || 3300;
const path = require('path');
const fs = require('fs')

app.get('/:id', function(request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  let id = request.params['id'];
  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, id);
    data = data.replace(/\$OG_DESCRIPTION/g, id);
    result = data.replace(/\$OG_IMAGE/g, id);
    response.send(result);
  });


});

app.use(express.static(path.resolve(__dirname, './build')));


app.listen(port, () => console.log(`Listening on port ${port}`));