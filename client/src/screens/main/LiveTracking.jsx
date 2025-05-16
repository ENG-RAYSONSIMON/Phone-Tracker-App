import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useDeviceContext } from "../../context/DeviceContext";

export default function LiveTracking({navigation}) {
  
  const { devices } = useDeviceContext(); // Get devices from context

  const handleDevicePress = (device) => {
    navigation.navigate("MapScreen", { device });
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleDevicePress(item)}>
      <Text style={styles.deviceName}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Devices</Text>
      <Text style={styles.description}>
        Below is a list of your registered tracking devices. Each device
        represents an item or person you're monitoring.{"\n\n"}
        To see where a device is located in real time, simply tap on its name —
        you'll be taken to a map view showing its live position.
      </Text>

      <FlatList
        data={devices}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "left",
    marginBottom: 16,
    paddingHorizontal: 8,
    lineHeight: 22,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 8,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
});
