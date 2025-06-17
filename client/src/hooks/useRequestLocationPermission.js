import { useCallback } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

export default function useRequestLocationPermission() {
  const requestPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need location access to show your position."
      );
      return false;
    }

    return true;
  }, []);

  return requestPermission;
}
