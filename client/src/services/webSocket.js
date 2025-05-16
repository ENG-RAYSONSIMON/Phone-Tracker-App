import { io } from 'socket.io-client';
import Constants from "expo-constants";

const { SERVER_URL } = Constants.expoConfig.extra;

const socket = io(SERVER_URL, {
    transports: ['websocket'], // Ensures websocket is used instead of polling
});


export default socket;