import React, {useState, useEffect} from 'react';
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
import styles from './SchduledJobStyle';
import Toast from 'react-native-toast-message';
import Color, {dimensions} from '../../global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText';
import NoData from '../../Components/NoData';

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
import {
  getApiWithToken,
  requestPostApi,
  API_ENDPOINTS,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
const SchduledJobs = ({navigation, route}) => {
  {
    console.log('my params--->>>', route?.params?.status);
  }
  const dispatch = useDispatch();
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
  const [distance, setDistance] = useState('');
  const [isDistance, setISDistance] = useState('');

  const data = [
    {
      id: '1',
      job_id: '146',
      date: ' 05/14/2024',
      title: 'Cargo Logistics',
      distance: '25 Miles',
      job_type: 'Logistic Delivery',
      client_name: 'Sophia Phillips',
    },
    {
      id: '2',
      job_id: '146',
      date: ' 05/14/2024',
      title: 'Cargo Logistics',
      distance: '25 Miles',
      job_type: 'Logistic Delivery',
      client_name: 'Sophia Phillips',
    },
    {
      id: '3',
      job_id: '146',
      date: ' 05/14/2024',
      title: 'Cargo Logistics',
      distance: '25 Miles',
      job_type: 'Logistic Delivery',
      client_name: 'Sophia Phillips',
    },
  ];
  React.useEffect(() => {
    // console.log({API_ENDPOINTS})
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset all the states when the screen gains focus
      setDistance('');
      setFilterDate('');
      setIsDate(false);
      setISDistance(false);
      setSearchText('');
      if (
        filterDate === '' &&
        isDate === false &&
        distance === '' &&
        searchText === ''
      ) {
        console.log('All filters are reset');
        // Trigger any additional effects or UI updates here
      }
    });

    return unsubscribe; // Unsubscribe from navigation event on unmount
    searchText === '';
  }, [navigation, filterDate, isDate, distance]);

  // Trigger getCartCount only after filterDate and other states are reset
  React.useEffect(() => {
    if (
      filterDate === '' &&
      !isDate &&
      !isDistance &&
      distance === '' &&
      searchText === ''
    ) {
      getCartCount();
    }
  }, [filterDate, isDate, distance, searchText]);
  //get job details
  console.log('my filtered date--->>>', filterDate);
  const getCartCount = async () => {
    console.log('function called after searchText', searchText);

    setLoading(true);

    let url = API_ENDPOINTS?.SCHDULE_JOB;
    let queryParams = [];

    // Add job_date if filterDate is provided
    if (filterDate !== '') {
      queryParams.push(`job_date=${moment(filterDate).format('YYYY-MM-DD')}`);
    }

    // Add job_name if searchText is provided
    if (searchText && searchText.trim() !== '') {
      queryParams.push(`job_name=${searchText}`);
    }

    // Add max_distance if distance is provided
    if (distance) {
      queryParams.push(`max_distance=${distance}`); // No need to manually add the &
    }

    // If there are any query parameters, join them with & and prepend with ?
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }

    console.log('Final URL:', url); // Log final URL

    try {
      const resp = await getApiWithToken(userToken, url);
      console.log('Full API response:', resp); // Log full response
      if (resp?.data?.status) {
        console.log('Scheduled jobs data:', resp?.data?.data);
        setOrder(resp?.data?.data);
        setShowFilter(false);
      } else {
        console.log('Error in response:', resp?.data?.message);
        setalert_sms(resp?.data?.message || 'Failed to get schedule jobs');
        setMy_Alert(true);
      }
    } catch (error) {
      console.log('Error in getCartCount:', error);
      setalert_sms(error.message || 'Something went wrong');
      setMy_Alert(true);
    } finally {
      setLoading(false);
    }
  };

  const getCartCountWithUpdatedDistance = async newDistance => {
    setShowSkelton(true);
    let url = API_ENDPOINTS?.SCHDULE_JOB;
    let queryParams = [];

    // Add job_date if filterDate is provided
    if (filterDate !== '') {
      queryParams.push(`job_date=${moment(filterDate).format('YYYY-MM-DD')}`);
    }

    // Add job_name if searchText is provided
    if (searchText !== '') {
      queryParams.push(`job_name=${searchText}`);
    }
    if (newDistance) {
      queryParams.push(`&max_distance=${newDistance}`);
    }
    // If there are any query parameters, join them with & and prepend with ?
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
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
  const handleSearch = text => {
    setSearchText(text);
    let url = `all-jobs?status=3`;

    // If the search text is not empty, append it to the URL
    if (text !== '') {
      url += `&job_name=${encodeURIComponent(text)}`;
    }

    // Call getCartCount or your API fetching function with the updated URL
    getCartCount(url); // Ensure getCartCount accepts a URL or uses the proper fetching logic
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

  ///start end job
  const startJob = async item => {
    {
      console.log('my start jon item when clicked--->>>', item);
    }
    try {
      setLoading(true);
      const data = {
        job_id: item?.id,
        job_start: item?.job_date,
      };
      console.log('Requesting login with data:', data, API_ENDPOINTS.START_JOB);
      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS.START_JOB,
        data,
        'POST',
        userToken,
      );
      console.log('log for start shift', responseJson?.status);
      if (responseJson?.status) {
        console.log('start job status detaill--->>>', responseJson?.data);
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
    console.log('render upcoming class=------>>', item.title);

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
    setFilterDate(''); // Assuming you have a state for filter date
    setIsDate(false); // Reset date selection if applicable
    setDistance(false);
    setSearchText('');
    getCartCount();
    // getProductDetails();
  };
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

  return (
    <>
      <View style={{flex: 1, backgroundColor: Color.PRIMARY}}>
        <MyHeader Title={'Scheduled Jobs'} isBorderRadius={true} />
        {/* <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(212, 229, 240, 1)']}
          style={{
            flex: 1,
            zIndex: -1,
            width: dimensions.SCREEN_WIDTH * 0.99,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
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
                  handleSearch(text); // Function to handle search based on text
                }} // Assuming you have a state for handling the input
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
            {console.log('jkjkjkjk--->>>', date)}
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
                    setFilterDate(''); // Clears the filter date
                    setIsDate(false); // Resets the date flag
                    setDistance('');
                  }}>
                  <Image
                    source={require('../../assest/images/trash.png')}
                    style={{height: 16, width: 16, marginLeft: 12}}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {isDistance !== '' ? (
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
                  {`${distance} KM`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDistance('');
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
            {order?.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={order}
                renderItem={renderStudentList}
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
            ) : (
              <NoData></NoData>
            )}
          </View>
        </View>
        {/* </LinearGradient> */}
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
            {route?.params?.status !== '2' ? (
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
              onConfirm={date => {
                setOpen(false);
                setDate(date);

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
                filterDate && setIsDate(true); // navigation.navigate('BottomTab');
                distance && setISDistance(true);
                getCartCount();
                setShowFilter(false);
              }}
              style={{marginTop: 20}}>
              <CustomButtonBlue name="Apply"></CustomButtonBlue>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('BottomTab');
                setIsDate(false);
                setISDistance(false);
                setShowFilter(false);
                setDistance('');
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
      {loading ? <Loader /> : null}
    </>
  );
};

export default SchduledJobs;
