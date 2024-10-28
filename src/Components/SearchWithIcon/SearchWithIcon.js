//react components
import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
//global
import Color, {dimensions} from '../../global/Color';
import MyText from '../MyText';
//import : styles
import styles from './SearchWithIconStyle';
const SearchWithIcon = ({
  placeholder,
  placeholderTextColor = '#8F93A0',
  value,
  setValue,
  onChangeText,
  // icon = <MyIcon.AntDesign name="search1" color={Colors.WHITE} size={24} />,
  onPress = () => {},
  showDot = () => {},
  style = {},
}) => {
  //UI
  return (
    <View
      style={{
        alignItems: 'center',
        width: dimensions.SCREEN_WIDTH,
        height: 60,
        zIndex: 2,
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{
          height: 60,
          padding: 10,
          paddingLeft: 20,
          borderRadius: 5,
          fontSize: 14,
          color: 'black',
          width: '80%',
          backgroundColor: Color.WHITE,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 2,
        }}
      />
    </View>
  );
};

export default SearchWithIcon;
{
  /* <TouchableOpacity onPress={onPress} style={styles.iconView}>
                {icon}
                {showDot() ?
                    <View style={styles.dot} />
                    : null}
            </TouchableOpacity> */
}
