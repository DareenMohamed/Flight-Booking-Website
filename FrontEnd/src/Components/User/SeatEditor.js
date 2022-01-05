import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import ResultBack from "../../images/Results2.png";
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import '../../App.css';
import './SeatPicker.css'
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useHistory } from "react-router-dom";
import { grid } from '@mui/system';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ChairIcon from '@mui/icons-material/Chair';
import FlightIcon from '@mui/icons-material/Flight';
import allSeats from './Images/allSeats.png';
import EconImage from './Images/Economy.png';
import BusSeats from './Images/Business.png';
import FirstSeats from './Images/First Class.png';
//http://localhost:3000/Seats/61a160d2320b88bd7f1b1f18
// import { useHistory } from "react-router-dom";



// const mapStateToProps = (state) => ({
//     details: state.DetailsReducer.details,
// });
var flightType = ""
var image;
const styles = {
    1: {
      backgroundColor: 'red',
    }
  };
class SeatPicker extends Component {




    constructor(props) {

        super(props);
        // console.log("before: ", this.props)


        this.state = {

            //  id: this.details.DepartingFlight._id,
            //id: this.props.details.DepartingFlight._id,
            flight: this.props.match.params.flight,
            // ReservationId: this.props.history.location.state.ReservationId,
            ReservationId: this.props.details.Reservation._id,
            seats: [], //current seats in flight
            initial: [], // initially reserved
            chosenSeats: [], // seat numbers picked
            currSeats: this.props.details.Reservation.Adults + this.props.details.Reservation.Children,
            maxSeats: this.props.details.Reservation.Adults + this.props.details.Reservation.Children,
            //cabin: 1,  // 0 for econ, 1 for business, 2 first
            maxReached: true,
            // flag : false,
            returnSeats: this.props.details.Reservation.TakenSeatsArriving,
            DepartureSeats: this.props.details.Reservation.TakenSeatsDeparting,
            loading: 1,


        };
        console.log("ddddddddddd: ", this.props)
    }




    updateChoice = (index, change) => {
        var temporaryArray = this.state.seats
        temporaryArray[index] = change
        this.setState({ seats: temporaryArray })
        console.log("current seats : ", this.state.seats)
        console.log("init seats : ", this.state.initial)
        if (change == 0) {
            change = -1
        }
        this.setState({ currSeats: (this.state.currSeats + change) }, () => {
            console.log(this.state.currSeats)
            if (this.state.currSeats >= this.state.maxSeats)
                this.setState({ maxReached: true }, () => {
                    console.log(this.state.maxReached)
                })
            else
                this.setState({ maxReached: false }, () => {
                    console.log(this.state.maxReached)
                })
        });
    }




    settingArrays = async () => {

        console.log("start of setting arrays:", this)
        let seatsArr = []
        let initialArray = []
        //let url = `http://localhost:8080/flightById/${this.state.id.id}`;
        if (this.state.flight == 1) {
            flightType = "departing"

            switch (this.props.details.Reservation.CabinType) {
                case "Economy":
                    // this.setState({ cabin: 0 })

                    // this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.EconomySeatsArray)) })
                    // this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.EconomySeatsArray)) })
                    seatsArr = JSON.parse(JSON.stringify(this.props.details.DepartingFlight.EconomySeatsArray))
                    initialArray = JSON.parse(JSON.stringify(this.props.details.DepartingFlight.EconomySeatsArray))
                    break;
                case "Business":
                    console.log("in business")
                    // this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.BusinessSeatsArray)) })
                    // this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.BusinessSeatsArray)) })
                    seatsArr = JSON.parse(JSON.stringify(this.props.details.DepartingFlight.BusinessSeatsArray))
                    initialArray = JSON.parse(JSON.stringify(this.props.details.DepartingFlight.BusinessSeatsArray))

                    break;
                case "First Class":
                    // this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.FirstSeatsArray)) })
                    //this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.FirstSeatsArray)) })
                    seatsArr = JSON.parse(JSON.stringify(this.props.details.DepartingFlight.FirstSeatsArray))
                    initialArray = JSON.parse(JSON.stringify(this.props.details.DepartingFlight.FirstSeatsArray))
                    break;
                default:
                // code block
            }


        }
        else {
            flightType = "returning"
            switch (this.props.details.Reservation.CabinType) {
                case "Economy":
                    // this.setState({ cabin: 0 })

                    //this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.EconomySeatsArray)) })
                    //this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.EconomySeatsArray)) })
                    seatsArr = JSON.parse(JSON.stringify(this.props.details.ReturnFlight.EconomySeatsArray))
                    initialArray = JSON.parse(JSON.stringify(this.props.details.ReturnFlight.EconomySeatsArray))
                    break;
                case "Business":
                    // this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.BusinessSeatsArray)) })
                    // this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.BusinessSeatsArray)) })
                    seatsArr = JSON.parse(JSON.stringify(this.props.details.ReturnFlight.BusinessSeatsArray))
                    initialArray = JSON.parse(JSON.stringify(this.props.details.ReturnFlight.BusinessSeatsArray))
                    break;
                case "First Class":
                    // this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.FirstSeatsArray)) })
                    // this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.FirstSeatsArray)) })
                    seatsArr = JSON.parse(JSON.stringify(this.props.details.ReturnFlight.FirstSeatsArray))
                    initialArray = JSON.parse(JSON.stringify(this.props.details.ReturnFlight.FirstSeatsArray))
                    break;
                default:
                // code block
            }
        }
        // altering initial


        let mySeats = []
        if (this.state.flight == 1) {
            mySeats = this.props.details.Reservation.TakenSeatsDeparting;
        }
        else {
            mySeats = this.props.details.Reservation.TakenSeatsArriving;

        }
        console.log("my seats", mySeats)
        for (let x in mySeats) {
            console.log("x", x)
            console.log("mySeats[x]", mySeats[x])
            initialArray[mySeats[x] - 1] = 0
        }
        console.log("my seats", mySeats)
        console.log("Before set state", this.state)
        this.setState({ chosenSeats: mySeats }, () => {
            this.setState({ seats: seatsArr }, () => {
                this.setState({ initial: initialArray }, () => {
                    console.log("props: ", this.props)
                    console.log("ffs", this.state)

                    console.log("after set state", this.state)
                    image = require('./Images/Economy.png').default

                })
            })
        })







    }

