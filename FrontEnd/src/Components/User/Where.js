import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./Searchbar.css";

import * as airports from "airportsjs"
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import FlightIcon from '@material-ui/icons/Flight';
import { blue } from "@material-ui/core/colors";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FlightLandIcon from '@material-ui/icons/FlightLand';
const useStyles = makeStyles((theme) => ({
    root: {

        margin: theme.spacing(1),
        height: "71px",
        flex: 1,
        // position: 'absolute',
        direction: "flex",
    },
    text: {
        display: "flex",
        flexDirection: "row",
        color: "black",

    },


    a: {
        '&:hover': {
            color: "grey",
        },
        textdecoration: "none!important",
        color: "black"
    },

    testssss: {
        height: "100px",
        width: "100px",
        backgroundcolor: "green"
    }


}
));
const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        destination_name: state.DetailsReducer.details.destination_name,
        destination: state.DetailsReducer.details.destination,

    };
};
const mapDispatchToState = (dispatch) => {
    return {
        setDestination: (destination) => {
            dispatch({ type: 'setDestination', payload: destination });
        },
        setDestinationName: (destination_name) => {
            dispatch({ type: 'setDestinationName', payload: destination_name });
        },

    };
};
export default connect(mapStateToProps, mapDispatchToState)(BasicTextFields);


function BasicTextFields({ placeholder, destination, setDestination, destination_name, setDestinationName }) {
    const styles = useStyles({

    });

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState(destination_name);
    // const value = {input};
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        console.log("value", searchWord)
        setWordEntered(searchWord);
        const newFilter = airports.searchByAirportName(searchWord)
        //   (value) => {
        //   return value.name.toLowerCase().includes(searchWord.toLowerCase());
        // });
        console.log("new filter", newFilter)
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        console.log("filteredData", filteredData)

    };

    const final = null;
    const clicked = (value, e) => {
        setWordEntered(value.name);
        console.log({ wordEntered });
        console.log({ value });
        // final={value};
        setFilteredData([]);
        setDestinationName(value.name)
        setDestination(value.iata)
        console.log("destination", destination)
    };



    function SearchBar({ placeholder, data }) {


        const handleFilter = (event) => {
            const searchWord = event.target.value;
            setWordEntered(searchWord);
            const newFilter = data.filter((value) => {
                return value.title.toLowerCase().includes(searchWord.toLowerCase());
            });

            if (searchWord === "") {
                setFilteredData([]);
            } else {
                setFilteredData(newFilter);
            }
        };

        const clearInput = () => {
            setFilteredData([]);
            setWordEntered("");
        };

    }
    //   SearchBar({placeholder,data})
    return (
        <form className={styles.root} noValidate autoComplete="off">
            <div className={styles.text}>

                <div className="resultsTo">
                    <div className="searchInputTo">

                        <TextField

                            id="filled-basic" value={wordEntered} onChange={(event) => { handleFilter(event) }} type="search" label={placeholder} variant="filled"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> <FlightLandIcon /></InputAdornment>,
                            }} />
                        {/* <FormControl >
              <InputLabel htmlFor="input-with-icon-adornment">To</InputLabel>
              <Input
                value={wordEntered} onChange={(event) => { handleFilter(event) }} type="search" label={placeholder} variant="filled"
                startAdornment={
                  <InputAdornment position="start">
                    <FlightTakeoffIcon />
                  </InputAdornment>
                }
              />
            </FormControl> */}
                    </div>
                    {filteredData.length != 0 && (
                        <div className="dataResultTo" >

                            {filteredData.slice(0, 15).map((value, key) => {
                                return (
                                    <a className="aTo" onClick={(e) => clicked(value, e)} target="_blank">
                                        <p>{value.name} </p>
                                    </a>

                                );
                            })}
                        </div>
                    )}
                </div>


            </div>

        </form>
    );
}