import bg2 from '../../images/Background5.png'
// import dd from '../images/smallDD.png'
import user from '../../images/user.svg'
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { NavDropdown } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
// import { render } from '@testing-library/react';
// import React from 'react';

import * as airports from "airportsjs"
import { makeStyles } from '@material-ui/core/styles';
import Search from "./Searchbar2"
import Where from "./Where2"
//import { Button } from './Button';
import DatePicker from './DatePicker3.js'
//import BasicDateRangePicker from '../components/BasicDateRangePicker.js'
// import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
// import IconButton from "@material-ui/core/IconButton";
import Counter from './Counters/Counter.js'
import Counter2 from './Counters/Counter2.js';
import React, { useState, setState } from "react";
import SearchButton from "./SearchButton3"
import { connect } from "react-redux";
import SideBar from "./SideBar"

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Header from './Header';
var option = ""
var sum = 0;
var t = "One way";



const useStyles = makeStyles((theme) => ({
    search: {
        //  display: "flex",
    },
    selectors: {
        display: "flex",
        flexDirection: "row",
        height: "30%",
    },
    searchDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 16,
    },
    input1: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
    },
    calender: {
        display: "flex",
        flexDirection: "row",
        flex: 1,

    },
    bottomSheet: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "15.5%",
        top: "57%",
    },
    rectangle: {
        /* position: absolute; */
        marginTop: "-9%",
        width: "900px",
        height: "143px",
        justifyContent: "left",
        backgroundColor: "transparent",
        // boxShadow: '0px 4px 8px 0 rgba(0.25, 0.25, 0.25, 0.25)',
        marginLeft: "7%",
        borderRadius: "30px",
        display: "flex",
        flexDirection: "column"
    },
    adult: {

    },








}));
const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        destination_name: state.DetailsReducer.details.destination_name,
        destination: state.DetailsReducer.details.destination,
        origin_name: state.DetailsReducer.details.origin_name,
        tripType: state.DetailsReducer.details.tripType,
        cabin_class: state.DetailsReducer.details.cabin_class,
        Adults: state.DetailsReducer.details.Adults,
        children: state.DetailsReducer.details.children,
        infants_on_lap: state.DetailsReducer.details.infants_on_lap,
        infants_in_seat: state.DetailsReducer.details.infants_in_seat,
        totalPassengers: state.DetailsReducer.details.totalPassengers,
        Adults: state.DetailsReducer.details.Adults,
        errorOccurred: state.DetailsReducer.details.errorOccurred,

    };
};
const mapDispatchToState = (dispatch) => {
    return {
        setDestination: (destination) => {
            dispatch({ type: 'setDestination', payload: destination });
        },
        setDestinationName: (destination_name) => {
            dispatch({ type: 'setDestinationName', payload: destination_name });
        },
        setOriginName: (origin_name) => {
            dispatch({ type: 'setOriginName', payload: origin_name });
        },
        setError: (errorOccurred) => {
            dispatch({ type: 'setError', payload: errorOccurred });
        },

        setTripType: (tripType) => {
            dispatch({ type: 'setTripType', payload: tripType });
        },

        setCabinClass: (cabin_class) => {
            dispatch({ type: 'setCabinClass', payload: cabin_class });
        },
        setAdult: (Adults) => {
            dispatch({ type: 'setAdult', payload: Adults });
        },

        setAdult: (Adult) => {
            dispatch({ type: 'setAdult', payload: Adult });
        },
        setChildren: (children) => {
            dispatch({ type: 'setChildren', payload: children });
        },
        setInfantsOL: (infants_on_lap) => {
            dispatch({ type: 'setInfantsOL', payload: infants_on_lap });
        },
        setInfantsIS: (infants_in_seat) => {
            dispatch({ type: 'setInfantsIS', payload: infants_in_seat });
        },
        setTotalPassengers: (totalPassengers) => {
            dispatch({ type: 'setTotalPassengers', payload: totalPassengers });
        },


    };
};
export default connect(mapStateToProps, mapDispatchToState)(Home);


