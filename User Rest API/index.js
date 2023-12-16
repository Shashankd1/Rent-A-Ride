import express from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { User } from './UserModel.js';
import { DELETE_SUCCESS, ERROR_MESSAGE, INSERT_SUCCESS, USER_NOT_FOUND, UPDATE_SUCCESS } from './constants.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


function verifyToken(request, response, next) {
    const header = request.get('Authorization');
    if (header) {
        const token = header.split(" ")[1];
        jwt.verify(token, "secret1234", (error, payload) => {
            if (error) {
                response.status(StatusCodes.UNAUTHORIZED).send({ message: "Invalid token" });
            } else {
                next();
            }
        });
    } else {
        response.status(StatusCodes.UNAUTHORIZED).send({ message: "Please login first" });
    }

}

const app = express();
app.use(cors());
app.use(express.json());

const connectDb = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
        console.log("Database connection created !")
    } catch (error) {
        console.log(error);
    }
}

app.post("/user", async(request, response) => {
    try {
        const reqData = request.body;
        reqData['password'] = bcrypt.hashSync(reqData.password, 10);
        const user = new User(reqData);
        await user.save();
        response.status(StatusCodes.CREATED).send({ message: INSERT_SUCCESS });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.get("/user", verifyToken, async(request, response) => {
    try {
        const users = await User.find();
        response.send({ users: users });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.post("/user/login", async(request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        console.log(user);
        if (user) {
            if (bcrypt.compareSync(request.body.password, user.password)) {
                const token = jwt.sign({ userEmail: user.email }, "secret1234");
                response.status(StatusCodes.OK).send({ message: "Login successful", token: token });
            } else {
                response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid email or password" });
            }
        } else {
            response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid Email or password" });
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.get("/user/:email", verifyToken, async(request, response) => {
    try {
        const user = await User.findOne({ email: request.params.email });
        if (user == null) {
            response.status(StatusCodes.NOT_FOUND).send({ message: USER_NOT_FOUND });
        } else {
            response.send({ user: user });
        }

    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.delete("/user/:email", verifyToken, async(request, response) => {
    try {
        await User.deleteOne({ email: request.params.email });
        response.send({ message: DELETE_SUCCESS });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.put("/user/:email", verifyToken, async(request, response) => {
    try {
        await User.updateOne({ email: request.params.email }, request.body);
        response.send({ message: UPDATE_SUCCESS });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.put("/user/rentcar/:email", verifyToken, async(request, response) => {
    try {
        await User.updateOne({ email: request.params.email }, request.body);
        response.send({ message: UPDATE_SUCCESS });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.listen(4666, () => {
    console.log('server started on port:4666');
    connectDb();
})