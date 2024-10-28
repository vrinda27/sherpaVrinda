import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomHeader from '../../Components/CustomHeader';
import CustomTextBox from '../../Components/CustomTextBox';
import {
  API_ENDPOINTS,
  postAPI,
  requestPostApi,
  postApiWithToken,
} from '../../global/Service';
import Toast from 'react-native-toast-message';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserToken, setUser} from '../../reduxToolkit/reducer/user';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../Components/Loader';

const ResetPassword = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.user?.userToken);
  const scrollViewRef = useRef();
  const [animating, setAnimating] = useState(true);
  const [loader, setLoader] = useState(false);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [password, setPassword] = useState({
    oldPassword: 'password',
    newPassword: '',
    confirmPassword: '',
  });
  const [err, setErr] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (route?.params?.isPasswordReset) {
      setPassword(value => ({...value, oldPassword: ''}));
    }
    const keyboardShown = Keyboard.addListener('keyboardDidShow', () => {
      setPaddingBottom(
        responsiveHeight(route?.params?.isPasswordReset ? 18 : 10),
      );
    });
    const keyboardHide = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setPaddingBottom(responsiveHeight(0));
        setTimeout(() => {
          scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
        });
      },
      500,
    );

    return () => {
      keyboardHide?.remove();
      keyboardShown?.remove();
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     // const userInfo = await AsyncStorage.getItem('userInfo');
  //     // const userToken = await AsyncStorage.getItem('userToken');
  //     // const userData = JSON.parse(userInfo);
  //     // if (userData) {
  //     //     dispatch(setUserToken(userToken));
  //     //     dispatch(setUser(userData));
  //     //     if (userData != null) {
  //     //         navigation.navigate("MainContainer");
  //     //     } else {
  //     //         navigation.navigate("Register");
  //     //     }
  //     // } else {
  //     //     navigation.navigate("Register");
  //     // }
  //   }, 2000);

  //   setTimeout(() => {
  //     setAnimating(false);
  //     // navigation.replace('Welcome');
  //   }, 5000);
  // }, []);

  const resetIndexGoToBottomTab = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'BottomTab'}],
    });
  };

  const logoutHandler = async userToken => {
    try {
      const resp = await postApiWithToken(userToken, API_ENDPOINTS.LOGOUT, {});
      if (resp?.data?.status) {
        LoginPressed();
      }
    } catch (err) {
      console.log('err in logout from login', err?.message);
    }
  };

  const LoginPressed = async () => {
    console.log('done');
    try {
      var data = {
        email: route?.params?.email,
        password: password?.newPassword,
        device_id: '88888',
      };
      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS?.LOGIN,
        data,
        'POST',
        '',
      );
      if (responseJson?.status) {
        console.log('shoaib', responseJson);
        const jsonValue = JSON.stringify(responseJson?.driver);
        await AsyncStorage.setItem(
          'userToken',
          responseJson?.authorization?.token,
        );
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(setUserToken(responseJson?.authorization?.token));
        dispatch(setUser(responseJson?.driver));
        resetIndexGoToBottomTab();
        Toast.show({
          type: responseJson?.status ? 'success' : 'error',
          text1: responseJson?.message,
        });
      } else if (!responseJson?.status && responseJson?.token) {
        logoutHandler(responseJson?.token);
      }
    } catch (err) {
      console.log('err in signin', err);
    }
  };

  const passwordBoxHandler = () => {
    setErr({
      oldPassword: password?.oldPassword?.length === 0,
      newPassword: password?.newPassword?.length === 0,
      confirmPassword: password?.confirmPassword?.length === 0,
    });
  };

  const savePasswordHandler = async () => {
    try {
      setLoader(true);
      if (
        password?.oldPassword?.length === 0 ||
        password?.newPassword?.length === 0 ||
        password?.confirmPassword?.length === 0
      ) {
        passwordBoxHandler();
        return;
      }
      if (password?.newPassword !== password?.confirmPassword) {
        setErr({
          newPassword: false,
          confirmPassword: true,
        });
        return;
      }
      const data = route?.params?.isPasswordReset
        ? {
            old_password: password.oldPassword,
            new_password: password?.newPassword,
            new_password_confirmation: password?.confirmPassword,
          }
        : {
            email: route.params.email,
            otp: route.params.otp,
            password_confirmation: password?.confirmPassword,
            password: password?.newPassword,
          };
      const {response} = await postAPI(
        route?.params?.isPasswordReset
          ? API_ENDPOINTS.CHANGE_PASSWORD
          : API_ENDPOINTS.RESET_PASSWORD,
        data,
        userToken ? userToken : '',
      );
      if (!response?.status) {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
      if (response?.status) {
        userToken &&
          Toast.show({
            type: 'success',
            text1: response?.message,
          });
        !route?.params?.isPasswordReset
          ? LoginPressed()
          : navigation.navigate('Profile');
      }
    } catch (err) {
      console.log('err in reset password', err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: paddingBottom}}>
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
                  source={require('../../assest/images/ResetPasswordLoack.png')}
                  style={styles.logoImg}></Image>
                <MyText
                  text={
                    route?.params?.isPasswordReset
                      ? 'Reset Password'
                      : 'OTP Verified '
                  }
                  fontWeight="500"
                  fontSize={30}
                  textColor={Color.PRIMARY}
                  fontFamily="Roboto"
                  style={{
                    fontWeight: '500',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                />
                <MyText
                  text="Set your new Password"
                  fontWeight="500"
                  fontSize={16}
                  textColor={Color.dark_gray}
                  fontFamily="Roboto"
                  style={{fontWeight: '500', alignSelf: 'center'}}
                />
                <View
                  style={{
                    marginTop: 22,
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    borderWidth: route?.params?.isPasswordReset
                      ? responsiveWidth(0.25)
                      : 0,
                    borderColor: err?.oldPassword ? 'red' : 'rgba(0,0,0,.3)',
                  }}>
                  {route?.params?.isPasswordReset && (
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/lock.png')}
                          style={styles.iconImg}></Image>
                      }
                      placeholder={'Old Password'}
                      value={password.oldPassword}
                      onChangeText={text => {
                        err?.oldPassword &&
                          setErr(value => ({...value, oldPassword: false}));
                        setPassword(value => ({...value, oldPassword: text}));
                      }}
                      secureTextEntry={true}
                      style={{
                        borderWidth: 0,
                      }}
                      placeholderTextColor="black"></CustomTextBox>
                  )}
                </View>
                <View
                  style={{
                    marginTop: 22,
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    borderWidth: responsiveWidth(0.25),
                    borderColor: err?.newPassword ? 'red' : 'rgba(0,0,0,.3)',
                  }}>
                  <CustomTextBox
                    imageComponent={
                      <Image
                        source={require('../../assest/images/lock.png')}
                        style={styles.iconImg}></Image>
                    }
                    placeholder={'New Password'}
                    value={password.newPassword}
                    onChangeText={text => {
                      err?.newPassword &&
                        setErr(value => ({...value, newPassword: false}));
                      setPassword(value => ({...value, newPassword: text}));
                    }}
                    secureTextEntry={true}
                    style={{
                      borderWidth: 0,
                    }}
                    placeholderTextColor="black"></CustomTextBox>
                </View>

                <View
                  style={{
                    marginTop: 22,
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    borderWidth: responsiveWidth(0.25),
                    borderColor: err?.confirmPassword
                      ? 'red'
                      : 'rgba(0,0,0,.3)',
                  }}>
                  <CustomTextBox
                    imageComponent={
                      <Image
                        source={require('../../assest/images/lock.png')}
                        style={styles.iconImg}></Image>
                    }
                    placeholder="Confirm New Password"
                    value={password.confirmPassword}
                    onChangeText={text => {
                      err?.confirmPassword &&
                        setErr(value => ({...value, confirmPassword: false}));
                      setPassword(value => ({
                        ...value,
                        confirmPassword: text,
                      }));
                    }}
                    secureTextEntry={true}
                    style={{
                      borderWidth: 0,
                    }}
                    placeholderTextColor="black"></CustomTextBox>
                </View>

                {err?.confirmPassword &&
                  password?.password !== password?.confirmPassword && (
                    <Text
                      style={{marginTop: responsiveHeight(0.1), color: 'red'}}>
                      Confirm password doesn't match with password
                    </Text>
                  )}
                <TouchableOpacity
                  onPress={savePasswordHandler}
                  style={{marginTop: 30}}>
                  <CustomButtonBlue name="Save Password"></CustomButtonBlue>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {loader && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(100),
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

export default ResetPassword;
