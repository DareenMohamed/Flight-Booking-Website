const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose=require("passport-local-mongoose");

const userSchema = new Schema({
    // userID:{
    //     type: String,
    //     required:
    // },
    username: {
        unique:true,
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passportNumber: {
        type: String,
        required: true
    },
    reservations: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    telephone1: {
        type: String,
        required: true
    },
    telephone2: {
        type: String,
        required: false
    },


}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;