    componentDidMount = async () => {
        this.settingArrays()
        this.setState({ loading: 0 })

        console.log("done")



    }
    // componentDidUpdate = () =>{
    //     this.settingArrays()
    // }





    handleChange = event => {
        // setState({ [event.target.id]: event.target.checked })
        if (event.target.checked) {
            this.setState({ choosenSeats: this.state.chosenSeats.push(parseInt(event.target.id) + 1) }, () => {
                this.updateChoice(event.target.id, 1)
                console.log("chosen Seats now: ", this.state.chosenSeats)
            })



        }
        else {


            this.setState({ chosenSeats: this.state.chosenSeats.filter((item) => item !== parseInt(event.target.id) + 1) },
                () => {
                    this.updateChoice(event.target.id, 0)
                    console.log("chosen Seats now: ", this.state.chosenSeats)
                })

        }
    };
    handleSubmit = () => {
        console.log("state", this.state)
        console.log("details", this.props)
        console.log("seats", this.state.chosenSeats)

        //this.state.DepartureSeats.push(this.state.chosenSeats)
        if (this.state.flight == 1) {
            console.log("entered first thingy")
            let body2 = {}
            switch (this.props.details.Reservation.CabinType) {
                case "Economy":

                    body2 = {
                        EconomySeatsArray: this.state.seats
                        // RemEconomy: (this.props.details.DepartingFlight.RemEconomy -(this.state.maxSeats))
                    }

                    break;
                case "Business":

                    body2 = {
                        BussinessSeatsArray: this.state.seats
                        // RemBusiness: (this.props.details.DepartingFlight.RemBusiness -(this.state.maxSeats))
                    }
                    break;
                case "First Class":

                    body2 = {
                        FirstSeatsArray: this.state.seats
                        // RemFirst: (this.props.details.DepartingFlight.RemFirst -(this.state.maxSeats))
                    }
                    break;
                default:
                // code block
            }
            console.log("body2", body2)
            let url2 = `http://localhost:8080/flightSeats/${this.props.details.Reservation.DepartureFlightID}`
            axios
                .patch(url2, body2)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("gamed louji!")


                    // this.props.history.push(`/Seats/1`);
                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })


            let url = "http://localhost:8080/reserveSeats"
            let body = {
                reservationId: this.props.details.Reservation._id,
                seatsDeparting: this.state.chosenSeats,


            }
            axios
                .patch(url, body)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("gamed louji!")


