import React, {useState, useEffect, useRef} from 'react';
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {API_ENDPOINTS, postAPI} from '../../global/Service';
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const CELL_COUNT = 4;
const ForgotPassword = ({navigation, route}) => {
  const [animating, setAnimating] = useState(true);
  const [otp, setOtp] = useState('');
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [mprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [err, setErr] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);
  const pinRefs = [pin1Ref, pin2Ref, pin3Ref, pin4Ref, pin5Ref, pin6Ref];
  useEffect(() => {
    route?.params?.otp && setOtp(route?.params?.otp);
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

  const resendPasswordHandler = async () => {
    try {
      setValue('');
      setLoader(true);
      const response = await postAPI(API_ENDPOINTS.FORGOT_PASSWORD, {
        email: route?.params?.email,
      });
      if (response?.response?.status) {
        setOtp(response?.response?.otp);
      }
      Toast.show({
        type: response?.response?.status ? 'success' : 'error',
        text1: response?.response?.message,
      });
    } catch (err) {
      console.log('err in forgot password', err);
    } finally {
      setLoader(false);
    }
  };

  const otpBoxValidator = () => {
    setErr({
      1: value?.length < 1,
      2: value?.length < 2,
      3: value?.length < 3,
      4: value?.length < 4,
    });
  };

  const validateOtp = async () => {
    try {
      if (value?.length < 4) {
        otpBoxValidator();
        return;
      }
      setLoader(true);
      const {response} = await postAPI(API_ENDPOINTS.VERIFY_OTP, {
        email: route.params.email,
        otp: value,
      });
    Toast.show({
        type: response?.status ? 'success' : 'error',
        text1: response?.message,
      });
      if (response?.status) {
        navigation.navigate('ResetPassword', {
          email: route.params.email,
          otp: value,
        });
      }
    } catch (err) {
      console.log('err in validate otp', err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <CustomHeader navigation={navigation} text="Forgot Password?" />
        <ImageBackground
          source={require('../../assest/images/background.png')}
          style={{
            height: dimensions.SCREEN_HEIGHT,
            width: dimensions.SCREEN_WIDTH,
            alignSelf: 'center',
            marginTop: 100,
          }}
          resizeMode="cover">
          <View style={{marginTop: 90}}>
            <Image
              source={require('../../assest/images/forgotPassword.png')}
              style={styles.forgotPass}></Image>
            <MyText
              text="Wohoo!!!"
              fontWeight="700"
              fontSize={30}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{fontWeight: '700', alignSelf: 'center', marginTop: 10}}
            />
            <MyText
              text="We have sent you a verification code to "
              fontWeight="500"
              fontSize={16}
              textColor={Color.dark_gray}
              fontFamily="Roboto"
              style={{fontWeight: '500', alignSelf: 'center', marginTop: 10}}
            />
            <MyText
              text={route?.params?.email + ' ' + otp}
              fontWeight="500"
              fontSize={16}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{fontWeight: '500', alignSelf: 'center'}}
            />
            <View
              style={{
                width: dimensions.SCREEN_WIDTH * 0.9,
                height: 100,
                zIndex: 999,
                alignSelf: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <CodeField
                ref={ref}
                {...mprops}
                value={value}
                onChangeText={text => {
                  setErr({1: false, 2: false, 3: false, 4: false});
                  setValue(text);
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                // placeholder="-"
                // placeholderTextColor={Mycolors.TEXT_COLOR}
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[
                      styles.cellRoot,
                      isFocused && styles.focusCell,
                      {
                        borderColor: 'red',
                        borderWidth: err[`${index + 1}`]
                          ? responsiveWidth(0.25)
                          : 0,
                      },
                    ]}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            <TouchableOpacity onPress={resendPasswordHandler}>
              <MyText
                text="Resend OTP"
                fontWeight="500"
                fontSize={16}
                textColor={Color.PRIMARY}
                fontFamily="Roboto"
                style={{fontWeight: '500', alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={validateOtp} style={{marginTop: 20}}>
              <CustomButtonBlue name="Validate OTP"></CustomButtonBlue>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {loader && <Loader />}
    </>
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
  forgotPass: {
    width: 134,
    height: 136,
    alignSelf: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
    width: dimensions.SCREEN_WIDTH * 0.8,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 12,
  },
  cellRoot: {
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto', // Add this line to push the view to the right side
    marginRight: 'auto', // Add this line to push the view to the left side
    backgroundColor: '#F5F6F7',
    borderRadius: 5,
  },
  cellText: {
    color: 'black',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    // borderBottomColor: '#007AFF',55
    // borderBottomWidth: 2,
    backgroundColor: '#F5F6F7',
  },
});

export default ForgotPassword;
