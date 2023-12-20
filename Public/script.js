
let socket = io();
let greeting = "Thanks For Using CCSync!";
let greetingElement = document.getElementById('greet');
greetingElement.textContent = greeting;
document.body.appendChild(greetingElement);

let nameInput = document.getElementById("nameInp");
let msgInput = document.getElementById("msgInp");
let submitButton = document.getElementById("submitButton");
let msgList = document.getElementById("msgList");

// Add event listener for Enter key
msgInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    submit();
  }
});

submitButton.addEventListener('click', submit);

function submit() {
  let data = {
    "name": nameInput.value,
    "msg": msgInput.value
  }
  socket.emit('mychat', data);
  msgInput.value = "";
}

socket.on('allchat', showChat);

function showChat(data) {
  // Append data to msgList
  let chatElement = document.createElement('p');
  chatElement.textContent = data.name + ": " + data.msg;
  msgList.appendChild(chatElement);
}