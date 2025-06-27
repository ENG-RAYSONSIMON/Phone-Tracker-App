import { useNavigation } from "@react-navigation/native";
import { useDeviceContext } from "../context/DeviceContext";
import * as SecureStore from "expo-secure-store";

const useLogout = () => {
  const navigation = useNavigation();
  const { logout } = useDeviceContext();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("targetDeviceId"); // Clear tracking state
      logout();
      console.log("User logged out...");
      navigation.navigate("Landing");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return handleLogout;
};

export default useLogout;
