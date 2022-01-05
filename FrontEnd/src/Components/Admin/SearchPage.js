
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { fabClasses } from '@mui/material';
import { height } from '@mui/system';
import { useState, useEffect } from "react";
import Header from './Header'
import axios from "axios";
import Button from '@mui/material/Button';
import { Link } from 'react-scroll'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
// import Flight from './Flight';
import './AllFlights.css'
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import FlightList from '../../Components/Admin/FlightList'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ManageSearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import ResultTest from "../../images/ResultTest.png";

const useStyles = makeStyles((theme) => ({
    root: {

        //display: "flex",
        flexDirection: "column"

    },
    paper: {
        marginRight: theme.spacing(2),
        width: "100%",

        height: "200px",
        overflow: "hidden",
        // overflowy: "auto",
        overflow: 'auto'
    },

    table: {
        marginTop: "60px",
        width: "80px"
    }

}));

const mapStateToProps = (state) => {
    return {
        details: state.DetailsReducer.details,


    };
};


function SearchPage(prop) {
    console.log("token : ", prop.details.token)
    console.log("id : ", prop.details.UserID)
    const classes = useStyles();
    const [From, setFrom] = useState("")
    const [To, setTo] = useState("")
    const [DepartureDate, setDepartureDate] = useState("")
    const [ArrivalDate, setArrivalDate] = useState("")
    const [FirstSeats, setFirstSeats] = useState(null)
    const [BusinessSeats, setBusinessSeats] = useState(null)
    const [EconomySeats, setEconomySeats] = useState(null)

    const [FirstPrice, setFirstPrice] = useState(null)
    const [BusinessPrice, setBusinessPrice] = useState(null)
    const [EconomyPrice, setEconomyPrice] = useState(null)

    const [FirstBags, setFirstBags] = useState(null)
    const [BusinessBags, setBusinessBags] = useState(null)
    const [EconomyBags, setEconomyBags] = useState(null)

    const [ArrivalTime, setArrivalTime] = useState("")
    const [DepartureTime, setDepartureTime] = useState("")
    const [FlightNo, setFlightNo] = useState("")
    const [result, setResult] = useState([])

    const [open, setOpen] = useState(false);
    const [openRes, setOpenRes] = useState(false);

    let history = useHistory();
    useEffect(() => {

        if (prop.details.UserID === "") {
            alert("You need to login as an admin to get access!!")
            history.push("/userlogin2");
        }
        else {
            axios.get('http://localhost:8080/CheckAdmin',
                {
                    headers: {
                        "x-access-token": prop.details.token
                    }
                }
            ).then(
                res => {
                    const result = res.data;
                    if (result.isLoggedIn !== false) {
                    }
                    else {
                        alert("You need to login as an admin to get access!!")
                        history.push("/userlogin2");
                    }
                })
                .catch(err => {
                    console.log('Error');
                })
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        setOpenRes(false);
    };

    const onSubmit = e => {
        e.preventDefault();

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

        console.log(body)
        let url = "http://localhost:8080/searchFlights"

        axios
            .post(url, body)
            .then(res => {
                setResult(res.data)
                console.log(res.data.length)
                if (res.data.length === 0) {
                    setOpen(true);
                }
                else {
                    setOpenRes(true);
                }
                window.scroll(0, 9950)
                //this.props.history.push('/');
            })
            .catch(error => {
                console.log("idiot!");
                console.log(error.message);
            })

        // window.scrollTo(0, document.body.scrollHeight);

    };

    const flights = result;
    return (

        <div style={{ backgroundImage: `url(${ResultTest})`, minHeight: "190vh", backgroundSize: "cover", backgroundRepeat: "repeat-y" }}>
            <Header />
            <div className={classes.table}>
                <form className={classes.table} id='createFlightForm2' class="row g-3" noValidate onSubmit={onSubmit}>
                    <h3>Search For Flights&nbsp;<ManageSearchIcon /></h3>

                    <div className=" row">
                        <div className='form-group mb-4' >                    <FloatingLabel label="Flight Number" >
                            <input
                                type='text'
                                class="form-control flex-fill"
                                name='FlightNumber'
                                //  className='form-control'
                                value={FlightNo}
                                onChange={event => { setFlightNo(event.target.value.toLowerCase()) }}
                            />
                        </FloatingLabel>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                            <FloatingLabel label="From" >
                                <input
                                    type='text'
                                    class="form-control flex-fill"
                                    name='From'
                                    //className='form-control'
                                    value={From}
                                    onChange={event => { setFrom(event.target.value.toUpperCase()) }}
                                />
                            </FloatingLabel>
                        </div>


                        <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                            <FloatingLabel label="To">

                                <input
                                    type='text'
                                    class="form-control flex-fill"
                                    name='To'
                                    // className='form-control'
                                    value={To}
                                    onChange={event => { setTo(event.target.value.toUpperCase()) }}
                                />
                            </FloatingLabel>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                            <FloatingLabel label="Departure Date">
                                <input
                                    type='date'
                                    class="form-control flex-fill"
                                    placeholder='DepartureDate'
                                    name='DepartureDate'
                                    //  className='form-control'
                                    value={DepartureDate}
                                    onChange={event => { setDepartureDate(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>


                        <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                            <FloatingLabel label="Departure Time">
                                <input
                                    type='time'
                                    class="form-control flex-fill"
                                    placeholder='DepartureTime'
                                    name='DepartureTime'
                                    //  className='form-control'
                                    value={DepartureTime}
                                    onChange={event => { setDepartureTime(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                            <FloatingLabel label="Arrival Date">
                                <input
                                    type='date'
                                    class="form-control flex-fill"
                                    placeholder='ArrivalDate'
                                    name='ArrivalDate'
                                    //  className='form-control'
                                    value={ArrivalDate}
                                    onChange={event => { setArrivalDate(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                        <div className="col-md-6 col-12 mb-4 form-group form-group form-inline">
                            <FloatingLabel label="Arrival Time">
                                <input
                                    type='time'
                                    class="form-control flex-fill"
                                    placeholder='ArrivalTime'
                                    name='ArrivalTime'
                                    //  className='form-control'
                                    value={ArrivalTime}
                                    onChange={event => { setArrivalTime(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                    </div>
                    <hr />
                    <h6>Economy Class</h6>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Seats " >
                                <input
                                    type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='EconomySeats'
                                    //  className='form-control'
                                    value={EconomySeats}
                                    onChange={event => { setEconomySeats(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Price" >
                                <input
                                    type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='EconomyPrice'
                                    //  className='form-control'
                                    value={EconomyPrice}
                                    onChange={event => { setEconomyPrice(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Bags" >
                                <input
                                    type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='EconomyBags'
                                    //  className='form-control'
                                    value={EconomyBags}
                                    onChange={event => { setEconomyBags(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                    </div>


                    <hr />
                    <h6>Business Class</h6>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Seats " >
                                <input
                                    type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='BusinessSeats'
                                    //  className='form-control'
                                    value={BusinessSeats}
                                    onChange={event => { setBusinessSeats(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
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
                                    onChange={event => { setBusinessPrice(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Bags" >
                                <input type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='BusinessBags'
                                    //  className='form-control'
                                    value={BusinessBags}
                                    onChange={event => { setBusinessBags(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
                        </div>
                    </div>

                    <hr />
                    <h6>First Class</h6>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Seats " >
                                <input
                                    type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='FirstSeats'
                                    //  className='form-control'
                                    value={FirstSeats}
                                    onChange={event => { setFirstSeats(event.target.value.toLowerCase()) }}
                                /></FloatingLabel>
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
                                    onChange={event => { setFirstPrice(event.target.value.toLowerCase()) }}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FloatingLabel label="Bags" >
                                <input
                                    type='number'
                                    min='0'
                                    class="form-control flex-fill"
                                    name='FirstBags'
                                    //  className='form-control'
                                    value={FirstBags}
                                    onChange={event => { setFirstBags(event.target.value.toLowerCase()) }}
                                /></FloatingLabel></div>
                    </div>


                    <input
                        class="btn btn-primary"
                        type="submit"
                    // className="btn btn-outline-warning btn-block mt-4"
                    />

                </form>
            </div>
            <div style={{ position: "absolute", marginTop: "950px", width: "98%", marginLeft: "12px" }} >
                <GridContainer  >


                    <GridItem xs={12} style={{ marginTop: "" }}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            <DialogTitle id="alert-dialog-title">
                                <SentimentDissatisfiedIcon />
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    0 matching results
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

                        <Dialog
                            fullWidth={true}
                            maxWidth={"lg"}
                            open={openRes}
                            onClose={handleClose}
                        >
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle>Search Results</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                </DialogContentText>
                                <Box
                                    noValidate
                                    component="form"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        m: 'auto',
                                        width: 'fit-content',
                                    }}
                                >
                                    <FlightList flight={result} />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </GridItem>
                </GridContainer>
                <GridContainer alignItems="center" justify="center">
                    <GridItem xs style={{ marginBottom: "20px", marginTop: "20px" }}>

                    </GridItem>
                </GridContainer>
            </div>

        </div >
    )
}


export default connect(mapStateToProps)(SearchPage);
