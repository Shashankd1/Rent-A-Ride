import axios from "axios";
import { BASE_CARS_URL } from "./APIConstants";
import { getToken } from "../utils/TokenUtil";


export async function fetchCars() {
    try {
        const response = await axios.get(`${BASE_CARS_URL}/car`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function saveCar(carData) {
    try {
        const response = await axios.post(`${BASE_CARS_URL}/car`, carData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCar(carno) {
    try {
        const response = await axios.delete(`${BASE_CARS_URL}/car/${carno}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchCarByCarno(carno) {
    try {
        const response = await axios.get(`${BASE_CARS_URL}/car/${carno}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateCar(updatedData, carno) {
    try {
        const response = await axios.put(`${BASE_CARS_URL}/car/${carno}`, updatedData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}