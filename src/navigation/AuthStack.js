import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import screens
import Splash from '../screens/Splash/Splash';
import Welcome from '../screens/Welcome/Welocome';
import Signin from '../screens/Signin/Signin';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import SuccessScreen from '../screens/SucessScreen/SuccessScreen';
import Signup from '../screens/Signup/Signup';
import AccountSucces from '../screens/AccountCreated/AccountSucces';
import Profile from '../screens/Profile/Profile';
import BottomTab from './BottomTab/BottomTab';
import HomeScreen from '../screens/Home/HomeScreen';
import ManageActive from '../screens/Order/ManageActive';
import OrderDetail from '../screens/OrderDetail/OrderDetail';
import Tracker from '../screens/Tracker/Tracker';
import CompletedJobDetail from '../screens/CompletedJobDetail/CompletedJobDetail';
import EditProfile from '../screens/EditProfile/EditProfile';
import ResetPasswordProfile from '../screens/ResetPasswordProfile/ResetPasswordProfile';
import Chat from '../screens/Chat/Chat';
import Notification from '../screens/Notification/Notification';
import SchduledJobs from '../screens/ScheduledJobs/ScheduledJobs';
import TimeCard from '../TimeCard/TimeCard';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // set the headerShown option to false to hide the header
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="AccountSucces" component={AccountSucces} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="ManageActive" component={ManageActive} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Tracker" component={Tracker} />
      <Stack.Screen name="CompletedJobDetail" component={CompletedJobDetail} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="ResetPasswordProfile"
        component={ResetPasswordProfile}
      />
      <Stack.Screen name="SchduledJobs" component={SchduledJobs} />
      <Stack.Screen name="TimeCard" component={TimeCard} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AuthStack;
