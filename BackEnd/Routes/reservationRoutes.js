const express = require("express");
const app = express();
var cors = require('cors')
const jwt = require("jsonwebtoken")
app.use(cors())
const flightModel = require("../Models/Flight");
const userModel = require("../Models/User");
const reservationModel = require("../Models/Reservation");
//const nodemailer = require("nodemailer");
var nodemailer = require('nodemailer');



//TO APPLY AUTHENTICATION
//app.post("/createReservation",verifyJWT, async (request, response ) => {
  //  console.log(request.user.id);
  //  console.log(request.user.username);



/// AUTHENTICATION EL USERS --> ADMIN AUTH IS IN THE OTHER ROUTES
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

app.get("/allReservations" , async (request, response) => {
  const reservations = await reservationModel.find({});

  try {
    response.send(reservations);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/reservationByID/:id", async (request, response) => {
  const reservation = await reservationModel.findById(request.params.id);

  try {
    response.send(reservation);
  }
  catch (error) {
    response.status(500).send(error);
  }
});


app.patch("/reserveSeats", async (request, response) => {  //updateUser
  try {

    console.log("Request: ", request.body)
    var q = {}

    var reservationId = request.body.reservationId;
    if (request.body.seatsDeparting != null)
      q.TakenSeatsDeparting = request.body.seatsDeparting
    if (request.body.seatsReturning != null)
      q.TakenSeatsArriving = request.body.seatsReturning
    // if (request.body.email == true) {

    //   console.log("f email true", q)
       await reservationModel.findByIdAndUpdate(reservationId, q);

    //   //send mail with itineraire
    //   //IF PAID
    //   //const seats = await reservationModel.findById(ReservationId);
    //   const reservation = await reservationModel.findById(reservationId);
    //   const DepartureFlight = await flightModel.findById(reservation.DepartureFlightID);
    //   const ReturnFlight = await flightModel.findById(reservation.ReturnFlightID);
    //   const User = await userModel.findById(reservation.UserID);
    //   const totalPrice = reservation.TotalPrice.toString();

    //   let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: "BeefOrChickenACL@gmail.com",
    //       pass: "beeforchicken"
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   });


    //   let mailOptions = {

    //     from: "BeefOrChickenACL@gmail.com",
    //     to: User.email,
    //     subject: "Reservation confirmation",
    //     text: "Dear " + User.firstName + ", \nyour reservation with Beef or Chicken airlines has been confirmed, please find below your itinerary details: \nBooking number: " + reservation.Number + " \nDeparture flight details: \nDeparture Date: " + DepartureFlight.DepartureDate + " \nDeparture Time: " + DepartureFlight.DepartureTime + " \nArrival Date: " + DepartureFlight.ArrivalDate + " \nArrival Time: " + DepartureFlight.ArrivalTime + " \nCabin: " + reservation.CabinType + " \nChosen Seats: " + reservation.TakenSeatsDeparting + " \n\nReturn flight details: \nDeparture Date: " + ReturnFlight.DepartureDate + " \nDeparture Time: " + ReturnFlight.DepartureTime + " \nArrival Date: " + ReturnFlight.ArrivalDate + " \nArrival Time: " + ReturnFlight.ArrivalTime + " \nCabin: " + reservation.CabinType + " \nChosen Seats: " + reservation.TakenSeatsArriving + " \nTotal price: " + totalPrice + " EGP. \nWe wish you a safe flight! ",
    //   };
    //   console.log("TakenSeatsArriving", reservation.TakenSeatsArriving);
    //   console.log("TakenSeatsdeparting", reservation.TakenSeatsDeparting);
    //   transporter.sendMail(mailOptions, function (err, success) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       console.log("Mail sent successfully");
    //     }
    //   });


    // }
    // if (request.body.email != true) {

    //   console.log("f email false", q)
    //   await reservationModel.findByIdAndUpdate(reservationId, q);
    // }



    response.send();
  } catch (error) {
    response.status(5000).send(error);
  }
});

/////////////////////////////////HABD BAS////////////////////////////

