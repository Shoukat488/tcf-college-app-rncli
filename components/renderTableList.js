import React, { useEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";

const days = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THUR: 3,
  FRI: 4,
  SAT: 5,
  SUN: 0,
};

const RenderTableList = ({ secRoute, navigation }) => {
  const route = useSelector((state) => state.RouteReducer.route);
  const year = useSelector((state) => state.YearReducer.year);
  const sections = useSelector((state) =>
    year === "XI"
      ? state.SectionReducer.sectionsXI
      : state.SectionReducer.sectionsXII
  );
  const table = useSelector((state) =>
    year === "XI" ? state.TableReducer.tableXI : state.TableReducer.tableXII
  );

  useEffect(() => {}, [table, route, sections, year, secRoute, navigation]);
  const rendetItem = ({ item }) => {
    const sec =
      year === "XI"
        ? table.headerXI.indexOf(secRoute)
        : table.headerXII.indexOf(secRoute);
    const subject = item[sec + 1];
    const time = item[0];
    if (subject.subject !== "")
      return (
        <View style={styles.item}>
          <View style={styles.firstItems}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {subject.subject.label}-{year}
            </Text>
            {subject.instructor.label ? (
              <Text style={styles.instructor}>{subject.instructor.label}</Text>
            ) : null}
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>
              {time[0]}-{time[1]}
            </Text>
          </View>
        </View>
      );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={rendetItem}
        data={table[year] && sections.length ? table[year][days[route]] : []}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RenderTableList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2020",
  },
  contentContainerStyle: {
    justifyContent: "center",
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: "#1F2020",
  },
  item: {
    width: "98%",
    height: 90,
    backgroundColor: "#25282A",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 3,
  },
  instructor: {
    fontSize: 16,
    color: "grey",
    marginTop: 5,
    marginLeft: 5,
  },
  firstItems: {
    marginLeft: 5,
  },
  timeContainer: {
    marginRight: 5,
  },
  time: {
    color: "white",
    fontSize: 16,
    opacity: 0.8,
  },
});
