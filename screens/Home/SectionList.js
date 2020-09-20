import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Switch, Platform} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// import {CheckBox} from 'native-base';
import {useSelector} from 'react-redux';
import SectionListHeader from '../../components/headers/SectionListHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchBar from 'react-native-searchbar';

const SectionList = ({navigation}) => {
  let searchBar = React.createRef();
  const savedYear = useSelector((state) => state.YearReducer.year);
  const [year, setYear] = useState(savedYear);
  const [filter, setFilter] = useState({
    isSearcching: false,
    data: [],
  });
  const sectionListXI = useSelector((state) => state.SectionReducer.sectionsXI);
  const sectionListXII = useSelector(
    (state) => state.SectionReducer.sectionsXII,
  );
  const [listData, setListData] = useState([]);
  const [section, setSection] = useState(null);
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      setter();
    });
    return subscribe;
  }, [listData, year]);
  const setter = () => {
    if (year === 'XI') setListData([...sectionListXI]);
    else setListData([...sectionListXII]);
  };
  const selectedHandler = (title) => {
    let tempList = listData.map((item, i) => {
      if (item.title === title) {
        setSection(item.title);
        return {
          ...item,
          selected: true,
        };
      } else
        return {
          ...item,
          selected: false,
        };
    });
    if (filter.isSearcching) {
      let filteredData = filter.data.map((item) => {
        if (item.title === title) {
          setSection(item.title);
          return {
            ...item,
            selected: true,
          };
        } else
          return {
            ...item,
            selected: false,
          };
      });
      setFilter({
        isSearcching: true,
        data: [...filteredData],
      });
    }
    setListData([...tempList]);
  };
  const handleSearchResults = (result) => {
    if (result.length) {
      setFilter({
        isSearcching: true,
        data: result,
      });
    } else {
      setFilter({
        isSearcching: false,
        data: [],
      });
    }
  };
  const handleSearchBar = () => {
    searchBar.show();
  };
  const handleYear = (value) => {
    const newList = (value === 'XI' ? sectionListXI : sectionListXII).map(
      (item) => ({
        ...item,
      }),
    );
    console.log('new list:  ', newList);
    setListData([...newList]);
    setYear(value);
  };
  const rendetItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => selectedHandler(item.title)}>
        {
          // Platform.OS === 'android' ?
          <CheckBox value={item.selected} color="#028742" />
          // :
          // <Switch value={item.selected} />
        }
        <Text
          style={{
            ...styles.checkBoxTxt,
            color: item.selected ? '#028742' : 'gray',
            fontWeight: item.selected ? 'bold' : 'normal',
            fontSize: 16,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SearchBar
        ref={(ref) => (searchBar = ref)}
        data={listData}
        handleResults={handleSearchResults}
        backgroundColor="#17202A"
        iconColor="#028742"
        textColor="grey"
        backgroundColor="#25282A"
        placeholderTextColor="#4E5851"
        onHide={() => handleSearchResults([])}
      />
      <SectionListHeader
        handleSearchBar={handleSearchBar}
        navigation={navigation}
        updatedData={listData}
        yearHandler={handleYear}
        section={section}
      />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={rendetItem}
        data={filter.isSearcching ? filter.data : listData}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SectionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2020',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#1F2020',
  },
  item: {
    width: '98%',
    height: 80,
    backgroundColor: '#25282A',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 3,
  },
  checkBoxTxt: {
    marginLeft: 20,
  },
});
