import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import socket from "../../services/webSocket";

export default function MapScreen({ navigation, route }) {
  const { device } = route.params;
  const [location, setLocation] = useState(null);
  const [serverLocation, setServerLocation] = useState(null);

  useEffect(() => {
    
    let locationSubscription = null;

    const requestAndTrackLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need location access to show your position."
        );
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setLocation(coords);

          socket.emit("location_update", {
            deviceId: device._id,
            location: coords,
          });
        }
      );
    };

    requestAndTrackLocation();

    // Handle socket connection events
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Listen to location broadcasts from server
    socket.on("location_broadcast", (data) => {
      if (data.deviceId === device._id) {
        console.log("Server location update:", data.location);
        setServerLocation(data.location);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
      socket.off("server_message");
      socket.off("location_broadcast");
    };
  }, []);

  const currentCoords = serverLocation || location;

  const fallbackCoords = {
    latitude: -6.8086855,
    longitude: 39.219476,
  };

  return (
    <View style={styles.container}>
      {/* Top header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Drawer")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.text}>Current location of {device.name}</Text>
      </View>

      {/* Main map view */}
      <MapView
        style={styles.map}
        region={{
          latitude: currentCoords?.latitude || fallbackCoords.latitude,
          longitude: currentCoords?.longitude || fallbackCoords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
        showsUserLocation={true}
      >
        {/* Marker for the device location */}
        {currentCoords && (
          <Marker coordinate={currentCoords} title={device.name} />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
