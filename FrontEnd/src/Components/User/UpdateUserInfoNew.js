import flightsback from "../../images/Background3.jpeg";
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './ViewUserInfo.css'
// import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SideBar from './SideBar'
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Header from "./Header";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        details: state.DetailsReducer.details,
        UserID: state.DetailsReducer.details.UserID,
        token : state.DetailsReducer.details.token,
    };
};

const mapDispatchToState = (dispatch) => {
    return {
        setUserID: (UserID) => {
            dispatch({ type: 'setUserID', payload: UserID });
        },
        setToken: (token) => {
            dispatch({ type: 'setToken', payload: token });
        },  
    };
};


const useStyles = makeStyles((theme) => ({
    text: {

        flex: 1,
        display: "flex",
        marginTop: "-30px",
        justifyContent: "center",
        color: "black",
    },

    rectangle: {
        // padding: "30%",
        // width: "30%",
        // height: "50%",
        // justifyContent: "center",
        // background:"#FFFFFF",

        padding: theme.spacing(3, 2),
        marginLeft: "33%",
        height: "75%",
        width: "30%",
        textAlign: 'center',
        borderRadius: "30px",
        paddingTop: 65,
        backgroundColor: "#f5f5f5",
        boxShadow: '0px 4px 8px 0 rgba(0.25, 0.25, 0.25, 0.25)',


    },



    padding: {

        paddingTop: "10%",
    }
}));

export default connect(mapStateToProps, mapDispatchToState)(UpdateUserInfo);

