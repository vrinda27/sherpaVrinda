import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomHeader from '../../Components/CustomHeader';
import CustomTextBox from '../../Components/CustomTextBox';
const SuccessScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      // const userInfo = await AsyncStorage.getItem('userInfo');
      // const userToken = await AsyncStorage.getItem('userToken');
      // const userData = JSON.parse(userInfo);
      // if (userData) {
      //     dispatch(setUserToken(userToken));
      //     dispatch(setUser(userData));
      //     if (userData != null) {
      //         navigation.navigate("MainContainer");
      //     } else {
      //         navigation.navigate("Register");
      //     }
      // } else {
      //     navigation.navigate("Register");
      // }
    }, 2000);

    setTimeout(() => {
      setAnimating(false);
      // navigation.replace('Welcome');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} text="Reset Password" />
      <ImageBackground
        source={require('../../assest/images/background.png')}
        style={{
          height: dimensions.SCREEN_HEIGHT,
          width: dimensions.SCREEN_WIDTH,
          alignSelf: 'center',
          marginTop: 100,
        }}
        resizeMode="cover">
        <View style={{marginTop: 90, alignSelf: 'center'}}>
          <Image
            source={require('../../assest/images/ResetPassword.png')}
            style={styles.logoImg}></Image>
          <MyText
            text="Password Changed
Successfully"
            fontWeight="500"
            fontSize={30}
            textColor={Color.PRIMARY}
            fontFamily="Roboto"
            style={{
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 10,
              textAlign: 'center',
            }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signin');
            }}
            style={{marginTop: 30}}>
            <CustomButtonBlue name="Sign In"></CustomButtonBlue>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.PRIMARY,
  },
  logoImg: {
    width: 134,
    height: 136,
    resizeMode: 'contain',

    alignSelf: 'center',
  },
  iconImg: {
    height: 24,
    width: 24,
  },
});

export default SuccessScreen;
