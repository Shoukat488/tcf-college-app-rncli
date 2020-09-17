import ActionTypes from "./ActionsTypes";
import AsyncStorage from "@react-native-community/async-storage";
import SectionAction from "./SectionAction";
import {REACT_APP_BASE_URL as BASE_URL} from 'react-native-dotenv';

const TableAction = {
  setCurrentTableXI: () => {
    return async (dispatch) => {
      let savedTableXI = await AsyncStorage.getItem("tableXI");
      if (savedTableXI) savedTableXI = await JSON.parse(savedTableXI);
      else savedTableXI = [];
      console.log('base url: ',savedTableXI)
      const url = `${BASE_URL}/timeTableXI/current`;
      // const url = `http://192.168.1.105:8080/timeTableXI/current`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.response === 1) {
            console.log(data)
            dispatch({
              type: ActionTypes.SETCURRENTTABLEXI,
              payload: data.data.length > 0 ? data.data[0] : {},
            });
            await AsyncStorage.setItem(
              "tableXI",
              JSON.stringify(data.data.length > 0 ? data.data[0] : {})
            );
            SectionAction.setSectionsXI(
              data.data.length ? data.data[0].headerXI : []
            );
            // console.log("Sections XI : ", data.data[0].headerXI);
          } else {
            dispatch({
              type: ActionTypes.SETCURRENTTABLEXI,
              payload: savedTableXI,
            });
            SectionAction.setSectionsXI(savedTableXI.headerXI);
          }
          return data.response;
        })
        .catch((error) => {
          console.log("error: ", error);
          dispatch({
            type: ActionTypes.SETCURRENTTABLEXI,
            payload: savedTableXI,
          });
          SectionAction.setSectionsXI(savedTableXI.headerXI);
          return 0;
        });
    };
  },
  setCurrentTableXII: () => {
    return async (dispatch) => {
      let savedTableXII = await AsyncStorage.getItem("tableXII");
      if (savedTableXII) savedTableXII = await JSON.parse(savedTableXII);
      else savedTableXII = [];
      const url = `${BASE_URL}/timeTableXII/current`;
      // const url = `http://192.168.1.105:8080/timeTableXII/current`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.response === 1) {
            dispatch({
              type: ActionTypes.SETCURRENTTABLEXII,
              payload: data.data.length > 0 ? data.data[0] : {},
            });
            // console.log('Sections XII : ',data.data[0].headerXII)
            SectionAction.setSectionsXI(
              data.data.length > 0 ? data.data[0].headerXII : []
            );
            await AsyncStorage.setItem(
              "tableXII",
              JSON.stringify(data.data.length > 0 ? data.data[0] : {})
            );
          } else {
            dispatch({
              type: ActionTypes.SETCURRENTTABLEXII,
              payload: savedTableXII,
            });
            SectionAction.setSectionsXI(savedTableXII.headerXII);
          }
          return data.response;
        })
        .catch((error) => {
          console.log("error: ", error);
          dispatch({
            type: ActionTypes.SETCURRENTTABLEXII,
            payload: savedTableXII,
          });
          SectionAction.setSectionsXI(savedTableXII.headerXII);
          return 0;
        });
    };
  },
};

export default TableAction;
