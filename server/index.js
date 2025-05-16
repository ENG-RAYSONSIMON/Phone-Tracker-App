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
  origin: '*', // Allow Expo Go to access REST endpoints
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Socket.IO config
const io = new Server(server, {
  cors: {
    origin: '*', // 👈 For dev, allow any mobile IP (later restrict it)
    methods: ['GET', 'POST'],
  },
});

//connect to database
const database = require("./config/db");

//authentication controller routes
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

//API ENDPOINTS
app.use("/api/v1/track/auth", authRoutes);
app.use("/api/v1/track/dev", deviceRoutes);

//websocket communication
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


server.listen(process.env.PORT, () => {
  console.log("Server is up!");
  database.connectToDb();
});