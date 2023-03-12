const express = require("express");
const app = express();

const port = 80;
app.use(express.static("client"));
const server = app.listen(port);
const io = require("socket.io")(server);

const candidates = {
    "0": { votes: 0, label: "JavaScript", color: randomRGB() },
    "1": { votes: 0, label: "C#", color: randomRGB() },
    "2": { votes: 0, label: "PHP", color: randomRGB() },
    "3": { votes: 0, label: "Python", color: randomRGB() },
    "4": { votes: 0, label: "Go", color: randomRGB() }
};

io.on("connection", (socket) => {
    io.emit("update", candidates);
    socket.on("vote", (index) => {

        if (candidates[index]) {
            candidates[index].votes += 1;
        }
        console.log(candidates);
        io.emit("update", candidates);
    });

});

function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`;
}