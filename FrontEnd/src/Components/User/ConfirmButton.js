import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    button: {
        //margin: theme.spacing(1),
        // alignItems: "center",
        //alignSelf: "center",
        bottom: 8,
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
    //console.log(state.DetailsReducer.details.destination)
    return {
        details: state.DetailsReducer.details,
        allOffers: state.DetailsReducer.details.allOffers,
        ReservationID: state.DetailsReducer.details.ReservationID,
    };
};

const mapDispatchToState = (dispatch) => {
    return {
        setReservationID: (ReservationID) => {
            dispatch({ type: 'setReservationID', payload: ReservationID });
        },


        setAllOffers: (allOffers) => {
            dispatch({ type: 'setAllOffers', payload: allOffers });
        },


    };
};


export default connect(mapStateToProps, mapDispatchToState)(IconLabelButtons);


function IconLabelButtons({ details, setReservationID, ReservationID }) {

    let history = useHistory();
    const classes = useStyles();

    const func = async (e) => {
        e.preventDefault();
        // console.log("detailsssssss: ", details)
        // //console.log("allahu akbar", details.allOffers)
        if (details.UserID == "") {
            alert("Log in please!")
            history.push("/UserLogin");

        }
        else {
            let body = {
                'UserID': details.UserID,
                'DepartureFlightID': details.DepartingFlight._id,
                "ReturnFlightID": details.ReturnFlight._id,
                "CabinType": details.cabin_class,
                // "TakenSeats": details.TakenSeats,
                "TotalPrice": details.DeparturePrice + details.ReturnPrice,
                "Children": details.children,
                "Adults": details.Adults,

            }

            console.log("body: ", body)
            let url = "http://localhost:8080/createReservation"

            axios

                .post(url, body)
                .then(res => {
                    console.log("respnose: ", res)
                    console.log("response data", res.data)


                    setReservationID(res.data)
                    console.log("ReservationID-----> ", ReservationID)
                    console.log("details-----> ", details)
                    history.push('/Seats/1', { ReservationId: res.data });
                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })
        }
    }

    //resluts.slices.semg.length

    // let response = await axios.post("http://app.stamped.travel:8080/offers/pagination", reqBody)
    // console.log("lllllllll", response)
    // console.log("lllllllll", response.data.cheapestFlights[0][0].owner.name)
    // console.log("origin:", details.origin)
    // console.log("length:", response.data.cheapestFlights[0].length)

    return (
        <div className={classes.buttonDiv}>
            <ul>
                <Link to="/results">
                    <div className={classes.button}>

                        {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
                        <Button
                            style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginRight: "50%" }}
                            classname={classes.button2}
                            variant="contained"

                            size="medium"
                            className={classes.button}
                            // startIcon={<SearchIcon />}
                            onClick={(e) => { func(e) }}
                        >
                            Confirm
                        </Button>

                    </div>
                </Link>
            </ul>
        </div>
    );
}
