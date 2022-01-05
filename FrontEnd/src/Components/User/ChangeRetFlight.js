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
        // bottom: 8,
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
//     //console.log(state.DetailsReducer.details.destination)
//     return {
//         details: state.DetailsReducer.details,
//         allOffers: state.DetailsReducer.details.allOffers,
//         ReservationID: state.DetailsReducer.details.ReservationID,
//         Reservation: state.DetailsReducer.details.Reservation,
//     };
// };

// const mapDispatchToState = (dispatch) => {
//     return {
//         setReservationID: (ReservationID) => {
//             dispatch({ type: 'setReservationID', payload: ReservationID });
//         },

//         setReservation: (Reservation) => {
//             dispatch({ type: 'setReservation', payload: Reservation });
//         },


//         setAllOffers: (allOffers) => {
//             dispatch({ type: 'setAllOffers', payload: allOffers });
//         },


//     };
// };

const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        origin: state.DetailsReducer.details.origin,
        origin_name: state.DetailsReducer.details.origin_name,
        Reservation: state.DetailsReducer.details.Reservation,
        DepartingFlight: state.DetailsReducer.details.DepartingFlight,
        ReturnFlight: state.DetailsReducer.details.ReturnFlight,
    };
};
const mapDispatchToState = (dispatch) => {
    return {
        setReservation: (Reservation) => {
            dispatch({ type: 'setReservation', payload: Reservation });
        },
        setDepartingFlight: (DepartingFlight) => {
            dispatch({ type: 'setDepartingFlight', payload: DepartingFlight });
        },
        setReturnFlight: (ReturnFlight) => {
            dispatch({ type: 'setReturnFlight', payload: ReturnFlight });
        },


    };
    // console.log(origin)
};


export default connect(mapStateToProps, mapDispatchToState)(IconLabelButtons);


function IconLabelButtons({ details, Reservation, setReservation, setDepartingFlight, setReturnFlight, DepartingFlight, ReturnFlight }) {

    let history = useHistory();
    const classes = useStyles();
    const handleEdit = (type) => { //1 is departing and 2 is returning

        console.log(Reservation)
        // setOpen(true)
        let url2 = `http://localhost:8080/reservationByID/${Reservation._id}`
        axios
            .get(url2)
            .then(res => {
                console.log("respnose: ", res)
                console.log("gamed louji!")
                setReservation(res.data);
                url2 = `http://localhost:8080/flightById2/${Reservation.DepartureFlightID}`
                axios
                    .get(url2)
                    .then(res => {
                        console.log("respnose: ", res)
                        console.log("gamed louji!")
                        setDepartingFlight(res.data);
                        url2 = `http://localhost:8080/flightById2/${Reservation.ReturnFlightID}`
                        axios
                            .get(url2)
                            .then(res => {
                                console.log("respnose: ", res)
                                console.log("gamed louji!")
                                setReturnFlight(res.data);
                                history.push("/ChangeRetFlight")
                                // if (type == 1)
                                //     history.push('/EditSeats/1');
                                // else if (type == 2)
                                //     history.push('/EditSeats/2');

                                // this.props.history.push(`/Seats/1`);
                            })
                            .catch(error => {
                                console.log("idiot!");
                                console.log(error.message);
                            })
                        // this.props.history.push(`/Seats/1`);
                    })
                    .catch(error => {
                        console.log("idiot!");
                        console.log(error.message);
                    })

                // this.props.history.push(`/Seats/1`);
            })
            .catch(error => {
                console.log("idiot!");
                console.log(error.message);
            })



       

        // console.log("props.reservation:" ,props.Reservation)
        // need to set flights too

    };



    return (
        <div >
            <ul>

                <div >

                    {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
                    <Button
                        style={{ background: "#10404c ", color: "wheat", }}
                        // classname={classes.button2}
                        variant="contained"

                        size="medium"
                        // className={classes.button}
                        // startIcon={<SearchIcon />}
                        onClick={() => { handleEdit(1) }}
                    >
                        Change Flight
                    </Button>

                </div>

            </ul>
        </div>
    );
}