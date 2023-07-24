import {createSlice} from '@reduxjs/toolkit';
import {searchFlikr} from '../../api/Search';
import {ImageType, PhotosState} from '../types';
import {AppDispatch} from '../store';

const initialState: PhotosState = {
  page: 1,
  pages: 0,
  perpage: 0,
  total: 0,
  photo: {} as ImageType[],
  error: undefined,
  search: '',
  oldSearches: {} as string[],
};

export const searchFlickrAPI = async (
  searchTerm: string,
  dispatch: AppDispatch,
  pageNumber: number,
) => {
  try {
    const flikrData = await searchFlikr(searchTerm, pageNumber);
    const {photos} = flikrData ?? {};
    if (pageNumber > 1) {
      // We are requesting the next page for load
      dispatch(getNextItems(photos));
    } else {
      //We are requesting a new search
      dispatch(searchNew({photoData: photos, search: searchTerm}));
    }
  } catch (e: any) {
    //console.log(e.message);
    dispatch(errored('Could not load data'));
  }
};
const Search = createSlice({
  name: 'SearchSlice',
  initialState: initialState,
  reducers: {
    /*New Search was submitted so add new search term to history and updating the pictures to be shown in the list*/
    searchNew: (state, action) => {
      const joinedOldSearches = Array.isArray(state.oldSearches)
        ? [...state.oldSearches, action.payload.search]
        : [action.payload.search];
      return {
        ...state,
        ...action.payload.photoData,
        ...{
          //The search text is used on 2 pages so updated in the state
          search: action.payload.search,
          // Using Set here to remove duplicates
          oldSearches: [...new Set(joinedOldSearches)],
        },
        ...{error: ''},
      };
    },
    /*Infinite load for the current searched term*/
    getNextItems: (state, action) => {
      const joinedPhotos = [...state.photo, ...action.payload.photo];
      return {
        ...state,
        ...action.payload,
        ...{photo: joinedPhotos},
        ...{error: ''},
      };
    },
    /*Clears the state completely*/
    clearItems: () => initialState,
    /*Clear the search input which will clear the pictures from the HomeScreen*/
    clearSearchTerm: state => {
      //When the search term is cleared we will clear the whole state except the oldSearches
      return {...initialState, ...{oldSearches: state.oldSearches}};
    },
    /*
     * Any error from API will be caught here and user is shown an error. This can be improved by adding a Network
     * middleware like NetInfo. By approach would be to add a HOC to provide each component with Networking capabilities
     * and show an error if user is not connected to Internet
     */
    errored: (state, action) => {
      return {...state, ...{error: action.payload}};
    },
    /*
     * Deletes a search term from the history
     */
    deleteSearchItem: (state, action) => {
      const oldSearches = state.oldSearches.filter(
        item => item !== action.payload,
      );
      return {
        ...state,
        ...{oldSearches: oldSearches},
      };
    },
  },
});

export const {
  searchNew,
  getNextItems,
  clearSearchTerm,
  clearItems,
  errored,
  deleteSearchItem,
} = Search.actions;

export default Search.reducer;
