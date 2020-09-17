import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TableList from "../screens/FullTable/TableList";
import ActionTypes from "../store/actions/ActionsTypes";
import { View } from "native-base";

const Tab = createBottomTabNavigator();

const FUllTableBottomNavigation = ({ navigation, route }) => {
  const year = useSelector((state) => state.YearReducer.tableYear);
  const [stateYear, setStateYear] = useState(year);
  const sectionsXI = useSelector((state) => state.SectionReducer.sectionsXI);
  const sectionsXII = useSelector((state) => state.SectionReducer.sectionsXII);
  const [sectionsList, setSections] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("year: ", year);
    if (stateYear !== year) {
      setter(year === "XI" ? sectionsXI : sectionsXII);
      setStateYear(year);
    }
    const unsubcribe = navigation.addListener("focus", () => {
      dispatch({ type: ActionTypes.SETROUTE, payload: route.name });
      if (year === "XI") setter(sectionsXI);
      else setter(sectionsXII);
    });
    return unsubcribe;
  }, [sectionsXI, sectionsXII, year, route, navigation]);
  const setter = (data) => {
    const newList = data.map((item) => item.title);
    setSections([...newList]);
  };
  return (
    <View style={{ backgroundColor: "#212121", flex: 1 }}>
      {sectionsList.length ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#138D75",
            inactiveTintColor: "#8d8585",
            pressColor: "#028742",
            activeBackgroundColor: "#028742",
            tabStyle: {
              backgroundColor: "#212121",
              alignItems: "center",
              justifyContent: "center",
            },
            allowFontScaling: true,
            style: {
              backgroundColor: "#212121",
              borderTopColor: "#138D75",
              borderTopWidth: 0.5,
              borderBottomColor: "#138D75",
              borderBottomWidth: 0.5,
            },
            labelStyle: {
              fontSize: 14,
            },
          }}
        >
          {sectionsList.map((item) => (
            <Tab.Screen
              name={item}
              component={TableList}
              options={{
                tabBarColor: "#028742",
              }}
            />
          ))}
        </Tab.Navigator>
      ) : null}
    </View>
  );
};
export default FUllTableBottomNavigation;
