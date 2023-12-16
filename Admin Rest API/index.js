import express from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { DELETE_SUCCESS, ERROR_MESSAGE, INSERT_SUCCESS, USER_NOT_FOUND, UPDATE_SUCCESS } from './constants.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from './AdminModel.js';

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
        await mongoose.connect('mongodb://127.0.0.1:27017/admindb');
        console.log("Database connection created !")
    } catch (error) {
        console.log(error);
    }
}

app.post("/admin", async(request, response) => {
    try {
        const reqData = request.body;
        reqData['password'] = bcrypt.hashSync(reqData.password, 10);
        const admin = new Admin(reqData);
        await admin.save();
        response.status(StatusCodes.CREATED).send({ message: INSERT_SUCCESS });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});


app.post("/admin/login", async(request, response) => {
    try {
        const admin = await Admin.findOne({ email: request.body.email });
        if (admin) {
            if (bcrypt.compareSync(request.body.password, admin.password)) {
                const token = jwt.sign({ userEmail: admin.email }, "secret1234");
                response.status(StatusCodes.OK).send({ message: "Login successful", token: token });
            } else {
                response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid email or password" });
            }
        } else {
            response.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.get("/admin/:email", verifyToken, async(request, response) => {
    try {
        const admin = await Admin.findOne({ email: request.params.email });
        if (admin == null) {
            response.status(StatusCodes.NOT_FOUND).send({ message: USER_NOT_FOUND });
        } else {
            response.send({ admin: admin });
        }

    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: ERROR_MESSAGE });
    }
});

app.listen(4556, () => {
    console.log('server sarted on port:4556');
    connectDb();
})