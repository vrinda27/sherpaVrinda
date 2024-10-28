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

import MyAlert from '../../global/MyAlert';

const ManageActive = ({navigation, item, route, onJoinClass, status}) => {
  const H = Dimensions.get('screen').height;
  const W = Dimensions.get('screen').width;
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(
    () => {
      console.log('my dependencies--->>', route?.params);
      console.log('my upcoming class');
      return () => {};
    },
    [
      /* dependencies */
    ],
  );
  //join class
  const JoinClass = async item => {
    console.log('my clas id for join classss---->>', item?._id);

    onJoinClass(item?._id);
  };
  //upcoming classes
  return (
    <View>
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
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 9,
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
        </View>

        <TouchableOpacity
          style={{
            height: 58,
            backgroundColor: Color.PRIMARY,

            borderBottomLeftRadius: 10,
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            flex: 1, // This makes the view take up equal space
          }}
          onPress={() => {
            navigation.navigate('CompletedJobDetail');
          }}>
          <MyText
            text={'VIEW DETAIL'}
            fontFamily="Roboto"
            fontSize={14}
            textColor={Color.WHITE}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    </View>
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
    height: 58,
  },
  routing: {
    width: 100,
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
