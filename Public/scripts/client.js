
const writeEvent = (text) => {

    //ul element
    const parent = document.querySelector("#events");


    //li element
    const el = document.createElement("li");
    el.innerHTML = text;

    parent.appendChild(el);
}

const onFormSubmitted = (e) => {
    e.preventDefault();

    const input = document.querySelector("#chat");
    const text = input.value;
    input.value = "";

    socket.emit("message", text);
}


writeEvent("Welcome to the game screen");

const socket = io();
socket.on("message", writeEvent);

document.querySelector("#chat-form").addEventListener("submit", onFormSubmitted);