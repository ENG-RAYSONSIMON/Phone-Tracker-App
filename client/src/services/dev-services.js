import { deviceApi } from './api-client';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export const registerDevice = async ({ deviceId, name }) => {
    try {
        const response = await deviceApi.post('/reg', { deviceId, name });
        return response.data;
    } catch (error) {
        console.error("Register device failed:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserDevices = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');

        if (!token) {
            throw new Error('No token found');
        }
        const decoded = jwtDecode(token);
        const ownerId = decoded.id;
        if (!ownerId) {
            throw new Error('Owner ID not found');
        }
        const response = await deviceApi.get(`/all/${ownerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const deleteDeviceById = async (id) => {
    try {
        const response = await deviceApi.delete(`/del/${id}`);
    } catch (error) {
        console.error('Error deleting device:', error);
        throw error;
    }
};