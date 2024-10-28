import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useState, useRef, useEffect} from 'react';
import {Table, TableWrapper, Row} from 'react-native-table-component';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../Components/Loader';
import MyAlert from '../global/MyAlert';
// import {Mycolors, dimensions} from '../global/Utils';
// import Datepicker from '../../components/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {
//   baseUrl,
//   service_timecard,
//   timesheet_request,
//   ChatService_list,
//   update_status,
//   home,
//   update_profile,
//   register,
//   requestGetApi,
//   requestPostApi,
// } from '../../WebApi/Service';
import Color, {dimensions} from '../global/Color';
import {
  FONTS,
  FONTS_SIZE,
  myHeight,
  heightScale,
  widthScale,
} from '../global/Utils';

import DropDownPicker from 'react-native-dropdown-picker';
import MyHeader from '../Components/MyHeader/MyHeader';
import {startOfMonth, endOfMonth, addDays, format} from 'date-fns';
import SkeletonContainer from '../Components/Skelton/SkeletonContainer';
import {
  getApiWithToken,
  HOME,
  postApiWithToken,
  LOGOUT,
  API_ENDPOINTS,
} from '../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import NoData from '../Components/NoData';
const TimeCard = props => {
  const userToken = useSelector(state => state.user.userToken);
  console.log('my userTokennnn---->>>', userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [DATA2, setDATA2] = useState([
    {
      id: '1',
      title5: 'Pay Period', //// intially when no data is there
      title6: 'kkkkk' + '-' + 'lkll',
    },
    {
      id: '2',
      title5: 'Team Member Name',
      title6: 'lkllklll',
    },
  ]);

  const [tableHead, settableHead] = useState([
    'DATE',
    'SERVICE NAME',
    'IN',
    'OUT',
    'TOTAL',
  ]);
  const [widthArr, setwidthArr] = useState([100, 100, 100, 100, 100]);

  const [totalHours, settotalHours] = useState('');
  const [rateSelected, setrateSelected] = useState('');
  const [rateSelected1, setrateSelected1] = useState('');
  const state = this.state;
  const [click1, setclick1] = useState('Mon');
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const [DATA, setDATA] = useState([]);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [lod, setlod] = useState(false);
  const [tabledataarray, settabledataarray] = useState([]);
  {
    console.log('ioio tabledataarray---', tabledataarray);
  }
  const [opendateModal, setopenDateModal] = useState(false);
  const [dob, setdob] = useState(new Date());
  const [lode, setlode] = useState(true);
  const [date, setDate] = useState(new Date());
  const [sdate, setsDate] = useState(new Date());
  const [sdisplaydate, setsdisplaydate] = useState('');
  const [sApidate, setsApidate] = useState('');
  const [edate, seteDate] = useState(new Date());
  const [edisplaydate, setedisplaydate] = useState('');
  const [eApidate, seteApidate] = useState('');
  const [opendateModal2, setopenDateModal2] = useState(false);
  const [genderopen, setgenderOpen] = useState(false);
  const [gendervalue, setgenderValue] = useState(null);
  const [genderitems, setgenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const [durationopen, setdurationOpen] = useState(false);
  const [durationvalue, setdurationValue] = useState(null);
  const [durationvaluedata, setdurationValuedata] = useState(null);
  const [durationitems, setdurationItems] = useState([
    {label: ' ', value: ' '},
  ]);

  const [monthopen, setmonthOpen] = useState(false);
  const [monthvalue, setmonthValue] = useState(null);
  const [monthitems, setmonthItems] = useState([
    {label: 'January', value: '01'},
    {label: 'February', value: '02'},
    {label: 'March', value: '03'},
    {label: 'April', value: '04'},
    {label: 'May', value: '05'},
    {label: 'June', value: '06'},
    {label: 'July', value: '07'},
    {label: 'August', value: '08'},
    {label: 'September', value: '09'},
    {label: 'October', value: '10'},
    {label: 'November		', value: '11'},
    {label: 'December', value: '12'},
  ]);
  const [showSkelton, setShowSkelton] = useState(false);
  const [yearopen, setyearOpen] = useState(false);
  const currentYear = new Date().getFullYear(); // Get the current year

  const [yearvalue, setyearValue] = useState(currentYear);
  const [yearitems, setyearItems] = useState([{label: 'Jan', value: '01'}]);

  const [clickeditem, setclickeditem] = useState('');
  const [seletedtime, setseletedtime] = useState('');
  const [timeModel, settimeModel] = useState(false);
  const [cellIndex, setcellIndex] = useState('');
  const [clickedDate, setclickedDate] = useState('');
  const [totalHour, setTotalHours] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));
  const [totalDays, setTotalDays] = useState('');
  const [workingHour, setWorkingHour] = useState('');
  const [avgHour, setAverageHour] = useState('');
  const [selectedMonthValue, setSelectedMonthValue] = useState(() => {
    const currentMonthIndex = new Date().getMonth(); // Get current month index
    return currentMonthIndex + 1; // Return current month value (1-12)
  });

  const [selectedMonthLabel, setSelectedMonthLabel] = useState(() => {
    const currentMonthIndex = new Date().getMonth(); // Get current month index
    return monthitems[currentMonthIndex].label; // Return current month label
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push({label: `${i}`, value: i});
    }
    return years;
  };

  const handleSelectDate = (from, yea, mon) => {
    var startmonth = '';
    var endmonth = '';
    var newDate = '';
    if (from == 'month') {
      const selectedDate = new Date(yea, mon - 1);
      startmonth = startOfMonth(selectedDate);
      endmonth = endOfMonth(selectedDate);
      newDate = addDays(startmonth, 14);
    } else {
      startmonth = startOfMonth(new Date());
      endmonth = endOfMonth(new Date());
      newDate = addDays(startmonth, 14);
    }

    var mm = startmonth.toString().substring(4, 7);
    var dd = startmonth.toString().substring(8, 10);
    var yy = startmonth.toString().substring(11, 15);
    var mydate = displaydateformates(mm, dd, yy);
    var myApidate = dateformates(mm, dd, yy);

    var emm = newDate.toString().substring(4, 7);
    var edd = newDate.toString().substring(8, 10);
    var eyy = newDate.toString().substring(11, 15);
    var emydate = displaydateformates(emm, edd, eyy);
    var emyApidate = dateformates(emm, edd, eyy);

    var emydate1 = displaydateformates(emm, +edd + 1, eyy);
    var emyApidate1 = dateformates(emm, +edd + 1, eyy);

    var lmm = endmonth.toString().substring(4, 7);
    var ldd = endmonth.toString().substring(8, 10);
    var lyy = endmonth.toString().substring(11, 15);
    var lmydate = displaydateformates(lmm, ldd, lyy);
    var lmyApidate = dateformates(lmm, ldd, lyy);
    var itm = [
      {
        label: mydate + ' To ' + emydate,
        value: myApidate,
        endDatas: emyApidate,
        startdats: myApidate,
      },
      {
        label: emydate1 + ' To ' + lmydate,
        value: lmyApidate,
        endDatas: lmyApidate,
        startdats: emyApidate1,
      },
    ];
    setdurationItems(itm);
    // setSelectedDate(newDate);
  };

  const getDaysInMonth = (month, year) => {
    // Create a date object using the next month, but set the day to 0 to get the last day of the current month.
    return new Date(year, month, 0).getDate();
  };

  const myfun = async ddd => {
    console.log('my data from my fun--->>>', ddd);
    const currentYear = new Date().getFullYear();

    // Find out how many days the selected month has
    const daysInMonth = getDaysInMonth(monthvalue, currentYear);
    console.log(`Selected month ${monthvalue} has ${daysInMonth} days`);

    // Set the table headers and column widths
    settableHead([
      'DATE',
      'SHIFT START',
      'SHIFT END',
      'TOTAL WORKING HOURS',
      'TOTAL SHIFT DURATION',
      'TOTAL BREAK DURATION',
    ]);
    setwidthArr([100, 100, 100, 150, 150, 150]);

    var tablenumber = [];
    var tabledata = [];

    // Loop through the timesheet data to build rows (for a month, not weekly)
    for (let i = 0; i < ddd.length; i += 1) {
      const timesheetData = ddd[i]; // Assuming timesheet data has shift details
      {
        console.log('timesheetData:', timesheetData);
      }

      // Create a row with data for each shift
      const rowdata = [
        {label: timesheetData.date},
        {label: timesheetData.shift_start},
        {label: timesheetData.shift_end},
        {label: timesheetData.total_working_hours},
        {label: timesheetData.total_shift_duration},
        {label: timesheetData.total_break_duration},
      ];

      // Add row to table data
      tabledata.push(rowdata);
    }

    // Add the collected table data to the tablenumber array
    tablenumber.push({tablesData: tabledata});

    // Set the table data array
    settabledataarray(tablenumber);
  };

  useEffect(() => {
    // handleSelectDate('useefect', '', '');
    setShowSkelton(true);
    const currentYear = new Date().getFullYear();
    setyearValue(currentYear);
    getCartCount(undefined, undefined);
    // getHome();
    // setlod(!lod);
    // handleCurrentDate();

    // var currentDate = new Date();
    // var startd = subtractDays(currentDate, 15);
    // setsDate(startd);
  }, []);

  ///my table contents
  // const getCartCount = async (value, year) => {
  //   {
  //     console.log('my get cart coint i called', value);
  //   }
  //   loading && !showSkelton && setShowSkelton(true);
  //   {
  //     console.log(
  //       'my year valuee---->>>',
  //       yearvalue,
  //       monthvalue,
  //       value,
  //       selectedItem,
  //     );
  //   }
  //   {
  //     console.log(
  //       'opop ytytytyyyy---->>>',
  //       value === undefined ? selectedItem : value,
  //     );
  //   }
  //   var url = MONTHLY_ATTANDANCE;
  //   var murl = `?year=${year === undefined ? yearvalue : year}&month=${
  //     value === undefined ? selectedItem : value
  //   }`;
  //   url = url + murl;
  //   {
  //     console.log('my url for the tim ecard screen---->>>>', url);
  //   }
  //   // setLoading(true);
  //   try {
  //     let resp;

  //     try {
  //       // Wrapping the API call in a separate try-catch
  //       resp = await getApiWithToken(userToken, url);
  //       {
  //         console.log('klkl get apiu with tokennnn--->>>', url);
  //       }
  //     } catch (apiError) {
  //       console.error('Error during API call:', apiError);
  //       throw new Error('Failed to fetch data from the server.');
  //     }

  //     // Log the entire response to check its structure
  //     console.log(
  //       'Response from API -for totjkjjl-->>>',
  //       resp?.data?.data?.total_working_day,
  //     );
  //     setDATA(resp?.data?.data?.dates);
  //     myfun(resp?.data?.data?.dates);
  //     setTotalHours(resp?.data?.data?.total_working_day);
  //     // Check if the response is undefined or null
  //     if (!resp) {
  //       console.error('Response is undefined or null');
  //       Toast.show({text1: 'Failed to fetch data from the server.'});
  //       return;
  //     }

  //     // Check if the response has a data property
  //     if (resp?.data?.status) {
  //       console.log('get home after time card---->', resp.data.data);
  //       // setHome(resp?.data?.data);
  //       // setShiftStatus(resp?.data?.data?.on_duty);

  //       // setMyCourses(resp.data.data);
  //     } else {
  //       Toast.show({
  //         text1: resp?.data?.message || 'An unexpected error occurred.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error in getCartCount:', error);
  //     Toast.show({text1: 'An error occurred. Please try again later.'});
  //   } finally {
  //     setShowSkelton(false);
  //     // setLoading(false);
  //   }
  // };

  //loader
  const getCartCount = async (value, year) => {
    console.log('getCartCount called with:', value);

    // Ensure skeleton loader runs before making the API call
    if (!loading && !showSkelton) {
      setShowSkelton(true);
      // setLoading(true); // Optional, if you're using a loading state
    }

    console.log(
      'Year value:',
      yearvalue,
      'Month value:',
      monthvalue,
      'Selected value:',
      value,
    );

    const selectedMonth = value === undefined ? selectedMonthValue : value;
    const selectedYear = year === undefined ? yearvalue : year;

    const url = `${API_ENDPOINTS?.MONTHLY_ATTANDANCE}?year=${selectedYear}&month=${selectedMonth}`;
    console.log('API URL:', url);

    try {
      // Attempt the API call
      const resp = await getApiWithToken(userToken, url);
      console.log('API Response:', resp);

      if (!resp) {
        console.error('API response is undefined or null');
        Toast.show({text1: 'Failed to fetch data from the server.'});
        return;
      }

      if (resp?.data?.status) {
        // Handle success case
        console.log('API Data:', resp.data.data);
        setDATA(resp.data.data.dates);
        myfun(resp.data.data.dates);
        setTotalHours(resp.data.data.total_working_day);
        setTotalDays(resp.data.data?.total_working_day);
        setWorkingHour(resp.data.data?.total_working_hours);
        setAverageHour(resp.data.data?.average_working_hours);
      } else {
        // Handle error case
        Toast.show({
          text1: resp?.data?.message || 'An unexpected error occurred.',
        });
      }
    } catch (error) {
      console.error('Error in getCartCount:', error);
      // Toast.show({text1: 'An error occurred. Please try again later.'});
    } finally {
      // Ensure the skeleton stops when the API finishes
      setShowSkelton(false);
      // setLoading(false); // Optional, to reset the loading state
    }
  };

  const displaydateformates = (month, day, year) => {
    if (month == 'Jan') {
      return '01-' + day + '-' + year;
    } else if (month == 'Feb') {
      return '02-' + day + '-' + year;
    } else if (month == 'Mar') {
      return '03-' + day + '-' + year;
    } else if (month == 'Apr') {
      return '04-' + day + '-' + year;
    } else if (month == 'May') {
      return '05-' + day + '-' + year;
    } else if (month == 'Jun') {
      return '06-' + day + '-' + year;
    } else if (month == 'Jul') {
      return '07-' + day + '-' + year;
    } else if (month == 'Aug') {
      return '08-' + day + '-' + year;
    } else if (month == 'Sep') {
      return '09-' + day + '-' + year;
    } else if (month == 'Oct') {
      return '10-' + day + '-' + year;
    } else if (month == 'Nov') {
      return '11-' + day + '-' + year;
    } else if (month == 'Dec') {
      return '12-' + day + '-' + year;
    }
  };
  const dateformates = (month, day, year) => {
    if (month == 'Jan') {
      return year + '-01-' + day;
    } else if (month == 'Feb') {
      return year + '-02-' + day;
    } else if (month == 'Mar') {
      return year + '-03-' + day;
    } else if (month == 'Apr') {
      return year + '-04-' + day;
    } else if (month == 'May') {
      return year + '-05-' + day;
    } else if (month == 'Jun') {
      return year + '-06-' + day;
    } else if (month == 'Jul') {
      return year + '-07-' + day;
    } else if (month == 'Aug') {
      return year + '-08-' + day;
    } else if (month == 'Sep') {
      return year + '-09-' + day;
    } else if (month == 'Oct') {
      return year + '-10-' + day;
    } else if (month == 'Nov') {
      return year + '-11-' + day;
    } else if (month == 'Dec') {
      return year + '-12-' + day;
    }
  };
  const monthformates = month => {
    if (month == 'Jan') {
      return '01';
    } else if (month == 'Feb') {
      return '02';
    } else if (month == 'Mar') {
      return '03';
    } else if (month == 'Apr') {
      return '04';
    } else if (month == 'May') {
      return '05';
    } else if (month == 'Jun') {
      return '06';
    } else if (month == 'Jul') {
      return '07';
    } else if (month == 'Aug') {
      return '08';
    } else if (month == 'Sep') {
      return '09';
    } else if (month == 'Oct') {
      return '10';
    } else if (month == 'Nov') {
      return '11';
    } else if (month == 'Dec') {
      return '12';
    }
  };
  const subtractDays = (date, days) => {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() - days);
    return resultDate;
  };

  const editcheckCurrect = () => {
    if (!DATA.timesheet_submitted) {
      var startd = new Date();
      var mm = startd.toString().substring(4, 7); //jan
      var dd = startd.toString().substring(8, 10);
      var yy = startd.toString().substring(11, 15);
      var newmm = monthformates(mm);
      var currentstartmonth = startOfMonth(startd);
      var currentmonth = endOfMonth(startd);
      var currentmonth = addDays(currentstartmonth, 14);
      //privious month data
      const priviousdate = new Date(yy, parseInt(newmm - 2), '01');
      var pmm = priviousdate.toString().substring(4, 7);
      var pdd = priviousdate.toString().substring(8, 10);
      var pyy = priviousdate.toString().substring(11, 15);
      var pnewmm = monthformates(pmm);
      var priviousstartmonth = startOfMonth(priviousdate);
      var priviousendmonth = endOfMonth(priviousdate);
      var m = parseInt(newmm - 2);
      const halfmonth = new Date(yy, m, 16);
      var privioushalfmonth = addDays(priviousstartmonth, 14);
      //selected month data
      // var durationEndDate = durationvaluedata.endDatas; //2024-04-01
      // var edate = durationEndDate.substring(8, 10);
      if (yearvalue == yy) {
        if (
          (monthvalue != null && newmm == monthvalue) ||
          (monthvalue == pnewmm && edate > 15)
        ) {
          if (monthvalue == pnewmm && dd < 15 && edate > 15) {
            //action
            return true;
          } else if (monthvalue == newmm && dd > 15 && edate == 15) {
            // action
            return true;
          } else if (monthvalue == newmm) {
            // action
            return true;
          } else {
            //no action
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  /////render/dropD
  const renderDropdownItem = (option, index, isSelected) => (
    <TouchableOpacity onPress={() => handleSelectItem(index, option)}>
      <Text style={{padding: 10}}>{option}</Text>
    </TouchableOpacity>
  );
  const handleSelectItem = (index, value) => {
    {
      console.log('mu selevted month-->>', index, value);
    }
    setSelectedMonthValue(index + 1); // Update value state
    setSelectedMonthLabel(value); // Update label state
    // Trigger any necessary updates here

    dropdownRef.current && dropdownRef.current.hide();

    getCartCount(index + 1, undefined);

    // Close dropdown after selection
  };
  const handleSelectYear = (index, value) => {
    console.log('Year changed:', value); // value is now the selected year
    getCartCount(undefined, value.value); // Pass the selected year to the getCartCount function
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.PRIMARY
        }}>
        <MyHeader Title={'Timecard'} isBorderRadius={true} />
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
          <ScrollView style={{zIndex: -999}}>
            {showSkelton ? (
              <>
                {console.log('showskelton----<<<<', showSkelton)}
                <SkeletonContainer></SkeletonContainer>
              </>
            ) : (
              <>
                <View
                  style={{
                    width: '94%',
                    alignSelf: 'center',
                    zIndex: 999,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '48%',
                      alignSelf: 'center',
                      zIndex: 999,
                      marginTop: 15,
                      shadowColor: '#000',
                      backgroundColor: '#fff',
                      borderRadius: widthScale(5),
                      shadowOffset: {width: 1, height: 1},
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                      elevation: 3,
                      borderWidth: 0.5,
                      borderColor: Color.primary_white,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        width: '100%',
                      }}>
                      {/* <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'stretch',
                  marginRight: 5,
                }}
                
                source={require('../../assets/images/Icons/yearsCalender.png')}></Image> */}
                      {console.log(
                        'my selected values--->>>',
                        yearvalue,
                        selectedMonthValue,
                      )}
                      <DropDownPicker
                        open={yearopen}
                        value={yearvalue}
                        items={generateYears()}
                        setOpen={setyearOpen}
                        setValue={setyearValue}
                        setItems={setyearItems}
                        // onSelectItem={(index, value) => {
                        //   handleSelectYear(index, value); // Update selected item
                        // }}
                        onSelectItem={item => {
                          handleSelectYear(null, item); // Pass selected year value directly
                        }}
                        placeholder="Year"
                        placeholderStyle={{
                          color: Color.grey,
                          fontSize: 11,
                          fontFamily: FONTS.regular,
                        }}
                        containerStyle={{
                          width: '75%',
                        }}
                        style={{
                          borderColor: 'transparent',
                          // borderRadius: widthScale(5),
                          // borderWidth: 0.5,
                          // borderColor: COLORS.primary_white,
                          // backgroundColor: '#fff',
                          width: '100%',
                          // alignSelf: 'center',
                          zIndex: 999,
                          // shadowColor: '#000',
                          // shadowOffset: {width: 1, height: 1},
                          // shadowOpacity: 0.4,
                          // shadowRadius: 2,
                          // elevation: 3,
                        }}
                        arrowIconStyle={{
                          display: 'none', // Hide the arrow icon
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      styles.dropDownView,
                      {
                        width: '48%',
                        alignSelf: 'center',
                        zIndex: 999,
                        marginTop: 15,
                        shadowColor: '#000',
                        backgroundColor: '#fff',
                        borderRadius: widthScale(5),
                        shadowOffset: {width: 1, height: 1},
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                        elevation: 3,
                        borderWidth: 0.5,
                        borderColor: Color.primary_white,
                        height: 50,
                      },
                    ]}>
                    <ModalDropdown
                      ref={dropdownRef}
                      options={monthitems.map(item => item.label)}
                      onSelect={index => {
                        const selectedMonth = monthitems[index]; // Get the full item object from monthitems using index
                        handleSelectItem(
                          selectedMonth.value,
                          selectedMonth.label,
                        ); // Pass both value and label to your handler
                      }}
                      renderRow={renderDropdownItem}
                      dropdownStyle={styles.customDropStyle}
                      onDropdownWillShow={() => setDropdownOpen(true)}
                      onDropdownWillHide={() => setDropdownOpen(false)}>
                      <View style={styles.dropdownTextView}>
                        <Text
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 12,
                            marginVertical: 15,
                            color: Color.BLACK,
                          }}>
                          {selectedMonthLabel || 'Select an option'}{' '}
                          {/* Use label state */}
                        </Text>
                        {/* <Image source={require('../../assest/Images/dropDown.png')} style={styles.dropDownImg}></Image> */}
                      </View>
                    </ModalDropdown>
                  </View>
                </View>

                <View style={{width: '96%', alignSelf: 'center', zIndex: -999}}>
                  <View
                    style={{
                      width: '98%',
                      borderRadius: 7,
                      alignSelf: 'center',
                      backgroundColor: '#fff',
                      shadowColor: '#000',
                      shadowRadius: 2,
                      shadowOpacity: 0.2,
                      elevation: 3,
                      marginTop: 20,
                    }}></View>
                  {DATA?.length > 0 ? (
                    <>
                      <View
                        style={{
                          width: '98%',
                          borderRadius: 7,
                          alignSelf: 'center',
                          backgroundColor: '#fff',
                          shadowColor: '#000',
                          shadowRadius: 2,
                          shadowOpacity: 0.2,
                          elevation: 3,
                          marginTop: 20,
                        }}>
                        {/* <View style={{marginTop: 10}}>
                  <FlatList
                    data={DATA}
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <View
                            style={{
                              alignSelf: 'center',
                              width: '90%',
                              paddingHorizontal: 10,
                            }}>
                            <Text
                              style={{
                                color: '#000',
                                fontWeight: '500',
                                fontSize: 12,
                              }}>
                              Week: {index + 1}
                            </Text>
                          </View>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#E7EAF1',
                              marginVertical: 10,
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '95%',
                              alignItems: 'center',
                              paddingHorizontal: 10,
                              alignSelf: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{width: '33%'}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '500',
                                  fontSize: 12,
                                }}>
                                Total hours
                              </Text>
                              <Text
                                style={{
                                  color: Color.red,
                                  fontWeight: '700',
                                  fontSize: 14,
                                  marginTop: 7,
                                }}>
                                {item.total_working_hours}
                              </Text>
                            </View>
                            <View style={{width: '33%'}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '500',
                                  fontSize: 12,
                                  textAlign: 'center',
                                }}>
                                Total Days Worked
                              </Text>
                              <Text
                                style={{
                                  color: Color.PRIMARY,
                                  fontWeight: '700',
                                  fontSize: 14,
                                  marginTop: 7,
                                  textAlign: 'center',
                                }}>
                                {item.total_days_worked}
                              </Text>
                            </View>
                            <View style={{width: '33%'}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '500',
                                  fontSize: 12,
                                  textAlign: 'right',
                                }}>
                                Average hours
                              </Text>
                              <Text
                                style={{
                                  color: Color.PRIMARY,
                                  fontWeight: '700',
                                  fontSize: 14,
                                  marginTop: 7,
                                  textAlign: 'right',
                                }}>
                                {item.avg_hours_in_week}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#E7EAF1',
                              marginVertical: 10,
                            }}
                          />
                        </>
                      );
                    }}
                  />
                </View> */}
                        <>
                          <View
                            style={{
                              alignSelf: 'center',
                              width: '90%',
                              paddingHorizontal: 10,
                            }}></View>
                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#E7EAF1',
                              marginVertical: 10,
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '95%',
                              alignItems: 'center',
                              paddingHorizontal: 10,
                              alignSelf: 'center',
                              justifyContent: 'space-between',

                              paddingVertical: 12,
                            }}>
                            {/* <View style={{width: '33%'}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '500',
                                  fontSize: 12,
                                }}>
                                Total hours
                              </Text>
                              <Text
                                style={{
                                  color: Color.red,
                                  fontWeight: '700',
                                  fontSize: 14,
                                  marginTop: 7,
                                }}>
                                {workingHour}
                              </Text>
                            </View> */}
                            <View style={{}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '500',
                                  fontSize: 12,
                                  textAlign: 'center',
                                }}>
                                Total Days Worked
                              </Text>
                              <Text
                                style={{
                                  color: Color.PRIMARY,
                                  fontWeight: '700',
                                  fontSize: 14,
                                  marginTop: 7,
                                  textAlign: 'center',
                                }}>
                                {totalDays}
                              </Text>
                            </View>
                            <View style={{}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: '500',
                                  fontSize: 12,
                                  textAlign: 'right',
                                }}>
                                Average hours
                              </Text>
                              <Text
                                style={{
                                  color: Color.PRIMARY,
                                  fontWeight: '700',
                                  fontSize: 14,
                                  marginTop: 7,
                                  textAlign: 'right',
                                }}>
                                {avgHour}
                              </Text>
                            </View>
                          </View>
                          {/* <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: '#E7EAF1',
                              marginVertical: 10,
                            }}
                          /> */}
                        </>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            width: '96%',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 20,
                            marginTop: 5,
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '600',
                              fontSize: 12,
                              marginLeft: 15,
                            }}>
                            TOTAL
                          </Text>
                          <Text
                            style={{
                              color: Color.PRIMARY,
                              fontWeight: '700',
                              fontSize: 15,
                              marginLeft: 13,
                            }}>
                            {'9'}
                          </Text>
                        </View> */}
                      </View>
                      {/* <View
                style={{
                  width: '92%',
                  alignSelf: 'center',
                  borderRadius: 8,
                  backgroundColor: '#426FB5',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  marginTop: 20,
                }}>

                <Text style={{color: '#fff', marginLeft: 10, width: '84%'}}>
                  1st Through the 15 Paid on the 22nd, 16th through the
                  30th/31st paid on the 7th
                </Text>
              </View> */}
                    </>
                  ) : (
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        marginLeft: 13,
                        textAlign: 'center',
                        marginTop: 20,
                      }}>
                      {}
                    </Text>
                  )}
                  {console.log('mu table array---->>>>', tabledataarray)}
                  {tabledataarray.length === 0 ||
                  (tabledataarray.length > 0 &&
                    tabledataarray[0].tablesData.length === 0) ? (
                    <View style={{alignSelf: 'center', marginBottom: 90}}>
                      <NoData></NoData>
                    </View>
                  ) : (
                    tabledataarray.map((data, index) => {
                      return (
                        <View
                          style={{
                            width: '98%',
                            borderRadius: 7,
                            alignSelf: 'center',
                            backgroundColor: '#fff',
                            shadowColor: '#000',
                            shadowRadius: 2,
                            shadowOpacity: 0.2,
                            elevation: 3,
                            marginTop: 20,
                          }}>
                          <View style={{}}>
                            <View style={styles.container}>
                              <ScrollView horizontal={true}>
                                <View>
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      borderColor: '#C1C0B9',
                                    }}>
                                    <Table>
                                      {/* borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }} */}
                                      <TableWrapper
                                        key={index}
                                        style={{flexDirection: 'row'}}>
                                        {[...tableHead].map(
                                          (cellData, cellIndex) => (
                                            <View
                                              style={{
                                                height: 40,
                                                width: 100,
                                                borderWidth: 0.5,
                                                borderColor: '#000',
                                                justifyContent: 'center',
                                              }}>
                                              <Text
                                                style={{
                                                  flexDirection: 'row',
                                                  width: 100,
                                                  textAlign: 'center',
                                                  fontWeight: 'bold',
                                                }}>
                                                {cellData != ''
                                                  ? cellData
                                                  : 'Ashish'}
                                              </Text>
                                            </View>
                                          ),
                                        )}
                                      </TableWrapper>
                                    </Table>
                                  </View>

                                  <ScrollView style={styles.dataWrapper}>
                                    <View
                                      style={{
                                        borderWidth: 1,
                                        borderColor: '#C1C0B9',
                                      }}>
                                      <Table>
                                        {data.tablesData.map(
                                          (rowData, index) => (
                                            <TableWrapper
                                              key={index}
                                              style={{flexDirection: 'row'}}>
                                              {rowData.map(
                                                (cellData, cellIndex) => (
                                                  <>
                                                    {cellIndex > 1 &&
                                                    cellIndex < 4 &&
                                                    editcheckCurrect() &&
                                                    !DATA.timesheet_submitted ? (
                                                      <TouchableOpacity
                                                        style={{
                                                          height: 40,
                                                          width: 100,
                                                          borderWidth: 0.5,
                                                          borderColor: '#000',
                                                          flexDirection: 'row',
                                                          alignItems: 'center',
                                                        }}
                                                        onPress={() => {
                                                          setclickeditem(
                                                            cellData,
                                                          );
                                                          setclickedDate(
                                                            rowData,
                                                          );
                                                          setcellIndex(
                                                            +cellIndex + 1,
                                                          );
                                                          settimeModel(true);
                                                        }}>
                                                        <Text
                                                          style={{
                                                            flexDirection:
                                                              'row',
                                                            width: 100,
                                                          }}>
                                                          {cellData.label}
                                                        </Text>
                                                      </TouchableOpacity>
                                                    ) : (
                                                      <View
                                                        style={{
                                                          height: 40,
                                                          width: 100,
                                                          borderWidth: 0.5,
                                                          borderColor: '#000',
                                                          justifyContent:
                                                            'center',
                                                        }}>
                                                        <Text
                                                          style={{
                                                            flexDirection:
                                                              'row',
                                                            width: 100,
                                                            textAlign: 'center',
                                                          }}>
                                                          {cellData.label}
                                                        </Text>
                                                      </View>
                                                    )}
                                                  </>
                                                ),
                                              )}
                                            </TableWrapper>
                                          ),
                                        )}
                                      </Table>
                                    </View>
                                  </ScrollView>
                                </View>
                              </ScrollView>
                            </View>
                          </View>

                          <View
                            style={{
                              width: '100%',
                              height: 50,
                              alignSelf: 'center',
                              borderBottomLeftRadius: 8,
                              borderBottomRightRadius: 8,
                              backgroundColor: '#426FB5',
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingVertical: 10,
                              marginTop: 20,
                              justifyContent: 'space-between',
                              paddingHorizontal: 20,
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 14,
                              }}>
                              TOTAL HOURS
                            </Text>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '600',
                                fontSize: 14,
                              }}>
                              {workingHour}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  )}
                </View>

                <View style={{width: 100, height: 100}} />
              </>
            )}
          </ScrollView>
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
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#fff'},
  text: {textAlign: 'center', fontWeight: '400', fontSize: 12},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#fff'},
  customDropStyle: {
    width: dimensions.SCREEN_WIDTH * 0.44,
    borderColor: Color.PRIMARY,
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius: 5,
    marginVertical: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
export default TimeCard;
