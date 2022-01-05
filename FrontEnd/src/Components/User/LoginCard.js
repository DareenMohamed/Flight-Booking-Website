import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
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
        allOffers: state.DetailsReducer.details.allOffers,
        UserID: state.DetailsReducer.details.UserID,
    };
};

const mapDispatchToState = (dispatch) => {
    return {

        setAllOffers: (allOffers) => {
            dispatch({ type: 'setAllOffers', payload: allOffers });
        },

        setUserID: (UserID) => {
            dispatch({ type: 'setUserID', payload: UserID });
        },


    };
};


export default connect(mapStateToProps, mapDispatchToState)(SignIn);

function SignIn({ details, setUserID }) {
    console.log("ANA GEEEEEEEEEEEEEEEET")
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        let body = {
            'email': { email },
            'password': { password },
        }
        console.log("body: ", body)
        let url = "http://localhost:8080/searchUser"

        axios
            .post(url, body)
            .then(res => {
                console.log("respnose: ", res.data)

                // setResult(res.data)
                // window.scroll(0, 9950)
                console.log("cond: ", res)
                if (res.data[0].type == 1) {
                    // details.UserID = res.data[0]._id
                    setUserID(res.data[0]._id)
                    history.push('/Summary');
                }
                else {
                    //<Alert severity="error">Wrong Username or Password!</Alert>
                    
                    console.log("not user")

                }
                console.log("gamed louji!")
            })
            .catch(error => {
                alert("Incorrect Username or Password!")
                console.log("idiot!");
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
                                id="email"
                                label="Username"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                //  autoComplete="email"
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
                    {/* <Box sx={{ width: '100%' }}>
                    <Collapse in={this.state.fail}>
                        <Alert severity="error"
                            sx={{ mb: 2 }}
                        >
                            Wrong Username or Password!
                        </Alert>
                    </Collapse>
                </Box> */}
                </Container>
            </CardContent>
        </Card>
    );
}