app.post("/mail", async (request, response) => {
  try {
    //send mail with itineraire
    //IF PAID
    //const seats = await reservationModel.findById(ReservationId);
    console.log("el request", request.body)
    const reservation = request.body.Reservation;

    const User = request.body.thisUser;
    const DepartureFlight = request.body.Departing;
    const ReturnFlight = request.body.Returning;

    const totalPrice = reservation.TotalPrice.$numberDecimal;

    console.log("reservation", reservation)
    console.log("User", User)
    console.log("DepartureFlight", DepartureFlight)
    console.log("ReturnFlight", ReturnFlight)
    console.log("test1")
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "BeefOrChickenACL@gmail.com",
        pass: "beeforchicken"
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("test2")
    let mailOptions = {

      from: "BeefOrChickenACL@gmail.com",
      to: User.email,
      subject: "Reservation confirmation",
      text: "Dear " + User.firstName + ", \nyour reservation with Beef or Chicken airlines has been confirmed, please find below your itinerary details: \nBooking number: " + reservation.Number + " \nDeparture flight details: \nDeparture Date: " + DepartureFlight.DepartureDate + " \nDeparture Time: " + DepartureFlight.DepartureTime + " \nArrival Date: " + DepartureFlight.ArrivalDate + " \nArrival Time: " + DepartureFlight.ArrivalTime + " \nCabin: " + reservation.CabinType + " \nChosen Seats: " + reservation.TakenSeatsDeparting + " \n\nReturn flight details: \nDeparture Date: " + ReturnFlight.DepartureDate + " \nDeparture Time: " + ReturnFlight.DepartureTime + " \nArrival Date: " + ReturnFlight.ArrivalDate + " \nArrival Time: " + ReturnFlight.ArrivalTime + " \nCabin: " + reservation.CabinType + " \nChosen Seats: " + reservation.TakenSeatsArriving + " \nTotal price: " + totalPrice + " EGP. \nWe wish you a safe flight! ",
    };
    console.log("TakenSeatsArriving", reservation.TakenSeatsArriving);
    console.log("TakenSeatsdeparting", reservation.TakenSeatsDeparting);
    transporter.sendMail(mailOptions, function (err, success) {
      if (err) {
        console.log(err)
      } else {
        console.log("Mail sent successfully");
      }
    });
    console.log("test3")

    response.send();
  } catch (error) {
    response.status(5000).send(error);
  }
});



// app.patch("/addSeatsToFlights", async (request, response) => {  //updateUser
//   try {

//     var q = {}

//     if (request.body.flightIdDeparting != null){
//       q.Seats = request.body.DepartingSeats
//       await flightModel.findByIdAndUpdate(request.body.DepartingId, q);
//     }

//       var v = {}

//       if (request.body.flightIdReturning != null){
//         v.Seats = request.body.ReturningSeats
//         await flightModel.findByIdAndUpdate(request.body.ReturningId, v);
//       }




//     response.send();
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });


app.post("/createReservation", async (request, response ) => {


  /*
  // var EconomySeats = request.body.EconomySeats;
  // var BusinessSeats = request.body.BusinessSeats;
  // var FirstSeats = request.body.FirstSeats;
  // var seats = [];
  // var tmpEconomy = [];
  // var tmpBusiness = [];
  // var tmpFirst = [];
  // for (let i = 0; i < EconomySeats; i++) {
  //   tmpEconomy.push(0);
  // }
  // seats.push(tmpEconomy);
  // for (let i = 0; i < BusinessSeats; i++) {
  //   tmpBusiness.push(0);
  // }
  // seats.push(tmpBusiness);
  // for (let i = 0; i < FirstSeats; i++) {
  //   tmpFirst.push(0);
  // }
  // seats.push(tmpFirst);
*/

  const reservation = new reservationModel({
    'UserID': request.body.UserID,
    'DepartureFlightID': request.body.DepartureFlightID,
    'ReturnFlightID': request.body.ReturnFlightID,
    'CabinType': request.body.CabinType,
    'TakenSeatsDeparting': request.body.TakenSeatsDeparting,
    'TakenSeatsArriving': request.body.TakenSeatsArriving,
    'TotalPrice': request.body.TotalPrice,
    'Children': request.body.Children,
    'Adults': request.body.Adults,
    'Number': (request.body.DepartureFlightID.substring(20) + request.body.ReturnFlightID.substring(20) + request.body.UserID.substring(20))

  });

  try {
    await reservation.save(async function (err, savedReservatoion) {
      if (err) console.log(err);
      else {
        var ReservationId = savedReservatoion._id;
        console.log("success", ReservationId);
        var edit = {};
        edit.Number = ReservationId.valueOf().substring(18);
        await reservationModel.findByIdAndUpdate(ReservationId, edit);
        response.send(ReservationId);
      }
    });
    // await reservation.save();
    // response.send("reserved successfully");
  } catch (error) {
    response.status(500).send(error);
  }

});


