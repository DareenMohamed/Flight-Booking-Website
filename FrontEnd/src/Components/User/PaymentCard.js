

import React, { useState } from "react";
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { loadStripe } from "@stripe/stripe-js";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Checkmark } from 'react-checkmark'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import './PaymentCard.css'
import {
    CardElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import "./styles.css";
import { Card, CardContent } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import ReturnToHomeButton from './ReturnToHomeButton2'
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fce883",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#fce883"
            },
            "::placeholder": {
                color: "#10404c"
            }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

const CardField = ({ onChange }) => (
    <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
);

const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange
}) => (
    <div className="FormRow">
        <label htmlFor={id} className="FormRowLabel">
            {label}
        </label>
        <input
            className="FormRowInput"
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
        />
    </div>
);
const handlePayment = async (offer) => {
    let body = {
        email: "hawhaw"

    }

    console.log("220 ", body)
    let url = "http://localhost:8080/payment"

    axios
        .post(url, body)
        .then(res => {
            console.log("respnose: ", res)
            console.log("gamed louji!")
            //       setPaid(true);

        })
        .catch(error => {
            console.log("idiot!");
            console.log(error.message);
        })


};

const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
        style={{ background: "#10404c ", color: "wheat" }}
        // onClick={() => { handlePayment() }}
        className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </button>
);

const ErrorMessage = ({ children }) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

const ResetButton = ({ onClick }) => (
    <button type="button" className="ResetButton" onClick={onClick}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <path
                fill="#FFF"
                d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            />
        </svg>
    </button>
);



const handleMail = (props) => {


    const details = props.details;
    
    console.log("croissant 1", props.details);

   
    const departure = details.DepartingFlight;
    const returnFlight = details.ReturnFlight;
    //const userName = details.userName;

   // console.log("reservation croissant: ",reservation);
    console.log("departure croissant: ",departure);
    console.log("return croissant: ",returnFlight);
    //console.log(userName);


    let url2 = `http://localhost:8080/reservationByID/${details.ReservationID}`
    axios
        .get(url2)
        .then(res => {
            const reservation = res.data
            //props.setReservation(res.data);
            url2 = `http://localhost:8080/flightById/${reservation.DepartureFlightID}`
            axios
                .get(url2)
                .then(res => {                    
                   // props.setDepartingFlight(res.data);                 
                    url2 = `http://localhost:8080/flightById/${reservation.ReturnFlightID}`
                    axios
                        .get(url2)
                        .then(res => {                            
                            //props.setReturnFlight(res.data);                 
                            //console.log("props:",props)
                            // HENA 
                            url2 = `http://localhost:8080/userById/${reservation.UserID}`
                            axios
                                .get(url2)
                                .then(res => {
                                    console.log("respnose: ", res)
                                    console.log("gamed louji!")
                                    let User = res.data
                                   
                                   
                                    url2 = `http://localhost:8080/mail`
                                    let body = {

                                        Reservation: reservation,
                                        thisUser: User,
                                        Departing : departure,
                                        Returning : returnFlight
                                        
                                    }
                                    axios
                                        .post(url2, body)
                                        .then(res => {
                                            console.log("ba3atna el mail: ", res)
                                            // this.props.history.push(`/Seats/1`);
                                        })
                                })
                        })
                        .catch(error => {
                            console.log("idiot!");
                            console.log(error.message);
                        })
                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })
        })
        .catch(error => {
            console.log("idiot!");
            console.log(error.message);
        })



    ////////////////////////////////
}


