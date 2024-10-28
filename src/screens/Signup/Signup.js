import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomHeader from '../../Components/CustomHeader';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomTextBox from '../../Components/CustomTextBox';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const Signup = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const [placeholderColor, setPlaceholderColor] = useState('grey');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCurriculum, setSelectedCurriculum] = useState(
    'Driver License State',
  );
  const dropdownRef = useRef();
  const cirriculum = ['History', 'English', 'Economics'];
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
  const handleCurriculumSelect = (index, value) => {
    console.log('Selected curriculum index:', index);
    console.log('Selected curriculum value:', value);
    setSelectedCurriculum(value);
  };
  const handleDayPress = day => {
    setSelectedDate(new Date(day.timestamp));
    setIsCalendarOpen(false);
  };
  return (
    // <View style={styles.container}>
    //   <ImageBackground
    //     source={require('../../assest/images/background.png')}
    //     style={{
    //       height: dimensions.SCREEN_HEIGHT,
    //       width: dimensions.SCREEN_WIDTH,
    //       alignSelf: 'center',
    //       marginTop: 100,
    //     }}
    //     resizeMode="cover">
    //     <CustomHeader navigation={navigation} text="sign up" />

    //     <ScrollView
    //       contentContainerStyle={{
    //         marginTop: 90,
    //         alignItems: 'center',
    //       }}
    //       showsVerticalScrollIndicator={false}>
    //       <MyText
    //         text="sign up"
    //         fontWeight="700"
    //         fontSize={30}
    //         textColor={Color.PRIMARY}
    //         fontFamily="Roboto"
    //         style={{fontWeight: '700', alignSelf: 'center', marginTop: 10}}
    //       />
    //       <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
    //         <CustomTextBox
    //           imageComponent={
    //             <Image
    //               source={require('../../assest/images/user.png')}
    //               style={styles.iconImg}
    //             />
    //           }
    //           placeholder={'Name'}
    //         />
    //       </View>
    //       <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
    //         <CustomTextBox
    //           imageComponent={
    //             <Image
    //               source={require('../../assest/images/sms.png')}
    //               style={styles.iconImg}
    //             />
    //           }
    //           placeholder={'Email Address'}
    //         />
    //       </View>
    //       <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
    //         <CustomTextBox
    //           imageComponent={
    //             <Image
    //               source={require('../../assest/images/sms.png')}
    //               style={styles.iconImg}
    //             />
    //           }
    //           placeholder={'Phone'}
    //         />
    //       </View>
    //       <View
    //         style={{
    //           marginTop: 18,
    //           width: dimensions.SCREEN_WIDTH * 0.9,
    //         }}>
    //         <View style={[styles.dropDownView, {paddingHorizontal: 19}]}>
    //           <ModalDropdown
    //             options={cirriculum}
    //             onSelect={handleCurriculumSelect}
    //             renderRow={rowData => (
    //               <Text style={{padding: 10, color: 'black'}}>{rowData}</Text>
    //             )} // Assuming each curriculum object has a 'name' property
    //             style={styles.dropdown}
    //             textStyle={[styles.dropdownText, {color: placeholderColor}]}
    //             dropdownStyle={styles.dropdownList}>
    //             <View style={{flexDirection: 'row'}}>
    //               <Image
    //                 source={require('../../assest/images/eye.png')}
    //                 style={styles.iconImg}></Image>
    //               <Text
    //                 style={[
    //                   styles.dropdownText,
    //                   {color: placeholderColor, marginLeft: 7},
    //                 ]}>
    //                 {selectedCurriculum}
    //               </Text>
    //             </View>
    //           </ModalDropdown>
    //           <Image
    //             source={require('../../assest/images/arrowdown.png')}
    //             style={[styles.iconImg, {marginRight: 7}]}></Image>
    //         </View>
    //       </View>
    //       <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
    //         <CustomTextBox
    //           imageComponent={
    //             <Image
    //               source={require('../../assest/images/license.png')}
    //               style={styles.iconImg}
    //             />
    //           }
    //           placeholder={'Driver License Number'}
    //         />
    //       </View>
    //       <View style={{marginTop: 12, width: dimensions.SCREEN_WIDTH * 0.9}}>
    //         <CustomTextBox
    //           imageComponent={
    //             <Image
    //               source={require('../../assest/images/lock.png')}
    //               style={styles.iconImg}
    //             />
    //           }
    //           placeholder="New Password"
    //           secureTextEntry={true}
    //           style={{color: 'black', backgroundColor: 'red'}}
    //           placeholderTextColor="black"
    //         />
    //       </View>
    //       <View style={{marginTop: 12, width: dimensions.SCREEN_WIDTH * 0.9}}>
    //         <CustomTextBox
    //           imageComponent={
    //             <Image
    //               source={require('../../assest/images/lock.png')}
    //               style={styles.iconImg}
    //             />
    //           }
    //           placeholder="Confirm Password"
    //           secureTextEntry={true}
    //           style={{color: 'black', backgroundColor: 'red'}}
    //           placeholderTextColor="black"
    //         />
    //       </View>
    //       {/* <TouchableOpacity
    //         onPress={() => {
    //           console.log('did i reach here');
    //           navigation.navigate('ForgotPassword');
    //         }}
    //         style={{marginTop: 8}}>
    //         <MyText
    //           text="Forgot Password?"
    //           fontWeight="normal"
    //           fontSize={12}
    //           textColor={Color.PRIMARY}
    //           fontFamily="Roboto"
    //           style={{
    //             fontWeight: '400',
    //             textAlign: 'right',
    //             marginVertical: 13,
    //           }}
    //         />
    //       </TouchableOpacity> */}

    //       <TouchableOpacity onPress={() => {}} style={{marginTop: 20}}>
    //         <CustomButtonBlue name="Signin" />
    //       </TouchableOpacity>

    //       <View
    //         style={{
    //           alignSelf: 'center',
    //           marginTop: 20,
    //           flexDirection: 'row',
    //         }}>
    //         <Text style={styles.myText}>Don’t have an account?</Text>
    //         <TouchableOpacity
    //           onPress={() => {
    //             navigation.navigate('Signup');
    //           }}>
    //           <Text style={[styles.myText, {color: Color.PRIMARY}]}>
    //             {' '}
    //             Signup
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </ScrollView>
    //   </ImageBackground>
    // </View>
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assest/images/background.png')}
        style={{
          height: dimensions.SCREEN_HEIGHT,
          width: dimensions.SCREEN_WIDTH,
          alignSelf: 'center',
        }}
        resizeMode="cover">
        <CustomHeader navigation={navigation} text="sign up" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 20, // To ensure there's space to scroll to the last item
            }}
            showsVerticalScrollIndicator={false}>
            <MyText
              text="sign up"
              fontWeight="700"
              fontSize={30}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{fontWeight: '700', alignSelf: 'center', marginTop: 90}} // Adjusted marginTop
            />
            <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
              <CustomTextBox
                imageComponent={
                  <Image
                    source={require('../../assest/images/user.png')}
                    style={styles.iconImg}
                  />
                }
                placeholder={'Name'}
              />
            </View>
            <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
              <CustomTextBox
                imageComponent={
                  <Image
                    source={require('../../assest/images/sms.png')}
                    style={styles.iconImg}
                  />
                }
                placeholder={'Email Address'}
              />
            </View>
            <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
              <CustomTextBox
                imageComponent={
                  <Image
                    source={require('../../assest/images/sms.png')}
                    style={styles.iconImg}
                  />
                }
                placeholder={'Phone'}
              />
            </View>
            <View
              style={{
                marginTop: 18,
                width: dimensions.SCREEN_WIDTH * 0.9,
              }}>
              <View style={[styles.dropDownView, {paddingHorizontal: 19}]}>
                <ModalDropdown
                  options={cirriculum}
                  onSelect={handleCurriculumSelect}
                  renderRow={rowData => (
                    <Text style={{padding: 10, color: 'black'}}>{rowData}</Text>
                  )} // Assuming each curriculum object has a 'name' property
                  style={styles.dropdown}
                  textStyle={[styles.dropdownText, {color: placeholderColor}]}
                  dropdownStyle={styles.dropdownList}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assest/images/eye.png')}
                      style={styles.iconImg}></Image>
                    <Text
                      style={[
                        styles.dropdownText,
                        {color: placeholderColor, marginLeft: 7},
                      ]}>
                      {selectedCurriculum}
                    </Text>
                  </View>
                </ModalDropdown>
                <Image
                  source={require('../../assest/images/arrowdown.png')}
                  style={[styles.iconImg, {marginRight: 7}]}></Image>
              </View>
            </View>

            <View style={{marginTop: 18, width: dimensions.SCREEN_WIDTH * 0.9}}>
              <CustomTextBox
                imageComponent={
                  <Image
                    source={require('../../assest/images/license.png')}
                    style={styles.iconImg}
                  />
                }
                placeholder={'Driver License Number'}
              />
            </View>
            <View
              style={{
                marginTop: 18,
                width: dimensions.SCREEN_WIDTH * 0.9,
              }}>
              <TouchableOpacity
                style={[
                  styles.dropDownView,
                  {paddingHorizontal: 19, justifyContent: 'flex-start'},
                ]}
                onPress={() => setIsCalendarOpen(true)}>
                <Image
                  source={require('../../assest/images/calendar.png')}
                  style={styles.iconImg}></Image>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#898993',
                    marginLeft: 4,
                  }}>
                  {selectedDate
                    ? moment(selectedDate).format('YYYY-MM-DD')
                    : 'driver'}
                </Text>
              </TouchableOpacity>
              {isCalendarOpen && (
                <Calendar
                  style={styles.calendar}
                  theme={calendarTheme}
                  onDayPress={handleDayPress}
                  minDate={new Date()}
                  markedDates={{
                    [moment(selectedDate).format('YYYY-MM-DD')]: {
                      selected: true,
                      disableTouchEvent: true,
                    },
                  }}
                />
              )}
            </View>
            <View
              style={{
                marginTop: 18,
                width: dimensions.SCREEN_WIDTH * 0.9,
              }}>
              <TouchableOpacity
                style={[
                  styles.dropDownView,
                  {paddingHorizontal: 19, justifyContent: 'space-between'},
                ]}
                onPress={() => {}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../assest/images/gallery.png')}
                    style={styles.iconImg}></Image>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#898993',
                      marginLeft: 4,
                      top: 3,
                    }}>
                    {'Driver License Photo'}
                  </Text>
                </View>
                <Image
                  source={require('../../assest/images/export.png')}
                  style={[styles.iconImg, {}]}></Image>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 12, width: dimensions.SCREEN_WIDTH * 0.9}}>
              <CustomTextBox
                imageComponent={
                  <Image
                    source={require('../../assest/images/lock.png')}
                    style={styles.iconImg}
                  />
                }
                placeholder="New Password"
                secureTextEntry={true}
                style={{color: 'black', backgroundColor: 'red'}}
                placeholderTextColor="black"
              />
            </View>
            <View style={{marginTop: 12, width: dimensions.SCREEN_WIDTH * 0.9}}>
              <CustomTextBox
                imageComponent={
                  <Image
                    source={require('../../assest/images/lock.png')}
                    style={styles.iconImg}
                  />
                }
                placeholder="Confirm Password"
                secureTextEntry={true}
                style={{color: 'black', backgroundColor: 'red'}}
                placeholderTextColor="black"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AccountSucces');
              }}
              style={{marginTop: 20}}>
              <CustomButtonBlue name="Sign Up" />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.PRIMARY,
  },
  logoImg: {
    width: dimensions.SCREEN_WIDTH * 0.8,
    height: 149,
    resizeMode: 'contain',

    alignSelf: 'center',
  },
  iconImg: {
    height: 24,
    width: 24,
  },
  dropDownView: {
    width: dimensions.SCREEN_WIDTH * 0.88,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: 12,
    marginBottom: 20,
    borderRadius: 5,
  },
  dropdownTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: dimensions.SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  dropdownTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: dimensions.SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  dropDownView: {
    width: dimensions.SCREEN_WIDTH * 0.88,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: 12,
    marginBottom: 20,
    borderRadius: 5,
  },
  dropdown: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
  },
  dropdownText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '500',
  },
  dropdownList: {
    width: '80%',
    // Make sure this matches the width of dropDownView
    // color: 'black',
  },
  dropDownView: {
    // width: dimensions.SCREEN_WIDTH * 0.88,
    // marginVertical: 10,
    // backgroundColor: 'red',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center', // Center contents
    alignItems: 'center',
    borderRadius: 5, // This should match the borderRadius of the shadow
    width: '100%',
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#959FA6', // Adjust the border color as needed
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  dropdown: {
    width: '100%',
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black', // Ensure the selected text color is black
  },
  dropdownList: {
    width: '87%',
    alignSelf: 'center', // Make sure this matches the width of dropDownView
  },
  dropdownRow: {
    backgroundColor: 'white', // Ensure the background color is white
    padding: 10,
  },
  dropdownRowText: {
    color: 'black', // Ensure the dropdown list text color is black
  },
});
const calendarTheme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e',
};
export default Signup;
