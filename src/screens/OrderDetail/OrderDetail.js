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
import PolylineDecoder from '@mapbox/polyline';
import Color, {dimensions} from '../../global/Color';
import Modal from 'react-native-modal';
import Loader from '../../Components/Loader';
import MyAlert from '../../global/MyAlert';
import {
  getApiWithToken,
  requestPostApi,
  API_ENDPOINTS,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
// import {
//   getAsyncStorage,
//   setAsyncStorage,
// } from '../../CustomComponent/AsynstorageClass';
// import {STRING} from '../../CustomComponent/string';
// import APIConstants from '../Network/APIConstants';

import MyText from '../../Components/MyText';
// import {useDispatch, useSelector} from 'react-redux';

import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
import MyHeader from '../../Components/MyHeader/MyHeader';
import SkeletonContainer from '../../Components/Skelton/SkeletonContainer';
// // import ExitAlert from '../../CustomComponent/ExitAlert';
// import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useCallback} from 'react';
import Welcome from '../Welcome/Welocome';
import ToggleSwitch from 'toggle-switch-react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {he} from 'date-fns/locale';

const GOOGLE_MAPS_APIKEY = 'AIzaSyClYnNzbToxL6mm3kbJf1kixP468IC-nxo';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let {width, height} = Dimensions.get('window');
let ASPECT_RATIO = width / height;

const OrderDetail = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  console.log('my route from order details id-44-->>', userToken);
  //variables
  //   const userInfo = useSelector(state => state.user_reducer.userInfo);
  //   const userToken = useSelector(state => state.user_reducer.userToken);

  const [loading, setLoading] = useState(false);
  const [isInitital, setInitital] = useState(false);
  const [uplloadDocument, setUploadDocument] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isLocationModal, setLocationModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [order, setOrder] = useState({});
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [pickupLocation, setPickupLocation] = useState({
    latitude: '40.7638413',
    longitude: '-73.9729706',
    title: 'llllll',
  });
  const [dropLocation, setDropLocation] = useState({
    latitude: '26.1807503',
    longitude: '-80.26960849999999',
    title: 'kkkkkkkk',
  });
  const [showSkelton, setShowSkelton] = useState(false);
  const refLat = useRef(37.78825);
  const refLong = useRef(-122.4324);
  const [My_Alert, setMy_Alert] = useState(false);
  const [currentAppState, setCurrentAppState] = useState('');
  const [picker, setPicker] = useState([]);
  const [JobStatus, setJobStatus] = useState('');
  const [jobSlug, setJobSlug] = useState('');
  const [signedDocuments, setSignedDocuments] = useState([]);
  //select for radio button in modal
  const handlePress = item => {
    console.log('my item to be selectedrrr==?', item?.slug);
    setSelected(item?.status);
    setJobSlug(item?.slug);
  };
  const renderJobList = ({item, index}) => {
    {
      console.log('itmm values of status--->>>', item);
    }
    return (
      <TouchableOpacity
        style={[
          styles.jobFlaList,
          {
            borderColor:
              selected === item.status ? Color.PRIMARY : Color.dark_gray,
            opacity: item.disabled ? 0.5 : 1, // Lower opacity for disabled items
          },
        ]}
        onPress={() => {
          if (!item.disabled) {
            handlePress(item); // Only call handlePress if item is not disabled
          }
        }}>
        <Image
          source={
            selected === item.status
              ? require('../../assest/images/radioFilled.png') // Change image when selected
              : require('../../assest/images/radioUnfilled.png') // Default image when not selected
          }
          style={{
            height: 32,
            width: 32,
            resizeMode: 'contain',
            marginRight: 5,
          }}
        />
        <MyText
          text={item?.status}
          fontFamily="Roboto"
          fontSize={14}
          textColor={item.disabled ? Color.light_gray : Color.dark_gray} // Change text color for disabled
          style={{marginLeft: 4, fontWeight: '500'}}
        />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    // getProfileData();

    return () => {};
  }, []);

  React.useEffect(() => {
    setShowSkelton(true);
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount();
      getJobStatus();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);
  //get job details
  const getCartCount = async () => {
    loading && !showSkelton && setShowSkelton(true);

    var url = API_ENDPOINTS?.JOB_DETAIL;
    var murl = route?.params?.item?.id;
    url = url + murl;
    {
      console.log('mt darara i444d-->>', url);
    }
    try {
      const resp = await getApiWithToken(userToken, url);
      if (resp?.data?.status) {
        setOrder(resp?.data?.data);
        setPickupLocation(resp?.data?.data?.supplier_pickup_location);
        setDropLocation(resp?.data?.data?.customer_drop_location);
        setSignedDocuments(resp?.data?.data?.signed_documents);
      } else {
        console.log('login????????? come in catck block');

        console.log('the err of login==>>', resp?.data?.message);
        setalert_sms(resp?.data?.message);
        setMy_Alert(true);
      }
    } catch (error) {
      console.log('error in getCartCount', error);
      setalert_sms(responseJson.message);
      setMy_Alert(true);
    }
    setShowSkelton(false);
    // setLoading(false);
  };

  /////gallery functionsss
  const onGallery = async () => {
    console.log('picker');
    try {
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
        multiple: true,
      }).then(images => {
        console.log('---------then block------->', images);
        setPicker([...picker, ...images]);
        setUploadDocument(false);
        // setPicker(images);
        // setcurrentSelection('image');
        // setmodlevisual(false);
      });
    } catch (error) {
      console.log('error in openLibrary', error);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image, 'camera image');
      setPicker([...picker, image]);
      setUploadDocument(false);
      // // setPicker(image);
      // setUpdatedLength(1);
      // setcurrentSelection('camera_image');
      // setmodlevisual(false);
    });
  };
  ////start job

  ////job status
  const getJobStatus = async () => {
    {
      console.log('function calleddd--?');
    }
    setLoading(true);
    var url = API_ENDPOINTS?.JOB_STATUS;
    var murl = `?job_id=` + route?.params?.item?.id;

    url = url + murl;
    {
      console.log('get jobn status uiuiui===>>>', url);
    }
    try {
      const resp = await getApiWithToken(userToken, url);
      console.log('get orer job sucees---->', resp?.data);
      if (resp?.data?.status) {
        console.log('get job statusss', resp?.data?.data1);
        setJobStatus(resp?.data?.data1);
      } else {
        console.log('login????????? come in catck block');

        console.log('the err of login==>>', resp?.data?.message);
        setalert_sms(resp?.data?.message);
        setMy_Alert(true);
      }
    } catch (error) {
      console.log('error in getCartCount', error);
      setalert_sms(responseJson.message);
      setMy_Alert(true);
    }
    setLoading(false);
  };

  /////change job status
  const changeStatus = async item => {
    {
      console.log('my start jon item when clicked--->>>', item);
    }
    try {
      setLoading(true);
      const data = {
        job_id: route?.params?.item?.id,
        job_slug: jobSlug,
        date_time: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log('Requesting login with data:', data);
      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS?.CHANGE_JOBSTATUS,
        data,
        'POST',
        userToken,
      );
      console.log('change status for data', responseJson?.status);
      if (responseJson?.status === true || responseJson?.status === 1) {
        console.log('start job status detaill--->>>', responseJson?.data);
        Toast.show({text1: responseJson?.message});
        setLocationModal(false);
        getJobStatus();
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
  /////end job
  const Createpost = async () => {
    console.log('picker create post function camera');
    try {
      console.log('hhhhh to');
      setLoading(true);
      const data = new FormData();
      // Append necessary fields
      data.append('job_id', route?.params?.item?.id);
      data.append('job_end', moment().format('YYYY-MM-DD HH:mm:ss'));
      data.append('job_slug', jobSlug);
      // Handle picker data
      if (picker.length > 0) {
        console.log('picker gallery');
        picker.forEach(item => {
          const imageName = item.path.slice(
            item.path.lastIndexOf('/'),
            item.path.length,
          );
          data.append('signed_document[]', {
            name: imageName,
            type: item.mime,
            uri: item.path,
          });
        });
      } else if (picker.length === undefined) {
        console.log('picker undefined');
        const imageName = picker.path.slice(
          picker.path.lastIndexOf('/'),
          picker.path.length,
        );
        data.append('signed_document[]', {
          name: imageName,
          type: picker.mime,
          uri: picker.path,
        });
      }

      console.log(data, ' ');

      // Perform API request
      const response = await axios.post(
        'https://niletechinnovations.com/projects/sherpa/api/end-job',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      console.log('API response received:', response.data);

      if (response.status === 200) {
        console.log('my data arrayyy--->>>>', response?.data);
        console.log('Job ended successfully');
        // Navigate to another screen if needed
        // props.navigation.navigate('ArtHome');
        Toast.show({text1: response.data.message});
        navigation.goBack();
      } else {
        console.log('Error from API:', response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error in Createpost function:', error);
      setLoading(false);
    }
  };
  ////flatList stop
  const renderStudentList = ({item}) => {
    console.log('render upcoming class=------>>', item);

    return (
      <View style={{flexDirection: 'column'}}>
        <Image
          source={require('../../assest/images/mapPointer.png')}
          style={[styles.mapPointer, {}]}></Image>
        <Image
          source={require('../../assest/images/verticallImg.png')}
          style={{
            height: 30,
            width: 4,
            marginHorizontal: 20,
          }}></Image>
      </View>
    );
  };

  const renderStudentLis = ({item}) => {
    console.log('render upcoming class=------>>', item);

    return (
      <View style={{flexDirection: 'row', marginHorizontal: 5, marginTop: 9}}>
        <MyText
          text={'Stop Location : '}
          fontFamily="Roboto"
          fontSize={14}
          textColor={Color.dark_gray}
          style={{marginLeft: 7}}
        />
        <MyText
          text={item?.full_address}
          fontFamily="Roboto"
          fontSize={14}
          textColor={Color.PRIMARY}
          style={{marginLeft: 7}}
        />
      </View>
    );
  };
  const renderSignedDocuments = ({item}) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          height: 'auto',
          width: responsiveWidth(90),
        }}>
        {console.log('mu sifgmm-->>', item)}
        <Image
          source={{uri: item?.full_url}}
          style={{alignSelf: 'center', height: '100%', width: '100%'}}
          resizeMode="contain"
        />
      </View>
    );
  };
  //redirect to maps
  const openGoogleMaps = address => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  ////polyline coordinartes
  const getRouteCoordinates = async () => {
    const apiKey = 'AIzaSyClYnNzbToxL6mm3kbJf1kixP468IC-nxo';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickupLocation.latitude},${pickupLocation.longitude}&destination=${dropLocation.latitude},${dropLocation.longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const points = response.data.routes[0].overview_polyline.points;
      const decodedPoints = PolylineDecoder.decode(points); // Decode the polyline points
      // Convert decoded points to latitude/longitude objects
      const coordinates = decodedPoints.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));

      setRouteCoordinates(coordinates); // Set decoded route coordinates
    } catch (error) {
      console.error('Error fetching route data', error);
    }
  };
  useEffect(() => {
    if (pickupLocation && dropLocation) {
      getRouteCoordinates();
    }
  }, [pickupLocation, dropLocation]);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.PRIMARY,
        }}>
        <MyHeader
          Title={
            route?.params?.status === 'Today'
              ? `Jobs details`
              : route?.params?.status === 'Active'
              ? `Active Job`
              : ' Job details'
            //  Job details
          }
          isBackButton
          IsNotificationIcon={false}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(212, 229, 240, 1)']}
            style={{
              flex: 1,
              zIndex: -1,
            }}> */}
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
            {showSkelton ? (
              <>
                {console.log('showskelton----<<<<', showSkelton)}
                <SkeletonContainer></SkeletonContainer>
              </>
            ) : (
              <>
                <View style={{flex: 1}}>
                  {route?.params?.status === '2' ? (
                    <View style={styles.jobStatus}>
                      <MyText
                        text={'Change Job Status:'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.dark_gray}
                        style={{
                          fontWeight: '500',
                          width: dimensions.SCREEN_WIDTH * 0.2,
                        }}
                      />
                      <MyText
                        text={selected ? selected : ''}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{width: '58%', fontWeight: '500'}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setLocationModal(true);
                        }}>
                        <Image
                          source={require('../../assest/images/arrow-right.png')}
                          style={styles.arrowRight}></Image>
                      </TouchableOpacity>
                    </View>
                  ) : route?.params?.status === '3' ? (
                    <View style={[styles.jobStatus, {height: 49}]}>
                      <MyText
                        text={'Delivered Date'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.dark_gray}
                        style={{}}
                      />
                      <MyText
                        text={moment(order?.job_date).format('MM-DD-YYYY')}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{}}
                      />
                    </View>
                  ) : null}
                  {console.log('my signed documents00====>>', signedDocuments)}
                  {signedDocuments?.length > 0 && (
                    <>
                      <View
                        style={{
                          alignSelf: 'center',
                          marginTop: responsiveHeight(2),
                          // paddingVertical: responsiveHeight(1),
                          height: responsiveHeight(28.5),
                          width: responsiveWidth(90),
                          borderRadius: responsiveWidth(1),
                          backgroundColor: 'white',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 8},
                          shadowOpacity: 0.07,
                          shadowRadius: 20,
                          elevation: 13,
                        }}>
                        <View style={[styles.headerBar]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

                              width: dimensions.SCREEN_WIDTH * 0.82,
                            }}>
                            <MyText
                              text={'Uploaded Documents'}
                              fontFamily="regular"
                              fontSize={14}
                              textColor={Color.dark_gray}
                              style={{fontWeight: '500'}}
                            />
                            <MyText
                              text={order?.signed_document_approval}
                              fontFamily="regular"
                              fontSize={14}
                              textColor={
                                order?.signed_document_approval === 'Pending'
                                  ? Color.orange
                                  : order?.signed_document_approval ===
                                    'Rejected'
                                  ? Color.red
                                  : Color.green
                              }
                              style={{fontWeight: '500'}}
                            />
                          </View>
                        </View>
                        <FlatList
                          data={signedDocuments}
                          renderItem={renderSignedDocuments}
                          keyExtractor={(_, index) => index}
                          horizontal={true}
                          pagingEnabled={true}
                          style={{
                            marginTop: responsiveHeight(2),
                            paddingVertical: responsiveHeight(1),
                          }}
                        />
                      </View>
                    </>
                  )}
                  <View>
                    {selected === 'Item Delivered' ? (
                      <TouchableOpacity
                        onPress={() => {
                          setUploadDocument(true);
                        }}>
                        <Image
                          source={require('../../assest/images/uploadDocument.png')}
                          style={{
                            width: dimensions.SCREEN_WIDTH * 0.9,
                            height: 70,
                            alignSelf: 'center',
                            resizeMode: 'cover',
                            marginTop: 8,
                          }}></Image>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {picker.length > 0 && selected === 'Item Delivered' ? (
                      picker.map((y, index) => {
                        console.log('images yyyyyyy hhhhh--------->', y.path);
                        return (
                          <View
                            key={index}
                            style={[
                              styles.uploadedImageBox,
                              {flexDirection: 'row', marginRight: 10}, // Add margin between images
                            ]}>
                            <Image
                              source={{
                                uri: y?.path ? y?.path : null,
                              }}
                              style={styles.imagePickerStyle}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                const updated = picker.filter(
                                  el => el.path !== y.path,
                                );
                                setPicker(updated);
                                console.log('Updated gallery', updated.length);
                              }}
                              style={{
                                position: 'absolute',
                                top: 5, // Adjust the positioning as needed
                                right: 5,
                              }}>
                              <Image
                                style={styles.deleteIcon}
                                source={require('../../assest/images/delete.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })
                    ) : (
                      <View style={{}}></View>
                    )}
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
                          text={order?.job_id}
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
                          text={moment(order?.job_date).format('MM-DD-YYYY')}
                          fontFamily="regular"
                          fontSize={14}
                          textColor={Color.PRIMARY}
                        />
                      </View>
                    </View>
                    <View style={{paddingVertical: 10, paddingHorizontal: 12}}>
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <MyText
                          text={order?.job_name}
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
                            text={order?.job_type}
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
                            text={order?.customer_drop_location?.name}
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
                        text={order?.job_description}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                      />
                    </View>
                  </View>
                  <View style={styles.conatiner}>
                    <View style={styles.headerBar}>
                      <View style={{flexDirection: 'row'}}>
                        <MyText
                          text={`${order?.stops?.length} Stop Locations`}
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
                          text={order?.distance_betweeen}
                          fontFamily="Qutfit"
                          fontSize={14}
                          textColor={Color.WHITE}
                          style={{marginLeft: 7}}
                        />
                      </View>
                    </View>
                    <View style={{paddingVertical: 10, paddingHorizontal: 12}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Image
                            source={require('../../assest/images/mapPointer.png')}
                            style={[styles.mapPointer, {}]}></Image>
                          <Image
                            source={require('../../assest/images/verticallImg.png')}
                            style={{
                              height: 30,
                              width: 4,
                              marginHorizontal: 20,
                            }}></Image>
                          {order?.stops?.length > 0 ? (
                            <View style={styles.displayRoutines}>
                              <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                data={order?.stops}
                                renderItem={renderStudentList}
                                keyExtractor={(item, index) => String(index)}
                              />
                            </View>
                          ) : null}
                          <Image
                            source={require('../../assest/images/mapPointer.png')}
                            style={[styles.mapPointer, {}]}></Image>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <MyText
                                text={'Supplier Name :'}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={Color.dark_gray}
                                style={{marginLeft: 7}}
                              />
                              <MyText
                                text={order?.supplier_pickup_location?.name}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={Color.dark_gray}
                                style={{marginLeft: 7}}
                              />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                              <MyText
                                text={'Comapny  :'}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={Color.dark_gray}
                                style={{marginLeft: 7}}
                              />
                              <MyText
                                text={
                                  order?.supplier_pickup_location?.company_name
                                }
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={Color.dark_gray}
                                style={{marginLeft: 7}}
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: dimensions.SCREEN_WIDTH * 0.5,
                              }}>
                              <MyText
                                text={'Pickup Location :'}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={Color.dark_gray}
                                style={{marginLeft: 7}}
                              />
                              <TouchableOpacity
                                onPress={() =>
                                  openGoogleMaps(
                                    order?.supplier_pickup_location
                                      ?.full_address,
                                  )
                                }>
                                <MyText
                                  text={`${order?.supplier_pickup_location?.full_address}`}
                                  fontFamily="Qutfit"
                                  fontSize={14}
                                  textColor={Color.PRIMARY}
                                  style={{marginLeft: 7}}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View>
                            {order?.stops?.length > 0 ? (
                              <View style={styles.displayRoutines}>
                                <FlatList
                                  showsHorizontalScrollIndicator={false}
                                  horizontal={false}
                                  data={order?.stops}
                                  renderItem={renderStudentLis}
                                  keyExtractor={(item, index) => String(index)}
                                />
                              </View>
                            ) : null}
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginVertical: 10,
                              marginTop: 40,
                              width: dimensions.SCREEN_WIDTH * 0.7,
                            }}>
                            <View>
                              <View style={{flexDirection: 'row'}}>
                                <MyText
                                  text={'Customer Name :'}
                                  fontFamily="Roboto"
                                  fontSize={14}
                                  textColor={Color.dark_gray}
                                  style={{marginLeft: 7}}
                                />
                                <MyText
                                  text={order?.customer_drop_location?.name}
                                  fontFamily="Roboto"
                                  fontSize={14}
                                  textColor={Color.dark_gray}
                                  style={{marginLeft: 7}}
                                />
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <MyText
                                  text={'Company Name :'}
                                  fontFamily="Roboto"
                                  fontSize={14}
                                  textColor={Color.dark_gray}
                                  style={{marginLeft: 7}}
                                />
                                <MyText
                                  text={
                                    order?.customer_drop_location?.company_name
                                  }
                                  fontFamily="Roboto"
                                  fontSize={14}
                                  textColor={Color.dark_gray}
                                  style={{marginLeft: 7}}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: dimensions.SCREEN_WIDTH * 0.5,
                                }}>
                                <MyText
                                  text={'Pickup Location :'}
                                  fontFamily="Roboto"
                                  fontSize={14}
                                  textColor={Color.dark_gray}
                                  style={{marginLeft: 7}}
                                />
                                <TouchableOpacity
                                  onPress={() =>
                                    openGoogleMaps(
                                      order?.supplier_pickup_location
                                        ?.full_address,
                                    )
                                  }>
                                  <MyText
                                    text={`${order?.customer_drop_location?.full_address}`}
                                    fontFamily="Qutfit"
                                    fontSize={14}
                                    textColor={Color.PRIMARY}
                                    style={{marginLeft: 7}}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          height: dimensions.SCREEN_HEIGHT * 0.4,
                          width: dimensions.SCREEN_WIDTH * 0.87,
                          alignSelf: 'center',
                          borderRadius: 20,
                        }}>
                        <MapView
                          provider={PROVIDER_GOOGLE}
                          style={{flex: 1, marginTop: 45}} // Ensure the MapView takes the full screen
                          initialRegion={{
                            latitude:
                              (JSON.parse(pickupLocation?.latitude) +
                                JSON.parse(dropLocation?.latitude)) /
                              2, // Average of pickup and drop latitude
                            longitude:
                              (JSON.parse(pickupLocation?.longitude) +
                                JSON.parse(dropLocation?.longitude)) /
                              2, // Average of pickup and drop longitude
                            latitudeDelta: 20.0, // Increase for more zoom-out
                            longitudeDelta: 20.0,
                          }}
                          showsCompass={false}
                          showsMyLocationButton={true}
                          showsUserLocation={false}
                          userLocationCalloutEnabled={true}
                          showsScale={true}
                          zoomEnabled={true}
                          pitchEnabled={false}
                          // customMapStyle={mapStyle}
                          showsBuildings={true}
                          showsIndoors={true}
                          showsIndoorLevelPicker={true}
                          scrollEnabled={false}>
                          {pickupLocation && (
                            <Marker
                              coordinate={{
                                latitude: JSON.parse(pickupLocation?.latitude),
                                longitude: JSON.parse(
                                  pickupLocation?.longitude,
                                ),
                              }}
                              title="Pickup Location"
                              description={
                                order?.supplier_pickup_location?.full_address
                              }
                            />
                          )}

                          {dropLocation && (
                            <Marker
                              coordinate={{
                                latitude: JSON.parse(dropLocation?.latitude),
                                longitude: JSON.parse(dropLocation?.longitude),
                              }}
                              title="Drop Location"
                              description={
                                order?.customer_drop_location?.full_address
                              }
                            />
                          )}

                          {pickupLocation && dropLocation && (
                            <Polyline
                              coordinates={routeCoordinates} // Use route coordinates
                              strokeColor="#000" // Line color
                              strokeWidth={3} // Line width
                            />
                          )}
                        </MapView>
                      </View>
                    </View>
                  </View>
                  {/* <View style={styles.conatiner}>
                    <View style={styles.headerBar}>
                      <View style={{flexDirection: 'row'}}>
                        <MyText
                          text={`${order?.stops?.length} Stop Locations`}
                          fontFamily="Roboto"
                          fontSize={14}
                          textColor={'#000000'}
                        />
                      </View>
                      <View style={[styles.routing, {flexDirection: 'row'}]}>
                        <Image
                          source={require('../../assest/images/routing.png')}
                          style={styles.routingImg}
                        />
                        <MyText
                          text={order?.distance_between}
                          fontFamily="Qutfit"
                          fontSize={14}
                          textColor={Color.WHITE}
                          style={{marginLeft: 7}}
                        />
                      </View>
                    </View>

                    <View style={{paddingVertical: 10, paddingHorizontal: 12}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                          <Image
                            source={require('../../assest/images/mapPointer.png')}
                            style={styles.mapPointer}
                          />
                          <Image
                            source={require('../../assest/images/verticallImg.png')}
                            style={{height: 30, width: 4, marginHorizontal: 20}}
                          />
                          {order?.stops?.length > 0 && (
                            <View style={styles.displayRoutines}>
                              <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                data={order?.stops}
                                renderItem={renderStudentList}
                                keyExtractor={(item, index) => String(index)}
                              />
                            </View>
                          )}
                          <Image
                            source={require('../../assest/images/mapPointer.png')}
                            style={styles.mapPointer}
                          />
                        </View>

                        <View style={{flexDirection: 'column'}}>
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <MyText
                                text={`Company Name :`}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={'#000000'}
                              />
                              <MyText
                                text={order?.supplier_pickup_location?.name}
                              />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                              <MyText
                                text={`Supplier Name`}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={'#000000'}
                              />
                              <MyText
                                text={
                                  order?.supplier_pickup_location?.company_name
                                }
                              />
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: dimensions.SCREEN_WIDTH * 0.5,
                              }}>
                              <MyText
                                text={'Pickup Location :'}
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={Color.dark_gray}
                                style={{marginLeft: 7}}
                              />
                              <TouchableOpacity
                                onPress={() =>
                                  openGoogleMaps(
                                    order?.supplier_pickup_location
                                      ?.full_address,
                                  )
                                }>
                                <MyText
                                  text={`${order?.supplier_pickup_location?.full_address}`}
                                  fontFamily="Qutfit"
                                  fontSize={14}
                                  textColor={Color.PRIMARY}
                                  style={{marginLeft: 7}}
                                />
                              </TouchableOpacity>
                            </View>
                            <MyText
                              label="Pickup Location :"
                              address={
                                order?.supplier_pickup_location?.full_address
                              }
                              onPress={() =>
                                openGoogleMaps(
                                  order?.supplier_pickup_location?.full_address,
                                )
                              }
                            />
                          </View>

                          {order?.stops?.length > 0 && (
                            <View style={styles.displayRoutines}>
                              <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={false}
                                data={order?.stops}
                                renderItem={renderStudentList}
                                keyExtractor={(item, index) => String(index)}
                              />
                            </View>
                          )}

                          <View
                            style={{
                              flexDirection: 'row',
                              marginVertical: 10,
                              marginTop: 40,
                              width: dimensions.SCREEN_WIDTH * 0.7,
                            }}>
                            <View>
                              <MyText></MyText>
                              <MyText
                                label="Customer Name :"
                                value={order?.customer_drop_location?.name}
                              />
                              <MyText
                                label="Company Name :"
                                value={
                                  order?.customer_drop_location?.company_name
                                }
                              />
                              <MyText
                                label="Drop Location :"
                                address={
                                  order?.customer_drop_location?.full_address
                                }
                                onPress={() =>
                                  openGoogleMaps(
                                    order?.customer_drop_location?.full_address,
                                  )
                                }
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          height: dimensions.SCREEN_HEIGHT * 0.4,
                          width: dimensions.SCREEN_WIDTH * 0.87,
                          alignSelf: 'center',
                          borderRadius: 20,
                        }}>
                        <MapView
                          provider={PROVIDER_GOOGLE}
                          style={{flex: 1, marginTop: 45}} // Ensure the MapView takes the full screen
                          initialRegion={{
                            latitude:
                              (JSON.parse(pickupLocation?.latitude) +
                                JSON.parse(dropLocation?.latitude)) /
                              2,
                            longitude:
                              (JSON.parse(pickupLocation?.longitude) +
                                JSON.parse(dropLocation?.longitude)) /
                              2,
                            latitudeDelta: 20.0, // Adjust for better zoom
                            longitudeDelta: 20.0,
                          }}
                          showsCompass={false}
                          showsMyLocationButton={true}
                          showsUserLocation={false}
                          userLocationCalloutEnabled={true}
                          showsScale={true}
                          zoomEnabled={true}
                          pitchEnabled={false}
                          showsBuildings={true}
                          showsIndoors={true}
                          showsIndoorLevelPicker={true}
                          scrollEnabled={false}>
                          {pickupLocation && (
                            <Marker
                              coordinate={{
                                latitude: JSON.parse(pickupLocation?.latitude),
                                longitude: JSON.parse(
                                  pickupLocation?.longitude,
                                ),
                              }}
                              title="Pickup Location"
                            />
                          )}

                          {dropLocation && (
                            <Marker
                              coordinate={{
                                latitude: JSON.parse(dropLocation?.latitude),
                                longitude: JSON.parse(dropLocation?.longitude),
                              }}
                              title="Drop Location"
                            />
                          )}

                          {pickupLocation && dropLocation && (
                            <Polyline
                              coordinates={routeCoordinates}
                              strokeColor="#000"
                              strokeWidth={3}
                            />
                          )}
                        </MapView>
                      </View>
                    </View>
                  </View> */}

                  {picker.length > 0 && selected === 'Item Delivered' ? (
                    <TouchableOpacity
                      onPress={() => {
                        Createpost();
                      }}
                      style={{
                        height: 60,
                        width: dimensions.SCREEN_WIDTH * 0.9,
                        borderRadius: 10,
                        alignSelf: 'center',
                        backgroundColor: Color.orange,
                        justifyContent: 'center',
                        marginBottom: 40,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          fontSize: 17,
                          color: Color.WHITE,
                        }}>
                        End Job
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </>
            )}
            {/* </LinearGradient> */}
          </View>
        </ScrollView>
      </View>
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
              {JobStatus?.length > 0 ? (
                <View style={styles.displayRoutines}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={false}
                    data={JobStatus}
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
                  // setLocationModal(false);
                  changeStatus();
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
            <TouchableOpacity
              onPress={() => {
                onGallery();
              }}>
              <Image
                source={require('../../assest/images/GalleryUpload.png')}
                style={{width: 175, height: 121}}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onCamera();
              }}>
              <Image
                source={require('../../assest/images/CameraUpload.png')}
                style={{width: 175, height: 121}}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

export default OrderDetail;
