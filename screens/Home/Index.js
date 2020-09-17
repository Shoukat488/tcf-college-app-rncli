import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeHeader from "../../components/headers/HomeHeader";
import HomeTopNavigations from "../../navigations/HomeTopNavigation";
import { Snackbar } from "react-native-paper";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSnackBar: false,
      snackBarMessage: "",
      snackBackgroungColor: "",
    };
  }
  componentDidMount() {}
  snackHandler = (message, color) => {
    this.setState({
      visibleSnackBar: true,
      snackBarMessage: message,
      snackBackgroungColor: color,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <HomeHeader
          navigation={this.props.navigation}
          snackHandler={this.snackHandler}
        />
        <HomeTopNavigations />
        <Snackbar
          visible={this.state.visibleSnackBar}
          onDismiss={() => this.setState({ visibleSnackBar: false })}
          action={{
            label: "OK",
            onPress: () => {},
          }}
          style={{ backgroundColor: this.state.snackBackgroungColor }}
        >
          {this.state.snackBarMessage}
        </Snackbar>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0C0B0B" },
});
