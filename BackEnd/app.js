const express = require("express");
const mongoose = require("mongoose");

const flightRouter = require("./Routes/flightRoutes.js");
const userRouter = require('./Routes/userRoutes.js');
const reservationRouter = require('./Routes/reservationRoutes.js');
const app = express();
app.use('/users', userRouter);
app.use(express.json());

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(flightRouter);
app.use(userRouter);
app.use(reservationRouter);

app.listen(8080, () => {
  console.log("Server is running...");
});