import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MyText from '../MyText';
import Color, {dimensions} from '../../global/Color';

interface ButtonProps {
  title: string;
  onPress: () => void;
  width: any;
  backgroundColor: string;
  textColor: string;
  marginLeft: number;
  marginRight: number;
  marginHorizontal: number;
  borderRadius: any;
  fontSize: number;
  paddingHorizontal: number;
  marginTop?: number;
  margin?: number;
  height?: number;
  alignSelf?: any;
  disabled?: boolean;
}

const MyButton: React.FC<ButtonProps> = ({
  title,
  width = '100%',
  backgroundColor = Color.THEME_GREEN,
  textColor = Color.WHITE,
  onPress,
  marginHorizontal,
  marginLeft,
  marginRight,
  borderRadius = 5,
  fontSize = 16,
  paddingHorizontal,
  height = 50,
  marginTop,
  margin,
  alignSelf,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensions.isTablet ? height + 10 : height,
        borderRadius: borderRadius,
        marginVertical: 10,
        width: width,
        shadowOffset: {width: 0, height: 2},
        shadowColor: Color.DARK_GREY,
        shadowOpacity: 0.5,
        elevation: 10,
        shadowRadius: 15,
        marginHorizontal: marginHorizontal,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        margin: margin,
        paddingHorizontal,
        alignSelf,
      }}
      onPress={onPress}>
      <MyText
        text={title}
        textColor={textColor}
        fontFamily="bold"
        fontSize={fontSize}
        textAlign="center"
        fontWeight={'bold'}
      />
    </TouchableOpacity>
  );
};

export default MyButton;
