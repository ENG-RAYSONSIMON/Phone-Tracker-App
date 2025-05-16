import axios from 'axios';
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store';

const { API_BASE_URL } = Constants.expoConfig.extra;

//Authentication endpoint
const API_AUTH_URL = `${API_BASE_URL}/auth`;

//device manipulation endpoint
const API_DEV_URL = `${API_BASE_URL}/dev`;

export const authApi = axios.create({
    baseURL: API_AUTH_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const device_api = axios.create({
    baseURL: API_DEV_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

device_api.interceptors.request.use(async req => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        req.headers.Authorization = 'JWT ' + token;
    }
    return req;
});

export const deviceApi = device_api;