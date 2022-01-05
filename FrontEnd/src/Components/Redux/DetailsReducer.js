import moment from 'moment'
const today = new Date()
const date = moment(today).format().toString().substring(0, 10);
console.log("REDDDUXXX: ", date)
const initState = {

    details: {
        origin: "",
        origin_name: "",
        destination: "",
        destination_name: "",
        // today: new Date(),

        departure_date: date,
        return_date: date,
        tripType: "Round Trip",
        cabin_class: 'Economy',
        Adults: 1,
        children: 0,
        infants_on_lap: 0,
        infants_in_seat: 0,
        totalPassengers: 0,
        allOffers: [],
        selectedDepartingFlightID: "",
        selectedReturningFlightID: "",
        UserID: "",
        TakenSeatsDeparture: [],
        TakenSeatsReturn: [],
        DeparturePrice: 0,
        ReturnPrice: 0,
        TotalPrice: 0,
        EditingDeparture: 0,
        EditingReturn: 0,
        DepartingFlight: [],
        ReturnFlight: [],
        DepartingSeats: [],
        departingOffers: [],
        returningOffers: [],
        ReservationID: "",
        errorOccurred: false,
        token: "",
        //Reservation :["marky"],
        Reservation: [],
    },
};
const DetailsReducer = (state = initState, action) => {
    if (action.type == 'setEditingDeparture') {
        state.details.EditingDeparture = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setEditingReturn') {
        state.details.EditingReturn = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setReservation') {
        state.details.Reservation = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setError') {
        state.details.errorOccurred = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setReservationID') {
        state.details.ReservationID = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setDepartingOffers') {
        state.details.departingOffers = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setReturningOffers') {
        state.details.returningOffers = action.payload;
        return {
            ...state,
        };
    }


    if (action.type == 'setDepartingFlight') {
        state.details.DepartingFlight = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setDepartingSeats') {
        state.details.DepartingSeats = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setReturnFlight') {
        state.details.ReturnFlight = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setReturnPrice') {
        state.details.ReturnPrice = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setTotalPrice') {
        state.details.TotalPrice = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setDeparturePrice') {
        state.details.DeparturePrice = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setTakenSeatsReturn') {
        state.details.TakenSeatsReturn = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setTakenSeatsDeparture') {
        state.details.TakenSeatsDeparture = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setUserID') {
        state.details.UserID = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setToken') {
        state.details.token = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setSelectedDepartingFlightID') {
        state.details.selectedDepartingFlightID = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setSelectedReturningFlightID') {
        state.details.selectedReturningFlightID = action.payload;
        return {
            ...state,
        };
    }



    if (action.type == 'setOrigin') {
        state.details.origin = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setAllOffers') {
        state.details.allOffers = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setOriginName') {
        state.details.origin_name = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setDestinationName') {
        state.details.destination_name = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setDestination') {
        state.details.destination = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setDepartureDate') {
        state.details.departure_date = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setReturnDate') {
        state.details.return_date = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setTripType') {
        state.details.tripType = action.payload;
        return {
            ...state,
        };
    }

    if (action.type == 'setAdult') {
        state.details.Adults = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setChildren') {
        state.details.children = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setInfantsOL') {
        state.details.infants_on_lap = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setInfantsIS') {
        state.details.infants_in_seat = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setCabinClass') {
        state.details.cabin_class = action.payload;
        return {
            ...state,
        };
    }
    if (action.type == 'setTotalPassengers') {
        state.details.totalPassengers = action.payload;
        return {
            ...state,
        };
    }

    return state;
};

export default DetailsReducer;
