import flightsback from "../../images/Background3.jpeg";
import { Component } from 'react';
import * as React from 'react';
import './ViewUserInfo.css'
import { makeStyles } from '@material-ui/core/styles';
// import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import TextField from '@mui/material/TextField';
// import UserInfo from './Flight/searchUser';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import SideBar from './SideBar';
import Header from './Header';
import PersonIcon from '@mui/icons-material/Person';



// const mapStateToProps = (state) => {
//     //console.log(state.DetailsReducer.details.destination)
//     return {
//         details: state.DetailsReducer.details,

//     };
// };



const mapStateToProps = (state) => {
    console.log(state.DetailsReducer.details)
    return {
        details: state.DetailsReducer.details,


    };
};





class viewUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            // id: this.props.details.UserID//added //RETURN AFTER TESTING
            id: this.props.details.UserID,
        };
        console.log("id", this.state.id)
        console.log("details", this.props.details.token)
    }



    componentDidMount() {
        console.log("this:", this)
        if (this.state.id != "" && this.state.id != null) {
            let url =
                axios
                    .get(`http://localhost:8080/UserByID/${this.state.id}`,
                        {
                            headers: {
                                "x-access-token": this.props.details.token
                            }
                        })
                    .then(res => {
                        const result = res.data;
                        if (result.isLoggedIn !== false) {
                            this.setState({
                                info: res.data,
                            })
                        }
                        else {
                            console.log("from token")
                            alert("You need to login to view your profile!")
                            this.props.history.push("/Userlogin2");
                         }
                    })

                    .catch(err => {
                        console.log('Error');
                    })
        }
        else {

            alert("You need to login to view your profile!")
            this.props.history.push("/Userlogin2");
        }




        // let url = 'http://localhost:8080/searchUser';

        // let body = {
        //     'FirstName': { FirstName },
        //     'LastName': { To },
        //     "DepartureDate": { DepartureDate },
        //     "ArrivalDate": { ArrivalDate },
        //     "FirstSeats": { FirstSeats },
        //     "BusinessSeats": { BusinessSeats },
        // }

        // console.log("url", url)
        // axios.patch(url, body)
        //     .then(async (response) => {
        //         console.log("response ===> ", response)
        //         history.push("/allFlights");
        //     })
        //     .catch((e) => {

        //         console.log("ana hena")
        //         console.log("error ===>", e);
        //     });

    };

    render() {

        // this.props.history.push(`/Seats/2`);

        return (

            <div style={{ backgroundImage: `url(${flightsback})`, minHeight: "100vh", backgroundSize: "cover" }}>
                <Header />
                <div style={{ marginBottom: "-100px" }}></div>
                <div class="padding">


                    <div class="rectangle">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 5, width: '25ch', color: "black" },
                            }}

                            noValidate
                            autoComplete="off"
                        >


                            <div class="padding"></div>
                            <h3 class="colorHeader">
                                <PersonIcon ></PersonIcon >My Infromation
                            </h3>

                            <div class="col-md-6" className='form-group form-inline'>
                                <label class="form-label">First Name</label>
                                <input
                                    type='text'
                                    class="form-control flex-fill"
                                    placeholder='First Name'
                                    name='First Name'
                                    // className='form-control'
                                    value={this.state.info.firstName}
                                // onChange={event => { setFirstName(event.target.value) }}
                                />
                            </div>



                            <div class="col-md-6" className='form-group form-inline'>
                                <label class="form-label">Last Name</label>
                                <input
                                    type='text'
                                    class="form-control flex-fill"
                                    placeholder='Last Name'
                                    name='Last Name'
                                    // className='form-control'
                                    value={this.state.info.lastName}
                                // onChange={event => { setLastName(event.target.value) }}
                                />
                            </div>

                            <div class="col-md-6" className='form-group form-inline'>
                                <label class="form-label">Passport Number</label>
                                <input
                                    type='text'
                                    class="form-control flex-fill"
                                    placeholder='XXXXXXXX'
                                    name='Passport Number'
                                    // className='form-control'
                                    value={this.state.info.passportNumber}
                                // onChange={event => { setPassportNumber(event.target.value) }}
                                />
                            </div>






                            <div class="col-md-6" className='form-group form-inline'>
                                <label class="form-label">Email</label>
                                <input
                                    type='text'
                                    class="form-control flex-fill"
                                    placeholder='example@example.com'
                                    name='Email'
                                    // className='form-control'
                                    value={this.state.info.email}
                                // onChange={event => { setEmail(event.target.value) }}
                                />
                            </div>

                            <div class="padding">
                            </div>



                            <Link to={{ pathname: `/UpdateUserInfoNew/${this.state.id}` }}>
                                {/* <IconButton  onClick={handleSubmit}>
                                        <EditIcon />
                                    </IconButton> */}

                                <input
                                    class="btn btn-primary"
                                    type="submit"
                                    value="Edit"

                                // className="btn btn-outline-warning btn-block mt-4"
                                />

                            </Link>





                        </Box>
                    </div>
                </div>
            </div>

        );
    }
}
// export default viewUserInfo;



export default connect(mapStateToProps)(viewUserInfo);
