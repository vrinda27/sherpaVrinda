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
import Toast from 'react-native-toast-message';
import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomHeader from '../../Components/CustomHeader';
import CustomTextBox from '../../Components/CustomTextBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {setUser, setUserToken} from '../../reduxToolkit/reducer/user';
import {
  requestPostApi,
  postApiWithToken,
  API_ENDPOINTS,
  postAPI,
} from '../../global/Service';
import {useDispatch, useSelector} from 'react-redux';
import MyAlert from '../../global/MyAlert';
import Loader from '../../Components/Loader';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Signin = ({navigation}) => {
  const dispatch = useDispatch();
  const [animating, setAnimating] = useState(true);
  const [emailid, setEmailid] = useState('shoaib@yopmail.com');
  const [password, setPassword] = useState('test@123');
  const [loading, setLoading] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [userToken, _setUserToken] = React.useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [unseenCount, setUnseenCount] = useState({count: 0});
  const resetIndexGoToBottomTab = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'BottomTab'}],
    });
  };
  useEffect(() => {
    // setTimeout(async () => {
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
    // }, 2000);

    setTimeout(() => {
      setAnimating(false);
      // navigation.replace('Welcome');
    }, 5000);
  }, []);

  useEffect(() => {
    checkToken();
  }, []);
  
  const checkToken = async () => {
    try {
      const token = await messaging()?.getToken();
      if (token) {
        console.log('fcm token', token);
        setFcmToken(token);
      } else {
        console.log('could not get fcm token');
      }
    } catch (error) {
      console.log('error in getting fcm token', error);
    }
  };
console.log({fcmToken})
  const LoginPressed = async () => {
    try {
      var EmailReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailid == '') {
        Toast.show({text1: 'Enter Email ID'});
      } else if (!EmailReg.test(emailid)) {
        Toast.show({text1: 'Enter Valid Email ID'});
      } else if (password == '') {
        Toast.show({text1: 'Enter Password'});
      } else {
        setLoading(true);
        console.log('my login erererer---->>>');
        var data = {
          email: emailid,
          password: password,
          device_id: fcmToken,
        };
        const {responseJson, err} = await requestPostApi(
          API_ENDPOINTS?.LOGIN,
          data,
          'POST',
          '',
        );
        if (responseJson?.status) {
          const jsonValue = JSON.stringify(responseJson?.driver);
          await AsyncStorage.setItem(
            'userToken',
            responseJson?.authorization?.token,
          );
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(setUserToken(responseJson?.authorization?.token));
          dispatch(setUser(responseJson?.driver));
          navigation.dispatch(resetIndexGoToBottomTab());
          Toast.show({text1: responseJson?.message});
        } else {
          _setUserToken(responseJson?.token);
          setalert_sms(responseJson?.message);
          setMy_Alert(true);
        }
        // navigation.navigate('HomeScreen');
      }
    } catch (err) {
      console.log('err in signin', err);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const resp = await postApiWithToken(userToken, API_ENDPOINTS.LOGOUT, {});
      if (resp?.data?.status) {
        LoginPressed();
      }
    } catch (err) {
      console.log('err in logout from login', err?.message);
    }
  };

  const forgotPasswordHandler = async () => {
    try {
      setLoading(true);
      if (!emailid) {
        Toast.show({type: 'error', text1: 'Enter Email ID'});
        return;
      }
      const {response} = await postAPI(API_ENDPOINTS.FORGOT_PASSWORD, {
        email: emailid,
      });
      if (response?.status) {
        Toast.show({type: 'success', text1: response?.message});
        navigation.navigate('ForgotPassword', {
          email: emailid,
          otp: response?.otp,
        });
      }
    } catch (err) {
      console.log('err in forgot password', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        navigation={navigation}
        text="Sign In"
        isBackButton={false}
      />
      <ImageBackground
        source={require('../../assest/images/background.png')}
        style={{
          position: 'absolute',
          top: responsiveHeight(11),
          left: 0,
          right: 0,
          bottom: 0,
        }}
        resizeMode="cover">
        <View style={{marginTop: 90, alignSelf: 'center'}}>
          <Image
            source={require('../../assest/images/logoSplash.png')}
            style={styles.logoImg}></Image>
          <MyText
            text="Login"
            fontWeight="700"
            fontSize={30}
            textColor={Color.PRIMARY}
            fontFamily="Roboto"
            style={{fontWeight: '700', alignSelf: 'center', marginTop: 10}}
          />
          <View></View>
          <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
            <CustomTextBox
              imageComponent={
                <Image
                  source={require('../../assest/images/sms.png')}
                  style={styles.iconImg}></Image>
              }
              //  placeholder='Email address'
              value={emailid}
              onChangeText={text => {
                setEmailid(text);
              }}
              placeholder={'Email Address'}></CustomTextBox>
          </View>
          <View style={{marginTop: 12}}>
            <CustomTextBox
              value={password}
              imageComponent={
                <Image
                  source={require('../../assest/images/lock.png')}
                  style={styles.iconImg}></Image>
              }
              placeholder="Password"
              // value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry={true}
              style={{color: 'black'}}
              placeholderTextColor="black"></CustomTextBox>
          </View>
          <TouchableOpacity
            onPress={forgotPasswordHandler}
            style={{marginTop: 8}}>
            <MyText
              text="Forgot Password?"
              fontWeight="normal"
              fontSize={12}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{
                fontWeight: '400',
                textAlign: 'right',
                marginVertical: 13,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              LoginPressed();
            }}
            style={{marginTop: 20}}>
            <CustomButtonBlue name="Sign In"></CustomButtonBlue>
          </TouchableOpacity>
          {/* <View
            style={{
              alignSelf: 'center',
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <Text style={styles.myText}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={[styles.myText, {color: Color.PRIMARY}]}>
                {' '}
                Signup
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ImageBackground>
      {loading ? <Loader /> : null}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
            userToken && logoutHandler();
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.PRIMARY,
  },
  logoImg: {
    width: dimensions.SCREEN_WIDTH * 0.8,
    height: 149,
    resizeMode: 'contain',

    alignSelf: 'center',
  },
  iconImg: {
    height: 24,
    width: 24,
  },
});

export default Signin;
