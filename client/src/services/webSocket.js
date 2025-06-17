import { io } from 'socket.io-client';
import Constants from "expo-constants";

const { API_BASE_URL } = Constants.expoConfig.extra;

const socket = io(API_BASE_URL, {
    transports: ['websocket'], // Ensures websocket is used instead of polling
});


export default socket;