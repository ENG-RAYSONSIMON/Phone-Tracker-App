import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";
import { useDeviceContext } from "../../context/DeviceContext";

// Function to generate a unique device ID
const generateUniqueId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return 'XXXX-XXXX-XXXX'.replace(/[X]/g, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  );
};

const DeviceManagement = () => {
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const { devices, loading, addDevice, removeDevice } = useDeviceContext();

  // Generate device ID automatically when component mounts
  useEffect(() => {
    const newId = generateUniqueId();
    setDeviceId(newId);
  }, []);

  const handleRegister = async () => {
    if (!deviceId || !deviceName) {
      Alert.alert("Please enter both Device ID and Name");
      return;
    }

    try {
      await addDevice(deviceId, deviceName);
      Alert.alert("Device registered successfully!");
      setDeviceId(generateUniqueId()); // generate new ID after registering
      setDeviceName("");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error registering device");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Device", "Are you sure you want to delete this device?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => confirmDelete(id),
      },
    ]);
  };

  const confirmDelete = async (id) => {
    try {
      await removeDevice(id);
    } catch (error) {
      Alert.alert("Failed to delete device");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        <IconButton icon="trash-can-outline" iconColor="#e74c3c" size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.header}>Register New Device</Text>

      <TextInput
        label="Device IMEI"
        value={deviceId}
        style={{ marginBottom: 10 }}
        editable={false} // Make it read-only
      />
      <TextInput
        label="Device Name"
        value={deviceName}
        onChangeText={setDeviceName}
        style={{ marginBottom: 20 }}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
      >
        Register Device
      </Button>

      <Text style={styles.subHeader}>My Devices</Text>

      <FlatList
        data={devices}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No devices registered yet.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 16,
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
  },
});

export default DeviceManagement;
