import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    mobno: Number,

});

export const Admin = mongoose.model("admin", adminSchema);