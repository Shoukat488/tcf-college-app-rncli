import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import RenderTableList from "../../components/renderTableList";

const TableList = ({ route, navigation }) => {
  const [routeName, setRouteName] = useState(route.name);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRouteName(route.name);
    });
    return unsubscribe;
  }, [navigation, routeName, route]);
  return (
    <View style={styles.container}>
      <RenderTableList secRoute={routeName} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0B0B",
  },
});

export default TableList;
