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
import ReturnToHomeButton from './ReturnToHomeButton.js'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: "500px",
        wordWrap: "break-word",
        // overflow,
        marginLeft: "38%",
        paddingTop: "7%",
        '& > *': {
            // margin: theme.spacing(1),
            // width: theme.spacing(16),
            // height: theme.spacing(16),
        },
    },

    paper: {

        borderRadius: "15px",
        width: "405px",
        height: "670px",
        overflow: "auto",


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
    text5: {
        marginLeft: "1%",
        marginTop: "-3%",
        marginBottom: "4%",
        fontSize: theme.typography.pxToRem(18),
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
        // display: "flex",
        // width: "80%",
        marginLeft: "-7%",
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        //  border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        '& svg': {
            m: 1.5,
        },
        '& hr': {
            mx: 0.5,
        },

    },
    partition2: {
        // background: "#10404c",
        // color: "wheat",
        height: "40px",
        width: "100%",
        // marginRight: "60px",
    },
    text4: {
        marginLeft: "1%",
        marginTop: "-3%",
        fontSize: theme.typography.pxToRem(23),
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

    const passengers = (adults, children) => {
        //console.log
        var p = " "
        if (children == 0 && adults == 1) {
            p = details.Adults + " Adult"
        }
        else if (details.children == 0 && details.Adults > 1) {
            p = adults + " Adults"
        }
        else if (details.children == 1 && details.Adults == 1) {
            p = adults + " Adult" + details.children + " Child"
        }
        else if (details.children > 1 && details.Adults == 1) {
            p = adults + " Adult" + details.children + " Children"
        }
        else if (details.children == 1 && details.Adults > 1) {
            p = adults + " Adults" + details.children + " Child"
        }
        else if (details.children > 1 && details.Adults > 1) {
            p = adults + " Adults" + details.children + " Children"
        }
        return p
    }

    const rseats = (array) => {
        var r = "";
        for (var i = 0; i < array.length; i++) {
            r = r + " " + array[i];

        }
        return r;
    }


    return (
        <div className={classes.root}>

            <Card className={classes.paper} elevation={3} >
                <CardContent>

                    <Typography className={classes.title} variant="h5" component="h2">
                        Your trip summary
                    </Typography>

                    {/* <Divider /> */}
                    <hr />
                    {/* <Typography className={classes.title1}> Departing Flight</Typography> */}
                    <div className={classes.TripIcon}>
                        <TripOriginIcon
                            fontSize="small"
                            color="disabled"
                            label="Female"
                        />

                        <MoreVertIcon
                            fontSize="small"
                            color="disabled" />
                        <FlightIcon
                            //color="disabled"
                            style={{ transform: "scaleY(-1)" }}
                        />
                        <MoreVertIcon
                            fontSize="small"
                            color="disabled" />
                        <TripOriginIcon
                            fontSize="small"

                            color="disabled"
                        />
                    </div>

                    <div className={classes.text}>
                        <Typography className={classes.text1}> {Departing.DepartureDate.substring(0, 10)} . {Departing.DepartureTime} . {details.origin_name}</Typography>
                        <Typography className={classes.text2}> Travel time: {duration(Departing.DepartureTime, Departing.DepartureDate, Departing.ArrivalTime, Departing.ArrivalDate)}</Typography>
                        <Typography className={classes.text1}> {Departing.ArrivalDate.substring(0, 10)} . {Departing.ArrivalTime} . {details.destination_name}</Typography>

                    </div>


                    <hr className={classes.line}></hr>
                    <div className={classes.partition}>
                        <Typography className={classes.text3}> Price : EGP {details.DeparturePrice}</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Typography className={classes.text3}> Cabin : {details.cabin_class}</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Typography className={classes.text3}> Seats : {rseats(details.TakenSeatsDeparture[0])}</Typography>

                    </div>
                    <hr className={classes.line2}></hr>
                    <div className={classes.TripIcon}>
                        <TripOriginIcon
                            fontSize="small"
                            color="disabled"
                            label="Female"
                        />

                        <MoreVertIcon
                            fontSize="small"
                            color="disabled" />
                        <FlightIcon
                        // color="disabled"
                        />
                        <MoreVertIcon
                            fontSize="small"
                            color="disabled" />
                        <TripOriginIcon
                            fontSize="small"

                            color="disabled"
                        />
                    </div>

                    <div className={classes.text}>
                        <Typography className={classes.text1}>{Returning.ArrivalDate.substring(0, 10)} . {Returning.ArrivalTime} . {details.origin_name}</Typography>
                        <Typography className={classes.text2}> Travel time:  {duration(Returning.DepartureTime, Returning.DepartureDate, Returning.ArrivalTime, Returning.ArrivalDate)}</Typography>
                        <Typography className={classes.text1}>{Returning.DepartureDate.substring(0, 10)} . {Returning.DepartureTime} . {details.destination_name}
                        </Typography>
                    </div>
                    <hr className={classes.line}></hr>
                    <div className={classes.partition}>
                        <Typography className={classes.text3}> Price : EGP {details.ReturnPrice}</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />

                        <Typography className={classes.text3}> Cabin : {details.cabin_class}</Typography>
                        <Divider orientation="vertical" variant="middle" flexItem />

                        <Typography className={classes.text3}> Seats : {rseats(details.TakenSeatsReturn)}</Typography>


                    </div>
                    <hr className={classes.line2}></hr>
                    <div >
                        {/* {if(details.children == 0) */}
                        <Typography className={classes.text5}> Passengers :  {passengers(details.Adults, details.children)}</Typography>
                        {/* } */}
                    </div>
                    <hr className={classes.line2}></hr>
                    <div className={classes.partition2}>
                        <Typography className={classes.text4}> Total Price : EGP {details.ReturnPrice + details.DeparturePrice}</Typography>

                    </div>
                    {/* <hr className={classes.line2}></hr> */}
                    <div className={classes.button}>
                        <ReturnToHomeButton />
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}