import {combineReducers, configureStore} from '@reduxjs/toolkit';
import categoriesSlice from '../slice/categoriesSlice/categoriesSlice';
import productsSlice from '../slice/productsSlice/productsSlice';
import {persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage,
};

let rootReducer = combineReducers({
  categoriesSlice: categoriesSlice,
  productsSlice: productsSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
