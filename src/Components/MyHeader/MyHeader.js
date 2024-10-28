//import : react components
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Platform,
  Alert,
  ImageBackground,
  NativeModules,
} from 'react-native';
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
//import : custom components
import MyText from '../MyText';
//import : global
import Color, {dimensions} from '../../global/Color';
//import : styles
import {styles} from './MyHeaderStyle';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {logOutUser} from 'src/reduxToolkit/reducer/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {responsiveHeight} from 'react-native-responsive-dimensions';
// import {responsiveWidth} from 'react-native-responsive-dimensions';

const personImg = `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`;
//svg imgess
// import Profile from '../../Global/Images/profile.svg';
// import Notfication from '../../Global/Images/notification.svg';
// import Cart from '../../Global/Images/frame.svg';
// import DrawerIcon from '../../Global/Images/drawer.svg';
const MyHeader = ({
  Title,
  isBackButton = false,
  IsCartIcon = true,
  IsNotificationIcon = true,
  toNavigParams = null,
}) => {
  //variables
  const navigation = useNavigation();
  //   const dispatch = useDispatch();
  //   const cartCount = useSelector(state => state.user.cartCount);
  //   const userInfo = useSelector(state => state.user.userInfo);
  //   const userToken = useSelector(state => state.user.userToken);
  //   const userNotifications = useSelector(state => state.user.userNotifications);
  const [greetingMsg, setGreetingMsg] = useState('');
  const [notoficationCount, setNotificationCount] = useState('');
  // animated code

  const getCartCount = async () => {
    try {
      let resp;

      try {
        // Wrapping the API call in a separate try-catch
        resp = await getApiWithToken(userToken, NOTIFICATION_COUTNG);
      } catch (apiError) {
        console.error('Error during API call:', apiError);
        throw new Error('Failed to fetch data from the server.');
      }

      // Log the entire response to check its structure
      console.log('Response from API  get Api Count--->>>', resp?.data?.data);

      // Check if the response is undefined or null
      if (!resp) {
        console.error('Response is undefined or null');
        Toast.show({text1: 'Failed to fetch data from the server.'});
        return;
      }

      // Check if the response has a data property
      if (resp?.data?.status) {
        console.log('get home after success---->', resp.data.data);
        // setHome(resp?.data?.data);
        // setShiftStatus(resp?.data?.data?.on_duty);
        setNotificationCount(resp?.data?.data);

        // setMyCourses(resp.data.data);
      } else {
        Toast.show({
          text1: resp?.data?.message || 'An unexpected error occurred.',
        });
      }
    } catch (error) {
      console.error('Error in getCartCount:', error);
      // Toast.show({text1: 'An error occurred. Please try again later.'});
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getGreetingMessage();
    getCartCount();
  }, []);
  //   const headerRadius = useDerivedValue(() => {
  //     // console.log('scrollY.value', scrollY.value, scrollY.value === 0 ? 30 : 0);
  //     return withSpring(scrollY.value === 0 ? 0 : 30);
  //   });
  //   const headerPaddingBottom2 = useDerivedValue(() => {
  //     return withSpring(scrollY.value === 0 ? 63 : 20);
  //   });
  //   const headerStyle = {
  //     borderBottomLeftRadius: headerRadius.value,
  //     borderBottomRightRadius: headerRadius.value,
  //     paddingBottom: headerPaddingBottom2,
  //   };

  const getGreetingMessage = () => {
    const now = new Date();
    const hrs = now.getHours();
    let msg = '';

    if (hrs >= 0 || hr == 24) msg = 'Good Morning,';
    if (hrs >= 12) msg = 'Good Afternoon,';
    if (hrs >= 16) msg = 'Good Evening,';
    setGreetingMsg(msg);
  };

  // const resetIndexGoToWelcome = CommonActions.reset({
  //     index: 1,
  //     routes: [{ name: ScreenNames.WELCOME }],
  // });
  //function : navigation function
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  const goBack = () => {
    Keyboard.dismiss();
    navigation.canGoBack() ? navigation.goBack() : console.log("can't go back");
  };
  // const gotoNotification = () => navigation.navigate(ScreenNames.NOTIFICATIONS);
  const gotoCart = () => navigation.navigate('Notification');
  //UI
  return (
    // <ImageBackground
    //   // source={require('../../assest/images/vectorBack.png')}
    //   style={{
    //     height: 100,
    //     width: dimensions.SCREEN_WIDTH,
    //     alignSelf: 'center',
    //     zIndex: 1,
    //     justifyContent: 'center',
    //     // Center the content vertically
    //     backgroundColor: Color.PRIMARY,
    //   }}>
    <View
      style={{
        paddingTop: NativeModules.StatusBarManager?.HEIGHT,
        paddingBottom: responsiveHeight(3.5),
        backgroundColor: Color.PRIMARY,
        flexDirection: 'row',
        // height: 90,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={isBackButton ? goBack : openDrawer}>
          {isBackButton ? (
            <Image
              source={require('../../assest/images/arrow-left.png')}
              style={{height: 24, width: 24, resizeMode: 'contain'}}
            />
          ) : (
            <View style={styles.leftContainer}>
              <Image
                source={require('../../assest/images/drawer.png')}
                style={{width: 24, height: 24, resizeMode: 'contain'}}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // marginHorizontal: 12,
        }}>
        {/* Section for back or drawer icon */}

        {/* Title section */}
        <MyText
          text={Title}
          fontFamily="regular"
          fontSize={20}
          textColor="white"
          letterSpacing={-0.2}
          textAlign="center"
        />

        {/* Right section with cart and notification icons */}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {IsCartIcon && (
          <TouchableOpacity
            onPress={gotoCart}
            style={{marginRight: 10}}></TouchableOpacity>
        )}
        {IsNotificationIcon && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <Image
              source={require('../../assest/images/notification.png')}
              style={{width: 24, height: 24, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
    // </ImageBackground>
  );
};

export default MyHeader;
