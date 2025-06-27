import { useCallback } from "react";
import { Alert, Linking } from "react-native";
import * as Location from "expo-location";

export default function useRequestLocationPermission() {
  const requestPermission = useCallback(async () => {
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();

    if (fgStatus === "granted" && bgStatus === "granted") {
      return true;
    }

    if (fgStatus === "denied" || bgStatus === "denied") {
      Alert.alert(
        "Location Permission Required",
        "To track your phone, you need to allow location access in the background.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    } else {
      Alert.alert(
        "Permission Error",
        "Unexpected permission status. Please check your settings."
      );
    }

    return false;
  }, []);

  return requestPermission;
}
