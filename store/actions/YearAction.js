import ActionTypes from "./ActionsTypes"
import AsyncStorage from "@react-native-community/async-storage"

const YearAction = {

    setYear: (year)=>{
        return async (dispatch)=>{
            if(year)
            {
                await AsyncStorage.setItem('year',year)
                dispatch({type: ActionTypes.SETYEAR, payload: year})
            }
            else
            {
                let savedYear = await AsyncStorage.getItem('year')
                if(savedYear)
                savedYear = await JSON.parse(savedYear)
                else
                savedYear = 'XI'
                dispatch({type: ActionTypes.SETYEAR, payload: savedYear})
            }
        }
    }
}

export default YearAction;