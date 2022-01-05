import React, { Component } from 'react';
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Flight from './Flight';
import FlightList from './FlightList'
import './AllFlights.css'
import Header from './Header'
import { Typography } from '@material-ui/core';
import ResultBack from "../../images/Background4.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    console.log(state.DetailsReducer.details)
    return {
        details: state.DetailsReducer.details,


    };
};




class AllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        };
        console.log(this.props.details.UserID);
    }

    componentDidMount() {
        if (this.props.details.UserID != "" && this.props.details.UserID != null) {
            let url =
                axios
                    .get('http://localhost:8080/allflights',
                        {
                            headers: {
                                "x-access-token": this.props.details.token
                            }
                        })
                    .then(res => {
                        const result = res.data;
                        if (result.isLoggedIn !== false) {
                            this.setState({
                                flights: res.data,
                            })
                        }
                        else {
                            alert("You need to login as an admin to get access!!")
                            this.props.history.push("/Userlogin2");
                         }

                    })

                    .catch(err => {
                        console.log('Error');
                    })
        }
        else {
            alert("You need to login as an admin to get access!!")
            this.props.history.push("/Userlogin2");
        }
    };
    render() {
        const flights = this.state.flights;
        let AllFlightsList;


        return (
<div  style={{ backgroundImage: `url(${ResultBack})`, minHeight: "200vh", backgroundSize: "cover" , backgroundRepeat: "repeat-y"}}>
                <Header />
                <Typography align="left" style={{ color: "#FFFFFF", marginTop: "30px", marginBottom: "-100px", marginLeft: "100px" }} variant="h2">  All Flights</Typography>
                <GridContainer >
                    <GridItem xs={13} style={{ margin: "100px"  }}>
                        <FlightList flight={flights} />
                    </GridItem>
                </GridContainer>
                <GridContainer alignItems="center" justify="center">
                    <GridItem xs style={{ marginBottom: "20px", marginTop: "20px" }}>

                    </GridItem>
                </GridContainer>
            </div>


        );
    }
}
export default connect(mapStateToProps)(AllFlights);

