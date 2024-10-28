// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Keyboard,
// } from 'react-native';
// import React, {useCallback, useRef, useEffect, useState} from 'react';
// // import MyHeader from "../../Components/MyHeader/MyHeader"
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import MyHeader from '../../Components/MyHeader/MyHeader';
// import DocumentPicker from 'react-native-document-picker';
// import ChatSection from '../../Components/Chat/ChatSection';
// import Color, {dimensions} from '../../global/Color';
// import {firebase} from '@react-native-firebase/firestore';
// import {connect, useSelector, useDispatch} from 'react-redux';
// // import Share from '../../Global/Images/share.svg';
// // import Direction from '../../Global/Images/direction.svg';
// import {useIsFocused} from '@react-navigation/native';
// import Loader from '../../Components/Loader';
// import MyAlert from '../../global/MyAlert';
// // const timeHandler = timestamp => {
// //   {
// //     console.log('my time handler-->', timestamp);
// //   }
// //   if (timestamp) {
// //     const milliseconds =
// //       timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
// //     const date = new Date(milliseconds);

// //     const _temp = date.toLocaleString()?.split(',')[1]?.trim()?.split(':');
// //     // const time = `${_temp[0]}:${_temp[1]} ${_temp[2].split(' ')[1]}`;
// //     return _temp;
// //   }
// //   return '';
// // };
// // const timeHandler = date => {
// //   const pad = num => num.toString().padStart(2, '0');
// //   const year = date.getUTCFullYear();
// //   const month = pad(date.getUTCMonth() + 1);
// //   const day = pad(date.getUTCDate());
// //   const hours = pad(date.getUTCHours());
// //   const minutes = pad(date.getUTCMinutes());
// //   const seconds = pad(date.getUTCSeconds());
// //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// // };
// import {
//   getApiWithToken,
//   HOME,
//   postApiWithToken,
//   LOGOUT,
//   MESSAGE_SEEN,
//   requestPostApi,
// } from '../../global/Service';
// // MESSAGE_SEEN;
// const timeHandler = date => {
//   console.log('Received date:', date); // Add this to check the date value
//   if (!(date instanceof Date) || isNaN(date.getTime())) {
//     console.error('Invalid date passed to timeHandler:', date);
//     return null; // or return a default string like 'Invalid date'
//   }
//   const pad = num => num.toString().padStart(2, '0');
//   const year = date.getUTCFullYear();
//   const month = pad(date.getUTCMonth() + 1);
//   const day = pad(date.getUTCDate());
//   const hours = pad(date.getUTCHours());
//   const minutes = pad(date.getUTCMinutes());
//   const seconds = pad(date.getUTCSeconds());
//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };

// const Chat = () => {
//   // const {params} = useRoute<ChatRouteParams>();
//   const dispatch = useDispatch();
//   const isFocus = useIsFocused();
//   const userToken = useSelector(state => state.user.userToken);
//   const userData = useSelector(state => state.user.userInfo);
//   console.log('userData--->>>', userData.id);
//   const [loading, setLoading] = useState(false);
//   const [scrolling, setscrolling] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [My_Alert, setMy_Alert] = useState(false);
//   const [chat, setChat] = React.useState('');
//   const [file, setFile] = React.useState(undefined);
//   const [ok, setOk] = React.useState(false);
//   const [chatArray, setChatArray] = React.useState([]);
//   const scrollViewRef = useRef(null); // Ref to control ScrollView
//   const flatlistRef = useRef(null); // FlatList ref if you need it

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         scrollViewRef.current?.scrollToEnd({animated: true}); // Scroll to the bottom when keyboard shows
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         scrollViewRef.current?.scrollToEnd({animated: true}); // Optional: scroll after keyboard hides
//       },
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);
//   React.useEffect(() => {
//     setOk(true);
//   }, []);

//   React.useEffect(() => {
//     if (chatArray?.length > 0 && ok) {
//       flatlistRef?.current?.scrollToIndex({
//         animated: false,
//         index: chatArray?.length - 1,
//       });
//     }
//   }, [ok, chatArray]);

