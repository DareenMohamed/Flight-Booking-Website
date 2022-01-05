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

const useStyles = makeStyles((theme) => ({
    button: {
        //margin: theme.spacing(1),
        // alignItems: "center",
        //alignSelf: "center",
        bottom: 8,
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

    const func = async (e) => {
        e.preventDefault();
        setUserID("");
        history.push("/");
    }

   return (
        <div >
            <MenuItem 
                            style={{ color: "#FFFFFF", marginTop: "10%" , marginBottom:"-7px"}}
                            variant="contained"
                            size="medium"
                            className={classes.button}
                            onClick={(e) => { func(e) }}
                        ><LogoutIcon/>&nbsp;
                            Logout
                      
            </MenuItem>

        </div>
    );
}
