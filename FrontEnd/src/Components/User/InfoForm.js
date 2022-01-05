import React, { Component } from "react";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Passenger from "./Passenger.js";

import Child from "./Child"
import { connect } from "react-redux";
//import { getPassengerInfo } from "../../actions/offerActions.js";

import { Card, CardContent } from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SearchIcon from "@material-ui/icons/Search";
import ScrollDown from "./ScrollDown.js";


//import CButton from "components/CustomButtons/Button.js";

export class InfoForm extends Component {

    constructor(props) {
        console.log("sabah el sabah ya dactara");
        console.log(props);
        super(props);
        const { history } = this.props;
        let ids = [];
        try {
            ids = this.props.details.totalPassengers.map(
                (passenger) => passenger.passenger_id
            );
        } catch (e) {
            // window.location.assign("/");
            console.log("salam yabn el3abeeta")
        }

        this.state = {
            ids: ids,
            passengerInfo: new Array(ids.length),


        };
    }


    componentDidMount() {
        window.scrollTo(0, 0);
    }

    update = (state, index) => {
        let arr = this.state.passengerInfo;
        let ids = this.state.ids;
        let id = ids[index];

        // let test = ["sabaho", "sabaho", "sabaho"]
        const info = {
            ...state,
            id,
        };
        arr[index] = JSON.parse(JSON.stringify(info));
        this.setState({
            passengerInfo: arr,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        // this.props.getPassengerInfo(this.state.passengerInfo);
        console.log("yala ya koko mattanahsh")
        //  this.history.push("/");
        window.location.assign("/payment/1");
        //this.props.history.push("/payment");
    };
    // scrollDown = () => {
    //     console.log("mmm")
    // }

    render() {
        const classes = this.props.classes;

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: "#9c27b0",
                },
            },
            spacing: 2,
        });
        var test = []
        console.log("offff ", test)
        for (let i = 1; i <= this.props.details.totalPassengers; i++) {
            test.push("sabaho")
        }
        const details = this.props.details
        const offer = this.props.details.DepartingFlight || null;
        console.log("offff ", test)

        const travellers = this.props.details.totalPassengers || {
            adults: -1,
            children: [],
        };
        console.log("offff22 ", travellers.passengers)
        let adults = "";
        let children = "";
        if (details.Adults === 1) adults = "1 adult";
        else if (details.Adults > 1) adults = details.Adults + " adults";

        if (details.children === 1) children = "1 child";
        else if (details.children > 1)
            children = details.children + " children";

        let date = "";
        // offer.map((offers) => {
        //     date = offers.segments[0].departing_at;
        // });

        return (
            <div style={{}}>
                <div style={{ paddingTop: "8%" }}>
                    <Card style={{
                        borderRadius: "15px", width: "353px", height: "590px", overflow: "auto",
                        //flexWrap: 'wrap',
                        width: "500px",
                        // wordWrap: "break-word",
                        // overflow,
                        marginLeft: "35%",
                        // paddingTop: "10%",
                    }} elevation={3} >
                        <CardContent >
                            <MuiThemeProvider >


                                {/* {offer.length ? ( */}
                                <GridContainer style={{}}>
                                    <GridItem >
                                        <form >
                                            <GridItem xs={12}>
                                                <h2 style={{ color: "#10404c " }}> Who is Travelling </h2>
                                            </GridItem>

                                            {test.map((passenger, index) => {
                                                if (index < details.Adults) {
                                                    // display adults
                                                    let temp = index + 1;
                                                    return (
                                                        // <Card style={{ marginTop: "16px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "16px" }}>
                                                        <Passenger
                                                            classes={classes}
                                                            number={temp}
                                                            name="Adult"
                                                            index={index}
                                                            update={this.update}
                                                            date={date}
                                                        />

                                                        //   </Card>
                                                    );
                                                } else {
                                                    let temp = index + 1 - details.Adults;
                                                    return (
                                                        // <Card style={{ marginTop: "16px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "16px" }}>
                                                        <Child
                                                            classes={classes}
                                                            number={temp}
                                                            name="Child"
                                                            index={index}
                                                            update={this.update}
                                                            date={date}
                                                        />
                                                        //   </Card>
                                                    );
                                                }

                                            })}
                                            <Button
                                                type="submit"
                                                onClick={this.handleSubmit}
                                                style={{ background: "#10404c ", color: "wheat", marginTop: "16px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", marginLeft: "30%" }}
                                            //variant="outlined"
                                            >
                                                {" "}
                                                Proceed to payment{" "}
                                            </Button>
                                        </form>
                                    </GridItem>


                                </GridContainer>
                                <div style={{ marginLeft: "50%" }}>
                                    {/* <ScrollDown ></ScrollDown> */}
                                </div>

                            </MuiThemeProvider>

                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

    Reservation: state.DetailsReducer.Reservation,
    totalPassengers: state.DetailsReducer.totalPassengers,
    Adults: state.DetailsReducer.Adults,
    children: state.DetailsReducer.children,
    details: state.DetailsReducer.details,
    //  passengerInfo: state.chosenOffer.passengerInfo,

});

export default connect(mapStateToProps)(InfoForm);
