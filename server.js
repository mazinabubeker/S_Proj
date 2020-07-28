
const express = require('express');
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
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
var nextFlashTime = Date.now() + 3000;
function beginFlashing(){
  nextFlashTime += 3000;
  setTimeout(beginFlashing, 3000);
}
setTimeout(beginFlashing, 3000);

var io = socket(server);
io.sockets.on('connection', newConnection)



// app.get(url, onQuery(input, output));