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
import { connect } from 'react-redux';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useHistory } from "react-router-dom";
// import bcrypt from 'bcrypt'


const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        details: state.DetailsReducer.details,

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

export default connect(mapStateToProps, mapDispatchToState)(ChangePassword);
function ChangePassword(prop,{ details  }) {
    // console.log(props.details)
    //const user = userr
    //console.log("USER HENNNAA",user)
    console.log("prop",prop)
    console.log("prop.details",prop.details)
    //console.log("PROP: ",prop);
    const user = prop.match.params
    //console.log("User: ", user)
    //console.log("userID: ", user.id)

    const [CurrentPassword, setCurrentPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    let history = useHistory();
    const onSubmit = e => {
      
        e.preventDefault();
        //console.log("fel submit ya croissant")
        let url = `http://localhost:8080/UserByID/${user.id}`;

        axios.get(url, {
            headers: {
                "x-access-token": prop.details.token
            }
        })
            .then(async (response) => {
                //console.log("response ya croissant", response)
                //response.data.password = await bcrypt.hash(response.data.password, 10);
                //console.log("response.data.password ya croissant: ", response.data)
                const result = response.data;
                console.log("response",response)
                if (result.isLoggedIn !== false) {
                    let body2 = {
                        'username': response.data.username,
                        'oldpassword': CurrentPassword,
                        'newpassword':newPassword,

                    }

                    let url2 = `http://localhost:8080/passwordCheck/${user.id}`;
                    console.log("BODY 2 HENA", body2)

                    axios.post(url2, body2, {
                        headers: {
                            "x-access-token": prop.details.token
                        }})
                        .then(async (response) => {
                            const result = response.data;
                             if (result.isLoggedIn !== false) {
                            console.log("response croissant", response)
                            if (response.data.message == "correct password") {
                                //alert("Password mazboota")
                                let url3 = `http://localhost:8080/changePassword/${user.id}`;
                                let body = {
                                    'password': newPassword,
                                }
                                axios.patch(url3, body)
                                    .then(async () => {
                                        //console.log("Tmam ya croissant")
                                        alert("Password Changed Successfully!")
                                    })

                                    .catch((e) => {
                                        //alert("Password doesn't match minimum requirments!")
                                        alert("7aga 3'alat")
                                        console.log("error ===>", e);
                                    });

                            }
                        }
                        else{
                            alert("You need to login to edit your profile!")
                            history.push("/userlogin2");
                        }
                        }
                        )

                        .catch((e) => {
                            alert("url2bayez")
                            console.log("error ===>", e);
                        });

                }
                else {
                    alert("You need to login to edit your profile!")
                    history.push("/userlogin2");
                }
            });



    };





    // console.log("User: ", user)
    // console.log("userID: ", user.id)
    // const [open, setOpen] = React.useState(false);
    // const [info, setInfo] =React.useState({firstName:"",lastName:"",email:"",passportNumber:""});
    // // let history = useHistory();

    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [passportNumber, setPassportNumber] = useState("")
    // const [email, setEmail] = useState("")




    // useEffect(() => {

    //     axios.get('http://localhost:8080/searchUserByID/'+ user.id ).then(
    //         res => {
    //             console.log(res.data )
    //             setFirstName(res.data.firstName)
    //             setLastName(res.data.lastName)
    //             setEmail(res.data.email)
    //             setPassportNumber(res.data.passportNumber)


    //             console.log(firstName)
    //         })

    //         .catch(err => {
    //             console.log('Error');
    //         })


    //     }
    //         , []);




    // const onSubmit = e => {   
    //     let url = `http://localhost:8080/user/${user.id}`;

    //     let body = {
    //         "firstName": { firstName },
    //         "lastName": { lastName },
    //         "passportNumber": { passportNumber },
    //         "email": { email }
    //     }

    //     axios.patch(url, body)
    //         .then(async (response) => {
    //             alert("Info Updated Successfully!")
    //             // history.push("/usersflight");
    //         })
    //         .catch((e) => {

    //             console.log("ana hena")
    //             console.log("error ===>", e);
    //         });
    //     // window.location.reload(false);

    // };

    const classes = useStyles()


    // <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Inter:wght@100;200;300&family=Montserrat:wght@100;200;300&display=swap" rel="stylesheet"></link>


    return (

        <div style={{ backgroundImage: `url(${flightsback})`, height: "100vh", backgroundSize: "cover" }}>
            <SideBar />
            <div className={classes.padding}>

                <div className={classes.rectangle}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 5, width: '25ch', color: "black" },
                        }}

                        noValidate
                        autoComplete="off"
                    >

                        <h3 class="colorHeader">
                            <VpnKeyIcon></VpnKeyIcon> Change My Password
                        </h3>


                        <div class="col-md-6" className='form-group form-inline'>
                            <label class="form-label">Current Password</label>
                            <input
                                type='password'
                                class="form-control flex-fill"
                                name='Current Password'
                                // className='form-control'

                                onChange={event => { setCurrentPassword(event.target.value) }}
                            />
                        </div>



                        <div class="col-md-6" className='form-group form-inline'>
                            <label class="form-label">New Password</label>
                            <input
                                type='password'
                                class="form-control flex-fill"
                                name='new password'
                                // className='form-control'
                                onChange={event => { setnewPassword(event.target.value) }}
                            />
                        </div>


                        <Button
                            style={{ background: "#10404c ", color: "wheat", marginTop: "10%", marginRight: "50%" }}
                            classname={classes.button2}
                            variant="contained"

                            size="small"
                            className={classes.button}

                            onClick={(e) => { onSubmit(e) }}
                        >
                            Change
                        </Button>


                        {/* <div class="rectangle3">
                    <Link to={  { pathname: `/ViewUserInfo/` } }>
                        
                     
                    <input
                    class="btn btn-primary"
                    type="submit"
                    value="Back"
                    
                     />   
                
                    </Link> */}

                        {/* <button class="rectangle2"
                onClick={() => {
                    this.props.history.goBack();
                }}
            >
                Back
            </button> */}


                        {/* </div> */}

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

