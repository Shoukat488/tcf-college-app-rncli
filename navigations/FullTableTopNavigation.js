import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FullTableBottomNavigation from "./FullTableBottomNavigation";

const Tab = createMaterialTopTabNavigator();
const day = new Date().getDay();
const Day = ["MON", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

const FullTableTopNavigations = () => {
  useEffect(() => {}, []);
  return (
    <Tab.Navigator
      initialRouteName={Day[day]}
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: "#138D75",
        inactiveTintColor: "#8d8585",
        tabStyle: {
          backgroundColor: "#141414",
          borderTopColor: "#138D75",
          borderTopWidth: 0.5,
          borderBottomColor: "#138D75",
          borderBottomWidth: 0.5,
        },
        allowFontScaling: true,
        labelStyle: { fontSize: 14, margin: 0 },
        indicatorStyle: {
          backgroundColor: "#138D75",
          height: 0,
        },
        style: {
          backgroundColor: "#138D75",
        },
      }}
    >
      <Tab.Screen name="MON" component={FullTableBottomNavigation} />
      <Tab.Screen name="TUE" component={FullTableBottomNavigation} />
      <Tab.Screen name="WED" component={FullTableBottomNavigation} />
      <Tab.Screen name="THUR" component={FullTableBottomNavigation} />
      <Tab.Screen name="FRI" component={FullTableBottomNavigation} />
      <Tab.Screen name="SAT" component={FullTableBottomNavigation} />
    </Tab.Navigator>
  );
};

export default FullTableTopNavigations;
