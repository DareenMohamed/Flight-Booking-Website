import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
//import '../components/DatePicker.css'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { connect } from "react-redux";


const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        departure_date: state.DetailsReducer.details.departure_date,
        return_date: state.DetailsReducer.details.return_date,
    };
};
const mapDispatchToState = (dispatch) => {
    return {

        setDepartureDate: (departure_date) => {
            dispatch({ type: 'setDepartureDate', payload: departure_date });
        },
        setReturnDate: (return_date) => {
            dispatch({ type: 'setReturnDate', payload: return_date });
        },


    };
};
export default connect(mapStateToProps, mapDispatchToState)(MaterialUIPickers);

function MaterialUIPickers({ setDepartureDate, departure_date, return_date, setReturnDate }) {
    // The first commit of Material-UI
    console.log("date: ", departure_date)
    console.log("Return date: ", return_date)
    const [DepartureDate, setDeparture] = React.useState(new Date(), "isoDate");
    const [RetDate, setRetDate] = React.useState(new Date(), "isoDate");
    // setDeparture(DepartureDate);
    // setReturnDate(RetDate);

    const today = new Date();


    const handleDepartureDate = (date) => {
        let newdate = moment(date).format();
        let ret = newdate.substring(0, 10)
        //console.log("54: ", ret)

        setDepartureDate(ret);
        console.log("45: ", departure_date)
        setDeparture(date);
        setRetDate(date)
        console.log("returndate")
    };

    const handleReturnDate = (date) => {
        let newdate = moment(date).format();
        let ret = newdate.substring(0, 10)
        console.log("54: ", ret)
        setReturnDate(ret);
        setRetDate(date);
    };
    const dateFormatter = str => {
        return str;
    };

    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <div className="date">
                    <KeyboardDatePicker
                        required
                        minDate={today}
                        color="primary"
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        rifmFormatter={dateFormatter}
                        margin="normal"
                        id="Depature Date"
                        label="Depature Date"
                        value={departure_date}
                        onChange={handleDepartureDate}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </div>

            </Grid>
            <Grid container justifyContent="space-around">
                <div className="date">
                    <KeyboardDatePicker
                        required
                        minDate={DepartureDate}
                        color="primary"
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="Return Date"
                        label="Return Date"
                        value={return_date}
                        onChange={handleReturnDate}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </div>

            </Grid>
        </MuiPickersUtilsProvider>

    );
}
