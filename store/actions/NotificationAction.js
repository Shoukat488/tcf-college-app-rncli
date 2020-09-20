import {Platform} from 'react-native';
import ActionTypes from './ActionsTypes';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../index';

const NotificationAction = {
  setNotification: (minutes) => {
    return async (dispatch) => {
      // check if minutes value is provided through argument
      if (!isNaN(minutes)) {
        await AsyncStorage.setItem('notification', JSON.stringify(minutes));
        dispatch({type: ActionTypes.SETNOTIFICATION, payload: minutes});
      } else {
        // get value from storage if exits other set it to 5 as a default value
        let savedNotification = await AsyncStorage.getItem('notification');
        if (savedNotification)
          savedNotification = await JSON.parse(savedNotification);
        else savedNotification = 5;
        dispatch({
          type: ActionTypes.SETNOTIFICATION,
          payload: savedNotification,
        });
      }
    };
  },
  scheduleNotifications: (section, year) => {
    const notifyTime = store.getState().NotificationReducer.notificationTime;
    if (notifyTime) {
      const table =
        year === 'XI'
          ? store.getState().TableReducer.tableXI
          : store.getState().TableReducer.tableXII;

      const sec =
        year === 'XI'
          ? table.headerXI.indexOf(section)
          : table.headerXII.indexOf(section);

      const currentDate = new Date();
      const currentWeekDay = currentDate.getDay();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      table[year].forEach((item, day) => {
        let currentDay = currentDate.getDate();
        if (currentWeekDay === 0) {
          currentDay += day + 1;
        } else {
          if (currentWeekDay - 1 <= day)
            currentDay += day - (currentWeekDay - 1);
          else currentDay -= currentWeekDay - day - 1;
        }

        item.forEach((element) => {
          let hr = '';
          let min = '';
          let isHour = true;
          const time = element[0][0];
          const subject = element[sec + 1].subject.label;
          for (let i = 0; i < time.length; i++) {
            if (time[i] == ':') {
              isHour = false;
              continue;
            }
            if (isHour) hr += time[i];
            else min += time[i];
          }

          hr = parseInt(hr);
          min = parseInt(min);
          if (min == 0) {
            hr -= 1;
            min = 60;
          }

          let date;
          if (hr < 7)
            date = new Date(
              currentYear,
              currentMonth,
              currentDay,
              hr + 12,
              min - 5,
            );
          else
            date = new Date(currentYear, currentMonth, currentDay, hr, min - 5);
          const message = `${subject} about to start in ${notifyTime} minutes`;
          PushNotification.localNotificationSchedule({
            title: 'Reminder',
            message: message,
            date: date,
            repeatType: 'week',
            allowWhileIdle: false,
          });
        });
      });
    }
  },
  cancelAllScheduledNotifications: () => {
    PushNotification.cancelAllLocalNotifications();
  },
  configureNotifications: () => {
    PushNotification.configure({
      requestPermissions: Platform.OS === 'ios',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
    });
  },
};

export default NotificationAction;
