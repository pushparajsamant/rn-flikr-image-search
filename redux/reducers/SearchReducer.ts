import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {searchFlikr} from '../../api/Search';
import {PhotosState} from '../types';
import {AppDispatch} from '../store';

const initialState: PhotosState = {
  page: 1,
  pages: 0,
  perpage: 0,
  total: 0,
  photo: [],
  error: undefined,
  search: '',
  oldSearches: [],
};
// Async thunk for making the API call
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (params: {searchTerm: string; pageNumber: number}) => {
    return await searchFlikr(params.searchTerm, params.pageNumber);
  },
);
// export const searchFlickrAPI = async (
//   searchTerm: string,
//   dispatch: AppDispatch,
//   pageNumber: number,
// ) => {
//   try {
//     const flikrData = await searchFlikr(searchTerm, pageNumber);
//     const {photos} = flikrData ?? {};
//     if (pageNumber > 1) {
//       // We are requesting the next page for load
//       dispatch(getNextItems(photos));
//     } else {
//       //We are requesting a new search
//       dispatch(searchNew({photoData: photos, search: searchTerm}));
//     }
//   } catch (e: any) {
//     //console.log(e.message);
//     dispatch(errored('Could not load data'));
//   }
// };
const Search = createSlice({
  name: 'SearchSlice',
  initialState: initialState,
  reducers: {
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
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {})
      .addCase(fetchData.fulfilled, (state, action) => {
        const {page, photo, search} = action.payload.photos;
        state.error = undefined;
        if (page > 1) {
          state.photo = [...state.photo, ...photo];
          state.page = page;
          state.search = search;
        } else {
          state.oldSearches = [...new Set([...state.oldSearches, search])];
          state.photo = photo;
          state.search = search;
          state.page = page;
          state.error = undefined;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = 'Could not load data';
      });
  },
});

export const {clearSearchTerm, clearItems, deleteSearchItem} = Search.actions;

export default Search.reducer;
