import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useAppSelector} from '../redux/reduxHooks/hooks';
import Config from '../utils/Config';
import {moderateScale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string | null;
  handleOnChange?: (item: DropdownItem) => void;
}

const DrowDown: React.FC<DropdownProps> = ({value, handleOnChange}) => {
  const {categoriesList} = useAppSelector(state => state.categoriesSlice);
  console.log('categoriesList=====', categoriesList);

  // Memoized To avoid unnecessary re-renders
  const dropdownData = useMemo(() => {
    return categoriesList.map(
      (item: {label: {name: any}; value: {slug: any}}) => ({
        label: typeof item.label === 'string' ? item.label : item.label.name,
        value: typeof item.value === 'string' ? item.value : item.value.slug,
      }),
    );
  }, [categoriesList]);
  console.log('dropdownData=====', dropdownData);

  const onChange = (item: DropdownItem) => {
    if (handleOnChange) {
      handleOnChange(item);
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropdownData}
        placeholder="All"
        maxHeight={hp('40%')}
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default React.memo(DrowDown);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: hp('1.5%'), 
    right: wp('2%'),
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
  },
  dropdown: {
    height: hp('5%'), 
    borderColor: Config.colors.GRAY,
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(8),
    paddingHorizontal: wp('2%'),
    width: wp('40%'),
  },
  placeholderStyle: {
    fontSize: wp('4%'),
    color: Config.colors.BLACK,
    fontWeight: '600',
  },
  selectedTextStyle: {
    fontSize: wp('4%'),
    color: Config.colors.BLACK,
    fontWeight: '500',
    width: wp('35%'),
    textAlign: 'center',
    overflow: 'hidden',
  },
  iconStyle: {
    width: wp('5%'),
    height: wp('5%'),
  },
  inputSearchStyle: {
    height: hp('5%'),
    fontSize: wp('4%'),
  },
});
