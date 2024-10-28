import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Color, {dimensions} from '../global/Color';
import MyText from './MyText';

const NoData = ({}) => {
  return (
    <View
      style={{
        height: dimensions.SCREEN_HEIGHT * 0.58,
        width: dimensions.SCREEN_WIDTH * 0.9,

        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        alignSelf: 'center',
        marginTop: 20,
      }}>
      <Image
        source={require('../assest/images/lock-circle.png')}
        style={{
          width: 194,
          height: 194,
          justifyContent: 'center', // Center vertically
          alignItems: 'center',

          // Center horizontally,
        }}
      />
      <MyText
        text={'No Data Found'}
        fontSize={30}
        textColor={Color.PRIMARY}
        fontFamily="Inter"
        style={{
          alignSelf: 'center',
          fontWeight: '500',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: 12,
        }}
      />
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 80,
    backgroundColor: '#ffffff',
  },
  leftContainer: {
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  centerContainer: {
    flex: 2, // Adjust the flex value as needed
    marginLeft: 10, // Add margin for spacing between leftImage and title
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: 24,
    height: 24,
  },
  imageRight: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    fontWeight: '600',
    color: Color.PRIMARY,
  },
  logoImage: {
    width: 101,
    height: 32,
  },
};

export default NoData;
