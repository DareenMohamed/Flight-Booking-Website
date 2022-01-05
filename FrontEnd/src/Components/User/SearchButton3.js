import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
//import '../components/SearchButton.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';


const useStyles = makeStyles((theme) => ({
    button: {
        //margin: theme.spacing(1),
        // alignItems: "center",
        //alignSelf: "center",
        //  bottom: 8,
    },
    button2: {
        //margin: theme.spacing(1),
        // alignItems: "center",
        //alignSelf: "center",
        backgroundColor: '#10404C',
        borderColor: '#10404C',
    },

    buttonDiv: {

        flex: 1,
        display: "flex",
        /* align-items: center; */
        //marginTop: "-10px",
        justifyContent: "center",
    },
}));



// const mapStateToProps = (state) => {
//     // console.log(state.DetailsReducer.details.destination)
//     return {
//         details: state.DetailsReducer.details,
//         departingOffers: state.DetailsReducer.details.departingOffers,
//         allOffers: state.DetailsReducer.details.allOffers,
//         origin: state.DetailsReducer.details.origin,
//         destination: state.DetailsReducer.details.destination,
//         errorOccurred: state.DetailsReducer.details.errorOccurred,
//     };
// };

// const mapDispatchToState = (dispatch) => {
//     return {

//         setDepartingOffers: (departingOffers) => {
//             dispatch({ type: 'setDepartingOffers', payload: departingOffers });
//         },

//         setError: (errorOccurred) => {
//             dispatch({ type: 'setError', payload: errorOccurred });
//         },


//     };
// };

const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        detail: state.DetailsReducer.details,
        allOffers: state.DetailsReducer.details.allOffers,
        selectedDepartingFlightID: state.DetailsReducer.details.selectedDepartingFlightID,
        selectedReturningFlightID: state.DetailsReducer.details.selectedDepartingFlightID,
        UserID: state.DetailsReducer.details.UserID,
        TakenSeats: state.DetailsReducer.details.TakenSeats,
        TotalPrice: state.DetailsReducer.details.TotalPrice,
        returningOffers: state.DetailsReducer.details.returningOffers,

    };
};

const mapDispatchToState = (dispatch) => {
    return {

        setReturningOffers: (returningOffers) => {
            dispatch({ type: 'setReturningOffers', payload: returningOffers });
        },
        setDepartingFlight: (DepartingFlight) => {
            dispatch({ type: 'setDepartingFlight', payload: DepartingFlight });
        },
        setAllOffers: (allOffers) => {
            dispatch({ type: 'setAllOffers', payload: allOffers });
        },
        setSelectedDepartingFlightID: (selectedDepartingFlightID) => {
            dispatch({ type: 'setAllOffers', payload: selectedDepartingFlightID });
        },
        setSelectedReturningFlightID: (selectedReturningFlightID) => {
            dispatch({ type: 'setAllOffers', payload: selectedReturningFlightID });
        },
        setUserID: (UserID) => {
            dispatch({ type: 'setAllOffers', payload: UserID });
        },
        setTakenSeats: (TakenSeats) => {
            dispatch({ type: 'setAllOffers', payload: TakenSeats });
        },
        setTotalPrice: (TotalPrice) => {
            dispatch({ type: 'setAllOffers', payload: TotalPrice });
        },



    };
};
export default connect(mapStateToProps, mapDispatchToState)(IconLabelButtons);


function IconLabelButtons({ details, origin, departingOffers, setDepartingOffers, destination, setError, errorOccurred, setAllOffers, allOffers, setReturningOffers, detail, DepartingFlight }) {

    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(true)
    // setError(false)

    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
            window.removeEventListener("beforeunload", alertUser);
        };
    }, []);
    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
        console.log("refreshhhh")
        setError(false)
        console.log("reafresh---> ", errorOccurred)

    };
    const func = async () => {
        console.log("detailsssssss: ", details)
        //console.log("allahu akbar", details.allOffers)
        if (origin == "" || destination == "") {
            console.log("la wlo")
            setError(true)
            console.log(errorOccurred)
        }
        else {
            let body = {
                'From': details.destination,
                'To': details.origin,
                "DepartureDate": details.return_date,
                "ArrivalDate": "",
                "FirstSeats": null,
                "isReturning": true,
                "departingArrival": details.DepartingFlight.ArrivalDate,
                "cabin": details.cabin_class,
                "BusinessSeats": null,
                "EconomySeats": null,
                "ArrivalTime": "",
                "DepartureTime": "",
                "FlightNumber": "",
                "passengers": (details.Adults + details.children),
            }

            console.log("220 ", body)
            let url = "http://localhost:8080/searchAvailableFlights"

            axios
                .post(url, body)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("gamed louji!")
                    setReturningOffers(res.data);
                    //details.returningOffers = res.data;
                    console.log("respnose: ", res)
                    console.log("gamed louji!")
                    // setDepartingOffers(res.data);
                    allOffers = res.data;
                    // props.details.selectedDepartingFlightID.data = offer._id
                    // console.log("selecteeeeeddddddd: ", props.details.selectedDepartingFlightID.data)
                    //  console.log("offersssss291: ", offer)

                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })


        }
    }



    return (
        <div className={classes.buttonDiv}>
            <ul>

                <div className={classes.button}>

                    <Button
                        style={{ background: "#10404c ", color: "wheat", marginTop: "195%", marginLeft: "620%" }}
                        //   classname={classes.button2}
                        //  variant="contained"
                        //disabled={btnDisabled}
                        // size="large"
                        //  className={classes.button}
                        // startIcon={<SearchIcon />}
                        onClick={func}
                    >
                        Next
                    </Button>


                </div>

            </ul>
        </div>
    );
}
