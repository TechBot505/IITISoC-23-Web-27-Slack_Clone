const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data");
const colors = require("colors");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
const app = express();
connectDb();


app.use(express.json());   // to accept the json data
app.get("/", (req, res) => {
  res.send("api is running");
});

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes )
app.use('/api/message', messageRoutes  )

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000 ;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
           