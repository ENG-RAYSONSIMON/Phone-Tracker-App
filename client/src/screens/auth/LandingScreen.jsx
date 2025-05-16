import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LandingScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.textWrapper}>
        <Text style={styles.title}>📱 Phone Tracker</Text>
        <Text style={styles.subtitle}>
          Track and secure your lost or stolen phone in real time.
        </Text>
        <Text style={styles.motto}>✨ Stay Connected, Stay Secure</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() =>
            navigation.navigate("AuthForm", { type: "login", title: "Login" })
          }
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() =>
            navigation.navigate("AuthForm", {
              type: "signup",
              title: "Sign Up",
            })
          }
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    marginBottom: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: "#d3d3d3",
    textAlign: "center",
    marginBottom: 10,
  },
  motto: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#aaa",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButton: {
    backgroundColor: "#1e90ff",
  },
  signupButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default LandingScreen;
