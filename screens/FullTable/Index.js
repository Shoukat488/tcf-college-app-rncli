import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FullTableHeader from "../../components/headers/FullTableHeader";
import FullTableTopNavigations from "../../navigations/FullTableTopNavigation";
import { Snackbar } from "react-native-paper";

export default class FullTableScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSnackBar: false,
      snackBarMessage: "",
      snackBackgroungColor: "",
      year: "XI",
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
        <FullTableHeader
          navigation={this.props.navigation}
          snackHandler={this.snackHandler}
        />
        <FullTableTopNavigations />
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
