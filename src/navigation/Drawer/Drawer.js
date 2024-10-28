//react components
import React from 'react';
import {NativeModules} from 'react-native';
//navigation
import {createDrawerNavigator} from '@react-navigation/drawer';
//global
import Color from '../../global/Color.js';
//stack
import AuthStack from '../AuthStack.js';
import CustomDrawer from './CustomDrawer.js';
import {SafeAreaView} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
// import {useNetworkError} from '../../hooks/useNetworkError';

const Drawer = () => {
  //variables
  const Drawer = createDrawerNavigator();
  const initialRouteName = 'AuthStack';
  const options = {
    swipeEnabled: false,
  };
  const renderCustomDrawer = ({navigation}) => (
    <CustomDrawer
      navigation={navigation}
      style={{paddingTop: NativeModules.StatusBarManager.HEIGHT}}
    />
  );
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: responsiveWidth(70)},
      }}
      initialRouteName={initialRouteName}
      drawerContent={renderCustomDrawer}>
      <Drawer.Screen name="AuthStack" options={options} component={AuthStack} />
    </Drawer.Navigator>
  );
};

export default Drawer;
