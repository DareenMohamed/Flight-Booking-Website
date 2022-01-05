
import ResultCard from './ResultCard'
import { makeStyles } from "@material-ui/core/styles";
import ResultBack from "../../images/Results2.png";
import Pagination from './Pagination2'
import Header from './Header'
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
function ReturningResults() {
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Inter:wght@100;200;300&family=Montserrat:wght@100;200;300&display=swap" rel="stylesheet"></link>


    const classes = useStyles();

    return (

        <div style={{ backgroundImage: `url(${ResultBack})`, minHeight: "100vh", maxWidth :"100%", backgroundSize: "cover" ,overflowX : "hidden" }}>
<Header/>
            <div className={classes.page}>
                <div className={classes.results}>
                    <Pagination />

                </div>
            </div>
        </div>

    );
}

export default ReturningResults;