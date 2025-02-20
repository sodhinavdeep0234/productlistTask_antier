import {createSlice} from '@reduxjs/toolkit';
import {getCategoriesList} from './categoriesAction';

interface categoriesSlice {
  categoriesList: any;
  loading: boolean;
  selectedCategories: any;
}

const initialState: categoriesSlice = {
  categoriesList: [],
  loading: false,
  selectedCategories: null,
};

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    resetCategoriesListData: state => {
      state.categoriesList = [];
    },
    setSelectedCategories: (state, {payload}) => {
      state.selectedCategories = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategoriesList.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCategoriesList.fulfilled, (state, {payload}) => {
      let newData = payload.map((item: any) => ({label: item, value: item}));
      state.categoriesList = [
        {label: 'All Products', value: 'All Products'},
        ...newData,
      ];
      state.loading = false;
    });
    builder.addCase(getCategoriesList.rejected, state => {
      state.loading = false;
    });
  },
});

export const {resetCategoriesListData, setSelectedCategories} =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
