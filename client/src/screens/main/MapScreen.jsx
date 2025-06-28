import React, { useEffect, useState, useRef } from "react";
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
  const [myDeviceId, setMyDeviceId] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const setup = async () => {
      const storedId = await SecureStore.getItemAsync("myDeviceId");
      setMyDeviceId(storedId);

      await SecureStore.setItemAsync("targetDeviceId", device.deviceId);
      defineBackgroundLocationTask();

      const requestLocationPermission = useRequestLocationPermission();
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const isSelf = storedId === device.deviceId;

      if (isSelf) {
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
        const coords = {
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        };
        setLocation(coords);

        // Animate to current location
        mapRef.current?.animateToRegion({
          ...coords,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }, 1000);
      }
    };

    setup();

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("location_broadcast", (data) => {
      if (data.deviceId === device.deviceId) {
        console.log("📡 Received location from server:", data.location);
        setServerLocation(data.location);

        // Animate to received location
        mapRef.current?.animateToRegion({
          ...data.location,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }, 1000);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("location_broadcast");
    };
  }, [device]);

  const fallbackCoords = { latitude: -6.8086855, longitude: 39.219476 };

  const initialRegion = {
    latitude: fallbackCoords.latitude,
    longitude: fallbackCoords.longitude,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  };

  const markerCoords = serverLocation || location;

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
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {markerCoords && (
          <Marker coordinate={markerCoords} title={device.name} />
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
  backButton: { marginRight: 10 },
  text: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  map: { flex: 1 },
});