app.delete("/reservation/:id", async (request, response) => {
  try {
    const reservation = await reservationModel.findByIdAndDelete(request.params.id);
    if (!reservation) {
      //console.log("Mafish");
      response.status(404).send("No item found");
      response.status(200).send();

    }
    else {
      const DepartureFlight = await flightModel.findById(reservation.DepartureFlightID);
      const ReturnFlight = await flightModel.findById(reservation.ReturnFlightID);
      const User = await userModel.findById(reservation.UserID);

      //refund (via email) 
      const totalPrice = reservation.TotalPrice.toString();

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "BeefOrChickenACL@gmail.com",
          pass: "beeforchicken"
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {

        from: "BeefOrChickenACL@gmail.com",
        to: User.email,
        subject: "Your reservation has been canceled",
        text: "Dear " + User.firstName + ", your reservation with Beef or Chicken airlines has been canceled successfully, your refund amount is " + totalPrice + " EGP",
      };

      transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
          console.log(err)
        } else {
          console.log("Mail sent successfully");
        }
      });
      //add seats back to flight
      if (reservation.CabinType == 'Business') {
        console.log("fel business");
        var q = {};
        let newBusinessSeatsArray = DepartureFlight.BusinessSeatsArray;
        for (let i = 0; i < reservation.TakenSeatsDeparting.length; i++) {
          newBusinessSeatsArray[reservation.TakenSeatsDeparting[i] - 1] = 0;
        }
        q.BusinessSeatsArray = newBusinessSeatsArray;
        q.RemBusiness = DepartureFlight.RemBusiness + reservation.TakenSeatsDeparting.length;
        //console.log(q);
        await flightModel.findByIdAndUpdate(DepartureFlight.id, q);
        //console.log('7amdellah 3al salama');

        var p = {};
        let newBusinessSeatsArray2 = ReturnFlight.BusinessSeatsArray;
        for (let i = 0; i < reservation.TakenSeatsArriving.length; i++) {
          newBusinessSeatsArray2[reservation.TakenSeatsArriving[i] - 1] = 0;
        }
        p.BusinessSeatsArray = newBusinessSeatsArray2;

        p.RemBusiness = ReturnFlight.RemBusiness + reservation.TakenSeatsArriving.length;
        await flightModel.findByIdAndUpdate(ReturnFlight.id, p);
        console.log("5allasna business");

      }
      if (reservation.CabinType == 'First Class') {
        console.log("fel First");
        var q = {};

        let newFirstSeatsArray = DepartureFlight.FirstSeatsArray;
        for (let i = 0; i < reservation.TakenSeatsDeparting.length; i++) {
          newFirstSeatsArray[reservation.TakenSeatsDeparting[i] - 1] = 0;
        }
        q.FirstSeatsArray = newFirstSeatsArray;

        q.RemFirst = DepartureFlight.RemFirst + reservation.TakenSeatsDeparting.length;
        //console.log(q);
        await flightModel.findByIdAndUpdate(DepartureFlight.id, q);
        var p = {};

        let newFirstSeatsArray2 = ReturnFlight.FirstSeatsArray;
        for (let i = 0; i < reservation.TakenSeatsArriving.length; i++) {
          newFirstSeatsArray2[reservation.TakenSeatsArriving[i] - 1] = 0;
        }
        p.FirstSeatsArray = newFirstSeatsArray2;

        p.RemFirst = ReturnFlight.RemFirst + reservation.TakenSeatsArriving.length;
        await flightModel.findByIdAndUpdate(ReturnFlight.id, p);
        console.log("5allasna first");
      }

      if (reservation.CabinType == 'Economy') {
        console.log("fel economy");
        var q = {};

        let newEconomySeatsArray = DepartureFlight.EconomySeatsArray;
        for (let i = 0; i < reservation.TakenSeatsDeparting.length; i++) {
          newEconomySeatsArray[reservation.TakenSeatsDeparting[i] - 1] = 0;
        }
        q.EconomySeatsArray = newEconomySeatsArray;

        q.RemEconomy = DepartureFlight.RemEconomy + reservation.TakenSeatsDeparting.length;
        //console.log(q);
        await flightModel.findByIdAndUpdate(DepartureFlight.id, q);
        var p = {};

        let newEconomySeatsArray2 = ReturnFlight.EconomySeatsArray;
        for (let i = 0; i < reservation.TakenSeatsArriving.length; i++) {
          newEconomySeatsArray2[reservation.TakenSeatsArriving[i] - 1] = 0;
        }
        p.EconomySeatsArray = newEconomySeatsArray2;

        p.RemEconomy = ReturnFlight.RemEconomy + reservation.TakenSeatsArriving.length;
        await flightModel.findByIdAndUpdate(ReturnFlight.id, p);
        console.log("5allasna economy");
      }
      //console.log(totalPrice);
      response.send();
    }
  } catch (error) {
    response.status(500).send(error);
  }
});


module.exports = app;