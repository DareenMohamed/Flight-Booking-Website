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
import allSeats from './Images/allSeats.png';
import Header from './Header';
//http://localhost:3000/Seats/61a160d2320b88bd7f1b1f18
// import { useHistory } from "react-router-dom";



// const mapStateToProps = (state) => ({
//     details: state.DetailsReducer.details,
// });
var flightType = ""

class SeatPicker extends Component {




    constructor(props) {

        super(props);
        // console.log("before: ", this.props)


        this.state = {

            //  id: this.details.DepartingFlight._id,
            id: this.props.details.DepartingFlight._id,
            flight: this.props.match.params.flight,
            // ReservationId: this.props.history.location.state.ReservationId,
            ReservationId: this.props.details.ReservationID,
            seats: [],
            initial: [],
            chosenSeats: [],
            currSeats: 0,
            maxSeats: this.props.details.Adults + this.props.details.children,
            //cabin: 1,  // 0 for econ, 1 for business, 2 first
            maxReached: false,
            // flag : false,
            returnSeats: [],
            DepartureSeats: [],

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

    settingArrays = () => {
        if (this.props.DepartingSeats != null) {
            this.setState({ DepartingSeats: this.props.DepartingSeats, ReservationId: this.state.ReservationId })
        }

        //let url = `http://localhost:8080/flightById/${this.state.id.id}`;
        if (this.state.flight == 1) {
            flightType = "departing"

            // console.log("curr flight isa: ", this.state.currFlight)

            switch (this.props.details.cabin_class) {
                case "Economy":
                    // this.setState({ cabin: 0 })

                    this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.EconomySeatsArray)) })
                    this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.EconomySeatsArray)) })

                    break;
                case "Business":
                    this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.BusinessSeatsArray)) })
                    this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.BusinessSeatsArray)) })
                    break;
                case "First Class":
                    this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.FirstSeatsArray)) })
                    this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.DepartingFlight.FirstSeatsArray)) })
                    break;
                default:
                // code block
            }


        }
        else {
            flightType = "returning"
            switch (this.props.details.cabin_class) {
                case "Economy":
                    // this.setState({ cabin: 0 })

                    this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.EconomySeatsArray)) })
                    this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.EconomySeatsArray)) })

                    break;
                case "Business":
                    this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.BusinessSeatsArray)) })
                    this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.BusinessSeatsArray)) })
                    break;
                case "First Class":
                    this.setState({ seats: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.FirstSeatsArray)) })
                    this.setState({ initial: JSON.parse(JSON.stringify(this.props.details.ReturnFlight.FirstSeatsArray)) })
                    break;
                default:
                // code block
            }
        }
    }
    componentDidMount = () => {

        this.settingArrays()




    }

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
        console.log("submit state", this.state)
        console.log("submit details", this.props)
        console.log("submit seats", this.state.chosenSeats)

        this.state.DepartureSeats.push(this.state.chosenSeats)
        if (this.state.flight == 1) {
            console.log("entered first thingy")
            let body2 = {}
            switch (this.props.details.cabin_class) {
                case "Economy":

                    body2 = {
                        EconomySeatsArray: this.state.seats,
                        RemEconomy: (this.props.details.DepartingFlight.RemEconomy - (this.state.maxSeats))
                    }

                    break;
                case "Business":

                    body2 = {
                        BusinessSeatsArray: this.state.seats,
                        RemBusiness: (this.props.details.DepartingFlight.RemBusiness - (this.state.maxSeats))
                    }
                    break;
                case "First Class":

                    body2 = {
                        FirstSeatsArray: this.state.seats,
                        RemFirst: (this.props.details.DepartingFlight.RemFirst - (this.state.maxSeats))
                    }
                    break;
                default:
                // code block
            }
            console.log("body2", body2)
            let url2 = `http://localhost:8080/flightSeats/${this.props.details.selectedDepartingFlightID}`
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
                reservationId: this.state.ReservationId,
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
                flight: 2, ReservationId: this.state.ReservationId,
                chosenSeats: [],
                currSeats: 0, maxReached: false
            }, () => {


                this.props.setTakenSeatsDeparture(this.state.DepartureSeats)
                console.log("details departure---->", this.props.details)
                this.settingArrays()
                this.props.history.push(`/Seats/2`);



            });



        }
        else {
            let url = "http://localhost:8080/reserveSeats"
            let body = {
                reservationId: this.state.ReservationId,
                seatsReturning: this.state.chosenSeats,
                email: true

            }
            this.state.returnSeats.push(this.state.chosenSeats)
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


            let url2 = `http://localhost:8080/flightSeats/${this.props.details.selectedReturningFlightID}`



            let body1 = {}

            switch (this.props.details.cabin_class) {
                case "Economy":
                    // this.setState({ cabin: 0 })

                    body1 = {
                        EconomySeatsArray: this.state.seats,
                        RemEconomy: (this.props.details.ReturnFlight.RemEconomy - (this.state.maxSeats)),

                    }


                    break;
                case "Business":
                    console.log("in business")
                    body1 = {
                        BusinessSeatsArray: this.state.seats,
                        RemBusiness: (this.props.details.ReturnFlight.RemBusiness - (this.state.maxSeats)),

                    }

                    break;
                case "First Class":
                    body1 = {
                        FirstSeatsArray: this.state.seats,
                        RemFirst: (this.props.details.ReturnFlight.RemFirst - (this.state.maxSeats)),

                    }

                    break;
                default:
                // code block
            }
            axios
                .patch(url2, body1)
                .then(res => {
                    this.props.setTakenSeatsReturn(this.state.returnSeats)
                    this.props.history.push('/FullSummaryPage');
                    alert("Trip Reserved Successfully!")

                    // this.props.history.push(`/Seats/1`);
                })
                .catch(error => {
                    alert("Please pick your seat(s)!")
                    console.log("idiot!");
                    console.log(error.message);
                })



        }

    };

    render() {

        return (
                <div style={{ backgroundImage: `url(${ResultBack})`, minHeight: "100vh", justifyContent: "center", display: "flex", width: "100%", overflowX: "hidden", backgroundSize: "cover" }}>
                {/* <Header /> */}
            <div >
                    <div style={{ paddingTop: "130px" }}>
                        <Grid container spacing={0}>
                            <Grid item xs={9}>
                                <Card className="paper" sx={{ minWidth: 275 }}>
                                    <Typography style={{ marginTop: "10px", fontSize: "18" }} variant="h5" component="h2">
                                        Please pick your desired seats from your {flightType} flight
                                    </Typography>

                                    <hr />

                                    <Typography style={{ marginTop: "10px", fontSize: "12" }} variant="h6" component="h2">
                                        {this.props.details.cabin_class + " class"}
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