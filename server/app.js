const express = require('express');
const bodyparser = require('body-parser');


const app = express();
app.use(bodyparser.json);
app.use(bodyparser.urlencoded({extended:false}));

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on  http://localhost:${port}`);
});