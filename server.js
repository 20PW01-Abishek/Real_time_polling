// Import dependencies
const express = require("express");
const app = express();

// Set port number
const port = 80;

// Hosting the front end
app.use(express.static("client"));

// Start the server and initialize socket.io
const server = app.listen(port);
const io = require("socket.io")(server);

// Initialize candidates
const candidates = {
    "0": { votes: 0, label: "JavaScript", color: randomRGB() },
    "1": { votes: 0, label: "C#", color: randomRGB() },
    "2": { votes: 0, label: "PHP", color: randomRGB() },
    "3": { votes: 0, label: "Python", color: randomRGB() },
    "4": { votes: 0, label: "Go", color: randomRGB() }
};

// On new client connection
io.on("connection", (socket) => {
    io.emit("update", candidates);

    // On new vote
    socket.on("vote", (index) => {

        // Increase the vote at index
        if (candidates[index]) {
            candidates[index].votes += 1;
        }

        // Show the candidates in the console for testing
        console.log(candidates);

        // Tell everybody else about the change in vote (updating)
        io.emit("update", candidates);
    });

});

// Generate a random RGB color
function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`;
}