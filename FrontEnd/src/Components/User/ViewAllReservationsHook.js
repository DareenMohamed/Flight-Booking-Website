import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllReservations.css'
import Accordion from 'react-bootstrap/Accordion'
import Backdrop from '@mui/material/Backdrop';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteButton from './DeleteButton'
import Button from '@material-ui/core/Button';
import MailButton from './MailButton';
import LuggageIcon from '@mui/icons-material/Luggage';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CircularProgress from '@mui/material/CircularProgress';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import moment, { duration } from 'moment'
import PersonIcon from '@mui/icons-material/Person';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import BadgeIcon from '@mui/icons-material/Badge';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ChangeDepartingFlight from './ChangeDepartingFlight';
import ChangeRetFlight from './ChangeRetFlight'
// import { Mailer } from 'nodemailer-react';
// import nodemailer from "nodemailer";


//var nodemailer = require('nodemailer');
//const nodemailer = require("nodemailer");
//import Button from 'react-bootstrap/Button';
//BACKEND DEPENDENT COMMENTED => BACKEND
const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        origin: state.DetailsReducer.details.origin,
        origin_name: state.DetailsReducer.details.origin_name,
        Reservation: state.DetailsReducer.details.Reservation,
        DepartingFlight: state.DetailsReducer.details.DepartingFlight,
        ReturnFlight: state.DetailsReducer.details.ReturnFlight,
        details: state.DetailsReducer.details,
    };
};
const mapDispatchToState = (dispatch) => {
    return {
        setReservation: (Reservation) => {
            dispatch({ type: 'setReservation', payload: Reservation });
        },
        setDepartingFlight: (DepartingFlight) => {
            dispatch({ type: 'setDepartingFlight', payload: DepartingFlight });
        },
        setReturnFlight: (ReturnFlight) => {
            dispatch({ type: 'setReturnFlight', payload: ReturnFlight });
        },


    };
    // console.log(origin)
};
export default connect(mapStateToProps, mapDispatchToState)(ViewAllReservations);
function ViewAllReservations(props, { Reservation, setReservation, setDepartingFlight, setReturnFlight, DepartingFlight, ReturnFlight }) {
    let history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        //   setOpen(!open);
    };
    const [flightType, setFlightType] = React.useState(0);
    // const [departure, setDeparture] = useState();
    // const [returnFlight, setReturnFlight] = useState();
    const reservation = props.reservation;
    const departure = props.departureFlight;
    const returnFlight = props.returnFlight;
    const userName = props.userName;
    const baggageReturn = { baggage: 0 };
    const baggageDeparture = { baggage: 0 };
    const cabin = reservation.CabinType;
    const passengers = reservation.Adults + reservation.Children;

    console.log("HOOKS");
    console.log(props.details.token);


    if (reservation.TakenSeatsDeparting.length === 0) {
        Object.assign(reservation, { TakenSeatsDeparting: ["None"] })
    }
    if (reservation.TakenSeatsArriving.length === 0) {
        Object.assign(reservation, { TakenSeatsArriving: ["None"] })
    }

    const handleEdit = (type) => { //1 is departing and 2 is returning

        console.log(props)
        setOpen(true)
        let url2 = `http://localhost:8080/reservationByID/${reservation._id}`
        axios
            .get(url2)
            .then(res => {
                console.log("respnose: ", res)
                console.log("gamed louji!")
                props.setReservation(res.data);
                url2 = `http://localhost:8080/flightByIdUser/${reservation.DepartureFlightID}`
                axios
                    .get(url2,
                        {
                            headers: {
                                "x-access-token": props.details.token
                            }
                        })
                    .then(res => {
                        const resultt = res.data;
                        if (resultt.isLoggedIn !== false) {
                            props.setDepartingFlight(res.data);
                            url2 = `http://localhost:8080/flightByIdUser/${reservation.ReturnFlightID}`
                            axios
                                .get(url2,
                                    {
                                        headers: {
                                            "x-access-token": props.details.token
                                        }
                                    })
                                .then(res => {
                                    const resultt = res.data;
                                    if (resultt.isLoggedIn !== false) {
                                        console.log("respnose: ", res)
                                        console.log("gamed louji!")
                                        props.setReturnFlight(res.data);
                                        if (type == 1)
                                            history.push('/EditSeats/1');
                                        else if (type == 2)
                                            history.push('/EditSeats/2');

                                        // this.props.history.push(`/Seats/1`);
                                    }
                                    else {
                                        alert("You need to login to edit your profile!")
                                        history.push("/userlogin2");
                                    }
                                })
                                .catch(error => {
                                    console.log("idiot!");
                                    console.log(error.message);
                                })
                            // this.props.history.push(`/Seats/1`);
                        } else {
                            alert("You need to login to edit your profile!")
                            history.push("/userlogin2");
                        }
                    })
                    .catch(error => {
                        console.log("idiot!");
                        console.log(error.message);
                    })

                // this.props.history.push(`/Seats/1`);
            })
            .catch(error => {
                console.log("idiot!");
                console.log(error.message);
            })





        // console.log("props.reservation:" ,props.Reservation)
        // need to set flights too

    };


    const handleMail = () => {

        let url2 = `http://localhost:8080/reservationByID/${reservation._id}`
        axios
            .get(url2)
            .then(res => {
                //console.log("respnose: ", res)
                console.log("gamed louji!")
                props.setReservation(res.data);
                url2 = `http://localhost:8080/flightByIdUser/${reservation.DepartureFlightID}`
                axios
                    .get(url2,
                        {
                            headers: {
                                "x-access-token": props.details.token
                            }
                        })
                    .then(res => {
                        //  console.log("respnose: ", res)
                        //console.log("gamed louji!")
                        const resultt = res.data;
                        if (resultt.isLoggedIn !== false) {
                            props.setDepartingFlight(res.data);

                            url2 = `http://localhost:8080/flightByIdUser/${reservation.ReturnFlightID}`
                            axios
                                .get(url2,
                                    {
                                        headers: {
                                            "x-access-token": props.details.token
                                        }
                                    })
                                .then(res => {
                                    const resultt = res.data;
                                    if (resultt.isLoggedIn !== false) {
                                    // console.log("respnose: ", res)

                                    props.setReturnFlight(res.data);

                                    console.log("props:", props)
                                    // HENA 
                                    url2 = `http://localhost:8080/userById/${reservation.UserID}`
                                    axios
                                        .get(url2)
                                        .then(res => {
                                            let User = res.data


                                            url2 = `http://localhost:8080/mail`
                                            let body = {

                                                Reservation: reservation,
                                                thisUser: User,
                                                Departing: props.DepartingFlight,
                                                Returning: props.ReturnFlight

                                            }
                                            axios
                                                .post(url2, body)
                                                .then(res => {
                                                    console.log("ba3atna el mail: ", res)

                                                    // this.props.history.push(`/Seats/1`);
                                                })
                                        })
                                    } else {
                                        alert("You need to login to edit your profile!")
                                        history.push("/userlogin2");
                                    }
                                    // this.props.history.push(`/Seats/1`);
                                })
                                .catch(error => {
                                    console.log("idiot!");
                                    console.log(error.message);
                                })
                            // this.props.history.push(`/Seats/1`);
                        } else {
                            alert("You need to login to edit your profile!")
                            history.push("/userlogin2");
                        }
                    })
                    .catch(error => {
                        console.log("idiot!");
                        console.log(error.message);
                    })

                // this.props.history.push(`/Seats/1`);
            })
            .catch(error => {
                console.log("idiot!");
                console.log(error.message);
            })


        ////////////////////////////////



    }


    const flightDuration = (initDate, finalDate, initTime, finalTime) => {
        let init = moment(initDate.substring(0, 10) + " " + initTime + ":00");
        let final = moment(finalDate.substring(0, 10) + " " + finalTime + ":00");
        var ms = moment(final, "DD/MM/YYYY HH:mm:ss").diff(moment(init, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        return Math.floor(d.asHours()) + " hrs" + moment.utc(ms).format(":mm") + " mins";
    }

    const fixBaggages = () => {
        if (departure.length !== 0) {
            if (cabin === "Economy") {
                Object.assign(baggageDeparture, { baggage: departure[0].EconomyBags })
            }
            else {
                if (cabin === "First Class") {
                    Object.assign(baggageDeparture, { baggage: departure[0].FirstBags })
                }
                else {
                    Object.assign(baggageDeparture, { baggage: departure[0].BusinessBags })
                }
            }
        }
        if (returnFlight.length !== 0) {
            if (cabin === "Economy") {
                Object.assign(baggageReturn, { baggage: returnFlight[0].EconomyBags })
            }
            else {
                if (cabin === "First Class") {
                    Object.assign(baggageReturn, { baggage: returnFlight[0].FirstBags })
                }
                else {
                    Object.assign(baggageReturn, { baggage: returnFlight[0].BusinessBags })
                }
            }
        }
    }
    /*useEffect(() => {
        
        axios.get('http://localhost:8080/flightById/' + props.reservation.DepartureFlightID).then(
            Result => {setDeparture([Result.data]);
                console.log(departure);
            }
                ).catch(err => { console.log(err) })
                
            
        
        axios.get('http://localhost:8080/flightById/' + props.reservation.ReturnFlightID).then(
            Result =>    {setReturnFlight([Result.data]);
                console.log(returnFlight);
 
                    }
                        ).catch(err => { console.log(err) })
        }
            
            
            
            , []);
      */
    const handleChange = (event, newValue) => {
        setFlightType(newValue);
    };
    if (departure.length !== 0) {
        fixBaggages();

        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                //onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Accordion className="accordion" >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="accordionHeader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                &nbsp;
                                {departure[0].From}
                                &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                                </svg>
                                &nbsp;
                                {departure[0].To}
                            </div>
                            <div className="accordionHeader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                </svg>&nbsp;
                                {reservation.CabinType}
                            </div>
                            <div className="accordionHeader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                                </svg>&nbsp;
                                {reservation.TotalPrice.$numberDecimal} EGP
                            </div>
                            <div className="accordionHeader">
                                {passengers}
                                &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </div>
                        </Accordion.Header>


                        <Accordion.Body>
                            <Tabs class="tabs" value={flightType} onChange={handleChange} centered>
                                <Tab label="Departure Flight" />
                                <Tab label="Return Flight" />
                            </Tabs>
                            {flightType ? (
                                <div>
                                    <div className="container rounded">
                                        <form action="">

                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AirplaneTicketIcon />&nbsp;
                                                            Flight Number</p>
                                                        <div>
                                                            {returnFlight[0].FlightNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AirplaneTicketIcon />&nbsp;
                                                            Reservation Number</p>
                                                        <div>
                                                            {reservation.Number}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <BadgeIcon />&nbsp;
                                                            Reserved By</p>
                                                        <div>
                                                            {userName}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <FlightTakeoffIcon />&nbsp;
                                                            Departing From</p>
                                                        <div>
                                                            {returnFlight[0].From}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <FlightLandIcon />
                                                            &nbsp;
                                                            Arriving to</p>
                                                        <div>
                                                            {returnFlight[0].To}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <EventIcon />
                                                            &nbsp;
                                                            Departure Date</p>
                                                        <div>  {returnFlight[0].DepartureDate.substring(0, 10)}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <EventIcon />
                                                            &nbsp;
                                                            Arrival Date</p>
                                                        <div>  {returnFlight[0].ArrivalDate.substring(0, 10)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AccessTimeIcon />
                                                            &nbsp;
                                                            Departure Time</p>
                                                        <div>{returnFlight[0].DepartureTime}</div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AccessTimeIcon />
                                                            &nbsp;
                                                            Arrival Time</p>
                                                        <div>{returnFlight[0].ArrivalTime}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass-split" viewBox="0 0 16 16">
                                                                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                                                            </svg>&nbsp;
                                                            Flight Duration</p>
                                                        <div>
                                                            {flightDuration(returnFlight[0].DepartureDate, returnFlight[0].ArrivalDate, returnFlight[0].DepartureTime, returnFlight[0].ArrivalTime)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <LuggageIcon />
                                                            Baggage Per Person</p>
                                                        <div>
                                                            {baggageReturn.baggage}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <PersonIcon />&nbsp;
                                                            Adults</p>
                                                        <div>
                                                            {reservation.Adults}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <ChildCareIcon />&nbsp;
                                                            Children</p>
                                                        <div>
                                                            {reservation.Children}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AirlineSeatReclineExtraIcon />
                                                            Seat(s) Number(s)</p>
                                                        <div>{reservation.TakenSeatsArriving.join(', ')} </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                <Button
                                                    style={{ background: "#10404c ", color: "wheat", }}
                                                    variant="outlined" size="medium" margin={5}

                                                    onClick={() => { handleEdit(2) }} >Edit Seats</Button>
                                                <ChangeRetFlight></ChangeRetFlight>

                                                <Button sx={{ mt: 2 }}
                                                    style={{ background: "#10404c ", color: "wheat", }}
                                                    variant="outlined" size="medium"

                                                    onClick={() => { handleMail() }} >Mail me my itinerary</Button>
                                                <DeleteButton reservation={reservation._id} />
                                            </div>



                                        </form>
                                    </div>

                                </div>) : (
                                <div>
                                    <div className="container rounded">
                                        <form action="">

                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AirplaneTicketIcon />&nbsp;
                                                            Flight Number</p>
                                                        <div>{departure[0].FlightNumber}</div>
                                                    </div></div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue"><AirplaneTicketIcon />&nbsp;
                                                            Reservation Number</p>
                                                        <div>{reservation.Number}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <BadgeIcon />&nbsp;
                                                            Reserved By</p>
                                                        <div>
                                                            {userName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <FlightTakeoffIcon />&nbsp;
                                                            Departing From</p>
                                                        <div>
                                                            {departure[0].From}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <FlightLandIcon />
                                                            &nbsp;
                                                            Arriving to</p>
                                                        <div>
                                                            {departure[0].To}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue"><EventIcon /> &nbsp;
                                                            Departure Date</p>
                                                        <div>  {departure[0].DepartureDate.substring(0, 10)}</div> </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue"><EventIcon />&nbsp;
                                                            Arrival Date</p>
                                                        <div>  {departure[0].ArrivalDate.substring(0, 10)}</div></div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AccessTimeIcon />
                                                            &nbsp;
                                                            Departure Time</p>
                                                        <div>{departure[0].DepartureTime}</div>

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AccessTimeIcon />
                                                            &nbsp;
                                                            Arrival Time</p>
                                                        <div>{departure[0].ArrivalTime}</div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hourglass-split" viewBox="0 0 16 16">
                                                                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                                                            </svg>&nbsp;
                                                            Flight Duration</p>
                                                        <div>
                                                            {flightDuration(departure[0].DepartureDate, departure[0].ArrivalDate, departure[0].DepartureTime, departure[0].ArrivalTime)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <LuggageIcon />
                                                            Baggage Per Person</p>
                                                        <div>
                                                            {baggageDeparture.baggage}
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <PersonIcon /> &nbsp;
                                                            Adults</p>
                                                        <div>
                                                            {reservation.Adults}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <ChildCareIcon />&nbsp;
                                                            Children</p>
                                                        <div>
                                                            {reservation.Children}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <AirlineSeatReclineExtraIcon />
                                                            Seat(s) Number(s)</p>
                                                        <div> {reservation.TakenSeatsDeparting.join(', ')}  </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                <Button
                                                    style={{ background: "#10404c ", color: "wheat", }}
                                                    variant="outlined" size="medium" margin={5}

                                                    onClick={() => { handleEdit(1) }} >Edit Seats</Button>
                                                <ChangeDepartingFlight></ChangeDepartingFlight>

                                                <Button sx={{ mt: 2 }}
                                                    style={{ background: "#10404c ", color: "wheat", }}
                                                    variant="outlined" size="medium"

                                                    onClick={() => { handleMail() }} >Mail me my itinerary</Button>
                                                <DeleteButton reservation={reservation._id} />
                                            </div>
                                            {/*  */}
                                        </form>
                                    </div>

                                </div>
                            )}

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
    else {
        return null;
    }
}


