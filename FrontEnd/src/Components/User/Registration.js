
import { makeStyles } from "@material-ui/core/styles";
import ResultBack from "../../images/Results2.png";

import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import PersonIcon from '@mui/icons-material/Person';
import Header from "./Header";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
const steps = ['', ''];

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: "10px",
        borderRadius: "10px",
        width: "40%",
        height: "550px",
        marginLeft: "30%",

    },
    title: {
        fontSize: 22,
    },

    text: {
        marginLeft: "11%",
        marginTop: "-65%",
        width: "100%",
        //fontSize: theme.typography.pxToRem(14),
        height: "30%",

    },

}));

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToState)(Register);


function Register({ details , setUserID , setToken}) {
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Inter:wght@100;200;300&family=Montserrat:wght@100;200;300&display=swap" rel="stylesheet"></link>
    const classes = useStyles();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [address, setAddress] = useState("");
    const [telephone1, setTelephone1] = useState("");
    const [telephone2, setTelephone2] = useState("");
    const [usernameTaken , setUsernameTaken] = useState(false);

    const [validated, setValidated] = useState(false);

    let token = "";
    let UserId = "";

    const [isError, setIsError] = useState({ email: '', password: ''});
    const [isEmailError , setIsEmailError] = useState(false); 

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());


    const isStepOptional = (step) => {
      return step === 1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
  

    const handleNext = () => {
        
        let body = {
            'username': username
        }
        let url = "http://localhost:8080/CheckUsername"
        axios.post(url, body)
             .then(res => {
               console.log(res.data.message)
               if(res.data.message === "not"){
                setUsernameTaken(false);

                let newSkipped = skipped;
                if (isStepSkipped(activeStep)) {
                  newSkipped = new Set(newSkipped.values());
                  newSkipped.delete(activeStep);
                }
            
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);

               }
               else{
                   console.log()
                   setUsernameTaken(true);
                   
               }
            })
            .catch(error => {
                console.log(error.message);
            })

    };


  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    
    const regExp = RegExp(
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        )
                
    const formValChange = e => {
        console.log(e.target)
        console.log(e.target.value + "  <----valueee")
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
/* add it fel state
            case "username":
            isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
*/ 
            case "email":
            setEmail(value)    
            isError.email = regExp.test(value) ? "" : "Email address is invalid";
            if( !regExp.test(value)){
                setIsEmailError(true);
            }
            else{
                setIsEmailError(false);
            }
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            default:
                break;
        }

        setIsError({
            [name]: value
        })

        console.log(isError.email + "  error message")
    };


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        setValidated(true);
        setActiveStep(steps.length); 
        let body = {
            'username': username,
            'email': email,
            'password': password,
            'firstName': firstName,
            'lastName': lastName,
            'passportNumber': passportNumber,
            'address': address,
            'telephone1': telephone1,
            'telephone2': telephone2

        }
        let url = "http://localhost:8080/register"
        axios
            .post(url, body)
            .then(res => {
               token = res.data.token;
               setUserID(res.data.UserId);
               setToken(res.data.token);

            })
            .catch(error => {
                console.log(error.message);
            })
}
};  

   

    return (

        <div style={{ backgroundImage: `url(${ResultBack})`, height: "130vh", backgroundSize: "cover" }}>
<Header/>
            <div className={classes.page}>
                <div className={classes.results} style={{paddingTop :'7%'}}>
                    <Card className={classes.paper} elevation={3}>
                        <CardContent>
                            <Container component="main" >
                                <CssBaseline />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >

                                    <Avatar   sx={{ width: 50, height: 50 , bgcolor: '#226AC7'  }}>
                                        <PersonIcon  sx={{ width: 40, height: 40  }}/>
                                    </Avatar>
                                    <hr/>

                                   
                                    <Typography component="h1" variant="h5">
                                        Create Account
                                    </Typography>

                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                    <Stepper activeStep={activeStep}>
                                            {steps.map((label, index) => {
                                                const stepProps = {};
                                                const labelProps = {};
                                                    if (isStepSkipped(index)) {
                                                        stepProps.completed = false;
                                                    }
                                                    return (
                                                        <Step key={label} {...stepProps}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>

                                            <br/>

                                        {activeStep === steps.length ? (

                                            <React.Fragment>
                                                <Typography sx={{ mt: 3, mb: 2, fontWeight: "bolder" }}>
                                                    Acount Created Successfully!
                                                </Typography>
                                                
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    <Button variant="contained" sx = {{marginRight:"14.5%"}}
                                                        onClick={() => {
                                                            history.push("/");
                                                        }}
                                                    >Start Booking&nbsp; <FlightOutlinedIcon /></Button>

                                                </Box>
                                            </React.Fragment>
                                        ) : (

                                            <React.Fragment>
                                                {activeStep === 0 ?
                                                    <div>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="validationCustom01">
                                                                    <FloatingLabel controlId="floatingFirstName" label="First name *" >

                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            onChange={e => setFirstName(e.target.value)}
                                                                            value = {firstName}
                                                                            minlength = "2"

                                                                        />

                                                                    </FloatingLabel>
                                                                    <Form.Control.Feedback type="invalid">Firstname is required!</Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Col>


                                                            <Col>
                                                                <Form.Group controlId="validationCustom02">
                                                                    <FloatingLabel controlId="floatingLastName" label="Last name *" >
                                                                        <Form.Control
                                                                            required
                                                                            type="text"
                                                                            onChange={e => setLastName(e.target.value)}
                                                                            value = {lastName}
                                                                            minlength = "2"
                                                                        />
                                                                    </FloatingLabel>
                                                                    <Form.Control.Feedback type="invalid">
                                                                            Lastname is required!
                                                                        </Form.Control.Feedback>                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="validationCustomUsername">
                                                                    <FloatingLabel controlId="floatingUsername" label="Username *" >

                                                                        <Form.Control
                                                                            type="text"
                                                                            aria-describedby="inputGroupPrepend"
                                                                            required
                                                                            onChange={e => setUsername(e.target.value)}
                                                                            value = {username}
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">
                                                                            Username is required!
                                                                        </Form.Control.Feedback>
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId="validationCustomPassword">
                                                                    <FloatingLabel controlId="floatingPassword" label="Password *" >

                                                                        <Form.Control
                                                                            type="password"
                                                                            aria-describedby="inputGroupPrepend"
                                                                            onChange={e => setPassword(e.target.value)}
                                                                            required
                                                                            value = {password}
                                                                            minlength = "8"
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">
                                                                            Password is required!
                                                                        </Form.Control.Feedback>
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="validationCustomEmail">
                                                                    <FloatingLabel controlId="floatingEmail" label="Email *" >
                                                                        <Form.Control
                                                                            type="email"
                                                                            aria-describedby="inputGroupPrepend"
                                                                            required
                                                                            name = "email"
                                                                            value = {email}
                                                                            onChange={e => setEmail(e.target.value)}
                                                                            pattern=".+@gmail\.com"
                                                                        />
                                                                    {/*
                                                                        {isEmailError &&
                                                                        <span className="text-danger">Please enter a valid email</span>
                                                                        }
                                                                    */}
                                                                        <Form.Control.Feedback type="invalid">
                                                                        Please enter a valid email                                                                        </Form.Control.Feedback>
                                                                    </FloatingLabel>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        {usernameTaken &&       
                                                            <Alert severity="error">Username already taken!</Alert>
                                                        }
                                                                       
                                                        

                                                    </div>

                                                        : (<div>
                                                           
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <FloatingLabel controlId="floatingPassport" label="Passport Number *" >
                                                                            <Form.Control
                                                                                type="text"
                                                                                aria-describedby="inputGroupPrepend"
                                                                                required
                                                                                onChange={e => setPassportNumber(e.target.value) }
                                                                                value = {passportNumber}
                                                                                
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                Passport Number is Required!
                                                                            </Form.Control.Feedback>
                                                                        </FloatingLabel>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <br />

                                                            <Row>
                                                                <Col>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <FloatingLabel controlId="floatingAddress" label="Address (optional)" >
                                                                            <Form.Control
                                                                                type="text"
                                                                                aria-describedby="inputGroupPrepend"
                                                                                onChange={e => setAddress(e.target.value)}
                                                                                value={address}

                                                                            />
                                                                        </FloatingLabel>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <  PhoneInput
                                                                            required
                                                                            placeholder="Telephone *"
                                                                            isValid={(value, country) => {
                                                                                if (value.match(/12345/)) {
                                                                                    return 'Invalid value: ' + value + ', ' + country.name;
                                                                                } else if (value.match(/1234/)) {
                                                                                    return false;
                                                                                } else {
                                                                                    if (value === country.countryCode || value === "") {
                                                                                        setTelephone1("")
                                                                                    }
                                                                                    else {
                                                                                        setTelephone1("+" + value)
                                                                                    }
                                                                                    return true;
                                                                                }
                                                                            }}
                                                                            value={telephone1}
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">Phone Number is Required!</Form.Control.Feedback>

                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>

                                                                <Col>
                                                                    <Form.Group controlId="validationCustom01">
                                                                        <PhoneInput
                                                                            placeholder="Telephone (optional)"
                                                                            isValid={(value, country) => {
                                                                                if (value.match(/12345/)) {
                                                                                    return 'Invalid value: ' + value + ', ' + country.name;
                                                                                } else if (value.match(/1234/)) {
                                                                                    return false;
                                                                                } else {
                                                                                    if (value === country.countryCode || value === "") {
                                                                                        setTelephone2("")
                                                                                    }
                                                                                    else {
                                                                                        setTelephone2("+" + value)
                                                                                    }
                                                                                    return true;
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, flex: '1 1 auto' }}>
                                                        <Box sx={{ flex: '1 1 auto' }} />
                                                        <Button type="submit" disabled={passportNumber === "" || telephone1 === ""}
                                                            >Submit</Button>

                                                        </Box>

                                            
                                            </div>)}

                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                        {activeStep === 1 ? 
                                                        <Button
                                                        color="inherit"
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        sx={{ mr: 1 , marginTop:"-75px" }}
                                                        >
                                                                Back
                                                            </Button>
                                                            :
                                                            <Button
                                                                color="inherit"
                                                                disabled={activeStep === 0}
                                                                onClick={handleBack}
                                                                sx={{ mr: 1 }}
                                                            >
                                                                Back
                                                            </Button>}

                                                        <Box sx={{ flex: '1 1 auto' }} />

                                                        <Button
                                                            onClick={handleNext}
                                                            disabled={activeStep === 1 ||
                                                                firstName === "" || lastName === "" || username === "" || password === "" || email === ""
                                                            }
                                                        >
                                                            {activeStep === steps.length - 1 ? '' : 'Next'}
                                                        </Button>

                                                    </Box>
                                          </React.Fragment>

                                        )}

                                    </Form>

                                </Box>

                            </Container>
                        </CardContent>
                    </Card>



                </div>
            </div>
        </div>

    );
}

//export default register;

/*



country={'eg'}



<Autocomplete
id="country-select-demo"
sx={{ width: 300 }}
options={countries}
autoHighlight
getOptionLabel={(option) => "+" + option.phone}
renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <img
        loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
          </Box>
          )}
          renderInput={(params) => (
              <TextField
          {...params}
          label="Country Code"
          inputProps={{
              ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
        }}
        />
        )}
        />
        
        
        
        
        
        
        
        
       <Col>
       
       
       
       
       
       
       
           <Autocomplete
               id="country-select-demo"
               options={countries}
               autoHighlight
               getOptionLabel={(option) => "+" + option.phone}
               renderOption={(props, option) => (
                   <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                       <img
                           loading="lazy"
                           width="20"
                           src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                           srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                           alt=""
                       />
                       {option.label} ({option.code}) +{option.phone}
                   </Box>
               )}
               renderInput={(params) => (
                   <TextField
                       {...params}
                       label="Country Code *"
                       inputProps={{
                           ...params.inputProps,
                           autoComplete: 'new-password', // disable autocomplete and autofill
                       }}
                   />
               )}
           />
       
       
       
       
       
       
       
       
       
       </Col>
        */