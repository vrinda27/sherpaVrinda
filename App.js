import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  Platform,
} from 'react-native';
import Color from './src/global/Color';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Drawer from './src/navigation/Drawer/Drawer';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './src/reduxToolkit/store/store';
import {navigationRef} from './src/navigation/navigationUtils';
import PushNotification from 'react-native-push-notification';
import {NotificationManagerAndroid} from './src/NotificationManagerAndroid';
import {NotificationManagerIOS} from './src/NotificationManagerIOS';
const App = () => {
  LogBox.ignoreAllLogs();

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#ADC430',
          borderColor: '#ADC430',
          borderWidth: 1,
          height: 55,
          width: '90%',
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 12,
          fontWeight: '400',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{fontSize: 12}}
        text2Style={{fontSize: 12}}
      />
    ),
  };

  React.useEffect(() => {
    getDeviceToken();
    // Check if user is logged in
    // Set isLoggedIn accordingly
  }, []);
  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log('my device tokenjjjjj---->>', token);
  };
  React.useEffect(() => {
    // dynamicLinks()
    // .getInitialLink()
    // .then(link => {
    //   console.log('My url is in App js ==>>',link)
    //   // if (link.url === 'https://invertase.io/offer') {
    //   //   // ...set initial route as offers screen
    //   // }
    // });
    // Orientation.lockToPortrait();
    NotificationManagerAndroid.createChannel();
    NotificationManagerAndroid.configure();
    try {
      if (Platform.OS == 'android') {
        requestUserPermission();
      } else {
        requestUserPermissionIos();
      }
      // PushNotificationIOS.getApplicationIconBadgeNumber(num => {
      //  console.log('the bedge number is===',num)
      // });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const {messageId} = remoteMessage;
        const data = remoteMessage.notification;
        if (Platform.OS === 'android') {
          NotificationManagerAndroid.showNotification(
            data.title,
            data.body,
            data.subText,
            messageId,
            data,
          );
        } else {
          NotificationManagerIOS.showNotification(
            2,
            data.title,
            data.body,
            data,
            {},
          );
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const {data, messageId} = remoteMessage;
      const {Title, notificationText, subText} = data;
      if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(
          Title,
          notificationText,
          subText,
          messageId,
        );
      } else {
        NotificationManagerIOS.showNotification(
          messageId,
          Title,
          notificationText,
          data,
          {},
        );
        // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
        //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
        // })
      }
    });
  }, []);
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
    console.log('Authorization status:', authStatus);
  }
  async function requestUserPermissionIos() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Color.PRIMARY} />
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Drawer />
          {/* <NotificationHandler /> */}
          <Toast config={toastConfig} />
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
