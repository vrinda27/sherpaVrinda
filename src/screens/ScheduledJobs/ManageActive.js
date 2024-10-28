import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  tyleSheet,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
} from 'react-native';

import Color, {dimensions} from '../../global/Color';
import MyText from '../../Components/MyText';
import {
  getApiWithToken,
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
} from '../../global/Service';
import moment from 'moment';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MyAlert from '../../global/MyAlert';

const ManageActive = ({
  navigation,
  item,
  route,
  onJoinClass,
  status,
  handelePress,
}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  const H = Dimensions.get('screen').height;
  const W = Dimensions.get('screen').width;
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(
    () => {
      return () => {};
    },
    [
      /* dependencies */
    ],
  );
  //join class

  //start job
  // startJob;
  //upcoming classes
  const startJob = async item => {
    {
      console.log('my start job item--->>>', item);
    }
    handelePress(item);
  };
  return (
    <>
      <View style={styles.conatiner}>
        <View style={styles.headerBar}>
          <View style={{flexDirection: 'row'}}>
            <MyText
              text={'Job ID:'}
              fontFamily="regular"
              fontSize={14}
              textColor={Color.dark_gray}
              style={{fontWeight: '500'}}
            />
            <MyText
              text={item?.job_id}
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
              text={moment(item?.job_date).format('MM-DD-YYYY')}
              fontFamily="regular"
              fontSize={14}
              textColor={Color.PRIMARY}
            />
          </View>
        </View>

        <View style={{paddingVertical: 10, paddingHorizontal: 12}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <MyText
                text={item?.job_name}
                fontFamily="regular"
                fontSize={16}
                textColor={Color.dark_gray}
                style={{
                  fontWeight: '500',
                  width: dimensions.SCREEN_WIDTH * 0.4, // Adjust width as needed
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              />
              <View style={{flex: 1}} />
              {/* This pushes the image to the right */}
              <Image
                source={require('../../assest/images/info.png')}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 12, // Optional spacing adjustment
                }}
              />
            </View>
            <View
              style={[
                styles.routing,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Image
                source={require('../../assest/images/routing.png')}
                style={styles.routingImg}
              />
              <MyText
                text={item?.distance_between}
                fontFamily="Qutfit"
                fontSize={14}
                textColor={Color.WHITE}
                style={{
                  marginLeft: 7,
                  width: 100, // Add a fixed width to prevent dynamic resizing
                  textAlign: 'left', // Ensures that the text is aligned to the right
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 9,
              justifyContent: 'space-between',
            }}>
            <View>
              <MyText
                text={'Job Type:'}
                fontFamily="Qutfit"
                fontSize={14}
                textColor={Color.dark_gray}
              />
              <MyText
                text={item?.job_type}
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
                text={item?.customer}
                fontFamily="Roboto"
                fontSize={14}
                textColor={Color.PRIMARY}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 14,
                color: Color.dark_gray,
              }}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.description}
            </Text>
          </View>
        </View>

        {status == '1' ? (
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: Color.PRIMARY,
                borderBottomLeftRadius: 10,
                justifyContent: 'center',
                flex: 1, // This makes the view take up equal space
              }}
              onPress={() => {
                navigation.navigate('OrderDetail', {
                  status: status,
                  item: item,
                });
              }}>
              <MyText
                text={'VIEW DETAIL'}
                fontFamily="Roboto"
                fontSize={14}
                textColor={Color.WHITE}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: Color.orange,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                flex: 1, // This makes the view take up equal space
              }}
              onPress={() => {
                startJob(item);
              }}>
              <MyText
                text={'START JOB'}
                fontFamily="Roboto"
                fontSize={14}
                textColor={Color.WHITE}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: Color.PRIMARY,
              borderBottomLeftRadius: 10,
              justifyContent: 'center',
              borderBottomRightRadius: 10,
              flex: 1, // This makes the view take up equal space
            }}
            onPress={() => {
              navigation.navigate('OrderDetail', {status: status, item: item});
            }}>
            <MyText
              text={'VIEW DETAIL'}
              fontFamily="Roboto"
              fontSize={14}
              textColor={Color.WHITE}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  // PURPLE_DARK
  conatiner: {
    width: dimensions.SCREEN_WIDTH * 0.94,
    alignSelf: 'center',
    marginVertical: 6,
    borderColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    height: 'auto',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000', // The shadow color, equivalent to #000000
    shadowOffset: {width: 0, height: 8}, // The x-offset (0px) and y-offset (8px)
    shadowOpacity: 0.05, // The opacity (0x0D in hexadecimal is approximately 0.05 in decimal)
    shadowRadius: 13, // The blur radius (13px)
    elevation: 13, // Elevation for Android, creates a similar shadow effect
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    // iOS
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.13,
    shadowRadius: 13,
    // Android
    elevation: 8,
    alignSelf: 'center',
    width: dimensions.SCREEN_WIDTH * 0.94,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
  },
  routing: {
    width: 'auto',
    height: 'auto',
    borderRadius: 4,
    backgroundColor: '#E7862A',
    marginVertical: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  routingImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
export default ManageActive;
