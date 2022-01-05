const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reservationSchema = new Schema({
    UserID: {
        type: String,
        required: true,
    },
    DepartureFlightID: {
        type: String,
        required: true
    },
    ReturnFlightID: {
        type: String,
        required: true
    },
    CabinType: {
        type: String,
        required: true
    },
    TakenSeatsDeparting: {
        type: Array,
        required: false,
    },
    TakenSeatsArriving: {
        type: Array,
        required: false,
    },
    TotalPrice: {
        type: mongoose.Decimal128,
        required: true,
    },
    //ReservationNumber: {
      //  type: String,
        //required: true,
    //},

    Children: {
        type: Number,
        required: true,
    },
    Adults: {
        type: Number,
        required: true,
    },
    Number:{
        type: String,
        required:true,
    }

}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
