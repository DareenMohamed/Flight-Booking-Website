const express = require("express");
const flightModel = require("../Models/Flight");
const reservationModel = require("../Models/Reservation");
const app = express();
var cors = require('cors')
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config();
const uuid = require('uuidv4')
app.use(cors())
const userModel = require("../Models/User");



app.get("/allflights", verifyJWTAdmin ,async (request, response) => {
  const flights = await flightModel.find({});

  try {
    response.send(flights);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.post("/searchUser", async (request, response) => {  //search with Criteria
  //console.log("ana el request:------- ")

  var q = {}
  //if (request.body.From.From != "") {
  q.email = request.body.email.email
  // //  }
  // //  if (request.body.To.To != "") {
  q.password = request.body.password.password
  //yalahwaaaaaaaaaaaai
  //mesh ba2ool 7aga!!!!
  //  }
  let body = {
    password: "lala@la",
    email: "hii"

  };

  console.log("body: ", q)
  // console.log("1: ", request.body.FlightNumber)
  // console.log("2: ", request.body.FlightNumber.FlightNumber)
  // console.log(request.body.FlightNumber.FlightNumber != "")
  //console.log("q", q)

  // // let v = JSON.stringify(q)
  // console.log("v", v)
  const user = await userModel.find(q);

  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});



app.get("/searchUserByID/:id",verifyJWT, async (request, response) => {  //search with Criteria
  // var q = JSON.stringify(request.body.id)
  // const user = await userModel.findById(q);
  const user = await userModel.findById(request.params.id);
  console.log("hennnnnnnnnnnnnnnnnnnnnnnnnnnna")
  console.log(user);
  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.get("/flightByIdUser/:id",verifyJWT ,async (request, response) => {
  const flight = await flightModel.findById(request.params.id);

  try {
    response.send(flight);
  }
  catch (error) {
    response.status(500).send(error);
  }
});


app.get("/flightById/:id",verifyJWTAdmin ,async (request, response) => {
  const flight = await flightModel.findById(request.params.id);

  try {
    response.send(flight);
  }
  catch (error) {
    response.status(500).send(error);
  }
});
app.get("/flightById2/:id" ,async (request, response) => {
  const flight = await flightModel.findById(request.params.id);

  try {
    response.send(flight);
  }
  catch (error) {
    response.status(500).send(error);
  }
});


app.post("/searchFlights", async (request, response) => {  //search with Criteria
  console.log("ana el request: ", request.body.From)

  var q = {}
  if (request.body.From.From != "") {
    q.From = request.body.From.From
  }
  if (request.body.To.To != "") {
    q.To = request.body.To.To
  }
  if (request.body.DepartureDate.DepartureDate != "") {
    q.DepartureDate = request.body.DepartureDate.DepartureDate + "T00:00:00.000Z"
  }
  if (request.body.ArrivalDate.ArrivalDate != "") {
    q.ArrivalDate = request.body.ArrivalDate.ArrivalDate + "T00:00:00.000Z"
  }
  if (request.body.FirstSeats.FirstSeats != null && request.body.FirstSeats.FirstSeats != "") {
    q.FirstSeats = request.body.FirstSeats.FirstSeats
  }
  if (request.body.BusinessSeats.BusinessSeats != null && request.body.BusinessSeats.BusinessSeats != "") {
    q.BusinessSeats = request.body.BusinessSeats.BusinessSeats
  }
  if (request.body.EconomySeats.EconomySeats != null && request.body.EconomySeats.EconomySeats != "") {
    q.EconomySeats = request.body.EconomySeats.EconomySeats
  }

  if (request.body.FirstBags.FirstBags != null && request.body.FirstBags.FirstBags != "") {
    q.FirstBags = request.body.FirstBags.FirstBags
  }
  if (request.body.BusinessBags.BusinessBags != null && request.body.BusinessBags.BusinessBags != "") {
    q.BusinessBags = request.body.BusinessBags.BusinessBags
  }
  if (request.body.EconomyBags.EconomyBags != null && request.body.EconomyBags.EconomyBags != "") {
    q.EconomyBags = request.body.EconomyBags.EconomyBags
  }

  if (request.body.EconomyPrice.EconomyPrice != null && request.body.EconomyPrice.EconomyPrice != "") {
    q.PriceEconomy = request.body.EconomyPrice.EconomyPrice
  }
  if (request.body.BusinessPrice.BusinessPrice != null && request.body.BusinessPrice.BusinessPrice != "") {
    q.PriceBusiness = request.body.BusinessPrice.BusinessPrice
  }
  if (request.body.FirstPrice.FirstPrice != null && request.body.FirstPrice.FirstPrice != "") {
    q.PriceFirst = request.body.FirstPrice.FirstPrice
  }

  if (request.body.ArrivalTime.ArrivalTime != "") {
    q.ArrivalTime = request.body.ArrivalTime.ArrivalTime
  }
  if (request.body.DepartureTime.DepartureTime != "") {
    q.DepartureTime = request.body.DepartureTime.DepartureTime
  }
  if (request.body.FlightNumber.FlightNo != '') {
    q.FlightNumber = request.body.FlightNumber.FlightNo
  }
  console.log("body: ", request.body)
  console.log("1: ", request.body.FlightNumber)
  console.log("2: ", request.body.FlightNumber.FlightNumber)
  console.log(request.body.FlightNumber.FlightNumber != "")
  console.log("q", q)
  let v = JSON.stringify(q)
  console.log("v", v)
  const flights = await flightModel.find(q);

  try {
    response.send(flights);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.post("/searchAvailableFlights", async (request, response) => {  //search with Criteria
  console.log("ana el request: ", request.body.From)
  var cabin = ""
  var q = {}
  if (request.body.From != "") {
    q.From = request.body.From
  }
  if (request.body.To != "") {
    q.To = request.body.To
  }
  if (request.body.DepartureDate != "") {
    if (request.body.isReturning) {
      q.DepartureDate = {
        $gte: request.body.departingArrival ,
        $eq: request.body.DepartureDate + "T00:00:00.000Z",
      }
    }
    else{
    q.DepartureDate = request.body.DepartureDate + "T00:00:00.000Z"}
  }
  if (request.body.ArrivalDate != "") {
    if (!request.body.isReturning) {
      q.ArrivalDate = {
        $lte: request.body.ArrivalDate ,
        $eq: request.body.DepartureDate + "T00:00:00.000Z",
      }
    }
      else{
    q.ArrivalDate = request.body.ArrivalDate + "T00:00:00.000Z"}
  }
  if (request.body.FirstSeats != null) {
    q.FirstSeats = request.body.FirstSeats
    cabin = "first"
  }
  if (request.body.BusinessSeats != null) {
    q.BusinessSeats = request.body.BusinessSeats
    cabin = "business"
  }
  if (request.body.EconomySeats != null) {
    q.EconomySeats = request.body.EconomySeats
    cabin = "economy"
  }
  if (request.body.ArrivalTime != "") {
    q.ArrivalTime = request.body.ArrivalTime
  }
  if (request.body.DepartureTime != "") {
    q.DepartureTime = request.body.DepartureTime
  }
  if (request.body.FlightNumber != '') {
    q.FlightNumber = request.body.FlightNumber
  }
  if (request.body.cabin == "First Class") {
    q.RemFirst = { $gte: request.body.passengers }
  }
  if (request.body.cabin == "Business") {
    q.RemBusiness = { $gte: request.body.passengers }
  }
  if (request.body.cabin == "Economy") {
    q.RemEconomy = { $gte: request.body.passengers }
  }


  console.log("body: ", request.body)
  console.log("1: ", request.body.FlightNumber)
  console.log("cabin: ", cabin)
  console.log(request.body.FlightNumber.FlightNumber != "")
  console.log("q", q)
  // let v = JSON.stringify(q)
  // console.log("v", v)
  const flights = await flightModel.find(q);
  //const flights = flightModel.find({ RemEconomy: { $gt: 7 } });
  // if (cabin == "first") {
  //   flightModel.find({ RemFirst: { $gt: request.body.passengers } });
  // }
  // if (cabin == "business") {
  //   flightModel.find({ RemBusiness: { $gt: request.body.passengers } });
  // }
  // else {
  //   flights = flightModel.find(q, { RemEconomy: { $gt: request.body.passengers } });
  // }
  //flightModel.getFilter();
  // flights.find({ : { $gt: 50 } });
  try {
    response.send(flights);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/createFlight", verifyJWTAdmin ,async (request, response) => {
  console.log((request.body.EconomySeats) + "ECOSEATS")  //createFlights -> currently with Json and postman
  console.log((request.body.BusinessSeats) + " busi SEATS")  //createFlights -> currently with Json and postman
  console.log((request.body.FirstSeats) + " first SEATS")  //createFlights -> currently with Json and postman

  var EconomySeats = request.body.EconomySeats;
  var BusinessSeats = request.body.BusinessSeats;
  var FirstSeats = request.body.FirstSeats;
  var EconomySeatsArray = [];
  var BusinessSeatsArray = [];
  var FirstSeatsArray = [];
  try {

  if (EconomySeats> 54 || BusinessSeats > 36 || FirstSeats > 12)
  throw new UserException('Invalid Seats Number');


  for (let i = 0; i < EconomySeats; i++) {
    EconomySeatsArray.push(0);
  }
  for (let i = EconomySeats; i < 54; i++) {
    EconomySeatsArray.push(1);
  }
  

  for (let i = 0; i < BusinessSeats; i++) {
    BusinessSeatsArray.push(0);
  }
  for (let i = BusinessSeats; i < 36; i++) {
    BusinessSeatsArray.push(1);
  }

  for (let i = 0; i < FirstSeats; i++) {
    FirstSeatsArray.push(0);
  }
  for (let i = FirstSeats; i < 12; i++) {
    FirstSeatsArray.push(1);
  }



  const flight = new flightModel({
    'From': request.body.From,
    'To': request.body.To,
    'DepartureDate': request.body.DepartureDate,
    'ArrivalDate': request.body.ArrivalDate,
    'EconomySeats': 54,
    'RemEconomy': request.body.EconomySeats,
    'BusinessSeats': 36,
    'RemBusiness': request.body.BusinessSeats,
    'FirstSeats': 12,
    'RemFirst': request.body.FirstSeats,
    'DepartureTime': (request.body.DepartureTime) + "",
    'ArrivalTime': (request.body.ArrivalTime) + "",
    'FlightNumber': request.body.FlightNumber,
    'PriceEconomy': request.body.EconomyPrice,
    'PriceBusiness': request.body.BusinessPrice,
    'PriceFirst': request.body.FirstPrice,
    'EconomyBags': request.body.EconomyBags,
    'BusinessBags': request.body.BusinessBags,
    'FirstBags': request.body.FirstBags,
    'EconomySeatsArray': EconomySeatsArray,
    'BusinessSeatsArray': BusinessSeatsArray,
    'FirstSeatsArray': FirstSeatsArray,
  });

  
    await flight.save();
    response.send("Flight sent successfully");
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/flightSeats/:id", async (request, response) => {  //update
  try {

    console.log("ana el request: ", request.body)

    var q = {}

    if (request.body.EconomySeatsArray != null) {
      q.EconomySeatsArray = request.body.EconomySeatsArray
       
    }
    if (request.body.RemEconomy != null) {
      q.RemEconomy = request.body.RemEconomy
    }
    if (request.body.BusinessSeatsArray != null) {
      q.BusinessSeatsArray = request.body.BusinessSeatsArray
       
    }
    if (request.body.RemBusiness != null) {
      q.RemBusiness = request.body.RemBusiness
       
    }

   
    if (request.body.FirstSeatsArray != null) {
      q.FirstSeatsArray = request.body.FirstSeatsArray
        
    }
    if (request.body.RemFirst != null) {
        q.RemFirst = request.body.RemFirst
    }


    console.log(request.params.id);
    await flightModel.findByIdAndUpdate(request.params.id, q);
    console.log("first line");
    //  await flightModel.save();
    // console.log("Second line");
    response.send();
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/flight/:id", verifyJWTAdmin , async (request, response) => {  //update
  try {

    var q = {}
    if (request.body.From.From != "") {
      q.From = request.body.From.From
    }
    if (request.body.To.To != "") {
      q.To = request.body.To.To
    }
    if (request.body.DepartureDate.DepartureDate != "") {
      q.DepartureDate = request.body.DepartureDate.DepartureDate 
    }
    if (request.body.ArrivalDate.ArrivalDate != "") {
      q.ArrivalDate = request.body.ArrivalDate.ArrivalDate 
    }
    if (request.body.FirstSeats.FirstSeats != null && request.body.FirstSeats.FirstSeats != "") {
      q.FirstSeats = request.body.FirstSeats.FirstSeats
    }
    if (request.body.BusinessSeats.BusinessSeats != null && request.body.BusinessSeats.BusinessSeats != "") {
      q.BusinessSeats = request.body.BusinessSeats.BusinessSeats
    }
    if (request.body.EconomySeats.EconomySeats != null && request.body.EconomySeats.EconomySeats != "") {
      q.EconomySeats = request.body.EconomySeats.EconomySeats
    }
    if (request.body.FirstBags.FirstBags != null && request.body.FirstBags.FirstBags != "") {
      q.FirstBags = request.body.FirstBags.FirstBags
    }
    if (request.body.BusinessBags.BusinessBags != null && request.body.BusinessBags.BusinessBags != "") {
      q.BusinessBags = request.body.BusinessBags.BusinessBags
    }
    if (request.body.EconomyBags.EconomyBags != null && request.body.EconomyBags.EconomyBags != "") {
      q.EconomyBags = request.body.EconomyBags.EconomyBags
    }
    if (request.body.EconomyPrice.EconomyPrice != null && request.body.EconomyPrice.EconomyPrice != "") {
      q.PriceEconomy = request.body.EconomyPrice.EconomyPrice
    }
    if (request.body.BusinessPrice.BusinessPrice != null && request.body.BusinessPrice.BusinessPrice != "") {
      q.PriceBusiness = request.body.BusinessPrice.BusinessPrice
    }
    if (request.body.FirstPrice.FirstPrice != null && request.body.FirstPrice.FirstPrice != "") {
      q.PriceFirst = request.body.FirstPrice.FirstPrice
    }
    if (request.body.ArrivalTime.ArrivalTime != "") {
      q.ArrivalTime = request.body.ArrivalTime.ArrivalTime
    }
    if (request.body.DepartureTime.DepartureTime != "") {
      q.DepartureTime = request.body.DepartureTime.DepartureTime
    }
    if (request.body.FlightNumber.FlightNo != '') {
      q.FlightNumber = request.body.FlightNumber.FlightNo
    }

    await flightModel.findByIdAndUpdate(request.params.id, q);
    response.send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...




// app.delete("/flight/:id", async (request, response) => {
//   try {
//     const flight = await flightModel.findByIdAndDelete(request.params.id);

//     if (!flight) response.status(404).send("No item found");
//     response.status(200).send();
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

app.delete("/flight/:id", async (request, response) => {
  try {
    const flight = await flightModel.findByIdAndDelete(request.params.id);
    var query1 = { DepartureFlightID: request.params.id}
    var query2 = {ReturnFlightID: request.params.id };
    const reservation = await reservationModel.deleteMany({ $or: [query1, query2] });

    ////////////////////////////////////////////////////

    //const User = await userModel.findById(reservation.UserID);

    // //refund (via email) 
    // const totalPrice = reservation.TotalPrice.toString();

    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "BeefOrChickenACL@gmail.com",
    //     pass: "beeforchicken"
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });

    // let mailOptions = {

    //   from: "BeefOrChickenACL@gmail.com",
    //   to: User.email,
    //   subject: "Your reservation has been canceled",
    //   text: "Dear " + User.firstName + ", your reservation with Beef or Chicken airlines has been canceled due to flight cancellation, your refund amount is " + totalPrice + " EGP",
    // };

    // transporter.sendMail(mailOptions, function (err, success) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log("Gedid Mail sent successfully");
    //   }
    // });

    ////////////////////////////////////////////////////


    if (!flight) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

function verifyJWTAdmin(req , res , next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]
  
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err ,decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      req.user.type = decoded.type
      if(req.user.type !== 0){
        return res.json({
          isLoggedIn: false,
          message: "Access Restricted To Admin Only"
        })
      }
      next()
    })
  }else{
    res.json({message : "Incorrect Token Given" , isLoggedIn:false})
  }
}

function verifyJWT(req , res , next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]
  
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err ,decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      req.user.type = decoded.type
      if(req.user.type !== 1){
        return res.json({
          isLoggedIn: false,
          message: "Access Restricted To Users Only"
        })
      }
      next()
    })
  }else{
    res.json({message : "Incorrect Token Given" , isLoggedIn:false})
  }
}





module.exports = app;