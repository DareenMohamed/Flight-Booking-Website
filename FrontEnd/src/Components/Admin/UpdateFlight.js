import axios from 'axios';
import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Header from './Header'
import Button from "react-bootstrap/Button";

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import ResultTest from "../../images/ResultTest.png";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import FlightTakeoffIcon from '@mui/icons-material/Settings';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as airports from "airportsjs";
import InputAdornment from '@material-ui/core/InputAdornment';
import CancelCreateFlight from './CancelForm';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        details: state.DetailsReducer.details,


    };
};

function UpateFlight(prop) {
    const flight = prop.match.params
    const [open, setOpen] = React.useState(false);
    const [fail, setFail] = React.useState(false);

    let history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        let url = `http://localhost:8080/flight/${flight.id}`;
        let body = {
            'From': { From },
            'To': { To },
            "DepartureDate": { DepartureDate },
            "ArrivalDate": { ArrivalDate },
            "FirstSeats": { FirstSeats },
            "BusinessSeats": { BusinessSeats },
            "EconomySeats": { EconomySeats },
            "ArrivalTime": { ArrivalTime },
            "DepartureTime": { DepartureTime },
            "FlightNumber": { FlightNo },
            "EconomyPrice": { EconomyPrice },
            "BusinessPrice": { BusinessPrice },
            "FirstPrice": { FirstPrice },

            "EconomyBags": { EconomyBags },
            "BusinessBags": { BusinessBags },
            "FirstBags": { FirstBags },
        }

        if (prop.details.UserID === "") {
            alert("You need to login as an admin to get access!!")
            history.push("/userlogin2");
        }
        else {
            axios.patch(url, body,
                {
                    headers: {
                        "x-access-token": prop.details.token
                    }
                })
                .then(async (response) => {
                    const result = response.data;
                    if (result.isLoggedIn !== false) {
                        setStep(2);
                    }
                    else {
                        alert("You need to login as an admin to get access!!")
                        history.push("/userlogin2");
                    }
                })
                .catch((e) => {
                    setFail(true);
                    console.log("error ===>", e);
                });
            // window.location.reload(false);
        }
    };

    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")
    const [DepartureDate, setDepartureDate] = useState("")
    const [ArrivalDate, setArrivalDate] = useState("")
    const [FirstSeats, setFirstSeats] = useState(null)
    const [BusinessSeats, setBusinessSeats] = useState(null)
    const [EconomySeats, setEconomySeats] = useState(null)

    const [FirstPrice, setFirstPrice] = useState(0)
    const [BusinessPrice, setBusinessPrice] = useState(0)
    const [EconomyPrice, setEconomyPrice] = useState(0)

    const [FirstBags, setFirstBags] = useState(null)
    const [BusinessBags, setBusinessBags] = useState(null)
    const [EconomyBags, setEconomyBags] = useState(null)

    const [ArrivalTime, setArrivalTime] = useState("")
    const [DepartureTime, setDepartureTime] = useState("")
    const [FlightNo, setFlightNo] = useState("")

    const [step, setStep] = useState(0)
    const [wordEntered, setWordEntered] = useState("")
    const [wordEntered2, setWordEntered2] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [filteredData2, setFilteredData2] = useState([])

    let steps = ['', ''];



    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord)
        const newFilter = airports.searchByAirportName(searchWord)
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const handleFilter2 = (event) => {
        const searchWord = event.target.value;
        setWordEntered2(searchWord)
        const newFilter = airports.searchByAirportName(searchWord)
        if (searchWord === "") {
            setFilteredData2([]);
        } else {
            setFilteredData2(newFilter);
        }
    };

    const clicked = (value, e) => {
        setWordEntered(value.name);
        setFilteredData([]);
        setFrom(value.iata);
    };

    const clickedTo = (value, e) => {
        setWordEntered2(value.name);
        setFilteredData2([]);
        setTo(value.iata);
    };

    const nextStep = () => {
        setStep(step => step + 1)
    };

    const prevStep = () => {
        console.log("PREVIOUS STEP")
        console.log(step)
        setStep(x => x - 1)
        console.log(step)

    };


    useEffect(() => {

        if (prop.details.UserID === "") {
            alert("You need to login as an admin to get access!!")
            history.push("/userlogin2");
        }
        else {
            axios.get('http://localhost:8080/flightById/' + flight.id,
                {
                    headers: {
                        "x-access-token": prop.details.token
                    }
                }).then(
                    res => {
                        const result = res.data;
                        if (result.isLoggedIn !== false) {
                            const data = res.data;
                            setWordEntered(data.From);
                            setWordEntered2(data.To);
                            setFrom(data.From);
                            setTo(data.To);
                            setArrivalDate(data.ArrivalDate.substring(0, 10));
                            setArrivalTime(data.ArrivalTime);
                            setDepartureDate(data.DepartureDate.substring(0, 10));
                            setDepartureTime(data.DepartureTime);
                            setBusinessSeats(data.BusinessSeats);
                            setBusinessBags(data.BusinessBags);
                            setEconomySeats(data.EconomySeats);
                            setEconomyBags(data.EconomyBags);
                            setFirstSeats(data.FirstSeats);
                            setFirstBags(data.FirstBags);
                            setFlightNo(data.FlightNumber);
                            setBusinessPrice(parseInt(data.PriceBusiness.$numberDecimal));
                            setEconomyPrice(parseInt(data.PriceEconomy.$numberDecimal));
                            setFirstPrice(parseInt(data.PriceFirst.$numberDecimal));

                            console.log(data)
                        } else {
                            alert("You need to login as an admin to get access!!")
                            history.push("/userlogin2");
                        }
                    }
                ).catch(err => { console.log(err) })


        }
    }
        , []);




    return (

        <div style={{ backgroundImage: `url(${ResultTest})`, minHeight: "950px", backgroundSize: "cover", backgroundRepeat: "repeat-y" }}>
            <Header />
            <div >
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert sx={{ mb: 2 }}>
                            Flight Edited!
                        </Alert>
                    </Collapse>

                </Box>

                <form id='createFlightForm2' class="row g-3" noValidate onSubmit={onSubmit}>
                    {step < 2 &&
                        <CancelCreateFlight />
                    }
                    <h3 style={{ marginTop: "-6%" }}>Edit Flight <FlightTakeoffIcon /></h3>
                    <Stepper activeStep={step}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {step === 2 ?
                        (
                            <div>
                                <React.Fragment>

                                    <h4 sx={{ mt: 3, mb: 2, fontWeight: "bolder" }}>
                                        Flight Added Successfully!
                                    </h4>

                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button variant="primary" style={{ marginRight: "4.5%" }}
                                            onClick={() => {
                                                history.push("/AllFlights");
                                            }}
                                        >View All Flights&nbsp; </Button>

                                    </Box>
                                </React.Fragment>
                            </div>


                        ) : (
                            <div>

                                {step === 0 ?



                                    <div>
                                        <div className=" row">
                                            <div className='form-group mb-4' >
                                                <FloatingLabel label="Flight Number">
                                                    <input
                                                        type='text'
                                                        class="form-control flex-fill"
                                                        name='FlightNumber'
                                                        value={FlightNo}
                                                        onChange={(e) => { setFlightNo(e.target.value.toLowerCase()) }}
                                                    />
                                                </FloatingLabel>
                                            </div>
                                        </div>
                                        <bl />

                                        <div className="row">
                                            <div className="col-md-6 col-12 mb-4 form-group">

                                                <FloatingLabel label="From" >
                                                    <input
                                                        class="form-control flex-fill"
                                                        id="filled-basic"
                                                        name='From'
                                                        value={wordEntered}
                                                        onChange={(event) => { handleFilter(event) }}
                                                        type="search"
                                                        variant="filled"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                        }} />
                                                    {filteredData.length !== 0 && (
                                                        <div style={{
                                                            position: "absolute",
                                                            left: "0px",
                                                            top: "58px",
                                                            zIndex: "1",
                                                            backgroundColor: "#FFFFFF",
                                                            border: "0.8px groove #F0F0F0",
                                                            paddingTop: "15px"
                                                        }}
                                                        >
                                                            {filteredData.slice(0, 15).map((value, key) => {
                                                                return (<a onClick={(e) => clicked(value, e)} target="_blank"
                                                                    onMouseOver={(e) => e.target.style.background = "#F0F0F0"}
                                                                    onMouseOut={(e) => e.target.style.background = "#FFFFFF"}
                                                                >
                                                                    <p>{value.name} </p>
                                                                </a>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                </FloatingLabel>
                                            </div>


                                            <div className="col-md-6 col-12 mb-4 form-group form-inline">
                                                {/* <div class="col-md-6" className='form-group form-inline'>*/}
                                                <FloatingLabel label="To" >
                                                    <input
                                                        class="form-control flex-fill"
                                                        id="filled-basic"
                                                        name='To'
                                                        value={wordEntered2}
                                                        onChange={(event) => { handleFilter2(event) }}
                                                        type="search"
                                                        variant="filled"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                        }} />
                                                    {filteredData2.length !== 0 && (
                                                        <div style={{
                                                            position: "absolute",
                                                            left: "0px",
                                                            top: "58px",
                                                            zIndex: "1",
                                                            backgroundColor: "#FFFFFF",
                                                            border: "0.8px groove #F0F0F0",
                                                            paddingTop: "15px"
                                                        }}
                                                        >
                                                            {filteredData2.slice(0, 15).map((value, key) => {
                                                                return (<a onClick={(e) => clickedTo(value, e)} target="_blank"
                                                                    onMouseOver={(e) => e.target.style.background = "#F0F0F0"}
                                                                    onMouseOut={(e) => e.target.style.background = "#FFFFFF"}
                                                                >
                                                                    <p>{value.name} </p>
                                                                </a>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </FloatingLabel>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                                                <FloatingLabel label="Departure Date" >
                                                    <input
                                                        onKeyDown={(e) => e.preventDefault()}
                                                        type='date'
                                                        //                                                        min={DateString}
                                                        // min = "2021-11-07"
                                                        class="form-control flex-fill"
                                                        placeholder={DepartureDate}
                                                        name='DepartureDate'
                                                        //  className='form-control'
                                                        value={DepartureDate}
                                                        onChange={(e) => { setDepartureDate(e.target.value) }}
                                                    />
                                                </FloatingLabel>
                                            </div>

                                            <div className="col-md-6 col-12 mb-4 form-group form-inline">

                                                {/*<div class="col-md-6" className='form-group form-inline'>*/}
                                                <FloatingLabel label="Arrival Date" >
                                                    <input
                                                        onKeyDown={(e) => e.preventDefault()}
                                                        type='date'
                                                        // min = {new Date(this.state.DepartureDate).getDate()-1 }
                                                        min={DepartureDate}
                                                        class="form-control flex-fill"
                                                        placeholder={ArrivalDate}
                                                        name='ArrivalDate'
                                                        //  className='form-control'
                                                        value={ArrivalDate}
                                                        onChange={(e) => setArrivalDate(e.target.value.toLowerCase())}
                                                    />
                                                </FloatingLabel>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                                                <FloatingLabel label="Departure Time" >
                                                    <input
                                                        type='time'
                                                        class="form-control flex-fill"
                                                        placeholder='DepartureTime'
                                                        name='DepartureTime'
                                                        //  className='form-control'
                                                        value={DepartureTime}
                                                        onChange={(e) => setDepartureTime(e.target.value.toLowerCase())}
                                                    />
                                                </FloatingLabel>
                                            </div>



                                            <div className="col-md-6 col-12 mb-4 form-group form-inline">
                                                <FloatingLabel label="Arrival Time" >
                                                    <input
                                                        type='time'
                                                        class="form-control flex-fill"
                                                        placeholder='ArrivalTime'
                                                        name='ArrivalTime'
                                                        //  className='form-control'
                                                        value={ArrivalTime}
                                                        onChange={(e) => setArrivalTime(e.target.value.toLowerCase())}
                                                    />
                                                </FloatingLabel>
                                            </div>
                                        </div>

                                        <Button variant="primary"
                                            onClick={e => nextStep()}
                                            style={{ marginLeft: "82.5%", marginBottom: "15px" }}
                                        >
                                            Continue
                                        </Button>
                                    </div>

                                    :











                                    <div>

                                        <h6>Economy Class</h6>
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Seats Available" >
                                                    <input
                                                        type='number'
                                                        class="form-control flex-fill"
                                                        name='EconomySeats'
                                                        min='0'
                                                        //  className='form-control'
                                                        value={EconomySeats}
                                                        onChange={(e) => {
                                                            if (e.target.value > 54) {
                                                                setEconomySeats('54')
                                                            }
                                                            else {
                                                                if (e.target.value < 0) {
                                                                    setEconomySeats('0')
                                                                }
                                                                else {
                                                                    setEconomySeats(e.target.value)
                                                                }
                                                            }
                                                        }}
                                                    />                        </FloatingLabel>

                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Price" >

                                                    <input
                                                        type='number'
                                                        class="form-control flex-fill"
                                                        name='EconomyPrice'
                                                        min='0'
                                                        //  className='form-control'
                                                        value={EconomyPrice}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setEconomyPrice('0')
                                                            }
                                                            else {
                                                                setEconomyPrice(e.target.value)
                                                            }
                                                        }}
                                                    />
                                                </FloatingLabel>

                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Baggage" >

                                                    <input
                                                        type='number'
                                                        class="form-control flex-fill"
                                                        name='EconomyBags'
                                                        min='0'
                                                        //  className='form-control'
                                                        value={EconomyBags}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setEconomyBags('0')
                                                            }
                                                            else {
                                                                setEconomyBags(e.target.value)
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>


                                        </div>

                                        <hr />
                                        <h6>Business Class</h6>
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Seats Available" >
                                                    <input
                                                        type='number'
                                                        min='0'
                                                        class="form-control flex-fill"
                                                        name='BusinessSeats'
                                                        //  className='form-control'
                                                        value={BusinessSeats}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setBusinessSeats('0')
                                                            }
                                                            else {
                                                                if (e.target.value > 36) {
                                                                    setBusinessSeats('36')
                                                                }
                                                                else {
                                                                    setBusinessSeats(e.target.value)
                                                                }
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Price" >
                                                    <input
                                                        type='number'
                                                        min='0'
                                                        class="form-control flex-fill"
                                                        name='BusinessPrice'
                                                        //  className='form-control'
                                                        value={BusinessPrice}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setBusinessPrice(0)
                                                            }
                                                            else {
                                                                setBusinessPrice(e.target.value)
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Baggage" >
                                                    <input
                                                        type='number'
                                                        class="form-control flex-fill"
                                                        name='BusinessBags'
                                                        min='0'
                                                        //  className='form-control'
                                                        value={BusinessBags}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setBusinessBags('0')
                                                            }
                                                            else {
                                                                setBusinessBags(e.target.value)
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>
                                        </div>
                                        <hr />
                                        <h6>First Class</h6>
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Seats Available" >
                                                    <input
                                                        type='number'
                                                        min='0'
                                                        class="form-control flex-fill"
                                                        name='FirstSeats'
                                                        //  className='form-control'
                                                        value={FirstSeats}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setFirstSeats('0')
                                                            }
                                                            else {
                                                                if (e.target.value > 12) {
                                                                    setFirstSeats('12')
                                                                }
                                                                else {
                                                                    setFirstSeats(e.target.value)
                                                                }
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Price" >
                                                    <input
                                                        type='number'
                                                        min='0'
                                                        class="form-control flex-fill"
                                                        name='FirstPrice'
                                                        //  className='form-control'
                                                        value={FirstPrice}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setFirstPrice('0')
                                                            }
                                                            else {
                                                                setFirstPrice(e.target.value)
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <FloatingLabel label="Bagagge">

                                                    <input
                                                        type='number'
                                                        class="form-control flex-fill"
                                                        name='FirstBags'
                                                        min='0'
                                                        //  className='form-control'
                                                        value={FirstBags}
                                                        onChange={(e) => {
                                                            if (e.target.value < 0) {
                                                                setFirstBags('0')
                                                            }
                                                            else {
                                                                setFirstBags(e.target.value)
                                                            }
                                                        }} />
                                                </FloatingLabel>
                                            </div>
                                        </div>

                                        <Button variant="primary" onClick={e => prevStep()} >
                                            Previous
                                        </Button>

                                        <Button variant="primary"
                                            type="submit"
                                            style={{ marginLeft: "84.5%", marginBottom: "15px", marginTop: "-38px" }}>
                                            Submit
                                        </Button>
                                        <hl />



                                    </div>

                                }
                            </div>
                        )}






























































                    {/*
                
                <div class="col-md-6" className='form-group'>
                <label class="form-label">From</label>
                <input
                type='text'
                class="form-control flex-fill"
                placeholder='From'
                name='From'
                //className='form-control'
                value={From}
                onChange={event => { setFrom(event.target.value.toUpperCase()) }}
                />
                
                </div>
                
                
                <div class="col-md-6" className='form-group form-inline'>
                <label class="form-label">To</label>
                <input
                type='text'
                        class="form-control flex-fill"
                        placeholder='To'
                        name='To'
                        // className='form-control'
                        value={To}
                        onChange={event => { setTo(event.target.value.toUpperCase()) }}
                        />
                        </div>
                        
                        
                        <div class="col-md-6" className='form-group form-inline'>
                        <label class="form-label">Departure Date</label>
                        <input
                        onKeyDown={(e) => e.preventDefault()}
                        type='date'
                        class="form-control flex-fill"
                        placeholder='DepartureDate'
                        name='DepartureDate'
                        //  className='form-control'
                        value={DepartureDate}
                        onChange={event => { setDepartureDate(event.target.value.toLowerCase()) }}
                        />
                        </div>
                        
                        
                        <div class="col-md-6" className='form-group form-inline'>
                        <label class="form-label">Departure Time</label>
                        <input
                        type='time'
                        class="form-control flex-fill"
                        placeholder='DepartureTime'
                        name='DepartureTime'
                        //  className='form-control'
                        value={DepartureTime}
                        onChange={event => { setDepartureTime(event.target.value.toLowerCase()) }}
                        />
                        </div>
                        
                        
                        
                        <div class="col-md-6" className='form-group form-inline'>
                        <label class="form-label">Arrival Date</label>
                        <input
                        onKeyDown={(e) => e.preventDefault()}
                        type='date'
                        class="form-control flex-fill"
                        placeholder='ArrivalDate'
                        name='ArrivalDate'
                        //  className='form-control'
                        value={ArrivalDate}
                        onChange={event => { setArrivalDate(event.target.value.toLowerCase()) }}
                        />
                        </div>
                        <div class="col-md-4" className='form-group form-inline'>
                        <label class="form-label">Arrival Time</label>
                        <input
                        type='time'
                        class="form-control flex-fill"
                        placeholder='ArrivalTime'
                        name='ArrivalTime'
                        //  className='form-control'
                        value={ArrivalTime}
                        onChange={event => { setArrivalTime(event.target.value.toLowerCase()) }}
                    />
                    </div>
                    
                    <div className='form-labelGroup' >
                    <label class="form-labelLeft">Economy</label>
                    <label class="form-labelCenter">Price</label>
                    <label class="form-labelRight">Bags</label>
                    </div>
                    
                    <div class="col-md-4" className='form-group2 form-inline'>
                    
                    <input
                    type='number'
                    min='0'
                    class="form-control flex-fill"
                    placeholder='Seats Available'
                    name='EconomySeats'
                    //  className='form-control'
                    value={EconomySeats}
                    onChange={event => { setEconomySeats(event.target.value.toLowerCase()) }}
                    />
                    <input
                    type='number'
                    min='0'
                    class="form-control flex-fill"
                    placeholder='Price Per Seat'
                    name='EconomyPrice'
                    //  className='form-control'
                    value={EconomyPrice}
                    onChange={event => { setEconomyPrice(event.target.value.toLowerCase()) }}
                    />
                    <input
                    type='number'
                    min='0'
                    class="form-control flex-fill"
                    placeholder='Bags Allowed'
                    name='EconomyBags'
                    //  className='form-control'
                    value={EconomyBags}
                    onChange={event => { setEconomyBags(event.target.value.toLowerCase()) }}
                    />
                    </div>
                    
                    <div className='form-labelGroup' >
                    <label class="form-labelLeft">Business</label>
                    <label class="form-labelCenter">Price</label>
                    <label class="form-labelRight">Bags</label>
                    </div>
                    <div class="col-md-4" className='form-group2 form-inline'>
                    
                    <input
                    type='number'
                    min='0'
                    class="form-control flex-fill"
                    placeholder='Seats Available'
                    name='BusinessSeats'
                    //  className='form-control'
                    value={BusinessSeats}
                    onChange={event => { setBusinessSeats(event.target.value.toLowerCase()) }}
                    />
                    <input
                    type='number'
                    min='0'
                    class="form-control flex-fill"
                    placeholder='Price Per Seat'
                    name='BusinessPrice'
                            //  className='form-control'
                            value={BusinessPrice}
                            onChange={event => { setBusinessPrice(event.target.value.toLowerCase()) }}
                            />
                            <input
                            type='number'
                            min='0'
                            class="form-control flex-fill"
                            placeholder='Bags Allowed'
                            name='BusinessBags'
                            //  className='form-control'
                            value={BusinessBags}
                            onChange={event => { setBusinessBags(event.target.value.toLowerCase()) }}
                            />
                            </div>
                            
                            <div className='form-labelGroup' >
                            <label class="form-labelLeft">First Class</label>
                            <label class="form-labelCenter">Price</label>
                            <label class="form-labelRight">Bags</label>
                            </div>
                            <div className='form-group2 form-inline'>
                            
                        <input
                        type='number'
                        min='0'
                        class="form-control flex-fill"
                        placeholder='Seats Available'
                        name='FirstSeats'
                        //  className='form-control'
                        value={FirstSeats}
                        onChange={event => { setFirstSeats(event.target.value.toLowerCase()) }}
                        />
                        <input
                        type='number'
                        min='0'
                        class="form-control flex-fill"
                        placeholder='Price Per Seat'
                        name='FirstPrice'
                        //  className='form-control'
                        value={FirstPrice}
                        onChange={event => { setFirstPrice(event.target.value.toLowerCase()) }}
                        />
                        <input
                        type='number'
                        min='0'
                        class="form-control flex-fill"
                        placeholder='Bags Allowed'
                        name='FirstBags'
                        //  className='form-control'
                        value={FirstBags}
                        onChange={event => { setFirstBags(event.target.value.toLowerCase()) }}
                        />
                        </div>
                        
                        
                        <div class="form-group form-inline" className='form-group'>
                        <label class="form-label">Flight Number</label>
                        <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder='Flight Number'
                        name='FlightNumber'
                        //  className='form-control'
                        value={FlightNo}
                        onChange={event => { setFlightNo(event.target.value.toLowerCase()) }}
                        />
                        </div>
                        
                        
                        <input
                        class="btn btn-primary"
                        type="submit"
                        // className="btn btn-outline-warning btn-block mt-4"
                        />
                        
                        
                    */}

                    <Box sx={{ width: '100%' }}>
                        <Collapse in={fail}>
                            <Alert severity="error"
                                sx={{ mb: 2 }}
                            >
                                Please Enter All Details Correctly!
                            </Alert>
                        </Collapse>

                    </Box>



                </form>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(UpateFlight);
