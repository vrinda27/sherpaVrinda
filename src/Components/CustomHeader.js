import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  NativeModules,
} from 'react-native';
import Color from '../global/Color';
import MyText from './MyText';
import {responsiveHeight} from 'react-native-responsive-dimensions';
const CustomHeader = ({navigation, text, isBackButton = true}) => {
  // console.log('my text coponent--->>', text);
  const handleImageClick = () => {
    navigation.goBack(); // For example, navigate back when other image is clicked
  };
  return (
    <View style={styles.customView}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            isBackButton && handleImageClick();
          }}>
          {isBackButton ? (
            <Image
              source={require('../assest/images/arrowLeft.png')}
              style={{width: 24, height: 24}}></Image>
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={{flex: 5}}>
        <MyText
          text={text}
          fontWeight="400"
          fontSize={18}
          textColor={Color.WHITE}
          fontFamily="Roboto"
          style={{flex: 1, textAlign: 'center'}}
        />
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  customView: {
    flexDirection: 'row',
    marginTop: NativeModules.StatusBarManager.HEIGHT,
    height: responsiveHeight(3),
  },
  container: {
    flex: 1,
    backgroundColor: Color.BG_COLOR,
  },
  input: {
    paddingRight: 10,
    height: 45,
    width: '90%',
    fontSize: 13,
    // borderColor: Mycolors.GrayColor,
    // borderWidth:1,
    backgroundColor: Color.LogininputBox,
    borderRadius: 15,
    color: Color.TEXT_COLOR,

    //   textAlignVertical: 'top',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#132A3A',
    padding: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  shape: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 1000,
    height: 1000,
    flexDirection: 'row',
    bottom: 0,
    transform: [{rotate: '45deg'}],
    bottom: -600,
    left: -302,
    right: 0,
    borderRadius: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    position: 'relative',
    zIndex: 9,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default CustomHeader;
