import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import MyButton from '../../Components/MyButton/MyButton';
import ManageActive from './ManageActive';
import MyModal from '../../modals/MyModal/MyModal';
import styles from './style';
import Toast from 'react-native-toast-message';
import Color, {dimensions} from '../../global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText';
import NoData from '../../Components/NoData';
////loader

import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomButtonOrange from '../../Components/CustomButtonOrange';
import CustomHeader from '../../Components/CustomHeader';
import CustomTextBox from '../../Components/CustomTextBox';
import {get_homework} from '../../global/Service';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import Loader from '../../Components/Loader';
import MyAlert from '../../global/MyAlert';
import SkeletonContainer from '../../Components/Skelton/SkeletonContainer';
import {
  getApiWithToken,
  API_ENDPOINTS,
  GET_TODAYJOB,
  START_BREAK,
  requestPostApi,
  START_JOB,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
const Order = ({navigation, route}) => {
  {
    console.log('my params--->>>', route?.params?.status);
  }
  const dispatch = useDispatch();
  const searchTimeoutRef = useRef(null);
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  const [uplloadDocument, setUploadDocument] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [animating, setAnimating] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [isLocationModal, setLocationModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [param, setParam] = useState(route?.params?.status);
  const [My_Alert, setMy_Alert] = useState(false);
  const [order, setOrder] = useState([]);
  const [alert_sms, setalert_sms] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [searchText, setSearchText] = useState('');
  const [isDate, setIsDate] = useState(false);
  console.log('my selercted date---->>>', date);
  const [filterDate, setFilterDate] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [distance, setDistance] = useState(''); // Initial distance value (in kilometers)
  const [showSkelton, setShowSkelton] = useState(false);
  const [isDistance, setIsDistance] = useState('');

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Reset all the states when the screen gains focus
  //     setDistance('');
  //     setFilterDate('');
  //     setIsDate(false);
  //     setSearchText('');
  //     setParam(route?.params?.status); // Set param when screen focuses
  //     if (route?.params?.status) {
  //       setParam(route?.params?.status);
  //     } else {
  //       setParam(''); // Reset param if no status is found
  //     }
  //     // Log to check if route?.params?.status is available during focus
  //     console.log('my param data on focus--->>', route?.params?.status);
  //   });

  //   return unsubscribe; // Unsubscribe from navigation event on unmount
  // }, [navigation, route?.params?.status]);

  // // Trigger getCartCount only after filterDate and other states are reset
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (
  //       filterDate === '' &&
  //       isDate === false &&
  //       distance === '' &&
  //       searchText === ''
  //     ) {
  //       setShowSkelton(true); // Moved here to show skeleton only when data is being fetched
  //       getCartCount();
  //     }
  //   });

  //   // Cleanup on unmount
  //   return unsubscribe;
  // }, [navigation, filterDate, isDate, distance, searchText]);
  // //get job details

  // const getCartCount = async () => {
  //   {
  //     console.log('my get cart countg caledddd', param);
  //   }
  //   setShowSkelton(true);
  //   setLoading(true);
  //   // Base URL
  //   var url = API_ENDPOINTS.GET_TODAYJOB;
  //   var murl = `?status=` + param;
  //   url = url + murl;
  //   {
  //     console.log('mu url --->>', url);
  //   }
  //   // Only add parameters if they are not empty
  //   if (filterDate) {
  //     var dater = `&job_date=` + moment(filterDate).format('YYYY-MM-DD');
  //     url = url + dater;
  //   }

  //   if (searchText && searchText.trim() !== '') {
  //     var name = `&job_name=` + searchText.trim();
  //     url = url + name;
  //   }

  //   if (distance) {
  //     var dist = `&max_distance=` + distance;
  //     url = url + dist;
  //   }

  //   try {
  //     const resp = await getApiWithToken(userToken, url);

  //     if (resp?.data?.status) {
  //       setOrder(resp?.data?.data);
  //       setShowFilter(false);
  //     } else {
  //       console.log('Error message==>>', resp);
  //       setalert_sms(resp?.data?.message);
  //       setMy_Alert(true);
  //     }
  //   } catch (error) {
  //     console.log('error in getCartCount', error);
  //     setalert_sms(error?.message);
  //     // setMy_Alert(true);
  //   }
  //   setShowSkelton(false);
  //   setLoading(false);
  // };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset all states when the screen gains focus
      setDistance('');
      setIsDistance('');
      setFilterDate('');
      setIsDate(false);
      setSearchText('');

      // Set param when screen focuses
      if (route?.params?.status) {
        setParam(route?.params?.status);
      } else {
        setParam(''); // Reset param if no status is found
      }

      console.log('my param data on focus--->>', route?.params?.status);
    });

    return unsubscribe; // Unsubscribe from navigation event on unmount
  }, [navigation, route?.params?.status]);

  // Trigger getCartCount only after param is updated
  React.useEffect(() => {
    if (param !== '') {
      console.log('param updated, fetching data...');
      getCartCount();
    }
  }, [param]); // Call getCartCount whenever param changes
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (
        filterDate === '' &&
        isDate === false &&
        isDistance &&
        distance === '' &&
        searchText === ''
      ) {
        setShowSkelton(true); // Moved here to show skeleton only when data is being fetched
        getCartCount();
      }
    });

    //   // Cleanup on unmount
    return unsubscribe;
  }, [navigation, filterDate, isDate, distance, searchText]);
  //get job details
  const getCartCount = async () => {
    console.log('getCartCount called, param:', param);

    setShowSkelton(true);
    setLoading(true);

    // Base URL
    var url = API_ENDPOINTS.GET_TODAYJOB;
    var murl = `?status=` + param;
    url = url + murl;

    console.log('Constructed URL:', url);

    // Add parameters if they are not empty
    if (filterDate) {
      var dater = `&job_date=` + moment(filterDate).format('YYYY-MM-DD');
      url = url + dater;
    }

    if (searchText && searchText.trim() !== '') {
      var name = `&job_name=` + searchText.trim();
      url = url + name;
    }

    if (distance) {
      var dist = `&max_distance=` + distance;
      url = url + dist;
    }

    try {
      const resp = await getApiWithToken(userToken, url);

      console.log('API Response:', resp);

      if (resp?.data?.status) {
        setOrder(resp?.data?.data); // Set the data into the state
        setShowFilter(false); // Close any active filters
      } else {
        console.log(
          'API Error message:',
          resp?.data?.message || 'No message available',
        );
        setalert_sms(resp?.data?.message || 'Something went wrong!');
        setMy_Alert(true);
      }
    } catch (error) {
      console.error('Error in getCartCount:', error);

      let errorMessage = 'An error occurred. Please try again later.';

      if (error.response && error.response.data) {
        // Extract server error message
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        // General error message
        errorMessage = error.message;
      }

      setalert_sms(errorMessage); // Show error message in alert
      setMy_Alert(true); // Trigger alert
    } finally {
      setShowSkelton(false); // Hide skeleton loader
      setLoading(false); // Stop loading state
    }
  };

  const handleSearch = text => {
    {
      console.log('handleSearch');
    }
    setSearchText(text);
    let url = `all-jobs?status=${route?.params?.status}`;

    // Append job_name only if the text is not empty
    if (text.trim() !== '') {
      url += `&job_name=${encodeURIComponent(text.trim())}`;
    }

    // Call getCartCount or your API fetching function with the updated URL
    getCartCount(url); // Ensure getCartCount accepts a URL or properly handles it
  };

  ////dates
  const onDayPress = day => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      if (day.dateString > selectedStartDate) {
        setSelectedEndDate(day.dateString);
      } else {
        setSelectedStartDate(day.dateString);
      }
    }
  };
  const getMarkedDates = () => {
    let markedDates = {};

    if (selectedStartDate) {
      markedDates[selectedStartDate] = {
        startingDay: true,
        color: '#50cebb',
        textColor: 'white',
      };

      if (selectedEndDate) {
        let currentDate = selectedStartDate;
        while (currentDate <= selectedEndDate) {
          if (currentDate === selectedStartDate) {
            markedDates[currentDate] = {
              startingDay: true,
              color: '#50cebb',
              textColor: 'white',
            };
          } else if (currentDate === selectedEndDate) {
            markedDates[currentDate] = {
              endingDay: true,
              color: '#50cebb',
              textColor: 'white',
            };
          } else {
            markedDates[currentDate] = {color: '#70d7c7', textColor: 'white'};
          }
          currentDate = new Date(
            new Date(currentDate).setDate(new Date(currentDate).getDate() + 1),
          )
            .toISOString()
            .split('T')[0];
        }
      } else {
        markedDates[selectedStartDate] = {
          selected: true,
          color: '#50cebb',
          textColor: 'white',
        };
      }
    }

    return markedDates;
  };
  const getCartCountWithUpdatedDistance = async newDistance => {
    setShowSkelton(true);
    var url = API_ENDPOINTS.GET_TODAYJOB;
    var murl = `?status=` + route?.params?.status;
    url = url + murl;

    if (filterDate) {
      var dater = `&job_date=` + moment(filterDate).format('YYYY-MM-DD');
      url = url + dater;
    }

    if (searchText && searchText.trim() !== '') {
      var name = `&job_name=` + searchText.trim();
      url = url + name;
    }

    if (newDistance) {
      var dist = `&max_distance=` + newDistance;
      url = url + dist;
    }

    try {
      const resp = await getApiWithToken(userToken, url);
      if (resp?.data?.status) {
        setOrder(resp?.data?.data);
        setShowFilter(false);
      } else {
        setalert_sms(resp?.data?.message);
        setMy_Alert(true);
      }
    } catch (error) {
      setalert_sms(error?.message);
      // setMy_Alert(true);
    }
    setShowSkelton(false);
    setLoading(false);
  };
  ///start end job
  const startJob = async item => {
    try {
      setLoading(true);
      const data = {
        job_id: item?.id,
        job_start: item?.job_date,
      };
      console.log('Requesting login with data:', data);
      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS.START_JOB,
        data,
        'POST',
        userToken,
      );

      if (responseJson?.status === true || responseJson?.status === 1) {
        getCartCount();
        navigation.goBack();
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
  const renderStudentList = ({item}) => {
    return (
      <ManageActive
        item={item}
        navigation={navigation}
        status={route?.params?.status}
        handelePress={startJob}></ManageActive>
    );
  };
  const onRefresh = React.useCallback(() => {
    checkcon();

    // Use the custom wait function to introduce a delay
    wait(2000).then(() => {
      setRefreshing(false); // Stop refreshing after 2 seconds
    });
  }, []);
  // Define the wait function to handle delays
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const checkcon = () => {
    setDistance('');
    setIsDistance('');
    setFilterDate(''); // Assuming you have a state for filter date
    setIsDate(false); // Reset date selection if applicable
    setSearchText('');
    getCartCount();
    // getProductDetails();
  };

  return (
    <>
      <View style={{flex: 1}}>
        <MyHeader
          Title={
            route?.params?.status === '1'
              ? 'Today’s Jobs'
              : route?.params?.status === '2'
              ? 'Active Jobs'
              : 'Completed Jobs'
          }
          isBorderRadius={true}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center', // Align items vertically
              justifyContent: 'space-between', // Spread items horizontally
              width: dimensions.SCREEN_WIDTH * 0.9,
              marginBottom: 10,
              marginTop: 8, // Spacing below the search bar
            }}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.textInput}
                placeholder="Search by Job Name"
                value={searchText}
                onChangeText={text => {
                  setSearchText(text);

                  // Clear the previous timeout if there is one
                  if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }

                  // Set a new timeout to debounce the search
                  searchTimeoutRef.current = setTimeout(() => {
                    handleSearch(text);
                  }, 300); // Delay of 300ms before triggering the search
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowFilter(true);
              }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 5,
                backgroundColor: Color.orange,
                justifyContent: 'center',
                marginTop: 12,
              }}>
              <Image
                source={require('../../assest/images/setting-4.png')}
                style={{
                  height: 32,
                  width: 32,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', marginHorizontal: 12}}>
            {isDate ? (
              <View
                style={{
                  backgroundColor: Color.PRIMARY,
                  paddingVertical: 9,
                  paddingHorizontal: 6,
                  borderRadius: 8,
                  marginRight: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 5,
                  alignItems: 'center',
                  alignSelf: 'flex-start', // Prevents it from taking up full space
                }}>
                <Text style={{fontSize: 14, color: Color.WHITE}}>Date:</Text>
                <Text style={{fontSize: 14, color: Color.WHITE}}>
                  {moment(filterDate).format('MM-DD-YYYY')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsDate(false);
                    setShowFilter(false);
                    setDistance('');
                    setIsDistance('');
                  }}>
                  <Image
                    source={require('../../assest/images/trash.png')}
                    style={{height: 16, width: 16, marginLeft: 12}}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {isDistance ? (
              <View
                style={{
                  backgroundColor: Color.PRIMARY,
                  paddingVertical: 9,
                  paddingHorizontal: 6,
                  borderRadius: 8,
                  marginRight: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-start', // Prevents it from taking up full space
                }}>
                <Text style={{fontSize: 14, color: Color.WHITE}}>
                  Distance:
                </Text>
                <Text style={{fontSize: 14, color: Color.WHITE}}>
                  {` ${distance} KM`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDistance('');
                    setIsDistance('');
                    // getCartCount();
                    getCartCountWithUpdatedDistance('');
                  }}>
                  <Image
                    source={require('../../assest/images/trash.png')}
                    style={{height: 16, width: 16, marginLeft: 12}}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={{flex: 1}}>
            {showSkelton ? (
              <>
                <SkeletonContainer></SkeletonContainer>
              </>
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={order}
                renderItem={renderStudentList}
                ListEmptyComponent={() => (
                  <View>
                    <NoData></NoData>
                  </View>
                )}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{paddingBottom: 20}} // Added padding to avoid content getting cut off
                // refreshControl={
                //   <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            )}
          </View>
        </View>
      </View>
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
      <MyModal visible={showFilter} setVisibility={setShowFilter}>
        {
          <View>
            <MyText
              text={'Choose Filter'}
              textColor={Color.LIGHT_BLACK}
              fontFamily="bold"
              fontSize={20}
              marginTop={10}
              style={{textAlign: 'center', fontWeight: '600'}}
            />
            {route?.params?.status === '2' ? (
              <>
                <MyText
                  text={'Choose Date'}
                  fontFamily="medium"
                  textColor={Color.LIGHT_BLACK}
                  fontSize={16}
                  marginVertical={10}
                  style={{marginTop: 22}}
                />
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={{
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                    borderWidth: 0.8,
                  }}>
                  <MyText
                    text={
                      filterDate == ''
                        ? 'Select Date'
                        : moment(filterDate).format('MM/DD/YYYY')
                    }
                    textColor="light_grey"
                    fontFamily="medium"
                    fontSize={16}
                  />
                  {/* <MyIcon.AntDesign
                name="calendar"
                size={24}
                color={Colors.LIGHT_GREY}
              /> */}
                </TouchableOpacity>
              </>
            ) : null}
            {/* <Calendar
              onDayPress={onDayPress}
              markedDates={getMarkedDates()}
              markingType={'period'}
            /> */}
            <MyText
              text={'Select Distance'}
              textColor={Color.LIGHT_BLACK}
              fontSize={16}
              marginVertical={10}
              style={{marginTop: 22}}
            />
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              maximumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setIsDate(true);
                setFilterDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <Slider
              style={{height: 40, marginLeft: -12}}
              minimumValue={1} // Minimum value of the slider (1 km)
              maximumValue={2000} // Maximum value of the slider (100 km)
              step={1} // Slider increments in steps of 1 km
              value={distance} // Controlled value
              onValueChange={setDistance} // Update the distance as the slider is moved
              minimumTrackTintColor={Color.PRIMARY}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={Color.PRIMARY}
              trackStyle={{
                transform: [{scaleY: 3.5}],
              }}
            />
            <Text
              style={{
                fontSize: 15,
                fontColor: Color.LIGHT_BLACK,
                marginTop: 11,
                marginHorizontal: 5,
              }}>
              Selected Distance: {distance} kilometers
            </Text>

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('BottomTab');
                setIsDistance(true)
                getCartCount();
                setShowFilter(false);
              }}
              style={{marginTop: 20}}>
              <CustomButtonBlue name="Apply"></CustomButtonBlue>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('BottomTab');
                setShowFilter(false);
                setDistance('');
                setIsDistance('');
                setIsDate(false);
              }}
              style={{marginTop: 10}}>
              <CustomButtonOrange name="Reset"></CustomButtonOrange>
            </TouchableOpacity>
          </View>
        }
      </MyModal>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {/* {loading ? <Loader /> : null} */}
    </>
  );
};

export default Order;
