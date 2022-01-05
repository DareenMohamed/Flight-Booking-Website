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
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { createBrowserHistory } from "history";

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
        UserID: state.DetailsReducer.details.UserID,
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

        setUserID: (UserID) => {
            dispatch({ type: 'setUserID', payload: UserID });
        },


    };
};


export default connect(mapStateToProps, mapDispatchToState)(IconLabelButtons);


function IconLabelButtons({ details, setReservationID, ReservationID,UserID, setUserID }) {

    let history = useHistory();
    const classes = useStyles();
    const history2 = createBrowserHistory()

    const func = async (e) => {
        e.preventDefault();
        setUserID("");
        console.log(history2.location.pathname)
        if( history2.location.pathname === "/"){
            window.location.reload(true);
            }
        history.push("/");
    }

    //resluts.slices.semg.length

    // let response = await axios.post("http://app.stamped.travel:8080/offers/pagination", reqBody)
    // console.log("lllllllll", response)
    // console.log("lllllllll", response.data.cheapestFlights[0][0].owner.name)
    // console.log("origin:", details.origin)
    // console.log("length:", response.data.cheapestFlights[0].length)

    return (
        <div >
            <MenuItem 
                            style={{ background: "#c70808 ", color: "#FFFFFF", marginTop: "10%" , marginBottom:"-7px"}}
                            variant="contained"
                            size="medium"
                            className={classes.button}
                            // startIcon={<SearchIcon />}
                            onClick={(e) => { func(e) }}
                        ><LogoutIcon/>&nbsp;
                            Logout
                      
            </MenuItem>

        </div>
    );
}
