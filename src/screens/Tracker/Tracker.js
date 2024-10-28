import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';
import React, {useState, useRef, useEffect} from 'react';
import {dimensions} from '../../global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../Components/Loader';
import MyAlert from '../../global/MyAlert';
import SkeletonContainer from '../../Components/Skelton/SkeletonContainer';
// // import HomeHeaderComponent from '../../components/HomeHeaderComponent';
// import {useSelector, useDispatch} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setLoading, saveUserResult} from '../../redux/actions/user_action';
// import Loader from '../../WebApi/Loader';
// import MyAlert from '../../components/MyAlert';
// import Datepicker from '../../components/Datepicker';
import {
  getApiWithToken,
  // CHECK_IN,
  requestPostApi,
  // GET_CHECKIN,
  // START_BREAK,
  // END_BREAK,
  API_ENDPOINTS,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   baseUrl,
//   country,
//   DateOfWeek,
//   city,
//   update_status,
//   home,
//   update_profile,
//   register,
//   requestGetApi,
//   requestPostApi,
// } from '../../WebApi/Service';
import Color from '../../global/Color';
// CHECK_IN;
import MyText from '../../Components/MyText';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const Tracker = ({props, navigation}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);

  const [DATA2, setDATA2] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const [click1, setclick1] = useState('Mon');
  //   const dispatch = useDispatch();
  //   const user = useSelector(state => state.user.user_details);
  const [DATA, setDATA] = useState([
    {
      service_name: 'Floor Cleaning',
      service_id: 94,
      admin_name: 'Admin',
      image:
        'https://nileprojects.in/clearchoice-janitorial/public/upload/services/66068e75b7f85.png',
      serviceScheduleEndDate: '2024-08-14',
      start: '2024-08-14 10:18:00',
      end: '2024-08-14 19:21:00',
      service_end_time: '07:21 PM',
      service_start_time: '10:18 AM',
      status: 'Scheduled',
      status_id: '',
      on_the_way_time: '',
      start_time: '',
      finish_time: '',
      service_image:
        'https://nileprojects.in/clearchoice-janitorial/public/upload/services/66068e75b7f85.png',
      client_id: '13',
      clientname: 'Joy smith',
      clientemail: 'Joy@yopmail.com',
      clientphone: '(685) 626-3168',
      address: '4321 West Flamingo Road, Las Vegas, NV, USA',
      lat: '36.1140617',
      long: '-115.1928992',
    },
  ]);
  const [searchValue, setSearchValue] = useState('');
  const [edit, setedit] = useState(false);
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [buttonText, setButtonText] = useState('START BREAK');
  const [loading, setLoading] = useState(false);
  const [lod, setlod] = useState(false);
  const [opendateModal, setopenDateModal] = useState(false);
  const [dob, setdob] = useState(new Date());
  const [breakId, setBreakId] = useState('');
  console.log('my breakId---->>>', breakId);
  const [dobplace, setdobplace] = useState('Birth Date (mm/dd/yyyy)');
  const [lode, setlode] = useState(true);
  const [date, setDate] = useState(new Date());
  const [displaydate, setdisplaydate] = useState('Choose Date');
  const [filter, setfilter] = useState(true);
  const [shiftStarted, setShiftStarted] = useState(false);
  const [shiftEnd, setShifEndTime] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [currentBreak, setCurrentBreak] = useState(null);
  const [isShiftEnded, setIsShiftEned] = useState(false);
  const [isShiftStarted, setIsShiftStarted] = useState(false);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [showSkelton, setShowSkelton] = useState(false);
  const [shiftEndTime, setShiftEndTime] = useState(null);
  const [shiftStatus, setShiftStatus] = useState('');
  const [totalHours, setTotlaHours] = useState('');
  const [attandanceId, setAttandanceId] = useState('');
  const [breaks, setBreaks] = useState([]);
  const handleStartShift = () => {
    if (!shiftStarted) {
      setShiftStarted(true);
      setCurrentBreak(null);
    }
  };

  const handleStartBreak = () => {
    if (shiftStarted && !currentBreak) {
      const newBreak = {startTime: new Date(), endTime: null};
      setCurrentBreak(newBreak);
    }
  };
  useEffect(() => {
    if (breakId) {
      console.log('Break ID updated:', breakId);
    }
  }, [breakId]);
  const handleEndBreak = () => {
    if (currentBreak) {
      const updatedBreak = {...currentBreak, endTime: new Date()};
      setBreaks([...breaks, updatedBreak]);
      setCurrentBreak(null);
    }
  };

  const handleBeginButtonClick = () => {
    if (!isShiftStarted) {
      setShiftStartTime(new Date());
      setIsShiftStarted(true);
    } else if (!isBreakStarted) {
      // Start a new break
      setIsBreakStarted(true);
      setBreaks([...breaks, {startTime: new Date()}]);
    }
  };

  const handleEndButtonClick = () => {
    if (isBreakStarted) {
      // End the current break
      const updatedBreaks = breaks.map((breakItem, index) =>
        index === breaks.length - 1
          ? {...breakItem, endTime: new Date()}
          : breakItem,
      );
      setBreaks(updatedBreaks);
      setIsBreakStarted(false);
    } else if (isShiftStarted) {
      setShiftEndTime(new Date());
      setIsShiftStarted(false);
    }
  };

  ////to start and end the shift
  const LoginPressed = async item => {
    try {
      console.log('my loginPressed');
      setLoading(true);
      const data = {
        shift: 'start',
        date_time: item,
      };
      console.log('Requesting logon preesed to statt shift:', data);

      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS.CHECK_IN,
        data,
        'POST',
        userToken,
      );
      console.log('log for start shift', responseJson?.status);
      if (responseJson?.status === 'true') {
        if (!isShiftStarted) {
          setShiftStartTime(responseJson?.data?.shift_start);

          setIsShiftStarted(true);
          getCartCount();
        } else if (responseJson?.data?.driver_breaks.length > 0) {
          console.log(
            'my driver break for trafcker console',
            JSON.stringify(responseJson?.data?.driver_breaks),
          );
          // Start a new break
          setBreaks(responseJson?.data?.driver_breaks);
          setIsBreakStarted(true);
        }
      } else {
        console.error(' for tracker failure:', responseJson);
        // setalert_sms(responseJson.message);
        Toast.show({text1: responseJson.message});
        // setMy_Alert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('HomeScreen');
  };
  const shiftEnded = async item => {
    {
      console.log('my shift ended function calleddd');
    }
    try {
      console.log('my loginPressed');
      setLoading(true);
      const data = {
        shift: 'end',
        date_time: item,
      };
      console.log('Requesting login with data:', data);

      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS.CHECK_IN,
        data,
        'POST',
        userToken,
      );
      console.log('log for start shift', responseJson?.status);
      if (responseJson?.status === 'true') {
        setShifEndTime(responseJson?.data?.shift_start);
        setIsShiftStarted(true);
        setIsShiftEned(true);
        getCartCount();
      } else {
        console.error(' for tracker failure:', responseJson);
        Toast.show({text1: responseJson.message});
        // setalert_sms(responseJson.message);
        // setMy_Alert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('HomeScreen');
  };
  /////to start and end the break
  const BreakStarted = async item => {
    console.log('my break started function started', item);
    try {
      setLoading(true);
      const data = {
        attendance_id: attandanceId,
        start_time: item,
      };
      console.log('Requesting break start with data:', data);
      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS.START_BREAK,
        data,
        'POST',
        userToken,
      );
      console.log('API response:', responseJson);
      if (responseJson?.status === 'true') {
        const breakDataId = responseJson?.data?.break_data?.id;
        if (breakDataId) {
          console.log('Break ID from API:', breakDataId);
          setBreakId(breakDataId);
        }
        console.log('my break has been ended function');
        getCartCount();
        // if (!isShiftStarted) {
        //   setIsBreakStarted(true);
        //   getCartCount();
        // } else if (!isBreakStarted) {
        //   getCartCount();
        //   setIsBreakStarted(true);
        // }
      } else {
        console.error('Break start failed:', responseJson);
        // setalert_sms(responseJson.message);
        // setMy_Alert(true);
        Toast.show({text1: responseJson.message});
      }
    } catch (error) {
      console.error('Error during break start:', error);
    } finally {
      setLoading(false);
    }
  };

  ///to end the break
  const BreakEnded = async item => {
    try {
      console.log('my loginPressed');
      setLoading(true);
      const data = {
        break_id: breakId,
        end_time: item,
      };
      console.log('Requesting login with data:', data);
      const {responseJson, err} = await requestPostApi(
        API_ENDPOINTS.END_BREAK,
        data,
        'POST',
        userToken,
      );
      console.log('log for BreakStarted', responseJson?.data?.break_data?.id);
      if (responseJson?.status === 'true') {
        // if (!isShiftStarted) {
        //   // setIsBreakStarted(true);
        //   getCartCount();
        // } else if (!isBreakStarted) {
        //   // Start a new break
        //   // setBreaks(prevBreaks => [...prevBreaks, {startTime: new Date()}]);
        //   getCartCount();
        //   // setIsBreakStarted(true);

        //   return;
        // }
        getCartCount();
        setBreaks([...responseJson?.data?.break_data]);
      } else {
        console.error('Login failed:', responseJson);
        // setalert_sms(responseJson.message);
        // setMy_Alert(true);
        Toast.show({text1: responseJson.message});
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('HomeScreen');
  };

  React.useEffect(() => {
    setShowSkelton(true);
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  ////get attandance records
  // const getCartCount = async () => {
  //   console.log('function called for get trackerjkjkjk');
  //   setLoading(true);
  //   try {
  //     const resp = await getApiWithToken(userToken, GET_CHECKIN);

  //     if (resp?.data?.status) {
  //       const data = resp?.data?.data;
  //       console.log(
  //         'my shidfttt total_hour',
  //         resp?.data?.on_duty,
  //         resp?.data?.total_hour,
  //       );
  //       if (data.length === 0) {
  //         // No data available
  //         setAttendance(data);
  //       } else {
  //         // Handle shift start
  //         if (data?.shift_start) {
  //           console.log('Shift started for yuyuyu attendance id:', data);
  //           setAttandanceId(data?.id);
  //           setShiftStatus(resp?.data?.on_duty);
  //           setTotlaHours(resp?.data?.total_hour);
  //           setShiftStartTime(data?.shift_start);
  //           setIsShiftStarted(true);
  //         } else {
  //           console.log('Shift has not started yet.');
  //           setIsShiftStarted(false);
  //         }
  //         // Handle breaks
  //         {
  //           console.log('my driver breaks--->>>', data);
  //         }
  //         if (data?.driver_breaks?.length > 0) {
  //           const lastBreak =
  //             data?.driver_breaks[data.driver_breaks.length - 1];
  //           {
  //             console.log('my last break--->>>', lastBreak);
  //           }
  //           if (lastBreak?.break_end) {
  //             {
  //               console.log(
  //                 'my break encded tracker inside if block6767',
  //                 ...data?.driver_breaks,
  //               );
  //             }
  //             // Last break has ended, add it to the breaks state
  //             setIsBreakStarted(false);
  //             setBreaks([...data?.driver_breaks]);
  //           } else {
  //             // Break is ongoing
  //             setIsBreakStarted(true);
  //             {
  //               console.log('my break started--->', data?.driver_breaks);
  //             }
  //             setBreaks([...data?.driver_breaks]);
  //           }
  //         } else {
  //           // No breaks have started
  //           setIsBreakStarted(false);
  //         }
  //         if (data?.shift_end) {
  //           console.log('Shift started:', data?.shift_end);

  //           setShifEndTime(data?.shift_end);
  //           setIsShiftEned(true);
  //         } else {
  //           console.log('Shift has not started yet.');
  //         }
  //       }
  //     } else {
  //       console.log('Error occurred, check your login status.');
  //       console.log('Error message:', resp.message);
  //       // setalert_sms(resp.message);
  //       // setMy_Alert(true);
  //     }
  //   } catch (error) {
  //     console.log('Error in getCartCount:', error);
  //   }
  //   setLoading(false);
  // };
  const getCartCount = async () => {
    console.log('function called for get trackerjkjkjk');
    loading && !showSkelton && setShowSkelton(true);

    // setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, API_ENDPOINTS.GET_CHECKIN);

      if (resp?.data?.status) {
        const data = resp?.data?.data;
        console.log(
          'my shidfttt total_hour',
          resp?.data?.on_duty,
          resp?.data?.total_hour,
        );
        if (data.length === 0) {
          // No data available
          setAttendance(data);
        } else {
          // Handle shift start
          if (data?.shift_start) {
            console.log('Shift started for yuyuyu attendance id:', data);
            setAttandanceId(data?.id);
            setShiftStatus(resp?.data?.on_duty);
            setTotlaHours(resp?.data?.total_hour);
            setShiftStartTime(data?.shift_start);
            setIsShiftStarted(true);
          } else {
            console.log('Shift has not started yet.');
            setIsShiftStarted(false);
          }

          // Handle breaks
          if (data?.driver_breaks?.length > 0) {
            const lastBreak =
              data?.driver_breaks[data.driver_breaks.length - 1];
            console.log('my last break--->>>', lastBreak);

            // Check if the break has ended or is ongoing
            if (lastBreak?.break_end) {
              console.log(
                'my break ended tracker inside if block6767',
                ...data?.driver_breaks,
              );
              // Last break has ended, add it to the breaks state
              setIsBreakStarted(false);
              setBreaks([...data?.driver_breaks]);
            } else {
              // Break is ongoing
              console.log('my break started--->', data?.driver_breaks);
              setIsBreakStarted(true);
              setBreaks([...data?.driver_breaks]);
            }

            // Store the most recent break ID
            setBreakId(lastBreak?.id); // Store the id of the last break
          } else {
            // No breaks have started
            setIsBreakStarted(false);
          }

          if (data?.shift_end) {
            console.log('Shift ended:', data?.shift_end);
            setShifEndTime(data?.shift_end);
            setIsShiftEned(true);
          } else {
            console.log('Shift has not started yet.');
          }
        }
      } else {
        console.log('Error occurred, check your login status.');
        console.log('Error message:', resp.message);
      }
    } catch (error) {
      console.log('Error in getCartCount:', error);
    }
    setShowSkelton(false);
    // setLoading(false);
  };

  return (
    <>
      <View
        style={{
          width: dimensions.SCREEN_WIDTH,
          backgroundColor: Color.PRIMARY,
        }}>
        <MyHeader Title={'Time Keeping'} isBorderRadius={true} />
      </View>

      {opendateModal ? (
        <View
          style={{
            backgroundColor: '#fff',
            zIndex: 999,
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}>
          <View
            style={{
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setopenDateModal(false);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // getHome(date, 'date');
                setclick1(date);
                setshowdate(false);
                setopenDateModal(false);
              }}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        </View>
      ) : null}

      <View style={{flex: 1, marginTop: 16}}>
        <ScrollView style={{flex: 1}}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(212, 229, 240, 1)']}
            style={{
              height: dimensions.SCREEN_HEIGHT,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              flex: 1,
            }}>
            {/* Image at the Top */}

            {/* Status and Time */}
            {showSkelton ? (
              <>
                {console.log('showskelton----<<<<', showSkelton)}
                <SkeletonContainer></SkeletonContainer>
              </>
            ) : (
              <>
                <Image
                  source={require('../../assest/images/trakerImg.png')}
                  style={{
                    width: 79,
                    height: 80,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginTop: 40,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: dimensions.SCREEN_WIDTH * 0.8,
                    alignSelf: 'center',
                    marginVertical: 12,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assest/images/shiftStatus.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                        marginTop: 4,
                        marginRight: 12,
                      }}
                    />
                    <View>
                      <MyText
                        text={'Shift Status'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.dark_gray}
                        style={{fontWeight: '400'}}
                      />
                      {console.log('mu shift statts--??', shiftStatus)}
                      <MyText
                        text={`${shiftStatus ? 'On-Shift' : 'Off-Shift'}`}
                        fontFamily="regular"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{fontWeight: '400'}}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assest/images/currentTime.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                        marginTop: 4,
                        marginRight: 12,
                      }}
                    />
                    <View>
                      <MyText
                        text={'Total Hours Worked'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.dark_gray}
                        style={{fontWeight: '400'}}
                      />
                      {console.log('my worked totalHours-->>', totalHours)}
                      <MyText
                        text={`${totalHours === '' ? '0 hours' : totalHours}`}
                        fontFamily="regular"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{fontWeight: '400'}}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: dimensions.SCREEN_WIDTH,
                    paddingHorizontal: 12,
                  }}>
                  {/* Button to start shift or break */}
                  {isShiftEnded === false ? (
                    // <TouchableOpacity
                    //   onPress={() => {
                    //     const currentTime = moment().local(); // Get the current time in ISO format
                    //     const rrr = moment(new Date()).format(
                    //       'YYYY-MM-DD HH:mm:ss',
                    //     );

                    //     if (!isShiftStarted) {
                    //       // If the shift hasn't started, call the LoginPressed function and pass the current time
                    //       LoginPressed(rrr);
                    //     } else {
                    //       // If the shift has already started, call the BreakStarted function and pass the current time
                    //       BreakStarted(rrr);
                    //     }
                    //   }}
                    //   style={{
                    //     backgroundColor: Color.PRIMARY,
                    //     padding: 15,
                    //     borderRadius: 10,
                    //     alignItems: 'center',
                    //     marginTop: 20,
                    //     marginRight: 10, // Adds space between the buttons
                    //     flex: 1,
                    //   }}>
                    //   <MyText
                    //     text={!isShiftStarted ? 'BEGIN SHIFT' : 'BEGIN BREAK'}
                    //     fontFamily="Roboto"
                    //     fontSize={16}
                    //     textColor={'#fff'}
                    //     style={{fontWeight: '600'}}
                    //   />
                    // </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        const currentTime = moment().local(); // Get the current time in ISO format
                        const rrr = moment(new Date()).format(
                          'YYYY-MM-DD HH:mm:ss',
                        );

                        if (!isShiftStarted) {
                          // If the shift hasn't started, call the LoginPressed function and pass the current time
                          LoginPressed(rrr);
                        } else {
                          // If the shift has already started, call the BreakStarted function and pass the current time
                          BreakStarted(rrr);
                        }
                      }}
                      disabled={isBreakStarted} // Disable the button if isBreakStarted is true
                      style={{
                        backgroundColor: isBreakStarted
                          ? Color.DARK_GREY
                          : Color.PRIMARY, // Change color when disabled
                        opacity: isBreakStarted ? 0.6 : 1, // Reduce opacity when disabled
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 20,
                        marginRight: 10,
                        flex: 1,
                      }}>
                      <MyText
                        text={!isShiftStarted ? 'BEGIN SHIFT' : 'BEGIN BREAK'}
                        fontFamily="Roboto"
                        fontSize={16}
                        textColor={'#fff'}
                        style={{fontWeight: '600'}}
                      />
                    </TouchableOpacity>
                  ) : null}

                  {/* Button to end shift or break */}
                  {isShiftEnded === false ? (
                    <TouchableOpacity
                      onPress={() => {
                        const currentTime = moment().local();
                        const rrr = moment(new Date()).format(
                          'YYYY-MM-DD HH:mm:ss',
                        );
                        if (!isBreakStarted) {
                          {
                            console.log('did it come in if condition');
                          }
                          // If the shift hasn't started, call the LoginPressed function
                          shiftEnded(rrr);
                        } else {
                          {
                            console.log('it cpme in else condition');
                          }
                          // If the shift has already started, call the BreakStarted function with 'start' as an argument
                          BreakEnded(rrr);
                        }
                      }}
                      style={{
                        backgroundColor: Color.PRIMARY,
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 20,
                        flex: 1,
                      }}>
                      <MyText
                        text={!isBreakStarted ? 'END SHIFT' : 'END BREAK'}
                        fontFamily="Roboto"
                        fontSize={16}
                        textColor={'#fff'}
                        style={{fontWeight: '600'}}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <View style={{padding: 20}}>
                  {/* Display shift start time */}
                  {shiftStartTime && (
                    <View
                      style={{
                        width: dimensions.SCREEN_WIDTH * 0.91,
                        height: 60,
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 10,
                        shadowColor: '#000000',
                        shadowOffset: {width: 0, height: 8},
                        shadowOpacity: 0.05,
                        shadowRadius: 13,
                        borderLeftWidth: 1,
                        borderLeftColor: Color.PRIMARY,
                        elevation: 13,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <MyText
                        text={'Shift Started: '}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#000000'}
                        style={{alignSelf: 'center', fontWeight: '500'}}
                      />
                      <MyText
                        text={moment(shiftStartTime).format('hh:mm A')} // Ensure shiftStartTime is converted to a moment object
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{alignSelf: 'center', fontWeight: '500'}}
                      />
                    </View>
                  )}

                  {/* Display each break */}
                  {console.log('my breaks for item--->>', breaks)}
                  {breaks.map((breakItem, index) => (
                    <>
                      <View
                        key={index}
                        style={{
                          width: dimensions.SCREEN_WIDTH * 0.91,
                          height: 60,
                          backgroundColor: '#fff',
                          padding: 20,
                          borderRadius: 10,
                          shadowColor: '#000000',
                          shadowOffset: {width: 0, height: 8},
                          shadowOpacity: 0.05,
                          shadowRadius: 13,
                          borderLeftWidth: 1,
                          borderLeftColor: Color.PRIMARY,
                          elevation: 13,
                          alignSelf: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        {console.log(
                          'my data for breaksss for start--->>',
                          breakItem?.breakItem?.break_start,
                        )}
                        <MyText
                          text={`Break  Started:`}
                          fontFamily="Roboto"
                          fontSize={14}
                          textColor={'#000000'}
                          style={{alignSelf: 'center', fontWeight: '500'}}
                        />

                        <MyText
                          text={moment(breakItem?.break_start).format(
                            'hh:mm A',
                          )}
                          fontFamily="Roboto"
                          fontSize={14}
                          textColor={Color.PRIMARY}
                          style={{alignSelf: 'center', fontWeight: '500'}}
                        />
                      </View>
                      {breakItem.break_end !== null && (
                        <View
                          key={index}
                          style={{
                            width: dimensions.SCREEN_WIDTH * 0.91,
                            height: 60,
                            backgroundColor: '#fff',
                            padding: 20,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            shadowOffset: {width: 0, height: 8},
                            shadowOpacity: 0.05,
                            shadowRadius: 13,
                            borderLeftWidth: 1,
                            borderLeftColor: Color.PRIMARY,
                            elevation: 13,
                            alignSelf: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          {console.log(
                            'my data for breaksss for start--->>',
                            breakItem?.breakItem?.break_start,
                          )}

                          {console.log('klkl breakItem.break_end', breakItem)}
                          {breakItem.break_end !== null && (
                            <MyText
                              text={`Break Ended:`}
                              fontFamily="Roboto"
                              fontSize={14}
                              textColor={'#000000'}
                              style={{alignSelf: 'center', fontWeight: '500'}}
                            />
                          )}
                          <MyText
                            text={moment(breakItem.break_end).format('hh:mm A')}
                            fontFamily="Roboto"
                            fontSize={14}
                            textColor={Color.PRIMARY}
                            style={{alignSelf: 'center', fontWeight: '500'}}
                          />
                        </View>
                      )}
                    </>
                  ))}

                  {/* Display shift end time */}
                  {shiftEnd && (
                    <View
                      style={{
                        width: dimensions.SCREEN_WIDTH * 0.91,
                        height: 60,
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 10,
                        shadowColor: '#000000',
                        shadowOffset: {width: 0, height: 8},
                        shadowOpacity: 0.05,
                        shadowRadius: 13,
                        borderLeftWidth: 1,
                        borderLeftColor: Color.PRIMARY,
                        elevation: 13,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <MyText
                        text={'Shift Ended: '}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#000000'}
                        style={{alignSelf: 'center', fontWeight: '500'}}
                      />
                      <MyText
                        text={moment(shiftEnd).format('hh:mm A')}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{alignSelf: 'center', fontWeight: '500'}}
                      />
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    height: 50,
                    backgroundColor: Color.PRIMARY,
                    borderRadius: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginVertical: 20,
                  }}
                  onPress={() => {
                    navigation.navigate('BottomTab');
                  }}>
                  <MyText
                    text={'Go to home'}
                    fontFamily="Roboto"
                    fontSize={14}
                    textColor={Color.WHITE}
                    style={{alignSelf: 'center', fontWeight: '700'}}
                  />
                </TouchableOpacity>
              </>
            )}
          </LinearGradient>
        </ScrollView>
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
export default Tracker;
