const express = require('express'); 

const app = express();
const port = process.env.PORT || 3300;
const path = require('path');

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, '../frontend/build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));