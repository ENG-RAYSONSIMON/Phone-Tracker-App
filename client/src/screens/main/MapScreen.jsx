import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import socket from "../../services/webSocket";
import useRequestLocationPermission from "../../hooks/useRequestLocationPermission";
import {
  LOCATION_TASK_NAME,
  defineBackgroundLocationTask,
} from "../../hooks/backgroundLocationTask";

export default function MapScreen({ navigation, route }) {
  const { device } = route.params;
  const [location, setLocation] = useState(null);
  const [serverLocation, setServerLocation] = useState(null);

  useEffect(() => {
    const setup = async () => {
      // Save deviceId for background tracking
      if (device.deviceId) {
        await SecureStore.setItemAsync("deviceId", device.deviceId);
      }

      defineBackgroundLocationTask();

      const requestLocationPermission = useRequestLocationPermission();
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      );

      if (!hasStarted) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
          foregroundService: {
            notificationTitle: "Tracking Location",
            notificationBody: "We are tracking your location in the background.",
            notificationColor: "#1e1e1e",
          },
          pausesUpdatesAutomatically: false,
        });
      }

      const current = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    };

    setup();

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("location_broadcast", (data) => {
      if (data.deviceId === device.deviceId) {
        console.log("📡 Received location from server:", data.location);
        setServerLocation(data.location);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("location_broadcast");
    };
  }, [device]);

  const currentCoords = serverLocation || location;
  const fallbackCoords = { latitude: -6.8086855, longitude: 39.219476 };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Drawer")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.text}>Current location of {device.name}</Text>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: currentCoords?.latitude || fallbackCoords.latitude,
          longitude: currentCoords?.longitude || fallbackCoords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {currentCoords && (
          <Marker coordinate={currentCoords} title={device.name} />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "#1e1e1e",
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});
