import axios from "axios";
import { BASE_URL } from "./APIConstants";
import { getToken } from "../utils/TokenUtil";


export async function fetchUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/user`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function saveUser(userData) {
    try {
        const response = await axios.post(`${BASE_URL}/user`, userData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(email) {
    try {
        const response = await axios.delete(`${BASE_URL}/user/${email}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchUserByEmail(email) {
    try {
        const response = await axios.get(`${BASE_URL}/user/${email}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(updatedData, email) {
    try {
        const response = await axios.put(`${BASE_URL}/user/${email}`, updatedData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function rentCar(updatedData, email) {
    try {
        const response = await axios.put(`${BASE_URL}/user/rentcar/${email}`, updatedData, { headers: { 'Authorization': `Bearer ${getToken()}` } });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser(credentials) {
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, credentials);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}