import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

interface simleLoaderProps {
  sizedata?: any;
  color?: string;
  style?: {[x: string | number]: string | number};
}
const SimpleLoader: React.FC<simleLoaderProps> = ({
  sizedata = 'large',
  style,
  color = 'black',
}) => {
  return (
    <View style={style ? [style] : [styles.container]}>
      <ActivityIndicator size={sizedata} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(SimpleLoader);
