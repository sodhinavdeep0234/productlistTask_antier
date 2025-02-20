/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppDispatch, useAppSelector} from '../../redux/reduxHooks/hooks';
import {
  getProductsList,
  getProductsByCatList,
  getProductsBySearch,
} from '../../redux/slice/productsSlice/productsAction';
import {
  resetListData,
  setSearchValue,
} from '../../redux/slice/productsSlice/productsSlice';
import {getCategoriesList} from '../../redux/slice/categoriesSlice/categoriesAction';
import {setSelectedCategories} from '../../redux/slice/categoriesSlice/categoriesSlice';

import Config from '../../utils/Config';
import CustomSearchBar from '../../component/customSearchBar';
import Products from '../../component/products';
import DrowDown from '../../component/drowDown';
import SimpleLoader from '../../layouts/simpleLoader';

interface PaginationState {
  limit: number;
  page: number;
}

interface DropdownItem {
  value: string;
  name: string;
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    limit: 10,
    page: 0,
  });

  const {productsSlice, searchValue, loading} = useAppSelector(
    state => state.productsSlice,
  );
  const {categoriesList, selectedCategories} = useAppSelector(
    state => state.categoriesSlice,
  );

  /** Fetch Categories **/
  const fetchCategories = useCallback(() => {
    if (!categoriesList.length) dispatch(getCategoriesList(''));
  }, [categoriesList.length]);

  /** Fetch Products **/
  const fetchProducts = useCallback(
    (_pagination: PaginationState) => {
      if (!selectedCategories && !searchValue) {
        dispatch(getProductsList(_pagination));
      }
    },
    [selectedCategories, searchValue],
  );

  /** Handle Pagination **/
  const handlePagination = useCallback(() => {
    setPagination(prev => {
      const newPagination = {...prev, page: prev.page + 10};
      fetchProducts(newPagination);
      return newPagination;
    });
  }, [fetchProducts]);

  /** Handle Category Change **/
  const handleOnChange = useCallback(
    (item: DropdownItem) => {
      console.log('Dropdown selected:', item);

      dispatch(resetListData());
      dispatch(setSearchValue(''));
      setPagination({limit: 10, page: 0});

      if (item.value === 'All Products') {
        dispatch(setSelectedCategories(null));
        fetchProducts({limit: 10, page: 0});
      } else {
        dispatch(
          getProductsByCatList({category: item.value, limit: 10, page: 0}),
        );
      }
    },
    [fetchProducts],
  );

  /** Handle Search Input **/
  const handleSearchBar = useCallback((text: string) => {
    dispatch(setSelectedCategories(null));
    dispatch(setSearchValue(text));

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setPagination({limit: 10, page: 0});
      dispatch(resetListData());
      dispatch(getProductsBySearch(text));
    }, 800);
  }, []);

  /** Initial Data Fetch **/
  useEffect(() => {
    fetchCategories();
    fetchProducts(pagination);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Products</Text>
        <DrowDown value={selectedCategories} handleOnChange={handleOnChange} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <CustomSearchBar
          searchValue={searchValue}
          handleSearchBar={handleSearchBar}
        />
      </View>

      {/* Product List */}
      <Products
        productsData={productsSlice}
        handlePagination={handlePagination}
        title={selectedCategories || searchValue || 'All'}
      />

      {/* Loader */}
      {loading && <SimpleLoader />}
    </SafeAreaView>
  );
};

export default React.memo(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.colors.WHITE,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Config.colors.WHITE,
    paddingVertical: hp('2%'),
    borderBottomColor: '#ccc',
    elevation: moderateScale(5),
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Config.colors.BLACK,
    right: wp('5%'),
  },
  searchContainer: {
    marginVertical: hp('1.5%'),
    marginHorizontal: wp('2%'),
  },
});
