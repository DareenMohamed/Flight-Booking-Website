const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const flightSchema = new Schema({

  FlightNumber: {
    unique:true,
    type: String,
    required: true
  },

  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true
  },
  DepartureDate: {
    type: Date,
    required: true,
  },
  ArrivalDate: {
    type: Date,
    required: true,
  },
  
  EconomySeats: {
    type: Number,
    required: true
  },

  BusinessSeats: {
    type: Number,
    required: true
  },
  FirstSeats: {
    type: Number,
    required: true
  },

  EconomyBags: {
    type: Number,
    required: true
  },

  BusinessBags: {
    type: Number,
    required: true
  },
  FirstBags: {
    type: Number,
    required: true
  },

  
  PriceEconomy: {
    type: mongoose.Decimal128,
    required: true
  },

  PriceBusiness: {
    type: mongoose.Decimal128,
    required: true
  },
  PriceFirst: {
    type: mongoose.Decimal128,
    required: true
  },

  DepartureTime: {
    type: String,
    required: true
  },
  ArrivalTime: {
    type: String,
    required: true
  },

  
  RemEconomy: {
    type: Number,
    required: true
  },

  RemBusiness: {
    type: Number,
    required: true
  },
  RemFirst: {
    type: Number,
    required: true
  },

  EconomySeatsArray:{ 
    type:Array,
    required:true
  },
  BusinessSeatsArray:{ 
    type:Array,
    required:true
  },
  FirstSeatsArray:{  
    type:Array,
    required:true
  },



}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;