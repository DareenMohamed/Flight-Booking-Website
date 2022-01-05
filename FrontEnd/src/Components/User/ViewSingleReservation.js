import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllReservations.css'
import Header from '../Admin/Header'
import Accordion from 'react-bootstrap/Accordion'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteButton from './DeleteButton'
import ViewAllReservationsHook from './ViewAllReservationsHook';
import ViewAllReservations from './ViewAllReservations';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        details: state.DetailsReducer.details,
    };
};

//BACKEND DEPENDENT COMMENTED => BACKEND


class ViewSingleReservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservation: props.reservation,
            userName : props.userName,
            departureFlight: [],
            returnFlight: [],
            flightType: 0,
        };
console.log(props.details.token);
console.log(props.details.UserID);

    }

    componentDidMount() {
        if (this.props.details.UserID === "") {
            alert("You need to login to view your reservations!")
            this.props.history.push("/Userlogin2");
        }
        else {
            axios.get('http://localhost:8080/flightByIdUser/' + this.props.reservation.DepartureFlightID ,
            {
                headers: {
                  "x-access-token" : this.props.details.token
                }
            }).then(
                Result => {
                    console.log(Result)
                    const res =  Result.data;
                    if (res.isLoggedIn !== false) {
                        this.setState({ departureFlight: [...this.state.departureFlight, Result.data] })
                    } else {
                        alert("You need to login to view your reservations!")
                        this.props.history.push("/Userlogin2");
                    }
                }
            ).catch(err => { console.log(err) })
        }

        if (this.props.details.UserID === "") {
            alert("You need to login to view your reservations!")
            this.props.history.push("/Userlogin2");
        }
        else {
            axios.get('http://localhost:8080/flightByIdUser/' + this.props.reservation.ReturnFlightID ,
            {
                headers: {
                  "x-access-token" : this.props.details.token
                }
            }).then(
                Result => {
                    const res =  Result.data;
                    if(res.isLoggedIn !== false){

                    this.setState({ returnFlight: [...this.state.returnFlight, Result.data] })
                }else{
                    alert("You need to login as an admin to get access!!")
                    this.props.history.push("/Userlogin2");
                }
            }
            ).catch(err => { console.log(err) })
        }
    };


    handleChange = (event, newValue) => {
        this.state.flightType = newValue;
        //setFlightType(newValue);
    };



    //<ViewAllReservationsHook reservation={r} key={r._id} />
    /*
       
      */
    render() {

        return (
            <div>


                <ViewAllReservationsHook reservation={this.state.reservation} departureFlight={this.state.departureFlight}
                    returnFlight={this.state.returnFlight} userName={this.state.userName} />

            </div>
        );
    }
}
export default connect(mapStateToProps)(ViewSingleReservation);









/*



















<Accordion className="accordion" >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="accordionHeader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                &nbsp;
                                CAI
                                &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                                </svg>
                                &nbsp;
                                DXB
                            </div>
                            <div className="accordionHeader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                </svg>&nbsp;Business
                            </div>
                            <div className="accordionHeader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                                    <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                                </svg>&nbsp; $
                            </div>
                            <div className="accordionHeader">
                                5&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                            </div>
                        </Accordion.Header>


                        <Accordion.Body>
                            <Tabs class="tabs" value={this.state.flightType} onChange={this.handleChange} centered>
                                <Tab label="Departure Flight" />
                                <Tab label="Return Flight" />
                            </Tabs>
                            {this.state.flightType ? (
                                <div>return</div>
                            ) : (
                                <div>
                                    <div className="container rounded">
                                        <form action="">

                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            Flight Code</p>
                                                        <div>12XY78H9</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map-fill" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                                                                <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                                                            </svg>&nbsp;
                                                            Departing From</p>
                                                        <div>CAI</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map-fill" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                                                                <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                                                            </svg>&nbsp;
                                                            Arriving to</p>
                                                        <div>DXB</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                                                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                            </svg>&nbsp;
                                                            Departure Date</p>
                                                        <div>02/2/2222</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-event" viewBox="0 0 16 16">
                                                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                            </svg>&nbsp;
                                                            Arrival Date</p>
                                                        <div>03/3/3333</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                                            </svg>&nbsp;
                                                            Departure Time</p>
                                                        <div>02:22</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                                            </svg>&nbsp;
                                                            Arrival Time</p>
                                                        <div>03:33</div>
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
                                                            <div>1.25 hours</div>
                                                        </div>
                                                </div>
                                                <div className="col-md-6 col-12 mb-4">
                                                    <div className="form-control d-flex flex-column">
                                                        <p className="h-blue">Seats</p>
                                                        <div>1A 2A 3A 4A 5A 6A 7A</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <DeleteButton reservation = "61a1105c3670d169a447db69" />

                                        </form>
                                    </div>

                                </div>
                            )}

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
















*/