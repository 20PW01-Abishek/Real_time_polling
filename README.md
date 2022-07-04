# Real_time_polling_app
This project deals with enabling users to cast their votes on a real time basis based on the candidates shown on the polling screen.
The real time voting is achieved using the Socket.IO library in Node and Express.js. Socket.IO is a library that enables low-latency, bidirectional and event based communication between clients and the server.
The server starts and initializes the Socket.IO at http://localhost:80 and initializes the candidates with their corresponding votes. The server waits for the clients to connect.
Once the clients are connected, the server emits the candidates list with its votes to the client. Similarly, the client waits to receive the candidates. On receival of the candidate list, the voters (client) cast their votes and the index of the candidate voted is sent back to the server.
Now the server increments the votes of the corresponding candidate and emits the updated candidate list to all the clients to ensure live display of results. The live voting result is shown only after they cast their votes.
To improve the security of this voting system, a flag was stored as a cookie so that when any of the earlier voters try to reload the website or reopen the browser to vote again, the user will not be allowed to vote again but would be displayed with the live voting result chart.
The CSS and Chart.js, a package of Node.Js were used for styling and displaying the voting chart in the client's screen respectively.
