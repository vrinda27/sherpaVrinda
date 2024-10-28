import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
// import messaging from '@react-native-firebase/messaging';
import { NotificationManagerAndroid } from './NotificationManagerAndroid';
import { NotificationManagerIOS } from './NotificationManagerIOS';
import { setUserNotifications } from './reduxToolkit/reducer/user';
// import {NotificationManagerAndroid} from './screens/NotificationManagerAndroid';
// import {NotificationManagerIOS} from './screens/NotificationManagerIOS';
// import {setUserNotifications} from './reduxToolkit/reducer/user';
import PushNotification from 'react-native-push-notification';

const NotificationHandler = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const requestUserPermission = async () => {
  //     try {
  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //       if (enabled) {
  //         console.log('Authorization status:', authStatus);
  //         console.log('Reached permission block');

  //         // Get the device token
  //         const token = await messaging().getToken();
  //         if (token) {
  //           console.log('Device Token:', token); // Log the device token to console
  //         } else {
  //           console.log('Failed to get device token.');
  //         }
  //       } else {
  //         console.log('User did not grant notification permissions.');
  //       }
  //     } catch (error) {
  //       console.error('Error requesting permission or getting token:', error);
  //     }
  //   };

  //   requestUserPermission();

  //   // Foreground notification handler
  //   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
  //     const data = remoteMessage.notification;
  //     if (data) {
  //       console.log('Foreground notification data:', data);

  //       // Show a local notification using PushNotification
  //       PushNotification.localNotification({
  //         title: data.title,
  //         message: data.body,
  //         playSound: true,
  //         soundName: 'default',
  //         importance: 'high', // Show the notification with high priority
  //       });

  //       // Dispatch the data to your Redux store
  //       dispatch(setUserNotifications(data.count || '1'));
  //     }
  //   });

  //   // Background notification handler when app is opened from the background
  //   const unsubscribeOnNotificationOpenedApp =
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log('my remote mess ap is opened-->>', remoteMessage);
  //       const data = remoteMessage.data;
  //       if (data) {
  //         console.log('Notification opened from background state:', data);
  //         dispatch(setUserNotifications(data.count || '1'));
  //       }
  //     });

  //   // Notification handler when app is opened from a quit state
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         const data = remoteMessage.data;
  //         if (data) {
  //           console.log('Notification opened from quit state:', data);
  //           dispatch(setUserNotifications(data.count || '1'));
  //         }
  //       }
  //     });

  //   // Listen for token refresh
  //   const unsubscribeTokenRefresh = messaging().onTokenRefresh(newToken => {
  //     console.log('Token refreshed:', newToken);
  //   });

  //   return () => {
  //     unsubscribeOnMessage();
  //     unsubscribeOnNotificationOpenedApp();
  //     unsubscribeTokenRefresh();
  //   };
  // }, [dispatch]);

  // // Background notification handler
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   const {data, messageId} = remoteMessage;
  //   console.log('Background notification data:', data, messageId);

  //   if (Platform.OS === 'android') {
  //     NotificationManagerAndroid.showNotification(
  //       data.title,
  //       data.msg,
  //       messageId,
  //       data,
  //     );
  //   } else {
  //     NotificationManagerIOS.showNotification(
  //       2,
  //       data.title,
  //       data.msg,
  //       data,
  //       {},
  //     );
  //   }
  // });

  return null; // This component doesn't need to render anything
};

export default NotificationHandler;
