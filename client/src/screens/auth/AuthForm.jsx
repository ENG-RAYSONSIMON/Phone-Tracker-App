import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser } from "../../services/auth-services";
import { useDeviceContext } from "../../context/DeviceContext";

const AuthForm = ({ navigation, route }) => {
  const { type, title } = route.params;
  const { fetchDevices } = useDeviceContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateForm = () => {
    if (type === "signup" && !formData.name) {
      setError("Name is required");
      return false;
    }

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleAuth = async () => {
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (type === "login") {
        const data = await loginUser(formData);
        console.log("Login Successfully:", data);
        await SecureStore.setItemAsync("token", data.token);
        await fetchDevices();

        if (navigation.isFocused()) {
          navigation.replace("Drawer");
        }
      } else {
        const data = await registerUser(formData);
        console.log("Registration successful");

        if (navigation.isFocused()) {
          navigation.replace("AuthForm", { type: "login", title: "Login" });
        }
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {type === "signup" && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
          autoFocus
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoFocus={type === "login"}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggle}
        >
          <Text>{showPassword ? "🙈" : "👁"}</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 10 }} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    paddingRight: 12,
  },
  toggle: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