//   React.useEffect(() => {
//     let unsubscribe;
//     const fetchData = async () => {
//       unsubscribe = await chatSnapshot();
//     };
//     fetchData();
//     clear();
//     return () => {
//       unsubscribe && unsubscribe();
//     };
//   }, []);

//   const chatSnapshot = async () => {
//     try {
//       const unsubscribe = firebase
//         ?.firestore()
//         .collection('sherpa_chats')
//         .doc(`1-${userData?.id}`)
//         .collection('messages')
//         ?.orderBy('createdAt', 'desc')
//         ?.onSnapshot(snapshot => {
//           console.log('snapshot', snapshot?._docs[0]?._data);
//           if (!ok) {
//             getChatData(snapshot?._docs);
//           } else {
//             setChatArray(preData => [
//               {
//                 createdAt: timeHandler(snapshot?._docs[0]?._data?.createdAt),
//                 senderId: snapshot?._docs[0]?._data?.sendBy,
//                 text: snapshot?._docs[0]?._data?.text,
//                 _id: snapshot?._docs[0]?._data?._id,
//               },
//               ...preData,
//             ]);
//             setChat('');
//             flatlistRef?.current?.scrollToEnd();
//           }
//         });
//       return unsubscribe;
//     } catch (err) {
//       console.log('err in chat snapshot', err?.message);
//     }
//   };
//   const getChatData = async data => {
//     {
//       console.log('get chat data--->>', data);
//     }

//     if (data?.length === 0) {
//       return;
//     }

//     try {
//       const arr = data?.map(item => {
//         // Convert Firestore timestamp to JavaScript Date if necessary
//         const createdAtRaw = item?._data?.createdAt;
//         const time = createdAtRaw?.toDate
//           ? timeHandler(createdAtRaw.toDate())
//           : timeHandler(createdAtRaw);

//         return {
//           text: item?._data?.text,
//           createdAt: time,
//           senderId: item?._data?.sendBy,
//           _id: item?._data?._id,
//         };
//       });

//       if (arr?.length > 0) {
//         console.log('my array for chat--->>>', arr);
//         setChatArray(arr);
//       }
//     } catch (err) {
//       console.log('err in getting chat', err);
//     }
//   };

//   const sendChatHandler = async () => {
//     const msg = chat;
//     // const messageId = uuid.v4()
//     try {
//       setChat('');
//       await firebase
//         ?.firestore()
//         .collection('sherpa_chats')
//         .doc(`1-${userData?.id}`)
//         ?.collection('messages')
//         .add({
//           text: msg,
//           // image: image,
//           imageUrl: '',
//           sendBy: userData?.id,
//           sendTo: 1,
//           adminName: 'Sherpa Administrator',
//           userName: userData?.first_name,
//           seen: false,
//           user: {
//             _id: userData?.id,
//           },
//           _id: 'random',
//           createdAt: timeHandler(new Date()),
//         });
//       chat;
//       //   && (await PostApiWithToken(endPoint.chatRecord, {msg}, token));
//     } catch (err) {
//       console.log('err in sending text', err?.message);
//     }
//   };

//   const chatHandler = chat => {
//     setChat(chat);
//   };

//   const documentPicker = useCallback(async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       console.log('result', result);
//     } catch (err) {
//       console.log('document picker err', err.message);
//     }
//   }, []);

//   const renderChat = ({item, index}) => {
//     console.log('my item for chat-->>', item);
//     return (
//       <ChatSection
//         key={index}
//         userName={
//           item?.senderId == userData?.id
//             ? userData?.first_name
//               ? userData?.first_name
//               : 'You'
//             : 'Admin'
//         }
//         chat={item?.text}
//         own={item?.senderId == userData?.id ? true : false}
//         time={item?.createdAt}
//       />
//     );
//   };

//   ///message seen
//   const clear = async item => {
//     try {
//       setLoading(true);

