import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Phone Tracker</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Track & Secure Your Device</Text>
          <Text style={styles.cardText}>
            Locate your lost or stolen phone in real time and boost your mobile
            security.
          </Text>
        </Card.Content>

        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            icon="cellphone"
            onPress={() => navigation.navigate("Device Management")}
            contentStyle={styles.primaryButtonContent}
            style={styles.primaryButton}
          >
            Register Device
          </Button>

          <Button
            mode="outlined"
            icon="crosshairs-gps"
            onPress={() => navigation.navigate("Live Tracking")}
            contentStyle={styles.outlinedButtonContent}
            style={styles.outlinedButton}
            textColor="#333"
          >
            Track Phone
          </Button>
        </Card.Actions>
      </Card>

      <View style={styles.footer}>
        <FontAwesome name="shield" size={35} color="#6200ee" />
        <Text style={[styles.footerText, { color: "#6200ee" }]}>
          Stay Secure, Stay Connected
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 4,
    paddingVertical: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#34495e",
  },
  cardText: {
    fontSize: 16,
    color: "#6c757d",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  primaryButton: {
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  primaryButtonContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  outlinedButton: {
    borderRadius: 8,
    borderColor: "#007bff",
  },
  outlinedButtonContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    marginTop: 8,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
});
