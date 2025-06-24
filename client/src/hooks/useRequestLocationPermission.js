import { useCallback } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

export default function useRequestLocationPermission() {
  const requestPermission = useCallback(async () => {
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();

    if (fgStatus !== "granted" || bgStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need full location access to track your phone in the background."
      );
      return false;
    }

    return true;
  }, []);

  return requestPermission;
}
