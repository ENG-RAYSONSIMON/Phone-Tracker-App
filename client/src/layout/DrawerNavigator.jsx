import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//imported pages
import HomeScreen from "../screens/main/HomeScreen";
import LiveTracking from "../screens/main/LiveTracking";
import DeviceManagement from "../screens/main/DeviceManagement";
import CapturedImages from "../screens/main/CapturedImages";
import Support from "../screens/main/Support";

// This function retrieves the username from the token data
import { getUserNameFromToken } from "../services/token-data";

// logout function from the logout component
import useLogout from "../utils/logoutHandler";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [name, setName] = useState(null);
  const handleLogout = useLogout();

  useEffect(() => {
    const fetchName = async () => {
      const userName = await getUserNameFromToken();
      if (userName) setName(userName);
    };

    fetchName();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Ionicons name="person-circle-outline" size={80} color="white" />
        <Text style={styles.drawerTitle}>Welcome, {name}</Text>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        icon={() => <Ionicons name="home-outline" size={24} />}
      />
      <DrawerItem
        label="Live Tracking"
        onPress={() => props.navigation.navigate("Live Tracking")}
        icon={() => <Ionicons name="location-outline" size={24} />}
      />
      <DrawerItem
        label="Device Management"
        onPress={() => props.navigation.navigate("Device Management")}
        icon={() => <Ionicons name="phone-portrait-outline" size={24} />}
      />
      <DrawerItem
        label="Captured Images"
        onPress={() => props.navigation.navigate("Captured Images")}
        icon={() => <Ionicons name="camera-outline" size={24} />}
      />
      <DrawerItem
        label="Support & Help"
        onPress={() => props.navigation.navigate("Support & Help")}
        icon={() => <Ionicons name="help-circle-outline" size={24} />}
      />

      {/* Logout */}
      <DrawerItem
        label="Logout"
        onPress={handleLogout} // Replace with actual logout function
        icon={() => <Ionicons name="log-out-outline" size={24} color="red" />}
        labelStyle={{ color: "red" }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Live Tracking" component={LiveTracking} />
      <Drawer.Screen name="Device Management" component={DeviceManagement} />
      <Drawer.Screen name="Captured Images" component={CapturedImages} />
      <Drawer.Screen name="Support & Help" component={Support} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  drawerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default DrawerNavigator;
