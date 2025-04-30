import axios from "axios";
import {baseUrl} from "../constants.ts";

export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get_request = async (url: string) => {
    console.log('baseUrl')
    console.log(baseUrl)
    const {data} = await apiClient.get(url);
    return data;
};