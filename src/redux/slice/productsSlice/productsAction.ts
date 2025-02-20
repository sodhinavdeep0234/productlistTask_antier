import {createAsyncThunk, SerializedError} from '@reduxjs/toolkit';
import productsService from '../../../api/services/products.service';

interface LoginResponse {
  [x: string]: any;
  data: any;
  code: number;
  message: string;
}

export const getProductsList = createAsyncThunk<
  LoginResponse,
  any,
  {rejectValue: SerializedError}
>('getProductsList', async (data, thunkApi: any) => {
  try {
    const response = await productsService.getProductsList(data);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as SerializedError);
  }
});
export const getProductsByCatList = createAsyncThunk<
  LoginResponse,
  any,
  {rejectValue: SerializedError}
>('getProductsByCatList', async (data, thunkApi: any) => {
  try {
    const response = await productsService.getProductsByCatList(data);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as SerializedError);
  }
});
export const getProductsBySearch = createAsyncThunk<
  LoginResponse,
  any,
  {rejectValue: SerializedError}
>('getProductsBySearch', async (label, thunkApi: any) => {
  try {
    const response = await productsService.getProductsBySearch(label);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error as SerializedError);
  }
});