//       const {responseJson, err} = await requestPostApi(
//         MESSAGE_SEEN,
//         '',
//         'POST',
//         userToken,
//       );
//       console.log('log for start shift', responseJson?.status);
//       if (responseJson?.status === true || responseJson?.status === 1) {
//         console.log('chat seen', responseJson?.data);
//         //  getCartCount();
//         //  Toast.show({text1: responseJson?.message});
//       } else {
//         console.error('Login failed:', responseJson);
//         setalert_sms(responseJson.message);
//         setMy_Alert(true);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     } finally {
//       setLoading(false);
//     }
//     // navigation.navigate('HomeScreen');
//   };
//   return (
//     <View style={{flex: 1, backgroundColor: Color.PRIMARY}}>
//       <View style={styles.headerContainer}>
//         {/* <ImageBackground
//                     source={require("../../assets/Icons/maskGroup-2.png")}
//                     resizeMode="cover"
//                     style={styles.chatImage}
//                 /> */}
//         {/* <Header title="Chats" notificationButton={false} /> */}
//         <MyHeader Title={`You need help? Let’s chat.`} isBackButton />
//       </View>
//       {/* <Text style={styles.text}>You need help? Let’s chat.</Text> */}
//       <View
//         style={{
//           backgroundColor: 'white',
//           flex: 1,
//           zIndex: -1,
//           width: dimensions.SCREEN_WIDTH * 0.99,
//           alignSelf: 'center',
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//         }}>
//         {/* chats */}
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={{flex: 1}}>
//           <ScrollView keyboardShouldPersistTaps="always" bounces={false}>
//             <View style={styles.chatContainer}>
//               {chatArray?.length > 0 ? (
//                 <FlatList
//                   keyboardShouldPersistTaps="always"
//                   inverted={true}
//                   ref={flatlistRef}
//                   data={chatArray}
//                   renderItem={renderChat}
//                   keyExtractor={(_, index) => index.toString()}
//                   bounces={false}
//                   contentContainerStyle={styles.flatlist}
//                   getItemLayout={(data, index) => ({
//                     length: 0,
//                     offset: 0 * index,
//                     index,
//                   })}
//                 />
//               ) : (
//                 <View style={styles.noChatContainer}></View>
//               )}
//             </View>

//             {/* message send section */}
//             <View style={styles.sendMessageContainer}>
//               <View style={styles.textInputContainer}>
//                 <TextInput
//                   value={chat}
//                   style={[
//                     styles.textInput,
//                     {
//                       color: 'black',
//                     },
//                   ]}
//                   onChangeText={chatHandler}
//                 />
//                 <TouchableOpacity style={styles.touch} onPress={documentPicker}>
//                   {/* <Image
//                                     source={require("../../Global/Images/share.svg")}
//                                     resizeMode="contain"
//                                     style={styles.attachedFiles}
//                                 /> */}
//                   {/* <Share></Share> */}
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.sendButtonContainer}>
//                 {console.log('my chat lenght---->>', chat.length)}
//                 <TouchableOpacity
//                   onPress={sendChatHandler}
//                   style={{
//                     ...styles.sendButtonTouch,
//                     backgroundColor:
//                       chat.length > 0 ? Color.PRIMARY : Color.PRIMARY,
//                   }}
//                   disabled={chat.length === 0}>
//                   <Image
//                     source={require('../../assest/images/share.png')}
//                     resizeMode="contain"
//                     style={{height: 40, width: 40, resizeMode: 'cover'}}
//                   />
//                   {/* <Direction></Direction> */}
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//       {My_Alert ? (
//         <MyAlert
//           sms={alert_sms}
//           okPress={() => {
//             setMy_Alert(false);
//           }}
//         />
//       ) : null}
//       {loading ? <Loader /> : null}
//     </View>
//   );
// };

// export default Chat;

// const styles = StyleSheet.create({
//   conatiner: {
//     flex: 1,
//   },
//   headerContainer: {
//     position: 'relative',

