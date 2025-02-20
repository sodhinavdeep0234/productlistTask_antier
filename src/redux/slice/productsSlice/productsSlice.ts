import {createSlice} from '@reduxjs/toolkit';
import {
  getProductsByCatList,
  getProductsBySearch,
  getProductsList,
} from './productsAction';

interface productsSlice {
  productsSlice: any;
  searchValue: any;
  loading: boolean;
}

const initialState: productsSlice = {
  productsSlice: {
    allProducts: [],
  },
  loading: false,
  searchValue: false,
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    resetListData: state => {
      state.productsSlice = {};
    },
    setSearchValue: (state, {payload}) => {
      state.searchValue = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductsList.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductsList.fulfilled, (state, {payload}) => {
      let list = state?.productsSlice?.allProducts || [];
      /****  Assuming payload?.data is an array of new items to add ***/
      const newItems = payload?.products;
      //************* Filter out items that already exist in the list based on some unique property ********
      const uniqueNewItems = newItems.filter((newItem: {id: any}) => {
        return !list.some(
          (existingItem: {id: any}) => existingItem.id === newItem.id,
        );
      });
      //Concatenate the unique new items to the existing list
      list = list.concat(uniqueNewItems);
      state.productsSlice.allProducts = list;
      state.productsSlice.total = payload?.total;
      state.productsSlice.skip = payload?.skip;
      state.productsSlice.limit = payload?.limit;
      state.loading = false;
    });
    builder.addCase(getProductsList.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getProductsByCatList.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductsByCatList.fulfilled, (state, {payload}) => {
      state.productsSlice.allProducts = payload?.products;
      state.productsSlice.total = payload?.total;
      state.productsSlice.skip = payload?.skip;
      state.productsSlice.limit = payload?.limit;
      state.loading = false;
    });
    builder.addCase(getProductsByCatList.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getProductsBySearch.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductsBySearch.fulfilled, (state, {payload}) => {
      state.productsSlice.allProducts = payload?.products;
      state.productsSlice.total = payload?.total;
      state.productsSlice.skip = payload?.skip;
      state.productsSlice.limit = payload?.limit;
      state.loading = false;
    });
    builder.addCase(getProductsBySearch.rejected, state => {
      state.loading = false;
    });
  },
});

export const {resetListData, setSearchValue} = productsSlice.actions;

export default productsSlice.reducer;
