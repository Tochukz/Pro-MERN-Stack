const express = require('express');
const app = express();

app.use(express.static('public'));

/* Loads the files that are in the public directory from the /static path prefix */
//app.use('/static', express.static('public')); 

app.listen(3000, function(){
  console.log('App started on port 3000...');
});