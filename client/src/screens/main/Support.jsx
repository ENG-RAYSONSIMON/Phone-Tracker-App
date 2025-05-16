import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
export default function Support() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>🔧 Support and Help Guide</Text>
      <Text style={styles.sectionTitle}>👤 1. Account Issues</Text>
      <Text style={styles.itemTitle}>• How do I register?</Text>
      <Text style={styles.itemText}>
        Tap on “Sign Up” and fill in your name, email, and password.
      </Text>
      <Text style={styles.itemTitle}>• Can’t log in?</Text>
      <Text style={styles.itemText}>
        Double-check your credentials. If you forgot your password, contact
        support at support@trackrapp.com.
      </Text>

      <Text style={styles.sectionTitle}>📱 2. Device Registration</Text>
      <Text style={styles.itemTitle}>
        • How to register your phone for tracking:
      </Text>
      <Text style={styles.itemText}>
        After logging in, go to the Devices tab and tap “Register Device”.
      </Text>
      <Text style={styles.itemTitle}>• Why can’t I see my device?</Text>
      <Text style={styles.itemText}>
        Try refreshing or re-register the device. Ensure the app has location
        permission.
      </Text>

      <Text style={styles.sectionTitle}>🗺️ 3. Real-Time Location Tracking</Text>
      <Text style={styles.itemTitle}>• Tracking my phone:</Text>
      <Text style={styles.itemText}>
        Open the Map tab. Your device’s location should appear in real time.
      </Text>
      <Text style={styles.itemTitle}>• Location not updating?</Text>
      <Text style={styles.itemText}>
        Check your internet and GPS settings. Keep the app running in the
        background.
      </Text>

      <Text style={styles.sectionTitle}>
        🚨 4. Wrong PIN Detection & Intruder Photo
      </Text>
      <Text style={styles.itemTitle}>• How it works:</Text>
      <Text style={styles.itemText}>
        When a wrong PIN is entered, the app takes a picture and sends it to
        your dashboard.
      </Text>
      <Text style={styles.itemTitle}>• Make sure permissions are enabled:</Text>
      <Text style={styles.itemText}>
        Camera access must be granted for this to work.
      </Text>

      <Text style={styles.sectionTitle}>💾 5. Viewing Captured Images</Text>
      <Text style={styles.itemText}>
        Go to the Captured Images tab to see pictures of intruders. All data is
        securely stored and encrypted.
      </Text>

      <Text style={styles.sectionTitle}>🔒 6. Security</Text>
      <Text style={styles.itemText}>
        We use JWT tokens and HTTPS for secure communication. All sensitive data
        is encrypted end-to-end.
      </Text>

      <Text style={styles.sectionTitle}>📩 Need More Help?</Text>
      <Text style={styles.itemText}>
        Email us at: support@trackrapp.com
        {"\n"}Or visit: www.trackrapp.com/support
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginTop: 20,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginTop: 8,
  },
  itemText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 10,
    marginBottom: 5,
  },
});
