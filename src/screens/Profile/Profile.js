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
  ScrollView,
} from 'react-native';
import styles from './style';
import Color, {dimensions} from '../../global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText';
import SkeletonContainer from '../../Components/Skelton/SkeletonContainer';
import {logOutUser} from '../../reduxToolkit/reducer/user';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  getApiWithToken,
  HOME,
  postApiWithToken,
  LOGOUT,
  GET_PROFILE,
  API_ENDPOINTS,
} from '../../global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import MyAlert from '../../global/MyAlert';
import moment from 'moment';

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  // const userInfo = useSelector(state => state?.user)
  const [animating, setAnimating] = useState(true);
  const [isLocationModal, setLocationModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [showSkelton, setShowSkelton] = useState(false);
  const getCartCount = async () => {
    loading && !showSkelton && setShowSkelton(true);

    // setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, API_ENDPOINTS?.GET_PROFILE);
      if (resp?.data?.status) {
        setProfile(resp?.data?.driver);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setShowSkelton(false);
    // setLoading(false);
  };

  React.useEffect(() => {
    setShowSkelton(true);
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  const logout = async () => {
    setLoading(true);
    try {
      const resp = await postApiWithToken(userToken, API_ENDPOINTS?.LOGOUT, {});
      if (resp?.data?.status) {
        navigation.navigate('Signin');
        dispatch(logOutUser());
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.log('error in logout', error);
    }
    setLoading(false);
  };

  const passwordResetHandler = async () => {
    navigation.navigate('ResetPassword', {isPasswordReset: true});
    // try {
    //   const {response} = await postAPI(API_ENDPOINTS.FORGOT_PASSWORD, {
    //     email: userInfo?.userInfo?.email,
    //   });
    //   console.log('profile shoaib', response)
    //   if (response?.status) {
    //     navigation.navigate('ResetPasswordProfile');
    //   }
    // } catch (err) {
    //   console.log('err in sending otp', err);
    // }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.PRIMARY,
        }}>
        <MyHeader
          Title={'My Profile'}
          isBorderRadius={true}
          isBackButton={true}
          IsNotificationIcon={false}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                <SkeletonContainer></SkeletonContainer>
              </>
            ) : (
              <>
                <View style={{flex: 1, alignSelf: 'center'}}>
                  <Image
                    source={{uri: profile?.profile_image_url}}
                    style={[
                      styles.profileImg,
                      {borderRadius: 100, resizeMode: 'cover'},
                    ]}></Image>
                  {profile?.first_name && (
                    <MyText
                      text={`${profile?.first_name} ${profile?.last_name}`}
                      fontFamily="Qutfit"
                      fontSize={18}
                      textColor={Color.dark_gray}
                      style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        marginTop: 12,
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 22,
                    marginVertical: 22,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assest/images/call-calling.png')}
                      style={{width: 24, height: 24, marginTop: 5}}></Image>
                    <View style={{marginLeft: 6}}>
                      <MyText
                        text={'Phone'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.dark_gray}
                        style={{fontWeight: '400'}}
                      />
                      <MyText
                        text={`${profile?.phone}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../assest/images/sms-notification.png')}
                      style={{width: 24, height: 24, marginTop: 6}}></Image>
                    <View style={{marginLeft: 6}}>
                      <MyText
                        text={'Email'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={Color.dark_gray}
                        style={{fontWeight: '400'}}
                      />
                      <MyText
                        text={`${profile?.email}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.containerButton}>
                  <TouchableOpacity
                    style={styles.view1}
                    onPress={passwordResetHandler}>
                    <MyText
                      text={'Reset Password'}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.WHITE}
                      style={{textAlign: 'center', fontWeight: '700'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.view2}
                    onPress={() => {
                      navigation.navigate('EditProfile');
                    }}>
                    <MyText
                      text={'Edit Profile'}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.WHITE}
                      style={{textAlign: 'center', fontWeight: '700'}}
                    />
                    {/* Content for the second view */}
                  </TouchableOpacity>
                </View>

                <View style={styles.licenseInfo}>
                  <View style={styles.licenseBox}>
                    <MyText
                      text={'License  info.'}
                      fontFamily="Roboto"
                      fontSize={18}
                      textColor={Color.dark_gray}
                      style={{fontWeight: '500'}}
                    />
                  </View>
                  <MyText
                    text={`${profile?.dl_number}`}
                    fontFamily="Roboto"
                    fontSize={18}
                    textColor={Color.dark_gray}
                    style={{
                      fontWeight: '500',
                      marginHorizontal: 10,
                      marginVertical: 15,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 12,
                      marginTop: 3,
                      justifyContent: 'space-between',
                      width: dimensions.SCREEN_WIDTH * 0.6,
                    }}>
                    <View>
                      <MyText
                        text={'Expiry:'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                      <MyText
                        text={moment(
                          profile?.dl_expiration,
                          'YYYY-MM-DD',
                        ).format('MM-DD-YYYY')}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                    </View>
                    <View>
                      <MyText
                        text={'DL State:'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                      <MyText
                        text={`${profile?.dl_state}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.licenseInfo}>
                  <View style={styles.licenseBox}>
                    <MyText
                      text={'Assigned Vehicle Info'}
                      fontFamily="Roboto"
                      fontSize={18}
                      textColor={Color.dark_gray}
                      style={{fontWeight: '500'}}
                    />
                  </View>
                  <MyText
                    text={`${profile?.vehicle?.vehicle_model}, ${profile?.vehicle?.vehicle_make}`}
                    fontFamily="Roboto"
                    fontSize={18}
                    textColor={Color.dark_gray}
                    style={{
                      fontWeight: '500',
                      marginHorizontal: 10,
                      marginVertical: 15,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 12,
                      marginTop: 3,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '47%'}}>
                      <MyText
                        text={'Registration NO.'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{fontWeight: '400'}}
                      />
                      <MyText
                        text={`${profile?.vehicle?.vehicle_registration}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{fontWeight: '400'}}
                      />
                    </View>
                    <View style={{width: '47%'}}>
                      <MyText
                        text={'Capacity:'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{fontWeight: '400'}}
                      />
                      <MyText
                        text={`${profile?.vehicle?.vehicle_capacity}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{fontWeight: '400'}}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 12,
                      marginTop: 3,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '47%'}}>
                      <MyText
                        text={'Chasis NO.'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{fontWeight: '400'}}
                      />
                      <MyText
                        text={`${profile?.vehicle?.vehicle_chasis}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{fontWeight: '400'}}
                      />
                    </View>
                    <View style={{width: '47%'}}>
                      <MyText
                        text={'Vehicle Engine:'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{fontWeight: '400'}}
                      />
                      <MyText
                        text={`${profile?.vehicle?.vehicle_engine}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{fontWeight: '400'}}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 12,
                      marginTop: 3,
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <MyText
                        text={'Insurance Date'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                      <MyText
                        text={`${profile?.vehicle?.insurance_date}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                    </View>
                    <View style={{width: '47%'}}>
                      <MyText
                        text={'Vehicle Engine:'}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#212121'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                      <MyText
                        text={`${profile?.vehicle?.vehicle_engine}`}
                        fontFamily="Roboto"
                        fontSize={14}
                        textColor={'#0368A6'}
                        style={{
                          fontWeight: '400',
                        }}
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.logoutBar,
                    {
                      backgroundColor: 'red',
                      width: dimensions.SCREEN_WIDTH * 0.9, // Set your desired width
                      height: 38, // Set your desired height
                      backgroundColor: '#fff', // Background color of the box
                      shadowColor: '#000', // Shadow color
                      shadowOffset: {width: 0, height: 8}, // X, Y offset of shadow (0px 8px)
                      shadowOpacity: 0.05, // Shadow opacity (~ #0000000D in CSS)
                      shadowRadius: 13, // Blur radius (13px)
                      elevation: 8,
                      height: 50,
                      backgroundColor: Color.WHITE,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      justifyContent: 'center',
                      paddingHorizontal: 12,
                    },
                  ]}
                  onPress={() => {
                    logout();
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',

                      width: dimensions.SCREEN_WIDTH * 0.87,
                    }}>
                    <Image
                      source={require('../../assest/images/logoutBlue.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                        marginVertical: 15,
                      }}></Image>
                    <MyText
                      text={`Logout`}
                      fontFamily="Roboto"
                      fontSize={14}
                      textColor={Color.dark_gray}
                      style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        marginTop: 18,
                        marginLeft: 12,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}
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
        </ScrollView>
      </View>
    </>
  );
};

export default Profile;
