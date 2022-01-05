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
import Warning from "./Warning.js";
import validator from "email-validator";
import isPhone from "is-phone";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";

export class Passenger extends Component {
  constructor(props) {
    super(props);

    let date = dateformat(this.props.date, "isoDate");
    date = new Date(date);
    console.log("date ===> ", date);
    if (this.props.name === "Adult") date.setFullYear(date.getFullYear() - 16);

    this.state = {
      title: "mr",
      family_name: "",
      given_name: "",
      born_on: dateformat(date, "isoDate"),
      gender: "m",
      phone_number: "",
      email: "",
    };
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value }, () =>
      this.props.update(this.state, this.props.index)
    );
  };

  handleTitle = (event) => {
    this.setState(
      {
        title: event.target.value,
      },
      () => this.props.update(this.state, this.props.index)
    );
  };

  handleGivenName = (event) => {
    this.setState(
      {
        given_name: event.target.value,
      },
      () => this.props.update(this.state, this.props.index)
    );
  };

  handleFamilyName = (event) => {
    this.setState(
      {
        family_name: event.target.value,
      },
      () => this.props.update(this.state, this.props.index)
    );
  };

  handleBirthdate = (date) => {
    this.setState(
      {
        born_on: date,
      },
      () => this.props.update(this.state, this.props.index)
    );
  };

  handleGender = (event) => {
    this.setState(
      {
        gender: event.target.value,
      },
      () => this.props.update(this.state, this.props.index)
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
      <div style={{ marginBottom: "15px", padding: "16px", display: "flex", flexDirection: "coloumn" }}>
        <GridContainer spacing={2} style={{ marginBottom: "20px" }}>
          <GridItem xs={11} style={{ marginLeft: "-32%", color: "#10404c " }}>
            <h3> {this.props.name + " " + this.props.number + ":"}</h3>
          </GridItem>
          <GridItem style={{ marginLeft: "-35%", }}>
            <FormControl
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
            </FormControl>
          </GridItem>
          <GridItem xs={4} style={{ marginLeft: "-40%" }} >
            <TextField
              required
              label="First Name"
              onChange={this.handleGivenName}
              inputProps={{ maxLength: 20 }}
            />
          </GridItem>
          <GridItem xs={4} style={{}}>
            <TextField
              required
              label="Last Name"
              onChange={this.handleFamilyName}
              inputProps={{ maxLength: 20 }}
            />
          </GridItem>

          {/* {this.props.name === "Adult" ? (
            <GridItem xs={3} style={{ marginLeft: "20px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  maxDate={date}
                  color="primary"
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="Birthdate"
                  openTo="year"
                  label="Birthdate"
                  value={this.state.born_on}
                  onChange={this.handleBirthdate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
          ) : (
            <GridItem xs={3} style={{ marginLeft: "20px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  minDate={date}
                  maxDate={today}
                  color="primary"
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="Birthdate"
                  openTo="year"
                  label="Birthdate"
                  value={this.state.born_on}
                  onChange={this.handleBirthdate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </GridItem>
          )} */}

          <GridItem xs={2} style={{ marginLeft: "20px", marginTop: "17px" }}>
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
          <GridItem xs={6} style={{ marginTop: "17px" }}>
            <TextField required label="Email" onChange={this.handleEmail} />
            {!validator.validate(this.state.email) && (
              <Warning> Add a valid email.</Warning>
            )}
          </GridItem>
          <GridItem xs={6} style={{ marginLeft: "20px", marginTop: "15px" }}>
            <PhoneInput
              style={{ color: "#000000" }}
              country={"eg"}
              value={this.state.phone_number}
              onChange={(phone_number) =>
                this.setState({ phone_number: "+" + phone_number }, () =>
                  this.props.update(this.state, this.props.index)
                )
              }
            />
            {!isPhone(this.state.phone_number) && (
              <Warning> Add a valid Phone Number. </Warning>
            )}
          </GridItem>
        </GridContainer>
        <hr />
      </div>
    );
  }
}

export default Passenger;
