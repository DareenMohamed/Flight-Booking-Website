import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header"
import { useAlert } from 'react-alert'
import OurAlert from "./OurAlert"
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import ResultTest from "../../images/ResultTest.png";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as airports from "airportsjs";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseButton from 'react-bootstrap/CloseButton'
import CancelCreateFlight from "./CancelForm";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    console.log(state.DetailsReducer.details)
    return {
        details: state.DetailsReducer.details,


    };
};




// number of Economy seats, number of Business class seats,
class CreateFlight extends Component {

    // let current = new Date();
    // let date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    constructor(props) {
        var today = new Date(),
            date = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2)
        super(props);
        this.state = {
            From: '',
            To: '',
            DepartureDate: '',
            ArrivalDate: '',
            EconomySeats: '',
            BusinessSeats: '',
            FirstSeats: '',
            DepartureTime: '',
            ArrivalTime: '',
            FlightNumber: '',
            CurrentDate: new Date(),
            DateString: date,
            CurrentDeparture: '',
            EconomyPrice: '',
            BusinessPrice: '',
            FirstPrice: '',
            EconomyBags: '',
            BusinessBags: '',
            FirstBags: '',
            open: false,
            fail: false,
            step: 0,
            filteredData: [],
            wordEntered: '',
            filteredData2: [],
            wordEntered2: '',
            // flag : false,

        };
        console.log(this.props.details.UserID);

    }
    steps = ['', ''];




    componentDidMount() {
        if (this.props.details.UserID != "" && this.props.details.UserID != null) {
            let url =
                axios
                    .get('http://localhost:8080/CheckAdmin',
                        {
                            headers: {
                                "x-access-token": this.props.details.token
                            }
                        })
                    .then(res => {
                        const result = res.data;
                        if (result.isLoggedIn !== false) {
                        }
                        else {
                            alert("You need to login as an admin to get access!!")
                            this.props.history.push("/Userlogin2");
                        }
                    })
                    .catch(err => {
                        console.log('Error');
                    })
        }
        else {
            alert("You need to login as an admin to get access!!")
            this.props.history.push("/Userlogin2");
        }
    };






    handleFilter = (event) => {
        const searchWord = event.target.value;
        this.setState({ wordEntered: searchWord })
        const newFilter = airports.searchByAirportName(searchWord)
        if (searchWord === "") {
            this.setState({ filteredData: [] })
        } else {
            this.setState({ filteredData: newFilter })
        }
    };

    handleFilter2 = (event) => {
        const searchWord = event.target.value;
        this.setState({ wordEntered2: searchWord })
        const newFilter = airports.searchByAirportName(searchWord)
        if (searchWord === "") {
            this.setState({ filteredData2: [] })
        } else {
            this.setState({ filteredData2: newFilter })
        }
    };

    clicked = (value, e) => {
        this.setState({ wordEntered: value.name })
        this.setState({ filteredData: [] })
        this.setState({ From: value.iata })
    };

    clickedTo = (value, e) => {
        this.setState({ wordEntered2: value.name })
        this.setState({ filteredData2: [] })
        this.setState({ To: value.iata })
    };


    nextStep = () => {
        this.setState({ step: this.state.step + 1 })

    };

    prevStep = () => {
        this.setState({ step: this.state.step - 1 })
    };

    onChange2 = e => {
        if (e.target.name === "EconomySeats") {
            if (e.target.value > 54) {
                this.setState({ [e.target.name]: '54' })
            }
            else {
                if (e.target.value < 0) {
                    this.setState({ [e.target.name]: '0' })
                }
                else {
                    this.setState({ [e.target.name]: e.target.value })
                }
            }
        }
        else {
            if (e.target.name === "BusinessSeats") {
                if (e.target.value > 36) {
                    this.setState({ [e.target.name]: '36' })
                }
                else {
                    if (e.target.value < 0) {
                        this.setState({ [e.target.name]: '0' })
                    }
                    else {
                        this.setState({ [e.target.name]: e.target.value })
                    }
                }
            }
            else {
                if (e.target.name === "FirstSeats") {
                    if (e.target.value > 12) {
                        this.setState({ [e.target.name]: '12' })
                    }
                    else {
                        if (e.target.value < 0) {
                            this.setState({ [e.target.name]: '0' })
                        }
                        else {
                            this.setState({ [e.target.name]: e.target.value })
                        }
                    }
                }
                else {
                    if (e.target.value < 0) {
                        this.setState({ [e.target.name]: '0' })
                    }
                    else {
                        this.setState({ [e.target.name]: e.target.value })
                    }
                }
            }
        }
    };
    onChange = e => {

        this.setState({
            [e.target.name]: e.target.value
        }, () => { });
        //this.state.From=e.target.value
    };

    clearForm = () => {
        this.setState({
            From: '',
            To: '',
            DepartureDate: '',
            ArrivalDate: '',
            EconomySeats: '',
            BusinessSeats: '',
            FirstSeats: '',
            DepartureTime: '',
            ArrivalTime: '',
            FlightNumber: '',
            EconomyPrice: '',
            BusinessPrice: '',
            FirstPrice: '',
            EconomyBags: '',
            BusinessBags: '',
            FirstBags: '',
            step: 0,
            open: true,
            fail: false,
            filteredData: [],
            wordEntered: '',
            filteredData2: [],
            wordEntered2: '',
        })


    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            From: this.state.From.toUpperCase(),
            To: this.state.To.toUpperCase(),
            DepartureDate: this.state.DepartureDate,
            ArrivalDate: this.state.ArrivalDate,
            EconomySeats: this.state.EconomySeats,
            BusinessSeats: this.state.BusinessSeats,
            FirstSeats: this.state.FirstSeats,
            DepartureTime: this.state.DepartureTime,
            ArrivalTime: this.state.ArrivalTime,
            FlightNumber: this.state.FlightNumber,
            EconomyPrice: this.state.EconomyPrice,
            BusinessPrice: this.state.BusinessPrice,
            FirstPrice: this.state.FirstPrice,

            EconomyBags: this.state.EconomyBags,
            BusinessBags: this.state.BusinessBags,
            FirstBags: this.state.FirstBags,


        };
        let url = "http://localhost:8080/createFlight"
        if (this.props.details.UserID != "" && this.props.details.UserID != null) {
            axios
                .post(url, data,
                    {
                        headers: {
                            "x-access-token": this.props.details.token
                        }
                    })
                .then(res => {
                    const result = res.data;
                    if (result.isLoggedIn !== false) {
                        this.setState({
                            From: '',
                            To: '',
                            DepartureDate: '',
                            ArrivalDate: '',
                            EconomySeats: '',
                            BusinessSeats: '',
                            FirstSeats: '',
                            DepartureTime: '',
                            ArrivalTime: '',
                            FlightNumber: '',
                            EconomyPrice: '',
                            BusinessPrice: '',
                            FirstPrice: '',
                            EconomyBags: '',
                            BusinessBags: '',
                            FirstBags: '',
                            step: 2,
                            open: false,
                            fail: false,
                            filteredData: [],
                            wordEntered: '',
                            filteredData2: [],
                            wordEntered2: '',
                        },
                            console.log(res))
                    } else {
                        alert("You need to login as an admin to get access!!")
                        this.props.history.push("/Userlogin2");
                    }
                })

                //this.props.history.push('/');

                .catch(error => {
                    this.setState({ fail: true })
                    console.log(error.message);
                })
        } else {
            alert("You need to login as an admin to get access!!")
            this.props.history.push("/Userlogin2");
        }
    };


    render() {
        return (
            <div style={{ backgroundImage: `url(${ResultTest})`, minHeight: "820px", backgroundSize: "cover", backgroundRepeat: "repeat-y" }}>
                <Header />
                <div >
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={this.state.open}>
                            <Alert sx={{ mb: 2 }}>
                                Flight Added!
                            </Alert>
                        </Collapse>

                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Collapse in={this.state.fail}>
                            <Alert severity="error"
                                sx={{ mb: 2 }}
                            >
                                Please Enter All Details Correctly & Use a Unique Flight Number!
                            </Alert>
                        </Collapse>

                    </Box>


                    <form id='createFlightForm2' class="row g-3" noValidate onSubmit={this.onSubmit} >
                        {this.state.step < 2 ? (
                            <div>
                                <CancelCreateFlight />
                                <h3>Add Flight <FlightTakeoffIcon /></h3>
                            </div>

                        ) : (
                            <h3>Add Flight <FlightTakeoffIcon /></h3>
                        )
                        }

                        <Stepper activeStep={this.state.step}>
                            {this.steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {this.state.step === 2 ?
                            (
                                <div>
                                    <React.Fragment>

                                        <h4 sx={{ mt: 3, mb: 2, fontWeight: "bolder" }}>
                                            Flight Added Successfully!
                                        </h4>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button variant="primary" style={{ marginRight: "35%" }}
                                                onClick={() => {
                                                    this.clearForm();
                                                    this.props.history.push("/Create");
                                                }}
                                            >Add New Flight&nbsp; </Button>
                                            <Button variant="primary" style={{ marginRight: "4.5%" }}
                                                onClick={() => {
                                                    this.clearForm();
                                                    this.props.history.push("/AllFlights");
                                                }}
                                            >View All Flights&nbsp; </Button>

                                        </Box>
                                    </React.Fragment>
                                </div>


                            ) : (
                                <div>

                                    {this.state.step === 0 ?
                                        <div>
                                            <div className=" row">
                                                <div className='form-group mb-4' >
                                                    <FloatingLabel label="Flight Number">
                                                        <input
                                                            type='text'
                                                            class="form-control flex-fill"
                                                            name='FlightNumber'
                                                            value={this.state.FlightNumber}
                                                            onChange={this.onChange}
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
                                                            value={this.state.wordEntered}
                                                            onChange={(event) => { this.handleFilter(event) }}
                                                            type="search"
                                                            variant="filled"
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                            }} />
                                                        {this.state.filteredData.length !== 0 && (
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
                                                                {this.state.filteredData.slice(0, 15).map((value, key) => {
                                                                    return (<a onClick={(e) => this.clicked(value, e)} target="_blank"
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
                                                            value={this.state.wordEntered2}
                                                            onChange={(event) => { this.handleFilter2(event) }}
                                                            type="search"
                                                            variant="filled"
                                                            InputProps={{
                                                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                                                            }} />
                                                        {this.state.filteredData2.length !== 0 && (
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
                                                                {this.state.filteredData2.slice(0, 15).map((value, key) => {
                                                                    return (<a onClick={(e) => this.clickedTo(value, e)} target="_blank"
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
                                                            min={this.state.DateString}
                                                            // min = "2021-11-07"
                                                            class="form-control flex-fill"
                                                            placeholder='DepartureDate'
                                                            name='DepartureDate'
                                                            //  className='form-control'
                                                            value={this.state.DepartureDate}
                                                            onChange={this.onChange}
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
                                                            min={this.state.DepartureDate}
                                                            class="form-control flex-fill"
                                                            placeholder='ArrivalDate'
                                                            name='ArrivalDate'
                                                            //  className='form-control'
                                                            value={this.state.ArrivalDate}
                                                            onChange={this.onChange}
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
                                                            value={this.state.DepartureTime}
                                                            onChange={this.onChange}
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
                                                            value={this.state.ArrivalTime}
                                                            onChange={this.onChange}
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                            </div>

                                            <Button variant="primary"
                                                disabled={this.state.FlightNumber === "" ||
                                                    this.state.ArrivalDate === "" ||
                                                    this.state.DepartureDate === "" ||
                                                    this.state.From === "" ||
                                                    this.state.To === "" ||
                                                    this.state.ArrivalTime === "" ||
                                                    this.state.DepartureTime === ""}
                                                onClick={this.nextStep}
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
                                                            value={this.state.EconomySeats}
                                                            onChange={this.onChange2}
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
                                                            value={this.state.EconomyPrice}
                                                            onChange={this.onChange2}
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
                                                            value={this.state.EconomyBags}
                                                            onChange={this.onChange2}
                                                        />
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
                                                            value={this.state.BusinessSeats}
                                                            onChange={this.onChange2}
                                                        />
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
                                                            value={this.state.BusinessPrice}
                                                            onChange={this.onChange2}
                                                        />
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
                                                            value={this.state.BusinessBags}
                                                            onChange={this.onChange2}
                                                        />
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
                                                            value={this.state.FirstSeats}
                                                            onChange={this.onChange2}
                                                        />
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
                                                            value={this.state.FirstPrice}
                                                            onChange={this.onChange2}
                                                        />
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
                                                            value={this.state.FirstBags}
                                                            onChange={this.onChange2}
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                            </div>

                                            {/*   <input
                                    class="btn btn-primary"
                                    type="submit"
                                    />
                                */}
                                            <Button variant="primary" onClick={this.prevStep} >
                                                Previous
                                            </Button>

                                            <Button variant="primary"
                                                type="submit"
                                                style={{ marginLeft: "84.5%", marginBottom: "15px", marginTop: "-38px" }}
                                                disabled={
                                                    this.state.EconomyBags === "" ||
                                                    this.state.EconomyPrice === "" ||
                                                    this.state.EconomySeats === "" ||
                                                    this.state.BusinessBags === "" ||
                                                    this.state.BusinessPrice === "" ||
                                                    this.state.BusinessSeats === "" ||
                                                    this.state.FirstBags === "" ||
                                                    this.state.FirstPrice === "" ||
                                                    this.state.FirstSeats === ""
                                                }
                                            >
                                                Submit
                                            </Button>


                                            <hl />



                                        </div>

                                    }
                                </div>
                            )}

                        {/* <OurAlert flag={this.flag}></OurAlert> */}

                    </form>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CreateFlight);





/*
<Dialog
    open={this.state.open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">
        {"Flight Added Successfully!"}&nbsp;&nbsp;<FlightTakeoffIcon />&nbsp;
    </DialogTitle>

    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            <Alert action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={this.handleClose}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>}
                sx={{ mb: 2 }}
            ><AlertTitle> <strong>Flight Added Successfully!&nbsp;&nbsp;<FlightTakeoffIcon />&nbsp;</strong> </AlertTitle>
            </Alert>
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant="primary" style={{ marginRight: "82px" }}
            onClick={() => {
                this.clearForm();
                this.props.history.push("/AllFlights");
            }}>View All Flights
        </Button>
        <Button variant="primary" style={{}}
            onClick={() => {
                this.clearForm();
                this.props.history.push("/Create");
            }}
            autoFocus>
            + Flight</Button>
    </DialogActions>
</Dialog>
            */