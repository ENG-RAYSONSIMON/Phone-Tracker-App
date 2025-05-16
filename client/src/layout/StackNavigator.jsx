import React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/auth/LandingScreen";
import AuthForm from "../screens/auth/AuthForm";
import DrawerNavigator from "./DrawerNavigator";
import MapScreen from "../screens/main/MapScreen";
import LiveTracking from "../screens/main/LiveTracking";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const navigationRef = useNavigationContainerRef(); // Better navigation control

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        {/* Landing Page */}
        <Stack.Screen name="Landing" component={LandingScreen} />

        {/* Map Page */}
        <Stack.Screen name="MapScreen" component={MapScreen} />

        {/* Authentication Form */}
        <Stack.Screen
          name="AuthForm"
          component={AuthForm}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.title || "Authenticate",
          })}
        />

        {/* Drawer Navigation (Main App) */}
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
