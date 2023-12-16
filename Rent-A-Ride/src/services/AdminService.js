import axios from "axios";
import { BASE_ADMIN_URL } from "./APIConstants";

export async function login(credentials) {
    const response = await axios.post(`${BASE_ADMIN_URL}/admin/login`, credentials);
    return response.data;
}