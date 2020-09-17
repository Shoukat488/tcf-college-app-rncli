import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../screens/Home/Index';
import SettingsScreen from '../screens/Settings/Index';
import FullTableScreens from '../screens/FullTable/Index';
const Tab = createMaterialBottomTabNavigator();

const TabNavigations = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="Home"
      labeled={false}
      shifting={false}
      activeColor="#138D75"
      inactiveColor="#8d8585"
      barStyle={{backgroundColor: '#010b13'}}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          const icons = {
            Home: 'schedule',
            Full: 'calendar-alt',
            Settings: 'settings',
          };
          if (icons[route.name] === 'calendar-alt') {
            return (
              <FontAwesome5 name={icons[route.name]} size={24} color={color} />
            );
          } else {
            return (
              <MaterialIcons name={icons[route.name]} size={24} color={color} />
            );
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{}} />
      <Tab.Screen name="Full" component={FullTableScreens} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigations;
