
import ResultCard from './ResultCard'
import { makeStyles } from "@material-ui/core/styles";
import ResultBack from "../../images/Results2.png";
import PaymentCard from './PaymentCard'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InjectedCheckoutForm from './CheckoutForm';
const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        //backgroundColor: "#eff3f8",
        // height: "785px"

    },
    results: {
        // display: 'flex',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        //backgroundColor: "#EEEEEE",
        // height: "100%"
        // marginTop: "30%",
        // top: "100px",
    }

}));
function PaymentPage() {
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Inter:wght@100;200;300&family=Montserrat:wght@100;200;300&display=swap" rel="stylesheet"></link>

    const stripePromise = loadStripe('pk_test_51K8WOHIYl2C21a0ipNQ7WCFMRnk9uH4PWjzveKHYpTvSZDSpeRiSFzngUad1KrMlMgH4Gj2abYkBKgkiZU0I15k200aw9HHZ2P');
    const classes = useStyles();
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };
    return (

        <div style={{ backgroundImage: `url(${ResultBack})`, minHeight: "130vh", backgroundSize: "cover" }}>

            <div className={classes.page}>
                <div className={classes.results}>
                    <Elements stripe={stripePromise} >
                        <PaymentCard />
                    </Elements>
                </div>
            </div>
        </div>

    );
}

export default PaymentPage;