
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.post('/query_post', (req, res) => {
  res.send(req.body);
  res.end();
});  
app.get('/query_get', (req, res) => {
  res.send(nextFlashTime.toString());
  res.end();
});
var nextFlashTime = Date.now();
function beginFlashing(){
  nextFlashTime += 1000;
  setTimeout(beginFlashing, 1000);
}
beginFlashing();




// app.get(url, onQuery(input, output));