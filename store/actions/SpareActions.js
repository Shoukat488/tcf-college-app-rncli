import ActionTypes from "./ActionsTypes";
import AsyncStorage from "@react-native-community/async-storage";
import {REACT_APP_BASE_URL as BASE_URL} from 'react-native-dotenv';

export const setSubjectsSpare = (dispatch) => {
  const url = `${BASE_URL}/subjects`;
  // const url = `http://192.168.1.105:8080/subjects`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposne) => resposne.json())
    .then(async (data) => {
      if (data.response === 1) {
        // console.log("helloooo:", data);
        let subjectsIds = await AsyncStorage.getItem("subjectIDS");
        let savedSubjects = await AsyncStorage.getItem("subjects");

        if (subjectsIds) subjectsIds = await JSON.parse(subjectsIds);
        else subjectsIds = [];

        if (savedSubjects) savedSubjects = await JSON.parse(savedSubjects);
        else savedSubjects = [];
        let tempData = data.data;
        let newIds = [];
        if (data.data.length) {
          const newData = tempData.map((item) => {
            if (subjectsIds.length) {
              if (subjectsIds.includes(item._id)) {
                newIds.push(item._id);
                return {
                  id: item._id,
                  title: `${item.name}-${item.year}`,
                  selected: true,
                  name: item.name,
                  year: item.year,
                };
              }
            }
            return {
              id: item._id,
              title: `${item.name}-${item.year}`,
              selected: false,
              name: item.name,
              year: item.year,
            };
          });
          // console.log(newData);
          dispatch({ type: ActionTypes.SETSUBJECTS, payload: newData });
          dispatch({ type: ActionTypes.SETSUBJECTSIDS, payload: newIds });
          await AsyncStorage.setItem("subjects", JSON.stringify(newData));
          await AsyncStorage.setItem("subjectIDS", JSON.stringify(newIds));
        } else {
          dispatch({ type: ActionTypes.SETSUBJECTS, payload: savedSubjects });
          dispatch({ type: ActionTypes.SETSUBJECTSIDS, payload: subjectsIds });
        }
      }
      return data.response;
    })
    .catch(async (error) => {
      console.log("error", error);
      let savedSubjects = await AsyncStorage.getItem("subjects");
      let subjectsIds = await AsyncStorage.getItem("subjectIDS");
      if (savedSubjects) savedSubjects = await JSON.parse(savedSubjects);
      else savedSubjects = [];
      dispatch({ type: ActionTypes.SETSUBJECTS, payload: savedSubjects });

      if (subjectsIds) subjectsIds = await JSON.parse(subjectsIds);
      else savedSubjects = [];
      dispatch({ type: ActionTypes.SETSUBJECTSIDS, payload: subjectsIds });
      return 0;
    });
};
export const setInstructorsSpare = (dispatch, obj) => {
  console.log("token store: ", obj.token);
  const url = `${BASE_URL}/instructors`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
    },
  })
    .then((resposne) => resposne.json())
    .then((data) => {
      if (data.response === 1) {
        console.log("hello1:", data);
        dispatch({ type: ActionTypes.SETINSTRUCTORS, payload: data.data });
      }
      return data.response;
    })
    .catch((error) => {
      console.log("error", error);
      return 0;
    });
};
export const setTableXISpare = (dispatch, obj) => {
  const url = `${BASE_URL}/timeTableXI`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("table:", data);
      if (data.response === 1) {
        dispatch({ type: ActionTypes.SETTABLEXI, payload: data.data });
      }
      return data.response;
    })
    .catch((error) => {
      alert("Table can not be created");
    });
};
export const setTableXIISpare = (dispatch, obj) => {
  const url = `${BASE_URL}/timeTableXII`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("table:", data);
      if (data.response === 1) {
        dispatch({ type: ActionTypes.SETTABLEXII, payload: data.data });
      }
      return data.response;
    })
    .catch((error) => {
      alert("Table can not be created");
    });
};
