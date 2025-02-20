import {createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import categoriesService from '../../../api/services/categories.service';

interface LoginResponse {
  [x: string]: any;
  data: any;
  code: number;
  message: string;
}

export const getCategoriesList = createAsyncThunk<
  LoginResponse,
  any,
  {rejectValue: SerializedError}
>('getCategoriesList', async (thunkApi: any) => {
  try {
    const response = await categoriesService.getCategoriesList();
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as SerializedError);
  }
});
