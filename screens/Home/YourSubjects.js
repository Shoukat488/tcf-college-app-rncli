import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import RenderScheduleList from "../../components/renderScheduleList";
import { useDispatch } from "react-redux";
import ActionTypes from "../../store/actions/ActionsTypes";

const YourSubjects = ({ navigation, route }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch({ type: ActionTypes.SETROUTE, payload: route.name });
    });
    return unsubscribe;
  }, [navigation, route]);
  return (
    <View style={styles.container}>
      <RenderScheduleList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0B0B",
  },
});

export default YourSubjects;
