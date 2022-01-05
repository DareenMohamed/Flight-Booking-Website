import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from "react-redux";
import FlightIcon from '@mui/icons-material/Flight';
import moment, { duration } from 'moment'
import ConfirmButton from './ConfirmButton.js'
import ChangeFlightStepper from './ChangeFlightStepper'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        // width: "500px",
        wordWrap: "break-word",
        // overflow,
        marginLeft: "16%",
        paddingTop: "10%",
        '& > *': {
            // margin: theme.spacing(1),
            // width: theme.spacing(16),
            // height: theme.spacing(16),
        },
        overflow: "auto"
    },

    paper: {

        borderRadius: "15px",
        width: "1000px",
        height: "590px",
        overflow: "auto",
        // backgroundColor: "transparent"


    },
    title: {
        fontSize: 22,
    },

    title1: {
        fontSize: 18,
        marginLeft: "-60%",

    },
    TripIcon: {
        verticalAlign: 'bottom',
        height: 200,
        width: 20,
        marginLeft: "0%",
    },

    text: {
        marginLeft: "11%",
        marginTop: "-65%",
        width: "100%",
        //fontSize: theme.typography.pxToRem(14),
        height: "30%",

    },
    text1: {
        marginLeft: "-3%",
        marginTop: "7%",
        fontSize: theme.typography.pxToRem(12),
        textAlign: "left",
        ovarflowWrap: "break-word",
        // overflowwrap: break-word;
        wordwrap: "break-word",

    },
    text2: {
        marginLeft: "-3%",
        marginTop: "5%",
        fontSize: theme.typography.pxToRem(12),
        color: '#70757A',
        textAlign: "left",

    },

    text3: {
        marginLeft: "11%",
        marginTop: "-3%",
        fontSize: theme.typography.pxToRem(12),
        // color:'#70757A',
        textAlign: "left",
    },

    line: {
        // length: "1",
        // width: "100%",
        // marginLeft: "11%",
        marginTop: "10%",

    },
    partition: {
        display: "flex",

    },
    partition2: {
        background: "#10404c",
        color: "wheat",
        height: "40px",
        width: "100%",
        // marginRight: "60px",
    },
    text4: {
        marginLeft: "11%",
        marginTop: "-3%",
        fontSize: theme.typography.pxToRem(25),
        // color:'#70757A',
        textAlign: "left",
    },

    button: {
        marginTop: "5%",
        marginRight: "5%"

    },

    // line2: {
    //     length: "1",
    //     width: "100%",
    //     marginLeft: "11%",
    //     marginTop: "-3%",
    // },

}));

const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        details: state.DetailsReducer.details,
        // allOffers: state.DetailsReducer.details.allOffers
    };
};




export default connect(mapStateToProps)(SimplePaper);
function SimplePaper({ details }) {
    const classes = useStyles();

    const [layOverTime, setlayOverTime] = React.useState("Layover");
    const [layOverCity, setlayOverCity] = React.useState("City");

    const Departing = details.DepartingFlight

    const Returning = details.ReturnFlight

    console.log("detailssssssssss---->: ", details)
    console.log("Departingggg---->: ", Departing)
    console.log("Returningggg---->: ", Returning)

    const duration = (DepartureTime, DepartureDate, ArrivalTime, ArrivalDate) => {
        let start = moment(DepartureDate.substring(0, 10) + " " + DepartureTime + ":00");
        let end = moment(ArrivalDate.substring(0, 10) + " " + ArrivalTime + ":00");
        let diff = end.diff(start);
        let f = moment.utc(diff).format("HH:mm");
        let duration = f.substring(0, 2) + " hr " + f.substring(3, 5) + " min"
        return duration
    }


    return (
        <div className={classes.root}>

            <Card className={classes.paper} elevation={3} >
                <CardContent>
                    <ChangeFlightStepper />

                </CardContent>
            </Card>
        </div>
    );
}