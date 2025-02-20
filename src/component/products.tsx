import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SingleProductsCard from './singleProductsCard';

interface Product {
  id: string;
  name: string;
  thumbnail: string;
  brand: string;
  description: string;
  price: number;
  category: string;
}


interface ProductsData {
  allProducts: Product[];
  total: number;
  skip: number;
}

interface ProductsProps {
  productsData: ProductsData;
  title: string;
  handlePagination: () => void;
}

const Products: React.FC<ProductsProps> = ({ productsData, title, handlePagination }) => {
  const modifyData = useMemo(
    () =>
      productsData?.allProducts?.length
        ? [{ title, data: productsData.allProducts }]
        : [],
    [productsData, title]
  );

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        sections={modifyData}
        renderItem={({ item }) => <SingleProductsCard item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={() => {
          if (productsData.total > productsData.skip) {
            handlePagination();
          }
        }}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>No Data Found!</Text>
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(Products);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2%'),
  },
  listContainer: {
    flexGrow: 1,
    gap: hp('2%'),
  },
  sectionHeader: {
    backgroundColor: 'lightgray',
    padding: moderateScale(10),
  },
  sectionHeaderText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  listEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('50%'),
  },
  listEmptyText: {
    fontSize: wp('4.5%'),
    color: 'gray',
  },
});
