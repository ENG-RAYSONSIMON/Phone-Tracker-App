import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export const getUserNameFromToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (!token) throw new Error('No token found');

    const decoded = jwtDecode(token);
    return decoded.name;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
};