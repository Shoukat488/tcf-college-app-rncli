import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import SettingsHeader from "../../components/headers/SettingsHeader";
import SettingsList from "./SettingsList";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SettingsHeader />
        <SettingsList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#010b13'
  },
});
