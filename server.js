var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var chats = [];

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/messages', function (request, response) {
  response.status(200).send(chats);
});

app.get("/clear", function (request, response) {
  chats = [];
  io.emit('clear chat');
  response.send(200);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    chats.push(msg);
    io.emit('chat message', msg);
  });
});

var listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});