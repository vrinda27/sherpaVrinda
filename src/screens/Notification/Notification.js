import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  ImageBackground,
  FlatList,
} from 'react-native';
import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './NotificationStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import {
  getApiWithToken,
  NOTIFICATION,
  postApiWithToken,
  CLEAR_NOTIFICATION,
  requestPostApi,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import MyAlert from '../../global/MyAlert';
import Loader from '../../Components/Loader';
///svg
// import Notofication from '../Global/Images/notificationNoData.svg';
const Notification = ({navigation}) => {
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [animating, setAnimating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [scrolling, setscrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notificatons, setNotifications] = useState([]);
  const [My_Alert, setMy_Alert] = useState(false);
  const scrollY = useSharedValue(0);
  const renderNextButton = () => null;
  const renderDoneButton = () => null;

  const physicianCourse = [
    {
      id: '1',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
    {
      id: '2',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
    {
      id: '3',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
    {
      id: '4',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
  ];
  const schedule = [
    {
      id: '1',
      name: 'Jane Doe (Admin)',
      module: 'Module 3',
      time: '12 Mar, 09:30 Am',
    },
  ];
  const handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    scrollY.value = event.nativeEvent.contentOffset.y;
    if (yOffset === 0) {
      // Your code to handle reaching the top of the scroll view
      console.log('Reached the top');
      setscrolling(false);
    } else {
      setscrolling(true);
    }
  };
  const onRefresh = React.useCallback(() => {
    // checkcon();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const RenderItem = ({item}) => {
    return <></>;
  };
  const RenderItemLead = ({item}) => {
    return (
      <TouchableOpacity style={styles.teamView}>
        <View style={styles.circularBackground}>
          <Bat style={{alignSelf: 'center'}}></Bat>
        </View>
        <View style={{marginTop: 28}}>
          <MyText
            text={item.title}
            fontWeight="400"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Roboto"
            style={{textAlign: 'center'}}
          />
          <View style={styles.statusView}>
            {item.status == 'Completed' ? (
              <View style={styles.rowView}>
                <Completed style={{alignSelf: 'center'}}></Completed>
                <MyText
                  text={item.status}
                  fontWeight="400"
                  fontSize={12}
                  textColor={Color.PRIMARY}
                  fontFamily="Roboto"
                  style={{textAlign: 'center', marginHorizontal: 2}}
                />
              </View>
            ) : item.status == 'Ongoing' ? (
              <View style={styles.rowView}>
                <Ongoing style={{alignSelf: 'center'}}></Ongoing>
                <MyText
                  text={item.status}
                  fontWeight="400"
                  fontSize={12}
                  textColor={Color.PRIMARY}
                  fontFamily="Roboto"
                  style={{textAlign: 'center', marginHorizontal: 2}}
                />
              </View>
            ) : (
              <View style={styles.rowView}>
                <Pending style={{alignSelf: 'center'}}></Pending>
                <MyText
                  text={item.status}
                  fontWeight="400"
                  fontSize={12}
                  textColor={Color.PRIMARY}
                  fontFamily="Roboto"
                  style={{textAlign: 'center', marginHorizontal: 2}}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  //ui for schdule
  const RenderSchdule = ({item}) => {
    {
      console.log('my notification gggg--->>>', item);
    }
    return (
      <TouchableOpacity style={styles.scduleView}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 63,
              height: 63,
              backgroundColor: '#F7FAEB',
              borderRadius: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                item?.sender_image
                  ? {uri: item.sender_image}
                  : require('../../assest/images/logoSplash.png')
              }
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View>
            <MyText
              text={item.message}
              fontWeight="400"
              fontSize={14}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Roboto"
              style={{
                textAlign: 'left',
                marginHorizontal: 16,
                width: dimensions.SCREEN_WIDTH * 0.6,
              }}
            />
            <MyText
              text={item.created_date}
              fontWeight="400"
              fontSize={14}
              textColor={'#959FA6'}
              fontFamily="Roboto"
              style={{
                textAlign: 'left',
                marginHorizontal: 16,
                width: dimensions.SCREEN_WIDTH * 0.6,
                marginTop: 9,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // useEffect(() => {
  //     // getTheme();
  //     setTimeout(() => {
  //         setAnimating(false);

  //         // Check if user_id is set or not
  //         // If not then send for Authentication
  //         // else send to Home Screen
  //           AsyncStorage.getItem('user_id').then(value =>
  //             navigation.replace(value !== null ? 'RegisterScreen' : 'MainContainer'),
  //           );
  //         navigation.replace('WelcomeScreen')
  //     }, 5000);
  // }, []);

  ////get notification
  const getCartCount = async () => {
    console.log('klkl getcart count function');
    setLoading(true);
    try {
      let resp;
      try {
        // Wrapping the API call in a separate try-catch
        resp = await getApiWithToken(userToken, NOTIFICATION);
      } catch (apiError) {
        console.error('Error during API call:', apiError);
        throw new Error('Failed to fetch data from the server.');
      }
      // Log the entire response to check its structure
      console.log('Response from API  for the notification--->>>', resp);
      // Check if the response is undefined or null
      if (!resp) {
        console.error('Response is undefined or null');
        Toast.show({text1: 'Failed to fetch data from the server.'});
        return;
      }
      // Check if the response has a data property
      if (resp?.data?.status) {
        console.log(
          'get home after success notification---->',
          resp.data.data.data,
        );
        setNotifications(resp?.data?.data?.data);
        // setHome(resp.data.data);
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
      setLoading(false);
    }
  };
  ////clear notification
  const clear = async item => {
    try {
      setLoading(true);

      const {responseJson, err} = await requestPostApi(
        CLEAR_NOTIFICATION,
        '',
        'POST',
        userToken,
      );
      console.log('log for start shift', responseJson?.status);
      if (responseJson?.status === true || responseJson?.status === 1) {
        console.log('start job status detaill--->>>', responseJson?.data);
        getCartCount();
        Toast.show({text1: responseJson?.message});
      } else {
        console.error('Login failed:', responseJson);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('HomeScreen');
  };
  //useEffect
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getCartCount();
      setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  return (
    <>
      <View style={{flex: 1,  backgroundColor: Color.PRIMARY}}>
        <MyHeader
          Title={`Notifications`}
          isBackButton
          IsNotificationIcon={false}
        />
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            zIndex: -1,
            width: dimensions.SCREEN_WIDTH * 0.99,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          {notificatons.length > 0 ? (
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginHorizontal: 19}}
              onPress={() => {
                clear();
              }}>
              <MyText
                text={'Clear All'}
                fontWeight="700"
                fontSize={14}
                textColor={Color.PRIMARY}
                fontFamily="Roboto"
                style={{marginTop: 20}} // Add any additional styles here if necessary
              />
            </TouchableOpacity>
          ) : null}
          <View style={{marginTop: 20}}>
            <FlatList
              horizontal={false}
              data={notificatons}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderSchdule}
              ListEmptyComponent={() => (
                <View
                  style={{
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    backgroundColor: Color.WHITE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: dimensions.SCREEN_HEIGHT * 0.2,
                  }}>
                  <View
                    style={{
                      height: 119,
                      width: 119,
                      backgroundColor: 'white',
                      borderRadius: 60,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assest/images/notificationNew.png')}
                      style={{
                        height: 119,
                        width: 119,
                        backgroundColor: 'white',
                        borderRadius: 60,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        resizeMode: 'contain',
                      }}></Image>
                  </View>
                  {/* No Notification Yet */}
                  <MyText
                    text={'No Notifications Found'}
                    fontWeight="700"
                    fontSize={24}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={{textAlign: 'center', marginVertical: 12}}
                  />

                  <TouchableOpacity
                    style={{
                      width: 142,
                      height: 49,
                      borderRadius: 5,
                      backgroundColor: Color.PRIMARY,
                      marginVertical: 17,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <MyText
                      text={' Back to home'}
                      fontWeight="500"
                      fontSize={14}
                      textColor={'#FFFFFF'}
                      fontFamily="Roboto"
                      style={{textAlign: 'center'}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </>
  );
};

export default Notification;
