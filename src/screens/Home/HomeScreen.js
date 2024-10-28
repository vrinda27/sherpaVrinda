import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Linking,
  AppState,
  ImageBackground,
  ScrollView,
  RefreshControl,
  onRefresh,
} from 'react-native';
import Loader from '../../Components/Loader';
import MyAlert from '../../global/MyAlert';
import Color, {dimensions} from '../../global/Color';
// import {ImagesUrl} from '../../CustomComponent/ImageUrl';
import Toast from 'react-native-toast-message';
import styles from './style';
// import {
//   getAsyncStorage,
//   setAsyncStorage,
// } from '../../CustomComponent/AsynstorageClass';
// import {STRING} from '../../CustomComponent/string';
// import APIConstants from '../Network/APIConstants';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MyText from '../../Components/MyText';
// import {useDispatch, useSelector} from 'react-redux';

import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import MyHeader from '../../Components/MyHeader/MyHeader';
import {Marker} from 'react-native-maps';
// import {requestGetApi, requestPostApiMedia} from '../Network/Service_fetch';
// // import ExitAlert from '../../CustomComponent/ExitAlert';
// import Modal from 'react-native-modal';
import {useCallback} from 'react';
import Welcome from '../Welcome/Welocome';
import ToggleSwitch from 'toggle-switch-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getApiWithToken, API_ENDPOINTS} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let {width, height} = Dimensions.get('window');
let ASPECT_RATIO = width / height;
let LATITUDE = 37.771707;
let LONGITUDE = -122.4053769;
let LATITUDE_DELTA = 0.0922;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let userName = '';
const HomeScreen = ({props, navigation}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('my userInfo---->>', userInfo);

  //variables
  //   const FSfserInfo = useSelector(state => state.user_reducer.userInfo);
  //   const userToken = useSelector(state => state.user_reducer.userToken);
  const [usrName, setuserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitital, setInitital] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refLat = useRef(37.78825);
  const refLong = useRef(-122.4324);
  const address = useRef('');
  const [totalNewRecord, setTotalNewRecord] = useState('');
  const [profileData, setProfileData] = useState('');
  const [currentLat, setCurrentLat] = useState(false);
  const [isIndicator, setIndicator] = useState(true);
  const [exitAlertVisibility, setExitAlertVisibility] = useState(false);
  const [isLocationModal, setLocationModal] = useState(false);

  const [My_Alert, setMy_Alert] = useState(false);
  const [shiftStatus, setShiftStatus] = useState('');
  const [alert_sms, setalert_sms] = useState('');
  const [home, setHome] = useState({});
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    console.log('latest code: 18 oct 2024');
    getOneTimeLocation();
    let unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButton.bind(),
      );

      getStoragedata();
    });
    return unsubscribe;
  }, []);

  const handleBackButton = () => {
    if (navigation.isFocused()) {
      setExitAlertVisibility(true);
    } else {
      navigation.goBack();
    }
    return true;
  };
  const getStoragedata = async () => {
    userName = await getAsyncStorage('Username');
    await setAsyncStorage('orderStatus', '');
    setuserName(userName);
  };

  console.log('userInfo?.profile_image_url',userInfo?.profile_image_url)
  const NewDeliveryRequest = () => {
    // props.navigation.navigate('Order', {status: 'Today'});
    navigation.navigate('OrderStack', {
      screen: 'Order',
      params: {status: '1'},
    });
  };
  const getOneTimeLocation = dispatch => {
    // setLoading(true)
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        Geocoder.from(currentLatitude, currentLongitude)
          .then(json => {
            // updateUser(currentLatitude, currentLongitude);
            var addressComponent = json.results[0].formatted_address;
            refLat.current = Number(currentLatitude);
            refLong.current = Number(currentLongitude);
            address.current = addressComponent;
            setInitital(!isInitital);
            setLoading(false);
          })
          .catch(error => console.error(error));
        setLoading(false);
        setLocationModal(false);
      },
      error => {
        setLoading(false);
        setLocationModal(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    // Initialize Geocoder with your Google Maps API Key
    Geocoder.init('AIzaSyClYnNzbToxL6mm3kbJf1kixP468IC-nxo');
  }, []);

  const getCartCount = async () => {
    setLoading(true);
    try {
      let resp;

      try {
        // Wrapping the API call in a separate try-catch
        resp = await getApiWithToken(userToken, API_ENDPOINTS.HOME);
      } catch (apiError) {
        console.error('Error during API call:', apiError);
        throw new Error('Failed to fetch data from the server.');
      }

      // Log the entire response to check its structure
      console.log('Response from API --->>>', resp);

      // Check if the response is undefined or null
      if (!resp) {
        console.error('Response is undefined or null');
        Toast.show({text1: 'Failed to fetch data from the server.'});
        return;
      }

      // Check if the response has a data property
      if (resp?.data?.status) {
        console.log('get home after success---->', resp.data.data);
        setHome(resp?.data?.data);
        setShiftStatus(resp?.data?.data?.on_duty);

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
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      getCartCount();
      // Refresh your data here, or call an API
      setRefreshing(false);
    }, 2000);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getCartCount();
      setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  const _mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  return (
    <>
      <SafeAreaView style={{backgroundColor: Color.PRIMARY, flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              flex: 1,
              backgroundColor: Color.PRIMARY,
            }}>
            {/* <View
          style={{
            height: 100,
            width: dimensions.SCREEN_WIDTH,
          }}> */}
            <MyHeader Title={'Home'} isBorderRadius={true} />
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
              <View
                style={{
                  marginHorizontal: 14,
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <Image
                  source={{uri: userInfo?.profile_image_url}}
                  style={styles.profileImg}></Image>
                <View style={{marginHorizontal: 15}}>
                  <MyText
                    text={'Welcome'}
                    fontFamily="regular"
                    fontSize={14}
                    textColor={'#212121'}
                    style={{fontWeight: '400'}}
                  />
                  <MyText
                    text={`${userInfo?.first_name} ${userInfo?.last_name}`}
                    fontFamily="regular"
                    fontSize={14}
                    textColor={Color.PRIMARY}
                  />
                </View>
              </View>

              <View
                style={{
                  width: screenWidth,
                  height: screenHeight * 0.76,
                }}>
                {refLat.current == 37.78825 && refLong.current == -122.4324 ? (
                  <ActivityIndicator
                    animating={isIndicator}
                    color={Color.blue}
                    size="large"
                    style={styles.activityIndicator}
                  />
                ) : (
                  <View style={{flex: 1}}>
                    {/* MapView */}
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={{flex: 1, marginTop: 45}} // Ensure the MapView takes the full screen
                      initialRegion={{
                        latitude: refLat.current,
                        longitude: refLong.current,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034,
                      }}
                      showsCompass={false}
                      showsMyLocationButton={true}
                      showsUserLocation={false}
                      userLocationCalloutEnabled={true}
                      showsScale={true}
                      zoomEnabled={true}
                      pitchEnabled={false}
                      customMapStyle={_mapStyle}
                      showsBuildings={true}
                      showsIndoors={true}
                      showsIndoorLevelPicker={true}
                      scrollEnabled={true}>
                      <Marker
                        coordinate={{
                          latitude: refLat.current,
                          longitude: refLong.current,
                        }}
                        title={address.current}
                        draggable
                      />
                    </MapView>

                    {/* Overlay View */}
                    <View
                      style={{
                        position: 'absolute',
                        top: 10, // Adjust this value based on where you want the view to appear
                        left: '5%', // Adjust for centering horizontally if needed
                        width: dimensions.SCREEN_WIDTH * 0.89,
                        height: 74,
                        backgroundColor: 'white', // Make sure the background color is set
                        borderRadius: 10,
                        borderColor: Color.PRIMARY,
                        borderWidth: 1,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 1, // Ensure it's above the MapView
                      }}>
                      <View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <MyText
                            text={'Shift Start Time : '}
                            fontFamily="Roboto"
                            fontSize={14}
                            textColor={Color.dark_gray}
                            style={{fontWeight: '500'}}
                          />
                          <MyText
                            text={`${
                              home?.attendence !== null
                                ? moment(home?.attendence?.shift_start).format(
                                    'hh:mm A',
                                  )
                                : 'Not Started'
                            }`}
                            fontFamily="Roboto"
                            fontSize={14}
                            textColor={Color.orange}
                            style={{fontWeight: '500'}}
                          />
                        </View>

                        <View style={{marginTop: 8, flexDirection: 'row'}}>
                          <MyText
                            text={'Status : '}
                            fontFamily="Roboto"
                            fontSize={14}
                            textColor={Color.dark_gray}
                            style={{fontWeight: '500'}}
                          />
                          <MyText
                            text={`${home?.on_duty ? 'ON DUTY' : 'OFF DUTY'}`}
                            fontFamily="Roboto"
                            fontSize={14}
                            textColor={Color.PRIMARY}
                            style={{fontWeight: '500'}}
                          />
                        </View>
                      </View>

                      <TouchableOpacity
                        style={{
                          width: 44,
                          height: 44,
                          justifyContent: 'center',
                          backgroundColor: Color.PRIMARY,
                          borderRadius: 5,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('Tracker');
                        }}>
                        <Image
                          source={require('../../assest/images/arrowWhite.png')}
                          style={{height: 24, width: 24}}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(211, 234, 248, 1)']}
                style={[
                  styles.viewItem3,
                  {
                    borderColor: Color.PRIMARY,
                    borderTopWidth: 3,
                  },
                ]}>
                <View style={[styles.viewItem2]}>
                  <MyText
                    text={'Jobs Overview'}
                    fontFamily="Roboto"
                    fontSize={20}
                    textColor={Color.dark_gray}
                    style={{fontWeight: '500', marginBottom: 10}}
                  />
                  <View style={styles.topViewHome}>
                    <TouchableOpacity
                      style={styles.deliverView}
                      onPress={() => NewDeliveryRequest()}>
                      {totalNewRecord != '' ? (
                        <View style={styles.totalNewdeliverCountView}>
                          <Text style={styles.totalNewdeliverCountText}>
                            {totalNewRecord}
                          </Text>
                        </View>
                      ) : null}
                      <Image
                        style={styles.preorder}
                        source={require('../../assest/images/calendarOrder.png')}
                      />

                      <Text
                        style={[
                          styles.text7,
                          {fontWeight: '700', textAlign: 'center'},
                        ]}>
                        {JSON.stringify(home?.today_jobs)}
                      </Text>
                      <Text
                        style={[
                          styles.text10,
                          {
                            color: '#8F93A0',
                            fontWeight: '700',
                            fontSize: 12,
                            textAlign: 'center',
                          },
                        ]}>
                        Today’s Job
                      </Text>
                      {/* <Text style={styles.text7}>/Pick Up Request</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deliverView}
                      onPress={() =>
                        navigation.navigate('OrderStack', {
                          screen: 'Order',
                          params: {status: '2'},
                        })
                      }>
                      <Image
                        style={[styles.preorder, {marginTop: 4}]}
                        source={require('../../assest/images/group.png')}
                      />
                      <Text style={[styles.text7, {fontWeight: '700'}]}>
                        {home?.active_jobs}
                      </Text>
                      <Text
                        style={[
                          styles.text10,
                          {color: '#8F93A0', fontWeight: '700', fontSize: 12},
                        ]}>
                        Active Jobs
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deliverView}
                      onPress={() =>
                        navigation.navigate('OrderStack', {
                          screen: 'Order',
                          params: {status: '3'},
                        })
                      }>
                      <Image
                        style={styles.preorder}
                        source={require('../../assest/images/calendar-tick.png')}
                      />
                      <Text style={[styles.text7, {fontWeight: '700'}]}>
                        {home?.completed_jobs}
                      </Text>
                      <Text
                        style={[
                          styles.text10,
                          {
                            color: '#8F93A0',
                            fontWeight: '700',
                            fontSize: 12,
                            textAlign: 'center',
                          },
                        ]}>
                        Completed Jobs
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* </View> */}
                </View>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
        {loading ? <Loader /> : null}
      </SafeAreaView>

      {/* /> */}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
    </>
  );
};

export default HomeScreen;
