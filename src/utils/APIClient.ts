import axios from "axios";
import {baseUrl} from "../constants.ts";

export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get_request = async (url: string) => {
    const {data} = await apiClient.get(url);
    return data;
};