const CheckoutForm = (props, { setAdult, setCabinClass, setChildren, details, setOrigin, setOriginName, setDestination, setDestinationName }) => {
    console.log(props.details.ReturnPrice)

    const stripe = useStripe();
    const elements = useElements();
    const type = props.type.type
    console.log("type", type)
    useEffect(() => {

        if (type == 1)
            setPrice(props.details.ReturnPrice + props.details.DeparturePrice)
        else if (type == 2)
            setPrice(props.details.DeparturePrice)
        else
            setPrice(props.details.ReturnPrice)

    }
        , []);

    const [error, setError] = useState(null);
    const [price, setPrice] = useState(0);
    const [cardComplete, setCardComplete] = useState(false);
    const [paid, setPaid] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: "",
        phone: "",
        name: ""
    });
    let history = useHistory();
    //console.log("h ", props.details.details.TotalPrice)
    const setPrice1 = () => {
        console.log("hiiiii", props.details.details.infants_on_lap)
        if (props.details.details.infants_in_seat == 1) {

            return props.details.details.ReturnPrice
        }
        else if (props.details.details.infants_on_lap == 1) {
            return props.details.details.DeparturePrice
        }
        else {
            return props.details.details.ReturnPrice + props.details.details.DeparturePrice
        }
    }
    // if (props.details.details.infants_in_seat==1) {
    //     setPrice(props.details.details.ReturnPrice)
    // }
    // else if (props.details.details.infants_on_lap==1) {
    //     setPrice(props.details.details.DeparturePrice)
    // }
    // else {
    //     setPrice(props.details.details.ReturnPrice + props.details.details.DeparturePrice)
    // }

    const classes = useStyles();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        if (error) {
            elements.getElement("card").focus();
            return;
        }

        if (cardComplete) {
            setProcessing(true);
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        });

        setProcessing(false);

        if (payload.error) {
            setError(payload.error);
        } else {
            setPaymentMethod(payload.paymentMethod);
            let body = {
                email: billingDetails.email,
                amount: price,

            }



            console.log("220 ", body)
            let url = "http://localhost:8080/payment"

            axios
                .post(url, body)
                .then(res => {
                    console.log("respnose: ", res)
                    setPaid(true);
                    handleMail(props);
                    console.log("ya croissant")
                })
                .catch(error => {
                    console.log("idiot!");
                    console.log(error.message);
                })

        }
    };

    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBillingDetails({
            email: "",
            phone: "",
            name: ""
        });
    };

    // const func = async (e) => {
    //     e.preventDefault();
    //     setOrigin("")
    //     setOriginName("")
    //     setDestination("")
    //     setDestinationName("")
    //     setCabinClass('Economy')
    //     setAdult(1)
    //     setChildren(0)
    //     console.log("detailsssssss------->: ", details)
    //     history.push('/');
    //     // })
    //     // .catch(error => {
    //     //     console.log("idiot!");
    //     //     console.log(error.message);
    //     // })
    // }

    return paid ? (
        <div className="Result">
            <div className="ResultTitle" role="alert">
                Payment successful
            </div>
            <div className="ResultMessage">
                <Checkmark size='xxLarge' />
            </div>
            <div style={{ marginRight: "6%", marginTop: "40%" }}>
                <ReturnToHomeButton />
            </div>
            {/* <ResetButton onClick={reset} /> */}
        </div>
    ) : (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Typography className={classes.title} variant="h5" component="h2">
                Payment Details
            </Typography>
            <fieldset className={classes.FormGroup}>
                <Field
                    label="Name"
                    id="name"
                    type="text"
                    placeholder=""
                    required
                    autoComplete="name"
                    value={billingDetails.name}
                    onChange={(e) => {
                        setBillingDetails({ ...billingDetails, name: e.target.value });
                    }}
                />
                <Field
                    label="Email"
                    id="email"
                    type="email"
                    placeholder=""
                    required
                    autoComplete="email"
                    value={billingDetails.email}
                    onChange={(e) => {
                        setBillingDetails({ ...billingDetails, email: e.target.value });
                    }}
                />
                <Field
                    label="Phone"
                    id="phone"
                    type="tel"
                    placeholder=""
                    required
                    autoComplete="tel"
                    value={billingDetails.phone}
                    onChange={(e) => {
                        setBillingDetails({ ...billingDetails, phone: e.target.value });
                    }}
                />
            </fieldset>
            <fieldset className={classes.FormGroup}>
                <CardField
                    onChange={(e) => {
                        setError(e.error);
                        setCardComplete(e.complete);
                    }}
                />
            </fieldset>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <SubmitButton processing={processing} error={error} disabled={!stripe}>
                EGP {price}
            </SubmitButton>
        </form>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: "500px",
        wordWrap: "break-word",
        // overflow,
        marginLeft: "38%",
        paddingTop: "10%",
        '& > *': {

        },
    },
    title: {
        fontSize: 22,
        marginTop: "-40px",
        marginBottom: "30px"
    },


    paper: {

        borderRadius: "15px",
        width: "353px",
        height: "590px",


    },

    FormRow: {
        display: " -ms-flexbox",
        display: "flex",
        //-ms-flex-align: "center",
        alignItems: "center",
        marginLeft: "15px",
        borderTop: '1px solid #819efc',
    },
    FormGroup: {
        margin: "0 15px 20px",
        padding: 0,
        borderStyle: "none",
        backgroundColor: "#708c94",
        //  color: "#9cdbff",
        // willChange: "opacity", "transform",
        // boxShadow: '0px 4px 8px 0 rgba(0.25, 0.25, 0.25, 0.25)',
        boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08)',
        // inset: '0 1px 0 #829fff',
        borderRadius: "4px"
    },












}));
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            lineHeight: "27px",
            color: "#212529",
            fontSize: "1.1rem",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