//     // backgroundColor: Color.PRIMARY,
//     // borderWidth: 1
//   },
//   chatImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     width: '100%',
//   },
//   text: {
//     marginTop: responsiveHeight(5),
//     width: '100%',
//     color: 'white',
//     textAlign: 'center',
//     fontSize: responsiveFontSize(2),
//     fontWeight: '400',
//     opacity: 0.7,
//   },
//   chatContainer: {
//     height: responsiveHeight(79),
//   },
//   flatlist: {
//     paddingBottom: responsiveHeight(2),
//   },
//   sendMessageContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingHorizontal: '3%',
//     height: responsiveHeight(15),
//   },
//   textInputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: responsiveHeight(6.5),
//     width: responsiveWidth(77),
//     borderRadius: responsiveHeight(5),
//     elevation: 2,
//     shadowColor: 'rgba(137, 137, 137, .25)',
//     shadowOffset: {width: 0, height: 0},
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//     backgroundColor: 'white',
//     borderColor: Color.PRIMARY,
//     borderWidth: 0.5,
//   },
//   textInput: {
//     flex: 1,
//     height: '100%',
//     width: '80%',
//     paddingHorizontal: '5%',
//     fontSize: responsiveFontSize(1.8),
//     letterSpacing: 0.8,
//   },
//   touch: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     paddingRight: responsiveWidth(4),
//   },
//   attachedFiles: {
//     height: responsiveHeight(3),
//     width: responsiveWidth(6),
//   },
//   sendButtonContainer: {
//     height: responsiveHeight(5),
//     width: responsiveHeight(5),
//     borderRadius: responsiveHeight(2.5),
//     overflow: 'hidden',
//     borderColor: Color.PRIMARY,
//     borderWidth: 1,

//     shadowColor: '#000', // Black shadow color
//     shadowOffset: {width: 0, height: 8}, // Shadow offset
//     shadowOpacity: 0.19, // Increased opacity to 0.15 for more visibility
//     shadowRadius: 16, // Increased blur radius for a softer, more visible shadow
//     elevation: 27, // Increased elevation for stronger shadow on Android
//   },
//   sendButtonTouch: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     width: '100%',
//   },
//   sendIcon: {
//     height: responsiveHeight(2),
//     width: responsiveWidth(5),
//   },
//   noChatContainer: {
//     flex: 1,
//   },
// });
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useCallback, useRef, useEffect, useState} from 'react';
// import MyHeader from "../../Components/MyHeader/MyHeader"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyHeader from '../../Components/MyHeader/MyHeader';
import DocumentPicker from 'react-native-document-picker';
import ChatSection from '../../Components/Chat/ChatSection';
import Color, {dimensions} from '../../global/Color';
import {firebase} from '@react-native-firebase/firestore';
import {connect, useSelector, useDispatch} from 'react-redux';
// import Share from '../../Global/Images/share.svg';
// import Direction from '../../Global/Images/direction.svg';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import MyAlert from '../../global/MyAlert';
// const timeHandler = timestamp => {
//   {
//     console.log('my time handler-->', timestamp);
//   }
//   if (timestamp) {
//     const milliseconds =
//       timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
//     const date = new Date(milliseconds);

