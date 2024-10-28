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
import CustomButtonOrange from '../../Components/CustomButtonOrange';
import CustomHeader from '../../Components/CustomHeader';
const Welcome = ({navigation}) => {
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
        source={require('../../assest/images/welcomePerson.png')}
        style={styles.imageBackground}></ImageBackground>
      <View style={styles.overlay}>
        <Image
          source={require('../../assest/images/logoSplash.png')}
          style={styles.logoImg}></Image>
        <View style={styles.mainContainer}>
          <MyText
            text="Welcome to Sherpa"
            fontWeight="700"
            fontSize={30}
            textColor={Color.PRIMARY}
            fontFamily="Roboto"
            style={{fontWeight: '700'}}
          />
          <MyText
            text="Every delivery is a journey, and every journey brings a smile."
            fontWeight="400"
            fontSize={20}
            textColor={Color.orange}
            fontFamily="Roboto"
            style={{
              fontWeight: '400',
              textAlign: 'center',
              width: dimensions.SCREEN_WIDTH * 0.89,
            }}
          />
          <View style={{marginVertical: 12, marginTop: 33}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signin');
              }}>
              <CustomButtonBlue name="Login"></CustomButtonBlue>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginTop: 15}}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <CustomButtonOrange name="Signup"></CustomButtonOrange>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
            <MyText
              text="Terms of Use"
              fontWeight="400"
              fontSize={16}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{
                fontWeight: '400',
              }}
            />
            <MyText
              text=" And "
              fontWeight="400"
              fontSize={16}
              textColor={'black'}
              fontFamily="Roboto"
              style={{
                fontWeight: '400',
              }}
            />
            <MyText
              text="Privacy Policy"
              fontWeight="400"
              fontSize={16}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{
                fontWeight: '400',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.PRIMARY,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  containerImg: {
    height: 164,
    width: dimensions.SCREEN_WIDTH * 0.8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopRightRadius: 101,
    borderBottomRightRadius: 101,
  },
  logoImg: {
    width: dimensions.SCREEN_WIDTH * 0.8,
    height: 149,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bottomImg: {
    height: 326,
    width: dimensions.SCREEN_WIDTH * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageBackground: {
    height: dimensions.SCREEN_HEIGHT,
    width: dimensions.SCREEN_WIDTH,
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.83)', // Adjust the color and opacity as needed
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: dimensions.SCREEN_WIDTH * 0.6,
  },
  buttonBlue: {
    width: dimensions.SCREEN_WIDTH * 0.9,
    marginTop: 12,
  },
});

export default Welcome;
