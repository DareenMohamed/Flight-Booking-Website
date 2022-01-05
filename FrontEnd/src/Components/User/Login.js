
import ResultCard from './ResultCard'
import { makeStyles } from "@material-ui/core/styles";
import ResultBack from "../../images/Results2.png";
import Pagination from './Paginations'
import LoginCard from './LoginCard'
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
        paddingTop: "10%"
    }

}));
function DepartingResults() {
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200&family=Inter:wght@100;200;300&family=Montserrat:wght@100;200;300&display=swap" rel="stylesheet"></link>


    const classes = useStyles();

    return (

        <div style={{ backgroundImage: `url(${ResultBack})`, height: "100vh", backgroundSize: "cover" }}>

            <div className={classes.page}>
                <div className={classes.results}>
                    <LoginCard />

                </div>
            </div>
        </div>

    );
}

export default DepartingResults;