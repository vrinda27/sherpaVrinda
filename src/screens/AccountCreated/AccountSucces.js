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
const AccountSucces = ({navigation}) => {
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
      <ImageBackground
        source={require('../../assest/images/background.png')}
        style={{
          height: dimensions.SCREEN_HEIGHT,
          width: dimensions.SCREEN_WIDTH,
          alignSelf: 'center',
          marginTop: 100,
        }}
        resizeMode="cover">
        <CustomHeader navigation={navigation} text="Sign up" />
        <View style={{marginTop: 90, alignSelf: 'center'}}>
          <Image
            source={require('../../assest/images/ResetPassword.png')}
            style={styles.logoImg}></Image>
          <MyText
            text="Account Created Successfully"
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
          <MyText
            text="Registration Request Is Submitted For Account 
Approval. Once Approved, You Will Receive An 
Email Confirmation."
            fontWeight="500"
            fontSize={14}
            textColor={Color.dark_gray}
            fontFamily="Roboto"
            style={{
              fontWeight: '500',
              alignSelf: 'center',
              marginTop: 3,
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

export default AccountSucces;
