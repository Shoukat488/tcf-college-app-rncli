import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  Animated,
  Easing,
  Text,
} from "react-native";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import TableAction from "../../store/actions/TableAction";
import ActionTypes from "../../store/actions/ActionsTypes";

class FullTableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinAnim: new Animated.Value(0),
      toggleStatus: false,
    };
  }
  componentDidMount() {}
  refreshHandler = () => {
    NetInfo.fetch().then((state) => {
      const networkFailed = "Network Failed!";
      const color = "#ba0c2f";
      if (!state.isConnected && !state.isInternetReachable)
        this.props.snackHandler(networkFailed, color);
      else {
        this.props.setTableXI();
        this.props.setTableXII();
        this.rotateRefreshIcon();
      }
    });
  };
  rotateRefreshIcon = () => {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    setTimeout(() => {
      Animated.loop(Animated.timing(this.state.spinAnim)).reset();
      this.setState({ spinAnim: new Animated.Value(0), toggleStatus: false });
      const updateMessage = "Updated!";
      const color = "#31a28c";
      this.props.snackHandler(updateMessage, color);
    }, 3000);
  };
  toggleHandler = () => {
    this.props.setFullTableYear(this.state.toggleStatus ? "XI" : "XII");
    this.setState({ toggleStatus: !this.state.toggleStatus });
  };
  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ height: 32, width: 32 }}
            onPress={this.refreshHandler}
          >
            <Animated.Image
              source={require("../../assets/refresh1.png")}
              style={{ height: 30, width: 30, transform: [{ rotate: spin }] }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ justifyContent: "flex-end", alignItems: "center", flex: 1 }}
        >
          <Image
            source={require("../../assets/calendar1.png")}
            style={styles.logo}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableWithoutFeedback
            style={{
              ...styles.toggleButtons,
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              backgroundColor: this.state.toggleStatus ? "#E4E4E2" : "#31a28c",
            }}
            onPress={this.toggleHandler}
          >
            <Text>XI</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={{
              ...styles.toggleButtons,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              backgroundColor: this.state.toggleStatus ? "#31a28c" : "#E4E4E2",
            }}
            onPress={this.toggleHandler}
          >
            <Text>XII</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTableXI: () => dispatch(TableAction.setCurrentTableXI()),
    setTableXII: () => dispatch(TableAction.setCurrentTableXII()),
    setFullTableYear: (year) =>
      dispatch({ type: ActionTypes.SETTABLEYEAR, payload: year }),
  };
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#010b13",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "ios" ? 20 : 5,
    width: Dimensions.get("screen").width,
    height: Platform.OS === "ios" ? 75 : 60,
  },
  toggleButtons: {
    height: 35,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
});

export default connect(null, mapDispatchToProps)(FullTableHeader);
