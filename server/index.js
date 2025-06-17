const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// CORS for REST API
app.use(cors({
  origin: '*', 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Socket.IO config
const io = new Server(server, {
  cors: {
    origin: '*', // 👈 For dev
    methods: ['GET', 'POST'],
  },
});

//connect to database
const database = require("./config/db");

//authentication controller routes
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

//API ENDPOINTS
app.use("/auth", authRoutes);
app.use("/dev", deviceRoutes);

//*******************************websocket communication**********************************
io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);

  // Real-time location sharing
  socket.on("location_update", (locationData) => {
    console.log("Location update from client:", locationData);

    //Emit to all connected clients
    io.emit("location_broadcast", locationData);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

//**********************************************************************************************
const PORT = process.env.PORT || 5000;
// Start the server
server.listen(PORT, () => {
  console.log("Server is up!");
  database.connectToDb();
});