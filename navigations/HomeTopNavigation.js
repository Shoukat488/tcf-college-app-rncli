import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import YourSubjects from "../screens/Home/YourSubjects";

const Tab = createMaterialTopTabNavigator();
const day = new Date().getDay();
console.log('day: ',day)
const Day = ["MON","MON", "TUE", "WED", "THUR", "FRI", "SAT"];
const HomeTopNavigations = () => {
  return (
    <Tab.Navigator
      initialRouteName={Day[day]}
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: "#138D75",
        inactiveTintColor: "#8d8585",
        tabStyle: {
          backgroundColor: "#141414",
          overflow:'scroll'

          // borderTopColor:'#028742',borderTopWidth:0.5
        },
        indicatorStyle: {
          backgroundColor: "#138D75",
          height: 0,
        },
        // scrollEnabled:true,
        labelStyle:{fontSize:14, margin:0,padding:0,},
        style:{
          backgroundColor: "#138D75",}
      }}
    >
      <Tab.Screen name="MON" component={YourSubjects} />
      <Tab.Screen name="TUE" component={YourSubjects} />
      <Tab.Screen name="WED" component={YourSubjects} />
      <Tab.Screen name="THUR" component={YourSubjects} />
      <Tab.Screen name="FRI" component={YourSubjects} />
      <Tab.Screen name="SAT" component={YourSubjects} />
    </Tab.Navigator>
  );
};

export default HomeTopNavigations;
