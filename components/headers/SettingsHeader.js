import React, { Component } from "react";
import { Text, View, StyleSheet, Platform, Dimensions } from "react-native";

export default class SettingsHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010b13",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 5,
    width: Dimensions.get("screen").width,
    height: Platform.OS === "ios" ? 75 : 60,
  },
  title: {
    color: "#E4E4E2",
    fontWeight: "bold",
    fontSize: 32,
    marginLeft:15
  },
});
