
import * as React from 'react';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "./Flight.css"
// margin-left: 100
// px
// ;
//     width: 150
// px
// ;
//     height: 150
// px
// ;
//     margin-top: 100
// px
// ;
const useStyles = makeStyles(theme => ({

    smallCard: {
        marginTop: "100px",
        width: '150px',
        height: '150px',
        marginLeft: '100px',
    },
    largeCard: {
        marginTop: "100px",
        width: '350px',
        height: '150px',
        //marginLeft: '100px',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px'
    },
    ticket: {
        display: "flex"

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));

function BasicCard(props) {
    const classes = useStyles();
    const flight = props.flight
    const Adate = flight.ArrivalDate
    //let formatted_date = new Date(date.toDateString());
    let newDate = Adate.toString();
    newDate = newDate.substring(0, 10)
    console.log("ana hena: ", newDate)

    return (
        <div class="box">
            <ul class="left">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <ul class="right">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>

            </ul>
            <div class="ticket">
                {/* <span class="airline">Airline</span>
                <span class="airline airlineslip">Airline</span>
                <span class="boarding">Boarding pass</span> */}


                <div class="sub-content">

                    <span class="name">From<br /><span>{flight.From.toUpperCase()}</span></span>
                    <span class="flight">TO <br /><span>{flight.To.toUpperCase()}</span></span>
                    <span class="gate">Arrival Date<br /><span>{newDate}</span></span>
                    {/* <span class="seat">SEAT<br /><span>45A</span></span> */}
                    {/* <span class="boardingtime">Date<br /><span>8:25PM ON AUGUST 2013</span></span> */}
                    <Button class="seat seatslip">Show Details<br /></Button>
                    {/* <span class="name nameslip">Show Details<br /><span></span></span> */}
                </div>

            </div>
        </div>
    );
}
export default BasicCard;


{/* <div class="box">
  <ul class="left">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  
  <ul class="right">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <div class="ticket">
    <span class="airline">Lufthansa</span>
    <span class="airline airlineslip">Lufthansa</span>
    <span class="boarding">Boarding pass</span>
    <div class="content">
      <span class="jfk">JFK</span>
      <span class="plane"><?xml version="1.0" ?><svg clip-rule="evenodd" fill-rule="evenodd" height="60" width="60" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg></span>
      <span class="sfo">SFO</span>
      
      <span class="jfk jfkslip">JFK</span>
      <span class="plane planeslip"><?xml version="1.0" ?><svg clip-rule="evenodd" fill-rule="evenodd" height="50" width="50" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g stroke="#222"><line fill="none" stroke-linecap="round" stroke-width="30" x1="300" x2="55" y1="390" y2="390"/><path d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z" fill="#222" stroke-linejoin="round" stroke-width="10"/></g></svg></span>
      <span class="sfo sfoslip">SFO</span>
      <div class="sub-content">
        <span class="watermark">Lufthansa</span>
        <span class="name">PASSENGER NAME<br><span>Rex, Anonasaurus</span></span>
        <span class="flight">FLIGHT N&deg;<br><span>X3-65C3</span></span>
        <span class="gate">GATE<br><span>11B</span></span>
        <span class="seat">SEAT<br><span>45A</span></span>
        <span class="boardingtime">BOARDING TIME<br><span>8:25PM ON AUGUST 2013</span></span>
            
         <span class="flight flightslip">FLIGHT N&deg;<br><span>X3-65C3</span></span>
          <span class="seat seatslip">SEAT<br><span>45A</span></span>
         <span class="name nameslip">PASSENGER NAME<br><span>Rex, Anonasaurus</span></span>
      </div>
    </div>
    <div class="barcode"></div>
    <div class="barcode slip"></div>
  </div>
</div> */}