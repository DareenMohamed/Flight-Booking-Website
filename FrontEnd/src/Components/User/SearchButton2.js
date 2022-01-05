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



const mapStateToProps = (state) => {
    // console.log(state.DetailsReducer.details.destination)
    return {
        details: state.DetailsReducer.details,
        departingOffers: state.DetailsReducer.details.departingOffers,
        allOffers: state.DetailsReducer.details.allOffers,
        origin: state.DetailsReducer.details.origin,
        destination: state.DetailsReducer.details.destination,
        errorOccurred: state.DetailsReducer.details.errorOccurred,
    };
};

const mapDispatchToState = (dispatch) => {
    return {

        setDepartingOffers: (departingOffers) => {
            dispatch({ type: 'setDepartingOffers', payload: departingOffers });
        },

        setError: (errorOccurred) => {
            dispatch({ type: 'setError', payload: errorOccurred });
        },


    };
};


export default connect(mapStateToProps, mapDispatchToState)(IconLabelButtons);


function IconLabelButtons({ details, origin, departingOffers, setDepartingOffers, destination, setError, errorOccurred }) {

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
                'From': details.origin,
                'To': details.destination,
                "DepartureDate": details.departure_date,
                "ArrivalDate": details.return_date,
                "FirstSeats": null,
                "BusinessSeats": null,
                "EconomySeats": null,
                "ArrivalTime": "",
                "cabin": details.cabin_class,
                "DepartureTime": "",
                "FlightNumber": "",
                "passengers": (details.Adults + details.children),
            }
            setError(false)

            console.log("body: ", body)
            let url = "http://localhost:8080/searchAvailableFlights"

            axios
                .post(url, body)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("gamed louji!")
                    setDepartingOffers(res.data);
                    //console.log("allOffres: ", allOffers)
                    //this.props.history.push('/');
                    //  history.push("/DepartingFlights");
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
