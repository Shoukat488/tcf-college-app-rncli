import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import TableAction from "../../store/actions/TableAction";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinAnim: new Animated.Value(0),
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
      this.setState({ spinAnim: new Animated.Value(0) });
      const updateMessage = "Updated!";
      const color = "#31a28c";
      this.props.snackHandler(updateMessage, color);
    }, 3000);
  };
  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ height: 32, width: 32 }}
          onPress={this.refreshHandler}
        >
          <Animated.Image
            source={require("../../assets/refresh1.png")}
            style={{ height: 30, width: 30, transform: [{ rotate: spin }] }}
          />
        </TouchableOpacity>
        <View>
          <Image
            source={require("../../assets/calendar1.png")}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
          }}
          onPress={() => {
            navigation.navigate("SectionList");
          }}
        >
          <Image
            source={require("../../assets/register.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTableXI: () => dispatch(TableAction.setCurrentTableXI()),
    setTableXII: () => dispatch(TableAction.setCurrentTableXII()),
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
  logo: {
    width: 40,
    height: 40,
  },
});

export default connect(null, mapDispatchToProps)(HomeHeader);
