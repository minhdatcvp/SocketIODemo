const messageform = document.querySelector(".chatbox form");
const chatboxinput = document.querySelector(".chatbox input");
const socket = io("http://localhost:5000");

var idRoom = Math.random()
socket.emit('join', idRoom);

messageform.addEventListener("submit", messageSubmitHandler);

function messageSubmitHandler(e) {
    e.preventDefault();
    let message = chatboxinput.value;
    socket.emit("message", message);
}

socket.on('customEvent', (data) => {
    console.log('Received data from server:', data);
});

