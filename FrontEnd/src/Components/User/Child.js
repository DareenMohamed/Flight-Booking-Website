import React, { Component } from "react";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import dateformat from "dateformat";
import DateFnsUtils from "@date-io/date-fns";
import validator from "email-validator";
import isPhone from "is-phone";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export class Passenger extends Component {
    constructor(props) {
        console.log("sabahooooooo")
        super(props);

        let date = dateformat(this.props.date, "isoDate");
        date = new Date(date);
        console.log("date ===> ", date);
        date.setFullYear(date.getFullYear() - 15);
        date.setMonth(date.getMonth() + 1)
        let date1 = dateformat(this.props.date, "isoDate");
        date1 = new Date(date);

        date1.setFullYear(date1.getFullYear());
        console.log("date1: ", date)

        let born_on_date =
            this.state = {
                family_name: "",
                given_name: "",
                born_on: dateformat(date1, "isoDate"),
                gender: "m",

            };
    }





    handleGivenName = (event) => {
        this.setState(
            {
                given_name: event.target.value,
            },
            //   () => this.props.update(this.state, this.props.index)
        );
    };

    handleFamilyName = (event) => {
        this.setState(
            {
                family_name: event.target.value,
            },
            //  () => this.props.update(this.state, this.props.index)
        );
    };

    handleBirthdate = (date) => {
        console.log("lol ", date)
        this.setState(
            {
                born_on: date,
            },
            //   () => this.props.update(this.state, this.props.index)
        );
    };

    handleGender = (event) => {
        this.setState(
            {
                gender: event.target.value,
            },
            //   () => this.props.update(this.state, this.props.index)
        );
    };

    render() {
        const classes = this.props.classes;
        let date = this.props.date;
        date = new Date(date);
        date.setFullYear(date.getFullYear() - 16);
        if (this.props.name !== "Adult") {
            date.setDate(date.getDate() + 1)
        }


        const today = new Date()

        return (
            // <div style={{ marginBottom: "15px", display: "flex", flexDirection: "coloumn" }}>
            //     <GridContainer spacing={2} style={{ marginBottom: "20px", }}>
            //         <GridItem xs={11} style={{ marginLeft: "-32%", color: "#10404c " }}>
            //             <h4> {this.props.name + " " + this.props.number}</h4>
            //         </GridItem>
            //         {/* <div style={{ display: "flex", flexDirection: "row", flex: 1 }}> */}
            //         <GridItem style={{ marginLeft: "-35%" }} >
            //             <TextField
            //                 required
            //                 label="First Name"
            //                 onChange={this.handleGivenName}
            //                 inputProps={{ maxLength: 20 }}
            //             />
            //         </GridItem>
            //         <GridItem style={{}}>
            //             <TextField
            //                 required
            //                 label="Last Name"
            //                 onChange={this.handleFamilyName}
            //                 inputProps={{ maxLength: 20 }}
            //             />
            //         </GridItem>
            //         {/* </div> */}
            //         <div style={{ display: "flex", flexDirection: "row", flex: 1, marginTop: "10px", marginLeft: "90px" }}>
            //             {/* {this.props.name === "Adult" ? (
            //                 <GridItem xs={3} style={{ marginLeft: "100px" }}>
            //                     <MuiPickersUtilsProvider style={{ marginLeft: "100px" }} utils={DateFnsUtils}>
            //                         <KeyboardDatePicker
            //                             required
            //                             //maxDate={date}
            //                             color="primary"
            //                             disableToolbar
            //                             variant="inline"
            //                             format="MM/dd/yyyy"
            //                             margin="normal"
            //                             id="Birthdate"
            //                             openTo="year"
            //                             label="Birthdate"
            //                             //value={this.state.born_on}
            //                             onChange={this.handleBirthdate}
            //                             KeyboardButtonProps={{
            //                                 "aria-label": "change date",
            //                             }}
            //                         />
            //                     </MuiPickersUtilsProvider>
            //                 </GridItem>
            //             ) : (
            //                 <GridItem xs={3} style={{ paddingRight: 0 }}>
            //                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
            //                         <KeyboardDatePicker
            //                             required
            //                             minDate={date}
            //                             maxDate={today}
            //                             color="primary"
            //                             disableToolbar
            //                             variant="inline"
            //                             format="MM/dd/yyyy"
            //                             margin="normal"
            //                             id="Birthdate"
            //                             openTo="year"
            //                             label="Birthdate"
            //                             value={this.state.born_on}
            //                             onChange={this.handleBirthdate}
            //                             KeyboardButtonProps={{
            //                                 "aria-label": "change date",
            //                             }}
            //                         />
            //                     </MuiPickersUtilsProvider>
            //                 </GridItem>
            //             )} */}

            //             <GridItem xs={2} style={{ marginTop: "17px", marginLeft: "-65px" }}>
            //                 <FormControl
            //                     //className={classes.formControl}
            //                     style={{ minWidth: 80 }}
            //                     required
            //                 >
            //                     <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            //                     <Select
            //                         labelId="demo-simple-select-label"
            //                         id="demo-simple-select"
            //                         onChange={this.handleGender}
            //                         value={this.state.gender}
            //                     >
            //                         <MenuItem value={"m"}>Male</MenuItem>
            //                         <MenuItem value={"f"}>Female</MenuItem>
            //                     </Select>
            //                 </FormControl>
            //             </GridItem>
            //         </div>

            //     </GridContainer>
            //     <hr />
            // </div>

            <div style={{ marginBottom: "15px", padding: "16px", display: "flex", flexDirection: "coloumn" }}>
                <GridContainer spacing={2} style={{ marginBottom: "20px" }}>
                    <GridItem xs={11} style={{ marginLeft: "-32%", color: "#10404c " }}>
                        <h3> {this.props.name + " " + this.props.number + ":"}</h3>
                    </GridItem>
                    {/* <div style={{ display: "flex", marginLeft: "20%" }}> */}
                    <GridItem style={{ marginLeft: "-120%", marginTop: "5%" }}>
                        {/* <FormControl
                            // className={classes.formControl}
                            style={{ minWidth: 80 }}
                            required
                        >
                            <InputLabel id="demo-simple-select-label">Title</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={this.handleTitle}
                                value={this.state.title}
                                defaultValue="mr"
                                required
                            >
                                <MenuItem value={"mr"}>Mr.</MenuItem>
                                <MenuItem value={"mrs"}>Mrs.</MenuItem>
                                <MenuItem value={"miss"}>Miss</MenuItem>
                                <MenuItem value={"ms"}>Ms.</MenuItem>
                            </Select>
                        </FormControl> */}
                    </GridItem>
                    <GridItem xs={4} style={{ marginLeft: "-40%", marginTop: "7%" }} >
                        <TextField
                            required
                            label="First Name"
                            onChange={this.handleGivenName}
                            inputProps={{ maxLength: 20 }}
                        />
                    </GridItem>
                    <GridItem xs={4} style={{ marginTop: "7%" }}>
                        <TextField
                            required
                            label="Last Name"
                            onChange={this.handleFamilyName}
                            inputProps={{ maxLength: 20 }}
                        />
                    </GridItem>


                    <GridItem xs={2} style={{ marginTop: "7%" }}>
                        <FormControl
                            //   className={classes.formControl}
                            style={{ minWidth: 80 }}
                            required
                        >
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={this.handleGender}
                                value={this.state.gender}
                            >
                                <MenuItem value={"m"}>Male</MenuItem>
                                <MenuItem value={"f"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </GridItem>
                    {/* </div> */}
                </GridContainer>
                <hr />
            </div>
        );
    }
}

export default Passenger;
