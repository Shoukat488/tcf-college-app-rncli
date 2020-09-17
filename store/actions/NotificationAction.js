import ActionTypes from "./ActionsTypes"
import AsyncStorage from "@react-native-community/async-storage"

const NotificationAction = {

    setNotification: (minutes)=>{
        return async (dispatch)=>{
            // check if minutes value is provided through argument
            if(!isNaN(minutes))
            {
                await AsyncStorage.setItem('notification',JSON.stringify(minutes))
                dispatch({type: ActionTypes.SETNOTIFICATION, payload: minutes})
            }
            else
            {
                // get value from storage if exits other set it to 5 as a default value
                let savedNotification = await AsyncStorage.getItem('notification')
                if(savedNotification)
                savedNotification = await JSON.parse(savedNotification)
                else
                savedNotification = 5
                dispatch({type: ActionTypes.SETNOTIFICATION, payload: savedNotification})
            }
        }
    }
}

export default NotificationAction;