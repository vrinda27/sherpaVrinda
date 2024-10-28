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
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyHeader from '../../Components/MyHeader/MyHeader';
import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import Loader from '../../Components/Loader';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomHeader from '../../Components/CustomHeader';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomTextBox from '../../Components/CustomTextBox';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import SkeletonContainer from '../../Components/Skelton/SkeletonContainer';
import {
  getApiWithToken,
  API_ENDPOINTS,
  GET_PROFILE,
  UPDATE_PROFILE,
  requestPostApi,
  BASE_URL,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MyAlert from '../../global/MyAlert';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import userIcon from '../../assest/images/account.png';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const EditProfile = ({navigation}) => {
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('my userInfo---->>', userInfo);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [animating, setAnimating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [placeholderColor, setPlaceholderColor] = useState('grey');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profile, setProfile] = useState({});
  const [My_Alert, setMy_Alert] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dlState, setdlState] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState(
    'Driver License State',
  );
  const dropdownRef = useRef();
  const cirriculum = ['History', 'English', 'Economics'];
  const [alert_sms, setalert_sms] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [showSkelton, setShowSkelton] = useState(false);
  const [updatedProfileImage, setUpdatedProfileImage] = React.useState(null);

  React.useEffect(() => {
    setShowSkelton(true);
    const unsubscribe = navigation.addListener('focus', () => {
      // setLoading(true);
      getCartCount();
      // setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: responsiveHeight(10),
      height: responsiveHeight(10),
      cropping: true,
    })
      .then(image => {
        setUpdatedProfileImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error: ', error);
      });
  };

  const getCartCount = async () => {
    loading && !showSkelton && setShowSkelton(true);

    setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, API_ENDPOINTS.GET_PROFILE);
      console.log('get profile after sucees---->', resp?.data);
      if (resp?.data?.status) {
        // console.log(
        //   'get home afer success---->',
        //   resp?.data?.driver?.profile_image_url,
        // );
        setUpdatedProfileImage(resp?.data?.driver?.profile_image_url);
        setProfile(resp?.data?.driver);
        setFirstName(resp?.data?.driver?.first_name);
        setLastName(resp?.data?.driver?.last_name);
        // setMyCourses(resp?.data?.data);
      } else {
        console.log('login????????? come in catck block');

        console.log('the err of login==>>', responseJson.message);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setShowSkelton(false);
    setLoading(false);
  };
  const startJob = async item => {
    {
      console.log('my start jon item when clicked--->>>');
    }
    try {
      setLoading(true);
      const formData = new FormData();
      const currentImage = updatedProfileImage
        ? updatedProfileImage
        : userInfo?.profile_image_url;
      const temp = currentImage?.split('.');
      const _temp = temp[temp.length - 2]?.split('/');
      const profileName = _temp[_temp.length - 1];
      const data = {
        first_name: firstname,
        last_name: lastname,
        dl_number: userInfo?.dl_number,
        phone: userInfo?.mobile_phone,
        dl_expiration: userInfo?.dl_expiration,
        dl_state: userInfo?.dl_state,
        image: {
          uri: currentImage || '',
          name: profileName || '',
          type: `image/${
            currentImage?.split('.')[currentImage?.split('.')?.length - 1]
          }`,
        },
      };

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === 'image') {
            const {uri, name, type} = data.image;
            formData.append('image', {
              uri,
              name: name || 'image.jpg',
              type: type || 'image/jpeg',
            });
          } else {
            formData.append(key, data[key]);
          }
        }
      }
      fetch(`${BASE_URL + API_ENDPOINTS.UPDATE_PROFILE}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response?.json())
        .then(result => {
          if (result?.status) {
            Toast.show({type: 'success', text1: result?.message});
          } else {
            setalert_sms(result.message);
            setMy_Alert(true);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('HomeScreen');
  };
  const handleCurriculumSelect = (index, value) => {
    console.log('Selected curriculum index:', index);
    console.log('Selected curriculum value:', value);
    setSelectedCurriculum(value);
  };
  const handleDayPress = day => {
    setSelectedDate(new Date(day.timestamp));
    setIsCalendarOpen(false);
  };
console.log('profile?.mobile_phone',profile?.mobile_phone)
  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <MyHeader
          Title={'Edit Profile'}
          isBorderRadius={true}
          isBackButton={true}
          IsNotificationIcon={false}
        />
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}></ScrollView> */}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}>
              {showSkelton ? (
                <>
                  {console.log('showskelton----<<<<', showSkelton)}
                  <SkeletonContainer></SkeletonContainer>
                </>
              ) : (
                <>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <View style={{marginBottom: responsiveHeight(2)}}>
                      <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.7}
                        style={{
                          position: 'relative',
                          alignSelf: 'center',
                          height: responsiveHeight(14),
                          width: responsiveHeight(14),
                          borderRadius: responsiveHeight(7),
                        }}>
                        <Image
                          source={{
                            uri: updatedProfileImage
                              ? updatedProfileImage
                              : Image.resolveAssetSource(userIcon)?.uri,
                          }}
                          style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: responsiveHeight(7),
                            overflow: 'hidden',
                          }}
                          resizeMode="contain"
                        />
                        <Image
                          source={require('../../assest/images/edit.png')}
                          style={{
                            position: 'absolute',
                            bottom: responsiveHeight(2),
                            right: responsiveHeight(0),
                            height: responsiveHeight(2),
                            width: responsiveHeight(2),
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/user.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={firstname}
                      onChangeText={text => {
                        setFirstName(text);
                      }}
                      placeholder={'First name'}
                      editable={true}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/user.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={lastname}
                      onChangeText={text => {
                        setLastName(text);
                      }}
                      placeholder={'Last name'}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/sms.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={profile?.email}
                      onChangeText={text => {
                        setEmail(text);
                      }}
                      placeholder={'Email Address'}
                      editable={false}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/user.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={profile?.username}
                      onChangeText={text => {
                        setUserName(text);
                      }}
                      editable={false}
                      placeholder={'Username'}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/sms.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={profile?.mobile_phone}
                      onChangeText={text => {
                        setPhone(text);
                      }}
                      editable={false}
                      placeholder={'Phone number'}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/license.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={profile?.dl_number}
                      onChangeText={text => {
                        setDlNumber(text);
                      }}
                      editable={false}
                      placeholder={'Dl Number'}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <CustomTextBox
                      imageComponent={
                        <Image
                          source={require('../../assest/images/license.png')}
                          style={styles.iconImg}
                        />
                      }
                      value={profile?.dl_state}
                      onChangeText={text => {
                        setdlState(text);
                      }}
                      editable={false}
                      placeholder={'DL State'}
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
                      ]}>
                      <Image
                        source={require('../../assest/images/calendar.png')}
                        style={styles.iconImg}></Image>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#898993',
                          marginLeft: 4,
                        }}>
                        {profile?.dl_expiration
                          ? moment(profile?.dl_expiration).format('MM-DD-YYYY')
                          : 'DL Expiry Date'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginTop: 18,
                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.dropDownView,
                        {
                          paddingHorizontal: 19,
                          justifyContent: 'space-between',
                        },
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
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',

                      width: dimensions.SCREEN_WIDTH * 0.9,
                    }}>
                    {profile?.driver_license_photos?.map(photo => (
                      <Image
                        key={photo.id}
                        source={{uri: photo.full_image_url}}
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 10,
                          borderRadius: 6,
                          marginTop: 12,
                        }} // Adjust the size and spacing as needed
                        resizeMode="cover"
                      />
                    ))}
                  </View>

                  <TouchableOpacity
                    disabled={loading}
                    onPress={() => {
                      // navigation.navigate('Profile');\
                      startJob();
                    }}
                    style={{marginTop: 20, marginBottom: 20}}>
                    <CustomButtonBlue name="Update Profile" />
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
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
      {/* {loading ? <Loader /> : null} */}
    </>
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
export default EditProfile;
