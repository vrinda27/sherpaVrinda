/* eslint-disable react/no-unstable-nested-components */
//react components
import React from 'react';
import {View, Image, Text} from 'react-native';
//custom components
import MyText from '../../Components/MyText';
//Bottom Tab
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//global
import Color from '../../global/Color';
//styles
import {styles} from './BottomTabStyle';
//screens
import HomeScreen from '../../screens/Home/HomeScreen';
import Profile from '../../screens/Profile/Profile';
import {OrderStack} from '../OrderStack';

const BottomTab = ({userToken}) => {
  // const userInfo = useSelector(state => state.user.userInfo);
  //variables
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    showLabel: false,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.navigatorStyle,
  };
  // backBehavior = order - return to previous tab (in the order they are shown in the tab bar)
  // backBehavior = history - return to last visited tab
  console.log('Bottom Tab');
  return (
    <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
      <Tab.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabStyle, {flexDirection: 'row'}]}>
              {focused ? <View style={styles.focusedDot}></View> : null}
              {focused ? (
                <Image
                  source={require('../../assest/images/homeActive.png')}
                  style={styles.image}></Image>
              ) : (
                <Image
                  source={require('../../assest/images/HomeInactive.png')}
                  style={styles.image}></Image>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'OrderStack'}
        component={OrderStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabStyle, {flexDirection: 'row'}]}>
              {focused ? <View style={styles.focusedDot}></View> : null}
              {focused ? (
                <Image
                  source={require('../../assest/images/orderActive.png')}
                  style={styles.image}></Image>
              ) : (
                <Image
                  source={require('../../assest/images/orderInactive.png')}
                  style={styles.image}></Image>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[styles.tabStyle, {flexDirection: 'row'}]}>
              {focused ? <View style={styles.focusedDot}></View> : null}
              {focused ? (
                <Image
                  source={require('../../assest/images/profileInactive.png')}
                  style={styles.image}></Image>
              ) : (
                <Image
                  source={require('../../assest/images/profileInactive.png')}
                  style={styles.image}></Image>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
