const index = require('./index.js'); 


const port = 3300; 

index.expressapp.listen(port, () => console.log(`Listening on port ${port}`));
