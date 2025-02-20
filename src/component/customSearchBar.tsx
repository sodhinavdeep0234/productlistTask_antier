import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../utils/Config';

interface CustomSearchBarProps {
  handleSearchBar: (text: string) => void;
  searchValue: string;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ handleSearchBar, searchValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={searchValue}
        placeholder="Search Products"
        placeholderTextColor={Config.colors.BLACK}
        onChangeText={handleSearchBar}
        style={styles.input}
      />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.3%') },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
    backgroundColor: Config.colors.WHITE,
    borderRadius: moderateScale(10),
  },
  input: {
    paddingHorizontal: wp('3%'),
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
});
