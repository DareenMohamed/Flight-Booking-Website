import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: "500px",
        wordWrap: "break-word",
        // overflow,
        marginLeft: "38%",
        // paddingTop: "100%",

        '& > *': {
            // margin: theme.spacing(1),
            // width: theme.spacing(16),
            // height: theme.spacing(16),
        },
    },

    paper: {

        borderRadius: "15px",
        width: "353px",
        height: "550px",
        marginLeft: "38%",
        //paddingTop: "10%"


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
        allOffers: state.DetailsReducer.details.allOffers
    };
};

const mapDispatchToState = (dispatch) => {
    return {

        setAllOffers: (allOffers) => {
            dispatch({ type: 'setAllOffers', payload: allOffers });
        },


    };
};


export default connect(mapStateToProps, mapDispatchToState)(SignIn);

function SignIn({ details }) {
    console.log("ANA GEEEEEEEEEEEEEEEET")
    const classes = useStyles();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [wrongCredentials, setwrongCredentials] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        let body = {
            'username': username ,
            'password': password ,
        }
        console.log("body: ", body)
        let url = "http://localhost:8080/login"

        axios
            .post(url, body)
            .then(res => {
                console.log(res)
                if (res.data.message == "Invalid Username or Password")
                    alert("Invalid Username or Password")
                else {
                    details.UserID = res.data.UserID
                    details.token = res.data.token
                    console.log(details)
                    console.log("details after login")

                    if (res.data.type == 1)
                        history.goBack();
                    else {
                        history.goBack();
                    }
                }
            })
            .catch(error => {
                console.log(error.message);
            })

    };

    return (
        <Card className={classes.paper} elevation={3} >
            <CardContent>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            //    autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                style={{ background: "#10404c ", color: "wheat", }}

                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" color="#10404c">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" color="#10404c">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container>
            </CardContent>
        </Card>
    );
}