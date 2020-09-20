import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/index';
import Welcome from './screens/Welcome';
import Container from './navigations/Index';
import {SafeAreaView} from 'react-native-safe-area-context';
import Notification from './store/actions/NotificationAction';
export default class App extends Component {
  state = {
    loading: true,
  };
  constructor(props) {
    super(props);
    Notification.configureNotifications();
  }
  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  }
  render() {
    const loading = this.state.loading;
    if (loading)
      return (
        <View style={styles.container}>
          <Welcome />
        </View>
      );
    else
      return (
        <Provider store={store}>
          <SafeAreaView style={{flex: 1, backgroundColor: '#212121'}}>
            <View style={styles.container}>
              {Platform.OS === 'android' ? (
                <StatusBar
                  backgroundColor="#212121"
                  networkActivityIndicatorVisible={true}
                  barStyle="dark-content"
                />
              ) : (
                <StatusBar
                  backgroundColor="#212121"
                  networkActivityIndicatorVisible={true}
                  barStyle="light-content"
                />
              )}
              <Container />
            </View>
          </SafeAreaView>
        </Provider>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#25282A',
  },
});
