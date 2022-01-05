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
        origin: state.DetailsReducer.details.origin,
        origin_name: state.DetailsReducer.details.origin_name,
        destination: state.DetailsReducer.details.destination,
        destination_name: state.DetailsReducer.details.destination_name,
        cabin_class: state.DetailsReducer.details.cabin_class,
        Adults: state.DetailsReducer.details.Adults,
        children: state.DetailsReducer.details.children,

    };
};

const mapDispatchToState = (dispatch) => {
    return {

        setCabinClass: (cabin_class) => {
            dispatch({ type: 'setCabinClass', payload: cabin_class });
        },
        setAdult: (Adults) => {
            dispatch({ type: 'setAdult', payload: Adults });
        },
        setChildren: (children) => {
            dispatch({ type: 'setChildren', payload: children });
        },
        setOrigin: (origin) => {
            dispatch({ type: 'setOrigin', payload: origin });
        },

        setOriginName: (origin_name) => {
            dispatch({ type: 'setOriginName', payload: origin_name });
        },

        setDestination: (destination) => {
            dispatch({ type: 'setDestination', payload: destination });
        },

        setDestinationName: (destination_name) => {
            dispatch({ type: 'setDestinationName', payload: destination_name });
        },



    };
};


export default connect(mapStateToProps, mapDispatchToState)(IconLabelButtons);


function IconLabelButtons({ setAdult, setCabinClass, setChildren, details, setOrigin, setOriginName, setDestination, setDestinationName }) {

    let history = useHistory();
    const classes = useStyles();

    const func = async (e) => {
        e.preventDefault();
        // setOrigin("")
        // setOriginName("")
        // setDestination("")
        // setDestinationName("")
        // setCabinClass('Economy')
        // setAdult(1)
        // setChildren(0)
        console.log("detailsssssss------->: ", details)
        history.push('/pass');
        // })
        // .catch(error => {
        //     console.log("idiot!");
        //     console.log(error.message);
        // })
    }
    //  }

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
                            confirm
                        </Button>

                    </div>
                </Link>
            </ul>
        </div>
    );
}
