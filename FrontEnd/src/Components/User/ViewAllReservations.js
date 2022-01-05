import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllReservations.css'
import Header from './Header'
import Accordion from 'react-bootstrap/Accordion'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteButton from './DeleteButton'
import ViewAllReservationsHook from './ViewAllReservationsHook';
import ViewSingleReservation from './ViewSingleReservation';
import Card from 'react-bootstrap/Card'
import { connect } from "react-redux";
import DetailsReducer from '../Redux/DetailsReducer';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import ResultBack from "../../images/Background3.jpeg";

/*

axios.post('https://example.com/postSomething', {
 email: varEmail, //varEmail is a variable which holds the email
 password: varPassword
},
{
  headers: {
    Authorization: 'Bearer ' + varToken
    x-access-token : token
  }
})

*/

  
const mapStateToProps = (state) => {
    return {
        details: state.DetailsReducer.details,
    };
};
//let history = useHistory();


class ViewAllReservations extends Component {
    constructor(props) {
        super(props);
        const { history } = this.props;
        if(props.details.UserID === ""){
            alert("You need to login to view your reservations!")
            history.push("/Userlogin2");
        }
        this.state = {
            reservations: [],
            userId : props.details.UserID,
            userName : "",
            token : props.details.token,
        };
    }
    
   
   /* async GetAllAsync() {
       const response = await axios.get('http://localhost:8080/allReservations');
       const result = await response.data;
       this.state.reservations = [result] ;
    }
    */
   
   async componentDidMount() {
       console.log(this.state.token)
       const response = await axios.get
       
                    (`http://localhost:8080/usersflight/${this.state.userId}` ,
                    {
                        headers: {
                          "x-access-token" : this.state.token
                        }
                    }
                    );



       const result = await response.data;
    
       if(result.isLoggedIn !== false){
           console.log(result);
            this.setState({ reservations: result });
            const responseUser = await axios.get(`http://localhost:8080/UserByID/${this.state.userId}` ,
             {
                headers: {
                  "x-access-token" : this.state.token
                }
            }
            );
            const resultUser = await responseUser.data;
            const name = resultUser.firstName + " " + resultUser.lastName ; 
            this.setState({ userName: name});
       }
        else{
            console.log("OH NO OH NO OH NO NO NO NO NO");
            alert("You need to login to view your reservations!")
            this.props.history.push("/userlogin2");
        }
    }
    
    makeReservation = () =>{
        this.props.history.push("/");
    }
    
   render() {
       const reservations = this.state.reservations;
       const userName= this.state.userName;
       
       return (
              
<div  style={{ backgroundImage: `url(${ResultBack})`, minHeight: "200vh", backgroundSize: "cover" , backgroundRepeat: "repeat-y"}}>
                <Header />
{/*
                <Card className="bg-dark text-white">
                    <Card.Img style={{maxHeight: "280px" , objectFit: "cover"}} src="https://www.kotak.com/content/dam/Kotak/digital-banking/insta-services/kaymall/1440X400-Flight.jpg" />
                    <Card.ImgOverlay style={{ fontFamily: "Arial" , paddingTop : "35px" , color :"#226AC7" , fontWeight :"bold" }}>
                        <Card.Title><h1 style ={{ fontWeight :"bolder" }}>Beef or Chicken</h1></Card.Title>
                        <Card.Text><h3 style ={{ fontStyle :"italic" }}>
                            <q>Your gateway to a hassle free flying experience!
                            </q>
                            </h3>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
*/}

<div>
                {reservations.length === 0 || userName===""?(
                    <div className="accordions2" style={{fontWeight:"bold", color:"#FF0000"}}>
                        <h5>You don't have any reservations!</h5>
                        <Button variant="contained" style = {{marginLeft:"42%" , marginTop:"20px"}}
                                                        onClick={this.makeReservation}
                                                        >Start Booking&nbsp; <FlightOutlinedIcon /></Button></div>
                                                        ):(
                                                            <div className="accordions2">
                    {this.state.reservations.map(r =>
                        <ViewSingleReservation reservation={r} userName={this.state.userName} key={r._id} />
                        )}
                </div>
                )
            }
            </div>
            </div>
        );
        
    }  
}
//export default ViewAllReservations;

export default connect(mapStateToProps)(ViewAllReservations);
