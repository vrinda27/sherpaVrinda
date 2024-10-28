import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Color, {dimensions} from '../../global/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserToken, setUser} from '../../reduxToolkit/reducer/user';
import {CommonActions} from '@react-navigation/native';
// import SvgUri from 'react-native-svg-uri';
import {useDispatch} from 'react-redux';
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const [animating, setAnimating] = useState(true);
  const resetIndexGoToUserBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: 'BottomTab'}],
  });

  const resetIndexGoToWelcome = CommonActions.reset({
    index: 1,
    routes: [{name: 'Signin'}],
  });
  useEffect(() => {
    setTimeout(async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('my usertoken splash--->', userToken);
      const userData = JSON.parse(userInfo);
      console.log(',my userdata--->>>', userData);
      if (userData) {
        console.log('my userData token--->>', userToken);
        dispatch(setUserToken(userToken));
        dispatch(setUser(userData));
        console.log('got to homeee');
        navigation.dispatch(resetIndexGoToUserBottomTab);
      } else {
        console.log('got to  weeee');
        navigation.dispatch(resetIndexGoToWelcome);
      }
    }, 2000);
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assest/images/splash.png')}
        style={{
          resizeMode: 'cover',
          width: dimensions.SCREEN_WIDTH,
          height: dimensions.SCREEN_HEIGHT,
          alignSelf: 'center',
        }}></Image>
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
    width: 280,
    height: 123,
    resizeMode: 'contain',
  },
  bottomImg: {
    height: 326,
    width: dimensions.SCREEN_WIDTH * 0.8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Splash;
