import http from "http";
import SocketIO, { Socket } from "socket.io"
import express from "express";

const app = express()

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const io = SocketIO(httpServer);


io.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName)
    done()
  });
})



function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

// const sockets = [];
// const wss = new WebSocket.Server({ server });
// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon";
//     console.log("Connected to Browser ✅");
//     socket.on("close", onSocketClose);
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//           case "new_message":
//             sockets.forEach((aSocket) =>
//               aSocket.send(`${socket.nickname}: ${message.payload}`)
//             );
//           case "nickname":
//             socket["nickname"] = message.payload;
//         }
//       });
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);