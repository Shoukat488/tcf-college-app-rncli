import ActionTypes from "./ActionsTypes";
import AsyncStorage from "@react-native-community/async-storage";
import store from "..";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SectionAction = {
  setSectionsXI: async (sections) => {
    let savedSectionsXI = await AsyncStorage.getItem("sectionsXI");
    if (savedSectionsXI) savedSectionsXI = await JSON.parse(savedSectionsXI);
    else savedSectionsXI = [];
    if (savedSectionsXI.length && sections.length) {
      console.log("1");
      let selectedSection = savedSectionsXI.filter((item) => {
        if (item.selected === true)
          return {
            ...item,
          };
      });
      console.log("true filter item: ", selectedSection);
      let tempList = sections.map((item) => {
        if (item === selectedSection[0].title)
          return {
            title: item,
            selected: true,
          };
        else
          return {
            title: item,
            selected: false,
          };
      });
      console.log("Section XI new list", tempList);
      await AsyncStorage.setItem("sectionsXI", JSON.stringify(tempList));
      store.dispatch({ type: ActionTypes.SETSECTIONSXI, payload: tempList });
    } else if (sections.length) {
      console.log("2");
      let tempList = sections.map((item, index) => {
        if (index === 0)
          return {
            title: item,
            selected: true,
          };
        else
          return {
            title: item,
            selected: false,
          };
      });
      console.log("Section XI new list", tempList);
      store.dispatch({ type: ActionTypes.SETSECTIONSXI, payload: tempList });
      await AsyncStorage.setItem("sectionsXI", JSON.stringify(tempList));
    } else {
      console.log("3");
      console.log("saved sections XI : ", savedSectionsXI);
      store.dispatch({
        type: ActionTypes.SETSECTIONSXI,
        payload: savedSectionsXI,
      });
    }
  },
  setSectionsXII: async (sections) => {
    let savedSectionsXII = await AsyncStorage.getItem("sectionsXII");
    if (savedSectionsXII) savedSectionsXII = await JSON.parse(savedSectionsXII);
    else savedSectionsXII = [];

    if (savedSectionsXII.length && sections.length) {
      let selectedSection = savedSectionsXII.filter((item) => {
        if (item.selected === true)
          return {
            ...item,
          };
      });
      let tempList = sections.map((item) => {
        if (item === selectedSection[0].title)
          return {
            title: item,
            selected: true,
          };
        else
          return {
            title: item,
            selected: false,
          };
      });
      console.log("Section XII new list", tempList);
      await AsyncStorage.setItem("sectionsXII", JSON.stringify(tempList));
      store.dispatch({ type: ActionTypes.SETSECTIONSXII, payload: tempList });
    } else if (sections.length) {
      let tempList = sections.map((item, index) => {
        if (index === 0)
          return {
            title: item,
            selected: true,
          };
        else
          return {
            title: item,
            selected: false,
          };
      });
      console.log("Section XII new list", tempList);
      await AsyncStorage.setItem("sectionsXII", JSON.stringify(tempList));
      store.dispatch({ type: ActionTypes.SETSECTIONSXII, payload: tempList });
    } else
      dispatch({
        type: ActionTypes.SETSECTIONSXII,
        payload: savedSectionsXII,
      });
  },
  setToStorageXI: async (data) => {
    await AsyncStorage.setItem("sectionsXI", JSON.stringify(data));
  },
  setToStorageXII: async (data) => {
    await AsyncStorage.setItem("sectionsXII", JSON.stringify(data));
  },
};

export default SectionAction;
