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
import { useSelector } from 'react-redux';
const CELL_COUNT = 4;
const ResetPasswordProfile = ({navigation, routes}) => {
  const userInfo = useSelector(state => state?.user)
  const [animating, setAnimating] = useState(true);
  const [otp, setOtp] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [mprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);
  const pinRefs = [pin1Ref, pin2Ref, pin3Ref, pin4Ref, pin5Ref, pin6Ref];
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
console.log({userInfo: userInfo?.userInfo?.email})
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
            text={userInfo?.userInfo?.email + ' ' + routes?.params?.otp}
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
              onChangeText={setValue}
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
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>
          <MyText
            text="Resent Otp"
            fontWeight="500"
            fontSize={16}
            textColor={Color.PRIMARY}
            fontFamily="Roboto"
            style={{fontWeight: '500', alignSelf: 'center'}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResetPassword');
            }}
            style={{marginTop: 20}}>
            <CustomButtonBlue name="Validate OTP"></CustomButtonBlue>
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

export default ResetPasswordProfile;
