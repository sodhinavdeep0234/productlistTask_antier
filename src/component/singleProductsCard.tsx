import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image'

interface ProductItem {
  thumbnail: string;
  brand: string;
  description: string;
}

interface SingleProductsCardProps {
  item: ProductItem;
}

const SingleProductsCard = ({item}: SingleProductsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <FastImage source={{ uri: item?.thumbnail }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.title}>{item?.brand}</Text>
        <Text style={styles.description}>{item?.description} </Text>
      </View>
    </View>
  );
};

export default SingleProductsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5)
  },
  imageContainer: {
    marginRight: moderateScale(10),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  image: {
    width: moderateScale(90), 
    height: moderateScale(90) 
  },
  textContainer: {
    flex: 1,
    marginHorizontal:moderateScale(10)
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(5)
  },
  description: {
    fontSize: moderateScale(14),
    fontWeight:'600'
  },
});
