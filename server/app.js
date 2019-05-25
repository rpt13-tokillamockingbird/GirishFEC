const express = require('express');
const bodyparser = require('body-parser');
const db = require('../db');



const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));



var port = 1204;

app.use(express.static('public'));

app.use('/:id', express.static('public'));

app.get('/review/:id', (req, res) => {
  let id = req.params.id;
  console.log('in review/:id', id);


  db.getProductDetail(id).then((result) => {
    res.status(200).json(result);
  });

});

app.get('/reviews/all', (req, res) => {
  console.log('in review');
  db.getProductDetailAll().then((results) => {
    res.status(200).json(results);
  });
});




app.listen(port, () => {
  console.log(`Listening on  http://localhost:${port}`);
});