function Home({ setError, tripType, setTripType, errorOccurred, setCabinClass, cabin_class, destination, children, infants_on_lap, infants_in_seat, setTotalPassengers, totalPassengers, Adults }) {
    const classes = useStyles();

    const [dropDownValue, setdropDownValue] = useState("Round Trip");
    const [classValue, setclassValue] = useState('Economy');
    const [open, setOpen] = useState(true)

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const changeValue = (text) => {
        setdropDownValue(text)
        // setTripType(dr)
    }
    const changeValueClass = (text) => {
        setclassValue(text)
    }

    const handleOptions = (value) => {
        option = { value }
        setTripType(value)
        console.log(option, "hhhh")
        console.log(tripType, "tripType")

    }
    const someFunc = (value) => {
        handleOptions(value);
        changeValue(value);
        // renderCalender();
    }

    const Sum = () => {
        setTotalPassengers(Adults + children + infants_in_seat + infants_on_lap)
        // return newcount1 + newcount2 + newcount3 + newcount4
    }

    const cabin = (e) => {
        changeValueClass(e.target.textContent)
        setCabinClass(e.target.textContent)
        console.log("cabin: ", cabin_class)
    }
    const handleError = () => {
        if (errorOccurred == true) {

            // setError(false)
            console.log("errorr--->", errorOccurred)
            return true
        }
        else {
            return false
        }
    }

    const [newcount1, setnewCount1] = useState(0);
    const [newcount2, setnewCount2] = useState(0);

    const [Total, setTotal] = useState(newcount1 + newcount2);
    return (

        <div >

            <div >
                <Box sx={{ width: '100%' }}>
                    <Collapse in={handleError()}>
                        <Alert severity="error"

                            sx={{ mb: 2 }}
                        >
                            Please Enter All Details!
                        </Alert>
                    </Collapse>

                </Box>
            </div>

            <div className={classes.search}>
                <div className={classes.bottomSheet}>
                    <div className={classes.rectangle}>
                        <div className={classes.selectors}>

                            <div className="">
                                <div className="test"></div>

                                <Dropdown className="dropdownClass">
                                    <Dropdown.Toggle calssName="selected" variant="outlined-secondary">

                                        {cabin_class}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as='button'><div className="buss" onClick={(e) => cabin(e)}>Economy</div>

                                        </Dropdown.Item>
                                        <Dropdown.Item as='button'><div className="eco" onClick={(e) => cabin(e)}>Business</div>
                                        </Dropdown.Item>
                                        <Dropdown.Item as='button'><div className="fclass" onClick={(e) => cabin(e)}>First Class</div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>


                            <div className="class">
                                <Dropdown className="userbtn" autoClose="outside" disabled="true" >
                                    <Dropdown.Toggle calssName="selected1" variant="outlined-secondary" variant="diabled" >
                                        <img src={user} alt="" />
                                        {/* {Passerngers(newcount)} */}
                                        {Sum()}
                                        {totalPassengers}
                                    </Dropdown.Toggle>
                                    {/* <Dropdown.Menu className="DropDownResults">
                                        <Dropdown.Item as='text'><div className={classes.adult}> Adult</div>
                                            <Counter count={newcount1} setCount={setnewCount1} />

                                        </Dropdown.Item>


                                        <Dropdown.Item as='text'><div className="adult"> Children </div>

                                            <Counter2 count={newcount2} setCount={setnewCount2} />
                                        </Dropdown.Item>

                                    </Dropdown.Menu> */}
                                </Dropdown>
                            </div>
                        </div>

                        <div className={classes.searchDiv}>


                            <div className={classes.input1}>


                                <Where placeholder="To" data={airports} />
                                <Search placeholder="From" data={airports} />
                            </div>

                            <div className={classes.calender}>
                                <DatePicker />
                            </div>
                        </div>
                        <SearchButton />
                    </div>



                </div>
            </div>
        </div>

        //2209
    )
}


