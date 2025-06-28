import { useCallback } from "react";
import { Alert, Linking, Platform } from "react-native";
import * as Location from "expo-location";

export default function useRequestLocationPermission() {
  const requestPermission = useCallback(async () => {
    // 1. Ask for foreground permission first
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();

    if (fgStatus !== "granted") {
      Alert.alert(
        "Location Permission Needed",
        "We need location access to track your phone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }

    // 2. Ask for background permission (only on Android)
    if (Platform.OS === "android") {
      const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();

      if (bgStatus !== "granted") {
        Alert.alert(
          "Background Location Needed",
          "To track your phone in the background, please enable background location.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return false;
      }
    }

    return true;
  }, []);

  return requestPermission;
}