function UpdateUserInfo(prop,{ details , setUserID , setToken }) {
    console.log(prop)
    const user = prop.match.params
    console.log("User: ", user.id)
    console.log("token : ", prop.details.token)
    console.log("id : ", prop.details.UserID)

    const [open, setOpen] = React.useState(false);
    const [info, setInfo] =React.useState({firstName:"", lastName:"", email:"", passportNumber:"", telephoneNumber1:"", telephoneNumber2:"", address:""});
    let history = useHistory();
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [passportNumber, setPassportNumber] = useState("")
    const [email, setEmail] = useState("")
    const [telephoneNumber1, setTelephoneNumber1] = useState("")
    const [telephoneNumber2, setTelephoneNumber2] = useState("")
    const [address, setAddress] = useState("")




    useEffect(() => {

        if(prop.details.UserID === ""){
            alert("You need to login to edit your profile!")
            history.push("/userlogin2");
        }
        else{
        axios.get('http://localhost:8080/UserByID/'+ user.id ,
        {
            headers: {
              "x-access-token" : prop.details.token
            }
        }
        ).then(
            res => {
                const result = res.data;
                if(result.isLoggedIn !== false){
                    console.log(res.data )
                    setFirstName(res.data.firstName)
                    setLastName(res.data.lastName)
                    setEmail(res.data.email)
                    setPassportNumber(res.data.passportNumber)
                    setTelephoneNumber1(res.data.telephone1)
                    setTelephoneNumber2(res.data.telephone2)
                    setAddress(res.data.address)
                }
                 else{
                     console.log("OH NO OH NO OH NO NO NO NO NO");
                     alert("You need to login to edit your profile!")
                     history.push("/userlogin2");
                 }
            })

            .catch(err => {
                console.log('Error');
            })    
        }
    }, []);


    
        




    const onSubmit = e => {
        let url = `http://localhost:8080/user/${user.id}`;

        let body = {
            "firstName": { firstName },
            "lastName": { lastName },
            "passportNumber": { passportNumber },
            "email": { email },
            "telephoneNumber1":{telephoneNumber1},
            "telephoneNumber2":{telephoneNumber2},
            "address":{address},
        }
        if(prop.details.UserID === ""){
            alert("You need to login to edit your profile!")
            history.push("/userlogin2");
        }
        else{

        axios.patch(url, body ,
            {
                headers: {
                  "x-access-token" : prop.details.token
                }
            })
            .then(async (response) => {
                const result = response.data;
                if(result.isLoggedIn !== false){
                alert("Info Updated Successfully!")
                // history.push("/usersflight");
                }else{
                    alert("You need to login to edit your profile!")
                    history.push("/userlogin2");
                }
            })
            .catch((e) => {

                console.log("ana hena")
                console.log("error ===>", e);
            });
        // window.location.reload(false);
        }
    };

    const classes = useStyles()


    // <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Inter:wght@100;200;300&family=Montserrat:wght@100;200;300&display=swap" rel="stylesheet"></link>


    return (

        <div style={{ backgroundImage: `url(${flightsback})`, minHeight: "130vh", backgroundSize: "cover" ,
        backgroundRepeat: "repeat-y" ,
    }}>
<Header/>
            <div >
           <div class="paddingup"  ></div>
<div className={classes.rectangle}>
<Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 5, width: '25ch' ,color: "black"},
      }}
      
      noValidate
      autoComplete="off"
    >
     
    <h3 class="colorHeader">
    <ManageAccountsIcon></ManageAccountsIcon> Edit Account      
    </h3>


      <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">First Name</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder= {firstName}
                        name='First Name'
                        // className='form-control'
                        
                        onChange={event => { setFirstName(event.target.value) }}
                    />
                </div>

                <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">Last Name</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder={lastName}
                        name='Last Name'
                        // className='form-control'
                        onChange={event => { setLastName(event.target.value) }}
                    />
                </div>





                <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">Passport Number</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder={passportNumber}
                        name='Passport Number'
                        // className='form-control'
                        onChange={event => { setPassportNumber(event.target.value) }}
                    />
                </div>


                <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">Email</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder={email}
                        name='Email'
                        // className='form-control'
                        onChange={event => { setEmail(event.target.value) }}
                    />
                </div>    

                <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">Telephone Number 1</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder={telephoneNumber1}
                        name='Telephone Number 1'
                        // className='form-control'
                        onChange={event => { setTelephoneNumber1(event.target.value) }}
                    />
                </div>    

                <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">Telephone Number 2</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder={telephoneNumber2}
                        name='Telephone Number 2'
                        // className='form-control'
                        onChange={event => { setTelephoneNumber2(event.target.value) }}
                    />
                </div>    

                <div class="col-md-6" className='form-group form-inline'>
                    <label class="form-label">Address</label>
                    <input
                        type='text'
                        class="form-control flex-fill"
                        placeholder={address}
                        name='Address'
                        // className='form-control'
                        onChange={event => { setAddress(event.target.value) }}
                    />
                </div>    

                <div class="padding">
                    </div>
                    <div class="rectangle4">

                  <input   onClick={() => {onSubmit() }}
                    class="btn btn-primary"
                    type="submit"
                    variant="outlined"
                   size="medium"
                    // color="blue"
                    class="btn btn-primary"
                    type="submit"
                    value="Update"
                // className="btn btn-outline-warning btn-block mt-4"
                    /> 
                    </div>

                    <div class="rectangle3">
                    <Link to={  { pathname: `/ViewUserInfo/` } }>
                    <input
                    class="btn btn-primary"
                    type="submit"
                    value="Back"
                    
                     />   
                    </Link>

                {/* <button class="rectangle2"
                onClick={() => {
                    this.props.history.goBack();
                }}
            >
                Back
            </button> */}


                        </div>

                        {/* <div class= "rectangle3">
                  <input   onClick={() => {onSubmit() }}
                    class="btn btn-primary"
                    type="submit"
                    variant="outlined"
                   size="medium"
                    // color="blue"
                    class="btn btn-primary"
                    type="submit"
                    value="Update"
                // className="btn btn-outline-warning btn-block mt-4"
                    /> 
                     </div> */}





                    </Box>
                </div>
            </div>
        </div>

    );
}