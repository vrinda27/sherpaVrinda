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
} from 'react-native';
import ManageActive from './ManageActive';
import styles from './CompletedJobStyle';
import Color, {dimensions} from '../../global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomHeader from '../../Components/CustomHeader';
import CustomTextBox from '../../Components/CustomTextBox';
import {get_homework} from '../../global/Service';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
const CompletedJob = ({navigation, route}) => {
  {
    console.log('my params--->>>', route?.params?.status);
  }
  const [animating, setAnimating] = useState(true);
  const [isLocationModal, setLocationModal] = useState(false);
  const [selected, setSelected] = useState(false);
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

  const renderStudentList = ({item}) => {
    console.log('render upcoming class=------>>', item.title);

    return (
      <ManageActive
        item={item}
        navigation={navigation}
        status={route?.params?.status}></ManageActive>
    );
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
      <View
        style={{
          flex: 1,
          backgroundColor: Color.PRIMARY
        }}>
        <View style={{flex: 1}}>
          <MyHeader Title={'Completed Jobs'} isBorderRadius={true} />

          {/* <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(212, 229, 240, 1)']}
            style={{
              marginTop: 30,
              height: dimensions.SCREEN_HEIGHT,
              flex: 1,
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
                width: dimensions.SCREEN_WIDTH * 0.9,
              }}>
              <View style={styles.searchBar}>
                <Text>07/04/1024</Text>
                <Image
                  source={require('../../assest/images/SearchCalendar.png')}
                  style={{height: 24, width: 24}}></Image>
              </View>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 5,
                  backgroundColor: Color.orange,
                  marginTop: 12,
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assest/images/setting-4.png')}
                  style={{
                    height: 32,
                    width: 32,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}></Image>
              </View>
            </View>
            <ScrollView>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.containerBox}>
                  <Image
                    source={require('../../assest/images/truck-tick.png')}
                    style={{
                      width: 49,
                      height: 49,
                      resizeMode: 'contain',
                    }}></Image>
                  <MyText
                    text={'Completed Jobs'}
                    fontFamily="Roboto"
                    fontSize={14}
                    textColor={Color.dark_gray}
                    style={{marginTop: 7, fontWeight: 500}}
                  />
                  <MyText
                    text={'02'}
                    fontFamily="Roboto"
                    fontSize={30}
                    textColor={Color.PRIMARY}
                    style={{marginTop: 7, fontWeight: 700}}
                  />
                </View>
                <View style={styles.containerBox}>
                  <Image
                    source={require('../../assest/images/calendar-tick.png')}
                    style={{
                      width: 49,
                      height: 49,
                      resizeMode: 'contain',
                    }}></Image>
                  <MyText
                    text={'Rescheduled Jobs '}
                    fontFamily="Roboto"
                    fontSize={14}
                    textColor={Color.dark_gray}
                    style={{marginTop: 7, fontWeight: 500}}
                  />
                  <MyText
                    text={'03'}
                    fontFamily="Roboto"
                    fontSize={30}
                    textColor={Color.PRIMARY}
                    style={{marginTop: 7, fontWeight: 700}}
                  />
                </View>
              </View>
              <View style={{flex: 1}}>
                {data?.length > 0 ? (
                  <View style={styles.displayRoutines}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      data={data}
                      renderItem={renderStudentList}
                      keyExtractor={(item, index) => String(index)}
                    />
                  </View>
                ) : null}
              </View>
            </ScrollView>
            {/* </LinearGradient> */}
          </View>
        </View>
      </View>
    </>
  );
};

export default CompletedJob;
