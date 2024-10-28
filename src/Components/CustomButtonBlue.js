import React from 'react';
import {Text, TextInput, View, Animated, StyleSheet} from 'react-native';
import Color, {dimensions} from '../global/Color';

const CustomButtonBlue = props => {
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};
export default CustomButtonBlue;
const styles = StyleSheet.create({
  button: {
    width: dimensions.SCREEN_WIDTH * 0.89,
    height: 60,
    borderRadius: 5,
    backgroundColor: Color.PRIMARY,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.WHITE,
    fontWeight: '700',
    fontSize: 14,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
});