//     const _temp = date.toLocaleString()?.split(',')[1]?.trim()?.split(':');
//     // const time = `${_temp[0]}:${_temp[1]} ${_temp[2].split(' ')[1]}`;
//     return _temp;
//   }
//   return '';
// };
// const timeHandler = date => {
//   const pad = num => num.toString().padStart(2, '0');
//   const year = date.getUTCFullYear();
//   const month = pad(date.getUTCMonth() + 1);
//   const day = pad(date.getUTCDate());
//   const hours = pad(date.getUTCHours());
//   const minutes = pad(date.getUTCMinutes());
//   const seconds = pad(date.getUTCSeconds());
//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// };
import {
  getApiWithToken,
  HOME,
  postApiWithToken,
  LOGOUT,
  MESSAGE_SEEN,
  requestPostApi,
} from '../../global/Service';
// MESSAGE_SEEN;
const timeHandler = date => {
  console.log('Received date:', date); // Add this to check the date value
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date passed to timeHandler:', date);
    return null; // or return a default string like 'Invalid date'
  }
  const pad = num => num.toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const Chat = () => {
  // const {params} = useRoute<ChatRouteParams>();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  const userData = useSelector(state => state.user.userInfo);
  console.log('userData--->>>', userData.id);
  const [loading, setLoading] = useState(false);
  const [scrolling, setscrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [chat, setChat] = React.useState('');
  const [file, setFile] = React.useState(undefined);
  const [ok, setOk] = React.useState(false);
  const [chatArray, setChatArray] = React.useState([]);
  const scrollViewRef = useRef(null); // Ref to control ScrollView
  const flatlistRef = useRef(null); // FlatList ref if you need it

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd({animated: true}); // Scroll to the bottom when keyboard shows
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollToEnd({animated: true}); // Optional: scroll after keyboard hides
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  React.useEffect(() => {
    setOk(true);
  }, []);

  React.useEffect(() => {
    if (chatArray?.length > 0 && ok) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: chatArray?.length - 1,
      });
    }
  }, [ok, chatArray]);
  React.useEffect(() => {
    let unsubscribe;
    const fetchData = async () => {
      unsubscribe = await chatSnapshot();
    };
    fetchData();
    clear();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const chatSnapshot = async () => {
    try {
      const unsubscribe = firebase
        ?.firestore()
        .collection('sherpa_chats')
        .doc(`1-${userData?.id}`)
        .collection('messages')
        ?.orderBy('createdAt', 'desc')
        ?.onSnapshot(snapshot => {
          console.log('snapshot', snapshot?._docs[0]?._data);
          if (!ok) {
            getChatData(snapshot?._docs);
          } else {
            setChatArray(preData => [
              {
                createdAt: timeHandler(snapshot?._docs[0]?._data?.createdAt),
                senderId: snapshot?._docs[0]?._data?.sendBy,
                text: snapshot?._docs[0]?._data?.text,
                _id: snapshot?._docs[0]?._data?._id,
              },
              ...preData,
            ]);
            setChat('');
            flatlistRef?.current?.scrollToEnd();
          }
        });
      return unsubscribe;
    } catch (err) {
      console.log('err in chat snapshot', err?.message);
    }
  };
  const getChatData = async data => {
    {
      console.log('get chat data--->>', data);
    }

    if (data?.length === 0) {
      return;
    }

    try {
      const arr = data?.map(item => {
        // Convert Firestore timestamp to JavaScript Date if necessary
        const createdAtRaw = item?._data?.createdAt;
        const time = createdAtRaw?.toDate
          ? timeHandler(createdAtRaw.toDate())
          : timeHandler(createdAtRaw);

        return {
          text: item?._data?.text,
          createdAt: time,
          senderId: item?._data?.sendBy,
          _id: item?._data?._id,
        };
      });

      if (arr?.length > 0) {
        console.log('my array for chat--->>>', arr);
        setChatArray(arr);
      }
    } catch (err) {
      console.log('err in getting chat', err);
    }
  };

  const sendChatHandler = async () => {
    const msg = chat;
    // const messageId = uuid.v4()
    try {
      setChat('');
      await firebase
        ?.firestore()
        .collection('sherpa_chats')
        .doc(`1-${userData?.id}`)
        ?.collection('messages')
        .add({
          text: msg,
          // image: image,
          imageUrl: '',
          sendBy: userData?.id,
          sendTo: 1,
          adminName: 'Sherpa Administrator',
          userName: userData?.first_name,
          seen: false,
          user: {
            _id: userData?.id,
          },
          _id: 'random',
          createdAt: timeHandler(new Date()),
        });
      chat;
      //   && (await PostApiWithToken(endPoint.chatRecord, {msg}, token));
    } catch (err) {
      console.log('err in sending text', err?.message);
    }
  };

  const chatHandler = chat => {
    setChat(chat);
  };

  const documentPicker = useCallback(async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('result', result);
    } catch (err) {
      console.log('document picker err', err.message);
    }
  }, []);

  const renderChat = ({item, index}) => {
    console.log('my item for chat-->>', item);
    return (
      <ChatSection
        key={index}
        userName={
          item?.senderId == userData?.id
            ? userData?.first_name
              ? userData?.first_name
              : 'You'
            : 'Admin'
        }
        chat={item?.text}
        own={item?.senderId == userData?.id ? true : false}
        time={item?.createdAt}
      />
    );
  };

  ///message seen
  const clear = async item => {
    try {
      setLoading(true);

      const {responseJson, err} = await requestPostApi(
        MESSAGE_SEEN,
        '',
        'POST',
        userToken,
      );
      console.log('log for start shift', responseJson?.status);
      if (responseJson?.status === true || responseJson?.status === 1) {
        console.log('chat seen', responseJson?.data);
        //  getCartCount();
        //  Toast.show({text1: responseJson?.message});
      } else {
        console.error('Login failed:', responseJson);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
    // navigation.navigate('HomeScreen');
  };
  return (
    <View style={styles.conatiner}>
      <View style={[styles.headerContainer, {backgroundColor: 'red'}]}>
        {/* <ImageBackground
//                     source={require("../../assets/Icons/maskGroup-2.png")}
//                     resizeMode="cover"
//                     style={styles.chatImage}
//                 /> */}
        {/* <Header title="Chats" notificationButton={false} /> */}
        <MyHeader Title={`You need help? Let’s chat.`} isBackButton />
      </View>

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
        {/* chats */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            bounces={false}
            contentContainerStyle={{paddingBottom: responsiveHeight(20)}}>
            <View style={styles.chatContainer}>
              {chatArray?.length > 0 ? (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  inverted={true}
                  ref={flatlistRef}
                  data={chatArray}
                  renderItem={renderChat}
                  keyExtractor={(_, index) => index.toString()}
                  bounces={false}
                  contentContainerStyle={styles.flatlist}
                  getItemLayout={(data, index) => ({
                    length: 0,
                    offset: 0 * index,
                    index,
                  })}
                />
              ) : (
                <View style={styles.noChatContainer}></View>
              )}
              {/* <View style={{height: responsiveHeight(15)}} /> */}
            </View>

            {/* message send section */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.sendMessageContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={chat}
            style={[styles.textInput, {color: 'black'}]}
            onChangeText={chatHandler}
          />
          <TouchableOpacity style={styles.touch} onPress={documentPicker}>
            {/* <Image
                                    source={require("../../Global/Images/share.svg")}
                                    resizeMode="contain"
                                    style={styles.attachedFiles}
                                /> */}
            {/* <Share></Share> */}
          </TouchableOpacity>
        </View>
        <View style={styles.sendButtonContainer}>
          {console.log('my chat lenght---->>', chat.length)}
          <TouchableOpacity
            onPress={sendChatHandler}
            style={{
              ...styles.sendButtonTouch,
              backgroundColor: chat.length > 0 ? Color.PRIMARY : Color.PRIMARY,
            }}
            disabled={chat.length === 0}>
            <Image
              source={require('../../assest/images/share.png')}
              resizeMode="contain"
              style={{height: 40, width: 40, resizeMode: 'cover'}}
            />
            {/* <Direction></Direction> */}
          </TouchableOpacity>
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
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    height: responsiveHeight(9),
    // backgroundColor: Color.PRIMARY,
    // borderWidth: 1
  },
  chatImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  text: {
    marginTop: responsiveHeight(5),
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    opacity: 0.7,
  },
  chatContainer: {
    flex: 1,
    // height: responsiveHeight(67),
  },
  flatlist: {
    paddingBottom: responsiveHeight(2),
  },
  sendMessageContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '3%',
    height: responsiveHeight(15),
    width: '100%',
    backgroundColor: 'white'
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(6.5),
    width: responsiveWidth(77),
    borderRadius: responsiveHeight(5),
    elevation: 2,
    shadowColor: 'rgba(137, 137, 137, .25)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    height: '100%',
    width: '80%',
    paddingHorizontal: '5%',
    fontSize: responsiveFontSize(1.8),
    letterSpacing: 0.8,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingRight: responsiveWidth(4),
  },
  attachedFiles: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
  },
  sendButtonContainer: {
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: responsiveHeight(2.5),
    overflow: 'hidden',
  },
  sendButtonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  sendIcon: {
    height: responsiveHeight(2),
    width: responsiveWidth(5),
  },
  noChatContainer: {
    flex: 1,
  },
});
