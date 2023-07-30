import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchInput from '../../components/SearchInput/SearchInput';
import {
  clearSearchTerm,
  deleteSearchItem,
  fetchData,
  searchFlickrAPI,
} from '../../redux/reducers/SearchReducer';
import {RootState, useAppDispatch} from '../../redux/store';
import {NavigationProp} from '@react-navigation/native';
import {StackNavigatorParams} from '../../navigation/MainNavigation';
import {useSelector} from 'react-redux';
import SearchItem from '../../components/SearchItem/SearchItem';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faChevronLeft,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  navigation: NavigationProp<StackNavigatorParams>;
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const searchState = useSelector((state: RootState) => state.search);
  async function handleSearch(val: string) {
    //console.log(val);

    //dispatch action which will update search value and also do the query to the API
    dispatch(fetchData({searchTerm: val, pageNumber: 1}));
    navigation.goBack();
  }
  function handleDeleteSearchItem(val: string) {
    dispatch(deleteSearchItem(val));
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} color={'grey'} />
        </TouchableOpacity>
        <SearchInput
          onSearch={handleSearch}
          value={searchState.search}
          clearValue={() => {
            dispatch(clearSearchTerm());
          }}
          showClear={true}
          showSubmit={true}
        />
        <FlatList
          data={searchState.oldSearches}
          renderItem={({item}) => (
            <SearchItem
              onTap={(val: string) => handleSearch(val)}
              searchText={item}
              onDelete={(val: string) => handleDeleteSearchItem(val)}
            />
          )}
          inverted={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
