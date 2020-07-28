
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



var io = socket(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
  console.log("Connected: " + socket.id);
  socket.on('mouse', mouseUpdate);
  function mouseUpdate(data){
    console.log(data);
    socket.broadcast.emit('mousething', data);
  }
}




// app.get(url, onQuery(input, output));