const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port: ${server.address().port}`);
});

app.use(express.static('public'));
console.log("Will use the public folder");

const socket = require('socket.io');
const io = socket(server);

let activeUsers = 0;

io.on('connection', (socket) => {
  console.log(`We got a connection with ${socket.id}`);

  // Increment active users count on connection
  activeUsers++;
  io.emit('activeUsers', activeUsers);

  socket.on('disconnect', () => {
    // Decrement active users count on disconnection
    activeUsers--;
    io.emit('activeUsers', activeUsers);
  });

  socket.on('mychat', (data) => {
    console.log(`Got chat: ${data.name} ${data.msg}`);
    console.log("Broadcasting...");

    // Broadcast the message to all clients
    io.emit('allchat', data);
  });

  socket.on('image', (data) => {
    // Broadcast the image data to all clients
    io.emit('image', data);
  });
});