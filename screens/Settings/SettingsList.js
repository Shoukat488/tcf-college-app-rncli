import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import NotificationDialoge from "./NotificationDialoge";
import ActionTypes from "../../store/actions/ActionsTypes";
import NotificationAction from "../../store/actions/NotificationAction";
class SettingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDialoge: false,
      notifyValue: 5,
    };
  }
  componentDidMount() {
    this.setState({
      notifyValue: this.props.notificationValue,
    });
  }
  onValueChange = () => {
    this.setState({
      visibleDialoge: !this.state.visibleDialoge,
    });
  };
  onNotifyValueChange = (value) => {
    this.setState({
      notifyValue: value,
    });
    this.props.setNotificationState(value)
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableHighlight onPress={this.onValueChange.bind(this)}>
          <View
            style={{
              backgroundColor: "#1F2020",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 60,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../assets/notification.png")}
              />
              <Text style={{ color: "white", fontSize: 20, marginLeft: 25 }}>
                Notify me
              </Text>
            </View>
            {this.state.notifyValue !== 1 ? (
              <Text style={{ color: "grey", fontSize: 16 }}>
                {this.state.notifyValue} minutes before
              </Text>
            ) : (
              <Text style={{ color: "grey", fontSize: 16 }}>Never</Text>
            )}
          </View>
        </TouchableHighlight>
        <Divider inset={true} style={{ backgroundColor: "#E4E4E2" }} />
        <NotificationDialoge
          onNotifyValueChange={this.onNotifyValueChange.bind(this)}
          visibleDialoge={this.state.visibleDialoge}
          setVisibleDailoge={this.onValueChange.bind(this)}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  notificationValue: state.NotificationReducer.notificationTime,
});
const mapDispatchToProps = (dispatch) => ({
  setNotificationState: (time) =>
    dispatch(NotificationAction.setNotification(time)),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
