const handleMail = () => {
         
    let url2 = `http://localhost:8080/reservationByID/${reservation._id}`
    axios
        .get(url2)
        .then(res => {
            console.log("respnose: ", res)
            props.setReservation(res.data);

            ////////////////////////////////

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
                subject: "Reservation confirmation",
                text: "Dear " + User.firstName + ", \nyour reservation with Beef or Chicken airlines has been confirmed, please find below your itinerary details: \nBooking number: " + props.reservation.Number + " \nDeparture flight details: \nDeparture Date: " + props.departureFlight.DepartureDate + " \nDeparture Time: " + props.departureFlight.DepartureTime + " \nArrival Date: " + props.departureFlight.ArrivalDate + " \nArrival Time: " + props.departureFlight.ArrivalTime + " \nCabin: " + props.reservation.CabinType + " \nChosen Seats: " + props.reservation.TakenSeatsDeparting + " \nReturn flight details: \nDeparture Date: " + props.returnFlight.DepartureDate + " \nDeparture Time: " + props.returnFlight.DepartureTime + " \nArrival Date: " + props.returnFlight.ArrivalDate + " \nArrival Time: " + props.returnFlight.ArrivalTime + " \nCabin: " + props.reservation.CabinType + " \nChosen Seats: " + props.reservation.TakenSeatsArriving + " \nTotal price: " + props.reservation.TotalPrice + " EGP. \nWe wish you a safe flight! ", 
              };
        // console.log("TakenSeatsArriving", reservation.TakenSeatsArriving);
        // console.log("TakenSeatsdeparting", reservation.TakenSeatsDeparting);
              transporter.sendMail(mailOptions, function (err, success) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("Mail sent successfully");
                }
              });
        
      
          })

        //}

            ////////////////////////////////
            
           
       
        .catch(error => {
            console.log("idiot!");
            console.log(error.message);
        })
   
        
            
          
 
// console.log("props.reservation:" ,props.Reservation)
// need to set flights too

};
