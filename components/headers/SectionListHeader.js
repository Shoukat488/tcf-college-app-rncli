import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FlipToggle from 'react-native-flip-toggle-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ActionTypes from '../../store/actions/ActionsTypes';
import SectionAction from '../../store/actions/SectionAction';

const SectionListHeader = ({
  navigation,
  updatedData,
  handleSearchBar,
  yearHandler,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(false);
  const year = useSelector((state) => state.YearReducer.year);
  const [isToggleActive, setToggleActive] = useState(
    year === 'XI' ? false : true,
  );
  useEffect(() => {}, []);
  const nextHandler = () => {
    setLoader(true);
    dispatch({
      type: ActionTypes.SETYEAR,
      payload: isToggleActive ? 'XII' : 'XI',
    });

    const newYear = isToggleActive ? 'XII' : 'XI';
    if (newYear === 'XI') {
      dispatch({type: ActionTypes.SETSECTIONSXI, payload: updatedData});
      SectionAction.setToStorageXI(updatedData);
    } else {
      dispatch({type: ActionTypes.SETSECTIONSXII, payload: updatedData});
      SectionAction.setToStorageXII(updatedData);
    }
    setTimeout(() => {
      setLoader(false);
      navigation.popToTop();
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons name="arrow-back" size={28} color="#028742" />
        </TouchableOpacity>
        <View style={{marginRight: 13}}>
          <FlipToggle
            value={isToggleActive}
            buttonWidth={90}
            buttonHeight={30}
            buttonRadius={50}
            sliderWidth={32}
            sliderHeight={26}
            sliderRadius={55}
            labelStyle={{color: '#EBEBE3', fontSize: 18}}
            sliderOnColor="#028742"
            sliderOffColor="#028742"
            onLabel={'XI'}
            offLabel={'XII'}
            labelStyle={{color: '#3e3e3e'}}
            onToggle={(newState) => {
              console.log('new state: ', newState);
              if (!newState) yearHandler('XI');
              else yearHandler('XII');
              setToggleActive(newState);
            }}
          />
        </View>
      </View>
      <View>
        <Text style={{color: '#028742', fontSize: 20}}>Section</Text>
      </View>
      <View style={styles.leftElements}>
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearchBar}>
          <MaterialIcons name="search" color="#028742" size={24} />
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator style={styles.loader} size={24} color="#028742" />
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={nextHandler}>
            <Text style={{color: '#EBEBE3'}}>Set</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#25282A',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 20 : 5,
    width: Dimensions.get('screen').width,
    height: Platform.OS === 'ios' ? 70 : 60,
    borderBottomColor: '#028742',
    borderBottomWidth: 0.5,
  },
  searchIcon: {
    backgroundColor: '#1F2020',
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    marginLeft: 30,
    backgroundColor: '#028742',
    height: 30,
    width: 45,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginLeft: 30,
    height: 30,
    width: 45,
  },
  backIcon: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftElements: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SectionListHeader;
