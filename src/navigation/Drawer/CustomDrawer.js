//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/core';
//import : custom components
import MyText from '../../Components/MyText';

// import CustomLoaderLogout from 'components/CustomLoader/CustomLoaderLogout';
//import : global
import Color, {dimensions} from '../../global/Color';
import {connect, useSelector, useDispatch} from 'react-redux';
import {logOutUser} from '../../reduxToolkit/reducer/user';
import {
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
  API_ENDPOINTS,
} from '../../global/Service';
//import : styles
import {styles} from './CustomDrawerStyle';
//import : modal
//import : third parties
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
//import : redux
// import { useSelector, useDispatch } from 'react-redux';
// import { logOutUser, setUser } from 'src/reduxToolkit/reducer/user';
import {useDrawerStatus} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomLoader from '../../components/CustomLoader/CustomLoader';
///svg image
// import Logo from '../../Global/Images/logo.svg';
// import Profile from '../../Global/Images/profile.svg';
const CustomDrawer = ({navigation}) => {
  const dispatch = useDispatch();
  // const dispatch = useNavigation();
  const userToken = useSelector(state => state.user.userToken);
  const user = useSelector(state => state.user.userInfo);
  const isDrawerOpen = useDrawerStatus() === 'open';
  console.log('my token from the user drawer-->>', userToken);
  const [unseenCount, setUnseenCount] = useState({count: 0});
  useEffect(() => {
    if (isDrawerOpen) {
      getCartCount(); // Trigger API call when drawer opens
    }
  }, [isDrawerOpen]);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch the unseen message count when the screen is focused

      getCartCount();
    }, []),
  );

  const getCartCount = async () => {
    console.log('klklk getcargtcount');

    try {
      let resp;

      try {
        // Wrapping the API call in a separate try-catch
        resp = await getApiWithToken(userToken, API_ENDPOINTS.UNSEEN_COUNT);
      } catch (apiError) {
        console.error('Error during API call:', apiError);
        // throw new Error('Failed to fetch data from the server.');
      }

      // Log the entire response to check its structure
      console.log('Response from API  to get unseen countrrr--->>>', resp);

      // Check if the response is undefined or null
      if (!resp) {
        console.error('Response is undefined or null');
        Toast.show({text1: 'Failed to fetch data from the server.'});
        return;
      }

      // Check if the response has a data property
      if (resp?.data?.status) {
        console.log('get home after success---->', resp.data.data);
        setUnseenCount(resp.data.data);
        // setHome(resp?.data?.data);
        // setShiftStatus(resp?.data?.data?.on_duty);

        // setMyCourses(resp.data.data);
      } else {
        resp?.data?.message &&
          Toast.show({
            text1: resp?.data?.message || 'An unexpected error occurred.',
          });
      }
    } catch (error) {
      console.error('Error in getCartCount:', error);
      // Toast.show({text1: 'An error occurred. Please try again later.'});
    } finally {
      setLoading(false);
    }
  };
  //variables
  // const userToken = useSelector(state => state.user.userToken);
  // const dispatch = useDispatch();
  //hook : states
  const [showLoader, setShowLoader] = useState(false);
  //function : imp function
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //function : navigation function
  const closeDrawer = () => {
    // Close the drawer
    navigation.closeDrawer();

    // Navigate to the login screen
    navigation.reset({
      index: 0,
      routes: [{name: 'Signin'}],
    });
  };

  // const resetIndexGoToSignup = CommonActions.reset({
  //     index: 1,
  //     routes: [{ name: ScreenNames.SIGN_UP_1 }],
  // });
  const gotoSignUp = () => {
    // closeDrawer();
    // navigation.dispatch(resetIndexGoToSignup);
  };
  const gotoHome = () => {
    // navigation.navigate(ScreenNames.BOTTOM_TAB, { screen: ScreenNames.HOME });
  };
  const gotoSuperAdminCourses = () => {
    navigation.navigate('Tracker');
  };
  const gotoAllProducts = () => {
    // navigation.navigate(ScreenNames.ALL_PRODUCTS);
  };
  const gotoMyWhishlist = () => {
    navigation.navigate('OrderStack', {
      screen: 'Order',
      params: {status: '3'},
    });
  };
  const gotoMyOrders = () => {
    // navigation.navigate(ScreenNames.MY_ORDERS);
  };
  const gotoWelcome = () =>
    CommonActions.reset({
      index: 1,
      routes: [{name: 'Signin'}],
    });
  const logout = async () => {
    setShowLoader(true);
    try {
      const resp = await postApiWithToken(userToken, API_ENDPOINTS.LOGOUT, {});
      console.log('logout resp', resp?.data);
      if (resp?.data?.status) {
        await AsyncStorage.clear();
        logOutUser();
        closeDrawer();
        dispatch(gotoWelcome);
      }
    } catch (error) {
      console.log('error in logout', error);
    }
    setShowLoader(false);
  };
  //UI
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: '10%'}}>
        <View style={styles.mainView}>
          <Image
            resizeMode="contain"
            style={styles.imageSplash}
            source={require('../../assest/images/logoSplash.png')}
          />
          {/* <Logo height={56} width={226}></Logo> */}
          {/* <TouchableOpacity
                        style={styles.crossImage}
                    onPress={() => {
                        closeDrawer();
                    }}
                    >
                        <Image
                            resizeMode="contain"
                            // style={styles.image}
                            source={require('../../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: dimensions.SCREEN_WIDTH * 0.5,
            }}>
            <Image
              source={{uri: user?.profile_image_url}}
              style={{
                width: 43,
                height: 43,
                resizeMode: 'cover',
                marginRight: 7,
                borderRadius: 50,
              }}></Image>
            <View>
              <MyText
                text={user?.first_name}
                fontFamily="Roboto"
                fontSize={16}
                textColor={Color.WHITE}
                style={{marginTop: 3, fontWeight: '600'}}
              />
              <MyText
                text={user?.email}
                fontFamily="Roboto"
                fontSize={14}
                textColor={Color.WHITE}
                style={{marginTop: 4, fontWeight: '400'}}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={{
              width: 74,
              height: 33,
              borderRadius: 5,
              backgroundColor: Color.orange,
              marginRight: 44,
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: 9,
            }}>
            <MyText
              text={'View Profile'}
              fontFamily="Outfit"
              fontSize={10}
              textColor={Color.WHITE}
              style={{alignSelf: 'center', fontWeight: '500'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 20, paddingLeft: 28, paddingRight: 24}}>
          <DrawerItemList
            Title="Home"
            image={require('../../assest/images/CompletedJob.png')}
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <DrawerItemList
            Title="Completed Jobs"
            image={require('../../assest/images/CompletedJob.png')}
            onPress={gotoMyWhishlist}
          />
          <DrawerItemList
            Title="Scheduled Jobs"
            image={require('../../assest/images/schduledJob.png')}
            onPress={() => navigation.navigate('SchduledJobs')}
          />
          <DrawerItemList
            Title="Attendance"
            image={require('../../assest/images/Attandance.png')}
            onPress={gotoSuperAdminCourses}
          />
          <DrawerItemList
            Title="Time Card"
            image={require('../../assest/images/privacy.png')}
            onPress={() => {
              navigation.navigate('TimeCard');
            }}
          />
          {/* <DrawerItemList
            Title="Products"
            image={require('assets/images/products-img.png')}
            onPress={gotoAllProducts}
          /> */}
          <View style={{flexDirection: 'row'}}>
            <DrawerItemList
              Title={`Chat Support `}
              image={require('../../assest/images/messages.png')}
              onPress={() => {
                navigation.navigate('Chat');
              }}
            />
            {unseenCount > 0 ? (
              <View
                style={{
                  height: 8,
                  width: 8,
                  backgroundColor: 'red',
                  borderRadius: 40,
                }}></View>
            ) : null}
            {unseenCount > 0 ? (
              <Text style={{fontSize: 14, color: 'white', marginTop: 3}}>
                {`(${unseenCount})`}
              </Text>
            ) : null}
          </View>
          <DrawerItemList
            Title="Terms & Conditions"
            image={require('../../assest/images/stickynote.png')}
          />

          <DrawerItemList
            Title="Privacy Policy"
            image={require('../../assest/images/privacy.png')}
          />

          <DrawerItemList
            Title="Logout"
            image={require('../../assest/images/logout.png')}
            onPress={logout}
          />
        </View>

        <View style={styles.socialMediaContainer}>
          <View
            style={{
              width: dimensions.SCREEN_WIDTH * 0.9,
              height: 2,
              backgroundColor: Color.WHITE,
            }}></View>
          <MyText
            text={'Follow Us!'}
            fontSize={12}
            textColor="white"
            fontFamily="regular"
            style={{marginTop: 12, paddingHorizontal: 22}}
          />
          <View
            style={[
              styles.socialRow,
              {marginVertical: 12, marginHorizontal: 22},
            ]}>
            <Image
              source={require('../../assest/images/facebook.png')}
              style={{height: 18, width: 18}}
            />
            <Image
              source={require('../../assest/images/youtube.png')}
              style={{marginLeft: 12, height: 18, width: 18}}
            />
            <Image
              source={require('../../assest/images/instagram.png')}
              style={{marginLeft: 12, height: 18, width: 18}}
            />
          </View>
          <View
            style={{
              width: dimensions.SCREEN_WIDTH * 0.9,
              height: 2,
              backgroundColor: Color.WHITE,
            }}></View>
        </View>

        <MyText
          text={'App Version: V1.0.0.12'}
          fontSize={12}
          textColor={Color.WHITE}
          fontFamily="Qutfit"
          style={{marginLeft: 26, marginTop: 16, fontWeight: '400'}}
        />

        {/* <Text style={styles.versionText}>App Version: V1.0.0.12</Text> */}
      </ScrollView>
      {/* <CustomLoader text="Logging Out...." showLoader={showLoader} /> */}
    </View>
  );
};

export default CustomDrawer;

export const DrawerItemList = ({Title = '', image, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // width: '90%',
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={image} style={{width: 24, height: 24}} />
        <MyText
          text={Title}
          fontSize={14}
          textColor="white"
          fontFamily="medium"
          style={{marginLeft: 14}}
        />
      </View>
      {/* <Image source={require('assets/images/white-right.png')} /> */}
    </TouchableOpacity>
  );
};
