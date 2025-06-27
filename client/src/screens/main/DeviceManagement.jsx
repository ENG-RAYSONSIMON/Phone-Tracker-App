import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import { useDeviceContext } from "../../context/DeviceContext";

const DeviceManagement = () => {
  const [myDeviceId, setMyDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const { devices, loading, addDevice, removeDevice } = useDeviceContext();

  useEffect(() => {
    const getOrGenerateDeviceId = async () => {
      let storedId = await SecureStore.getItemAsync("myDeviceId");
      if (!storedId) {
        storedId =
          Device.osInternalBuildId ||
          Math.random().toString(36).substring(2, 15);
        await SecureStore.setItemAsync("myDeviceId", storedId);
      }
      setMyDeviceId(storedId);
    };

    getOrGenerateDeviceId();
  }, []);

  const handleRegister = async () => {
    if (!deviceName || !myDeviceId) {
      Alert.alert("Please enter a device name.");
      return;
    }

    try {
      await addDevice(myDeviceId, deviceName);
      Alert.alert("Device registered successfully!");
      setDeviceName("");
    } catch (error) {
      Alert.alert("Error: Device already registered or network issue.");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Device", "Are you sure?", [
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
        label="Device ID"
        value={myDeviceId}
        style={{ marginBottom: 10 }}
        editable={false}
      />

      <TextInput
        label="Device Name"
        value={deviceName}
        onChangeText={setDeviceName}
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleRegister} loading={loading}>
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
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subHeader: { marginTop: 30, fontSize: 18, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceName: { fontSize: 16 },
  emptyText: { marginTop: 20, textAlign: "center", color: "#888" },
});

export default DeviceManagement;