// const mapStateToProps = (state) => {
//     //console.log(state.DetailsReducer.details.destination)
//     return {
//         origin: state.DetailsReducer.details.origin,
//         origin_name: state.DetailsReducer.details.origin_name,
//         Reservation: state.DetailsReducer.details.Reservation,
//         DepartingFlight: state.DetailsReducer.details.DepartingFlight,
//         ReturnFlight: state.DetailsReducer.details.ReturnFlight,
//     };
// };

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
// const mapStateToProps = (state) => {
//     console.log("state.DetailsReducer.details")
//     console.log(state.DetailsReducer.details)
//     return {
//         details: state.DetailsReducer.details,
//         // allOffers: state.DetailsReducer.details.allOffers
//     };
// };


const mapStateToProps = (state) => {
    console.log("state.DetailsReducer.details")
    console.log("Croissant:", state.DetailsReducer.details)
    return {
        details: state.DetailsReducer.details,
        allOffers: state.DetailsReducer.details.allOffers,
        origin: state.DetailsReducer.details.origin,
        origin_name: state.DetailsReducer.details.origin_name,
        destination: state.DetailsReducer.details.destination,
        destination_name: state.DetailsReducer.details.destination_name,
        cabin_class: state.DetailsReducer.details.cabin_class,
        Adults: state.DetailsReducer.details.Adults,
        children: state.DetailsReducer.details.children,

    };
};

const mapDispatchToState = (dispatch) => {
    return {

        setCabinClass: (cabin_class) => {
            dispatch({ type: 'setCabinClass', payload: cabin_class });
        },
        setAdult: (Adults) => {
            dispatch({ type: 'setAdult', payload: Adults });
        },
        setChildren: (children) => {
            dispatch({ type: 'setChildren', payload: children });
        },
        setOrigin: (origin) => {
            dispatch({ type: 'setOrigin', payload: origin });
        },

        setOriginName: (origin_name) => {
            dispatch({ type: 'setOriginName', payload: origin_name });
        },

        setDestination: (destination) => {
            dispatch({ type: 'setDestination', payload: destination });
        },

        setDestinationName: (destination_name) => {
            dispatch({ type: 'setDestinationName', payload: destination_name });
        },



    };
};


export default connect(mapStateToProps)(PaymentCard);
function PaymentCard({ details }) {
    const classes = useStyles();
    //console.log("yala nbawaz el payment ", props)
    const type = useParams();
    console.log("yala nbawaz el payment ", type)
    //const {token} = useParams();
    return (
        // <div className="AppWrapper">
        //     <Elements stripe={stripePromise}>
        //         <CheckoutForm />
        //     </Elements>




        <div className={classes.root}>

            <Card className={classes.paper} elevation={3} >
                <CardContent >

                    <div style={{ marginTop: "50px" }} >
                        <Elements stripe={stripePromise}>
                            <CheckoutForm details={details} type={type} />
                        </Elements>
                    </div>
                </CardContent>
            </Card>
        </div >
        // </div>
    );
};

