import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    mobno: Number,
    driverLicense: String,
    address: String,
    carno: String,
    carType: String,
    pickupDate: String,
    returnDate: String

});

export const User = mongoose.model("user", userSchema);