                    // this.props.history.push(`/Seats/1`);
                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })
            this.setState({
                flight: 2, ReservationId: this.props.details.Reservation._id,
                chosenSeats: [],
                currSeats: 0, maxReached: false
            }, () => {


                this.props.setTakenSeatsDeparture(this.state.DepartureSeats)
                console.log("details departure---->", this.props.details)
                //this.settingArrays()
                // this.props.history.push(`/Seats/2`);
                //REDIRECT TO WHERE?


            });



        }
        else {
            let url = "http://localhost:8080/reserveSeats"
            let body = {
                reservationId: this.props.details.Reservation._id,
                seatsReturning: this.state.chosenSeats

            }
            // this.state.returnSeats.push(this.state.chosenSeats)
            // setTakenSeatsReturn(this.state.chosenSeats)
            axios
                .patch(url, body)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("gamed louji!")


                    // this.props.history.push(`/Seats/1`);
                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })


            let url2 = `http://localhost:8080/flightSeats/${this.props.details.Reservation.ReturnFlightID}`



            let body1 = {}

            switch (this.props.details.Reservation.CabinType) {
                case "Economy":
                    // this.setState({ cabin: 0 })

                    body1 = {
                        EconomySeatsArray: this.state.seats,
                        //RemEconomy: (this.props.details.ReturnFlight.RemEconomy -(this.state.maxSeats))
                    }


                    break;
                case "Business":
                    body1 = {
                        BussinessSeatsArray: this.state.seats,
                        // RemBusiness: (this.props.details.ReturnFlight.RemBusiness -(this.state.maxSeats))
                    }

                    break;
                case "First Class":
                    body1 = {
                        FirstSeatsArray: this.state.seats,
                        //  RemFirst: (this.props.details.ReturnFlight.RemFirst -(this.state.maxSeats))
                    }

                    break;
                default:
                // code block
            }
            axios
                .patch(url2, body1)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("gamed louji!")
                    this.props.setTakenSeatsReturn(this.state.returnSeats)
                    console.log("details return---->", this.props.details)
                    console.log(this.props.TakenSeatsReturn)
                    //this.props.history.push('/FullSummaryPage');
                    //  alert("Trip Reserved Successfully!")



                    // this.props.history.push(`/Seats/1`);
                })
                .catch(error => {
                    alert("Please pick your seat(s)!")
                    console.log("idiot!");
                    console.log(error.message);
                })



        }

        this.props.history.push('/ViewAllReservations');
    };

   



    render() {

        return (
            <div style={{ backgroundImage: `url(${ResultBack})`, height: "100vh", backgroundSize: "cover" }}>
                <div style={{ paddingTop: "100px",marginLeft:"25%",marginRight:"auto" }}>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Card className="paper" style={{marginTop:"10%"}} sx={{ minWidth: 275 }}>
                                <Typography style={{ marginTop: "10px", fontSize: "18" }} variant="h5" component="h2">
                                    Please pick your desired seats from your {flightType} flight
                                </Typography> 
                                {/* <FlightIcon style={styles.${this.props.match.params.flight}}/> */}

                                <hr />

                                <Typography style={{ marginTop: "10px", fontSize: "12" }} variant="h6" component="h2">
                                    {this.props.details.Reservation.CabinType + " class"}
                                </Typography>
                                <CardContent raised="true">
                                    <Grid container spacing={{ xs: 2 }} >
                                        {Array.from(this.state.seats).map((_, index) => (
                                            <Grid item xs={2} key={index}>
                                                <Checkbox
                                                    //checked={this.state.initEcon[index]}

                                                    checked={this.state.seats[index]}
                                                    disabled={this.state.initial[index] || (!(this.state.seats[index]) && this.state.maxReached)}
                                                    icon={<ChairOutlinedIcon />}
                                                    checkedIcon={<ChairIcon />}
                                                    onChange={this.handleChange}
                                                    id={(index)}
                                                    label={index + 1}
                                                />


                                            </Grid>


                                        ))}
                                    </Grid>
                                </CardContent>
                                <div style={{ marginLeft: "35%", marginBottom: "15%" }}>
                                    {/* <Button style={{ background: "#10404c ", color: "wheat"  }} */}
                                    <Button
                                        variant="outlined" size="medium" color="primary"
                                        disabled={!this.state.maxReached}
                                        onClick={() => { this.handleSubmit() }} >Confirm</Button>
                                </div>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={1}>
                            {/* <Paper style={styles.paperContainer}>
            
                                </Paper> */}
                                <img src={allSeats} />
                                {/* <img src={image} /> */}
                        </Grid>
                        
                    </Grid>
                </div>


            </div>

        );
    }


}
const mapStateToProps = (state) => ({
    details: state.DetailsReducer.details,
    TakenSeatsReturn: state.DetailsReducer.TakenSeatsReturn,
    TakenSeatsDeparture: state.DetailsReducer.TakenSeatsDeparture,
});
const mapDispatchToProps = (dispatch) => {
    return {

        setTakenSeatsReturn: (TakenSeatsReturn) => {
            dispatch({ type: 'setTakenSeatsReturn', payload: TakenSeatsReturn });
        },
        setTakenSeatsDeparture: (TakenSeatsDeparture) => {
            dispatch({ type: 'setTakenSeatsDeparture', payload: TakenSeatsDeparture });
        },




    };
};



export default connect(mapStateToProps, mapDispatchToProps)(SeatPicker);