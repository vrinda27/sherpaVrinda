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
  ScrollView,
  FlatList,
} from 'react-native';

import Color, {dimensions} from '../../global/Color';
import Modal from 'react-native-modal';

import styles from './CompletedJobStyle';
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
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let {width, height} = Dimensions.get('window');
let ASPECT_RATIO = width / height;
let LATITUDE = 37.771707;
let LONGITUDE = -122.4053769;
let LATITUDE_DELTA = 0.0922;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let userName = '';
const CompletedJobDetail = ({navigation, route}) => {
  console.log('my route from order details--->>', route?.params?.status);
  //variables
  //   const userInfo = useSelector(state => state.user_reducer.userInfo);
  //   const userToken = useSelector(state => state.user_reducer.userToken);
  const [usrName, setuserName] = useState('');
  const [isloading, setLoading] = useState(false);
  const [isInitital, setInitital] = useState(false);
  const [uplloadDocument, setUploadDocument] = useState(false);
  const [selected, setSelected] = useState(false);
  const refLat = useRef(37.78825);
  const refLong = useRef(-122.4324);
  const address = useRef('');
  const [totalNewRecord, setTotalNewRecord] = useState('');
  const [profileData, setProfileData] = useState('');
  const [currentLat, setCurrentLat] = useState(false);
  const [isIndicator, setIndicator] = useState(true);
  const [exitAlertVisibility, setExitAlertVisibility] = useState(false);
  const [isLocationModal, setLocationModal] = useState(false);
  const [currentAppState, setCurrentAppState] = useState('');
  const [bellCount, setBellCount] = useState('');
  const appStateRef = useRef(AppState.currentState);
  //function : service function
  //   const updateUser = async (lat, long) => {
  //     try {
  //       const fcm_token = await messaging().getToken();
  //       const token = await getAsyncStorage('token');
  //       const formData = new FormData();
  //       formData.append('lat', lat);
  //       formData.append('long', long);
  //       formData.append('fcm_token', fcm_token);
  //       const {responseJson, err} = await requestPostApiMedia(
  //         APIConstants.update_lat_long,
  //         formData,
  //         'POST',
  //         token,
  //       );
  //     } catch (error) {
  //       console.error('error in updateUser', error);
  //     }
  //   };
  //hook : useEffect
  const jobStatus = [
    {id: 1, status: 'Reached The Warehouse To Pick Item'},
    {
      id: 2,
      status: 'Item Has Been Picked',
    },
    {
      id: 3,
      status: 'On The Way To Deliver The Item',
    },
    {
      id: 4,
      status: 'Item Delivered',
    },
  ];
  //select for radio button in modal
  const handlePress = item => {
    console.log('my item to be selectedrrr==?', item?.id);
    setSelected(item?.id);
  };
  const renderJobList = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.jobFlaList,
          {borderColor: selected === item.id ? Color.PRIMARY : Color.dark_gray}, // Change border color based on selection
        ]}
        onPress={() => handlePress(item)}>
        <Image
          source={
            selected === item.id
              ? require('../../assest/images/radioFilled.png') // Change image when selected
              : require('../../assest/images/radioUnfilled.png') // Default image when not selected}
          }
          style={{
            height: 32,
            width: 32,
            resizeMode: 'contain',
            marginRight: 5,
          }}></Image>
        <MyText
          text={item?.status}
          fontFamily="Roboto"
          fontSize={14}
          textColor={Color.dark_gray}
          style={{marginLeft: 4, fontWeight: '500'}}
        />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    // getProfileData();

    return () => {};
  }, []);

  //   useEffect(() => {
  //     getOneTimeLocation();
  //     let unsubscribe = props.navigation.addListener('focus', () => {
  //       BackHandler.addEventListener(
  //         'hardwareBackPress',
  //         handleBackButton.bind(),
  //       );

  //       getStoragedata();
  //     });
  //     return unsubscribe;
  //   }, []);
  //   useEffect(() => {
  //     AppState.addEventListener('change', handleAppStateChange);
  //     return () => {
  //       AppState.removeEventListener('change', handleAppStateChange);
  //     };
  //   }, []);

  const handleAppStateChange = nextAppState => {
    setCurrentAppState(nextAppState);
    if (nextAppState === 'background') {
    }
    if (nextAppState === 'active') {
      getOneTimeLocation();
      // Do something here on app active foreground mode.
    }

    if (nextAppState === 'inactive') {
      // Do something here on app inactive mode.
    }
  };
  const openExitAlert = () => {
    setExitAlertVisibility(false);
    BackHandler.exitApp();
  };
  const closeExitAlert = () => {
    setExitAlertVisibility(false);
  };
  const handleBackButton = () => {
    if (props.navigation.isFocused()) {
      setExitAlertVisibility(true);
    } else {
      props.navigation.goBack();
    }
    return true;
  };
  //   const getProfileData = async () => {
  //     setLoading(true);
  //     try {
  //       const body = {};
  //       const {responseJson, status, err} = await requestGetApi(
  //         APIConstants.get_profile,
  //         body,
  //         'GET',
  //         userToken,
  //       );
  //       if (status) {
  //         getNotificationList();
  //         setProfileData(responseJson?.data[0]);
  //         setTotalNewRecord(responseJson?.data[0].total_new_record);
  //       } else {
  //       }
  //     } catch (error) {
  //       console.error('error in getProfileData', error);
  //     }
  //     setLoading(false);
  //   };
  //   const getNotificationList = async () => {
  //     setLoading(true);
  //     token = await getAsyncStorage('token');
  //     const body = {};
  //     const {responseJson, err} = await requestGetApi(
  //       APIConstants.bell_notification,
  //       body,
  //       'GET',
  //       token,
  //     );
  //     setLoading(false);
  //     setBellCount(responseJson.total_count);
  //   };
  const getStoragedata = async () => {
    userName = await getAsyncStorage('Username');
    await setAsyncStorage('orderStatus', '');
    setuserName(userName);
  };
  const NewDeliveryRequest = () => {
    props.navigation.navigate('Order');
  };
  const getOneTimeLocation = dispatch => {
    // setLoading(true)
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        Geocoder.from(currentLatitude, currentLongitude)
          .then(json => {
            updateUser(currentLatitude, currentLongitude);
            var addressComponent = json.results[0].formatted_address;
            refLat.current = Number(currentLatitude);
            refLong.current = Number(currentLongitude);
            address.current = addressComponent;
            setInitital(!isInitital);
            setLoading(false);
          })
          .catch(error => console.error(error));
        setLoading(false);
        // setLocationModal(false);
      },
      error => {
        setLoading(false);
        // setLocationModal(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const c_pos_click = async () => {
    getOneTimeLocation();
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.PRIMARY
        }}>
        <ScrollView style={{flex: 1}} bounces={false}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(212, 229, 240, 1)']}
            style={{
              flex: 1,
            }}>
            <MyHeader
              Title={
                'Completed Jobs'
                //  Job details
              }
              isBackButton
              IsNotificationIcon={false}
            />

            <View
              style={{
                shadowColor: '#000', // Shadow color
                shadowOffset: {width: 0, height: 8}, // Horizontal and Vertical shadow offset
                shadowOpacity: 0.05, // Opacity of the shadow (13px * 0.01 = 0.13, then tweak for RN)
                shadowRadius: 13, // Blur radius
                elevation: 8, // For Android shadow effect
                backgroundColor: '#fff',
                width: dimensions.SCREEN_WIDTH * 0.9,
                height: 58,
                backgroundColor: 'white',
                marginTop: 20,
                alignSelf: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 17,
              }}>
              <MyText
                text={'Job Status:'}
                fontFamily="regular"
                fontSize={14}
                textColor={Color.dark_gray}
                style={{fontWeight: '500'}}
              />
              <View style={{flexDirection: 'row'}}>
                <MyText
                  text={'Item Delivered'}
                  fontFamily="Roboto"
                  fontSize={14}
                  textColor={Color.PRIMARY}
                  style={{fontWeight: '500'}}
                />
                <Image
                  source={require('../../assest/images/verify.png')}
                  style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                  }}></Image>
              </View>
            </View>
            <View
              style={{
                shadowColor: '#000', // Shadow color
                shadowOffset: {width: 0, height: 8}, // Horizontal and Vertical shadow offset
                shadowOpacity: 0.05, // Opacity of the shadow (13px * 0.01 = 0.13, then tweak for RN)
                shadowRadius: 13, // Blur radius
                elevation: 8, // For Android shadow effect
                backgroundColor: '#fff',
                width: dimensions.SCREEN_WIDTH * 0.9,
                height: 85,
                backgroundColor: 'white',
                marginTop: 12,
                alignSelf: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 17,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assest/images/documnetView.png')}
                  style={{
                    width: 64,
                    height: 64,
                    resizeMode: 'contain',
                  }}></Image>
                <MyText
                  text={'photo1.png'}
                  fontFamily="Roboto"
                  fontSize={14}
                  textColor={Color.dark_gray}
                  style={{fontWeight: '500', marginTop: 22, marginLeft: 12}}
                />
              </View>
              <View
                style={{
                  width: 71,
                  height: 36,
                  borderRadius: 5,
                  backgroundColor: '#0368A6',
                  justifyContent: 'center',
                }}>
                <MyText
                  text={'View'}
                  fontFamily="Roboto"
                  fontSize={14}
                  textColor={Color.WHITE}
                  style={{fontWeight: '500', alignSelf: 'center'}}
                />
              </View>
            </View>
            <View style={[styles.conatiner]}>
              <View style={styles.headerBar}>
                <View style={{flexDirection: 'row'}}>
                  <MyText
                    text={'Job ID : '}
                    fontFamily="regular"
                    fontSize={14}
                    textColor={Color.dark_gray}
                    style={{fontWeight: '500'}}
                  />
                  <MyText
                    text={'7923883hg'}
                    fontFamily="regular"
                    fontSize={14}
                    textColor={Color.PRIMARY}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MyText
                    text={'Date : '}
                    fontFamily="regular"
                    fontSize={14}
                    textColor={Color.dark_gray}
                    style={{fontWeight: '500'}}
                  />
                  <MyText
                    text={'05/11/2024'}
                    fontFamily="regular"
                    fontSize={14}
                    textColor={Color.PRIMARY}
                  />
                </View>
              </View>
              <View style={{paddingVertical: 10, paddingHorizontal: 12}}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <MyText
                    text={'Cargo Logistics'}
                    fontFamily="regular"
                    fontSize={16}
                    textColor={Color.dark_gray}
                    style={{fontWeight: '500'}}
                  />
                  <Image
                    source={require('../../assest/images/info.png')}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: 12,
                      marginTop: -3,
                    }}></Image>
                </View>
                {/* <View style={[styles.routing, {flexDirection: 'row'}]}>
                  <Image
                    source={require('../../assest/images/routing.png')}
                    style={styles.routingImg}></Image>
                  <MyText
                    text={'25 Miles'}
                    fontFamily="Qutfit"
                    fontSize={14}
                    textColor={Color.WHITE}
                    style={{marginLeft: 7}}
                  />
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 12,
                    justifyContent: 'space-between',
                    width: dimensions.SCREEN_WIDTH * 0.7,
                  }}>
                  <View>
                    <MyText
                      text={'Job Type:'}
                      fontFamily="Qutfit"
                      fontSize={14}
                      textColor={Color.dark_gray}
                    />
                    <MyText
                      text={'Logistic Delivery'}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.PRIMARY}
                    />
                  </View>
                  <View>
                    <MyText
                      text={'Client Name: '}
                      fontFamily="Qutfit"
                      fontSize={14}
                      textColor={Color.dark_gray}
                    />
                    <MyText
                      text={'Sophia Phillips'}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.PRIMARY}
                    />
                  </View>
                </View>
                <MyText
                  text={'Description'}
                  fontFamily="Roboto"
                  fontSize={14}
                  textColor={Color.dark_gray}
                />
                <MyText
                  text={` In publishing and graphic design, Lorem ipsum is a placeholder  text commonly used to demonstrate the visual form of a documentor a typeface without relying on meaningful content. Lorem ipsu may be used as a placeholder before the final copy is available. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
            `}
                  fontFamily="Roboto"
                  fontSize={14}
                  textColor={Color.light_gray}
                />
              </View>
            </View>
            <View style={styles.conatiner}>
              <View style={styles.headerBar}>
                <View style={{flexDirection: 'row'}}>
                  <MyText
                    text={'03 Stop Locations'}
                    fontFamily="Roboto"
                    fontSize={14}
                    textColor={'#000000'}
                  />
                </View>
                <View style={[styles.routing, {flexDirection: 'row'}]}>
                  <Image
                    source={require('../../assest/images/routing.png')}
                    style={styles.routingImg}></Image>
                  <MyText
                    text={'25 Miles'}
                    fontFamily="Qutfit"
                    fontSize={14}
                    textColor={Color.WHITE}
                    style={{marginLeft: 7}}
                  />
                </View>
              </View>
              <View style={{paddingVertical: 10, paddingHorizontal: 12}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 7,

                    width: dimensions.SCREEN_WIDTH * 0.7,
                  }}>
                  <Image
                    source={require('../../assest/images/mapPointer.png')}
                    style={styles.mapPointer}></Image>
                  <View>
                    <MyText
                      text={'Supplier Pickup Location'}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.dark_gray}
                      style={{marginLeft: 7}}
                    />
                    <MyText
                      text={'Brooklyn, New York, USA'}
                      fontFamily="Qutfit"
                      fontSize={14}
                      textColor={Color.PRIMARY}
                      style={{marginLeft: 7}}
                    />
                  </View>
                </View>
                <Image
                  source={require('../../assest/images/verticallImg.png')}
                  style={{
                    height: 34,
                    width: 4,
                    marginHorizontal: 20,
                  }}></Image>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 7,

                    width: dimensions.SCREEN_WIDTH * 0.7,
                  }}>
                  <Image
                    source={require('../../assest/images/mapPointer.png')}
                    style={styles.mapPointer}></Image>
                  <View>
                    <MyText
                      text={'Customer Drop Location'}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.dark_gray}
                      style={{marginLeft: 7}}
                    />
                    <MyText
                      text={'Brooklyn, NY 11220, USA'}
                      fontFamily="Qutfit"
                      fontSize={14}
                      textColor={'red'}
                      style={{marginLeft: 7}}
                    />
                  </View>
                </View>
                <Image
                  source={require('../../assest/images/mapImg.png')}
                  style={{
                    height: 159,
                    width: dimensions.SCREEN_WIDTH * 0.8,
                  }}></Image>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
        <Modal
          visible={isLocationModal}
          animationType={'fade'}
          backdropOpacity={0.5}
          hasBackdrop={true}
          activeOpacity={0.9}
          style={{
            height: '70%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100%',
            alignSelf: 'center',
          }}
          onBackdropPress={() => setLocationModal(false)}
          onRequestClose={() => {
            setLocationModal(false);
          }}>
          <View style={styles.ModalFilterView}>
            <View
              style={{
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '5%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <MyText
                  text={'Change Job Status:'}
                  fontFamily="Roboto"
                  fontSize={18}
                  textColor={'#000000'}
                  style={{marginBottom: 20, fontWeight: '500'}}
                />
                {/*  */}
              </View>
              <View style={{flex: 1}}>
                {jobStatus?.length > 0 ? (
                  <View style={styles.displayRoutines}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      data={jobStatus}
                      renderItem={renderJobList}
                      keyExtractor={(item, index) => String(index)}
                    />
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={() => {
                    setLocationModal(false);
                  }}>
                  <MyText
                    text={'SAVE'}
                    fontFamily="Roboto"
                    fontSize={14}
                    textColor={Color.WHITE}
                    style={{}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLocationModal(false);
                  }}
                  style={[styles.buttonModal, {backgroundColor: Color.orange}]}>
                  <MyText
                    text={'CANCEL'}
                    fontFamily="Roboto"
                    fontSize={14}
                    textColor={Color.WHITE}
                    style={{}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={uplloadDocument}
          animationType={'fade'}
          backdropOpacity={0.5}
          hasBackdrop={true}
          activeOpacity={0.9}
          style={{
            height: '70%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100%',
            alignSelf: 'center',
          }}
          onBackdropPress={() => setUploadDocument(false)}
          onRequestClose={() => {
            setUploadDocument(false);
          }}>
          <View style={[styles.ModalFilterView, {paddingVertical: 19}]}>
            <View
              style={{
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '5%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <MyText
                  text={'Mark Job as Completed '}
                  fontFamily="Roboto"
                  fontSize={18}
                  textColor={'#000000'}
                  style={{fontWeight: '700'}}
                />

                {/*  */}
              </View>
              <MyText
                text={'Please Upload Client Signed Documents Here…'}
                fontFamily="Roboto"
                fontSize={16}
                textColor={Color.light_gray}
                style={{textAlign: 'center', marginTop: 20}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../../assest/images/GalleryUpload.png')}
                  style={{width: 175, height: 121}}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assest/images/CameraUpload.png')}
                  style={{width: 175, height: 121}}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default CompletedJobDetail;
