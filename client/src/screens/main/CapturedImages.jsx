import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CapturedImages() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Captured Images Will Be Shown Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
