import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Color from '../../global/Color';

const ChatSection = ({userName = '', own = true, chat = '', time = ''}) => {
  const _username = [...userName];
  _username[0] = _username[0]?.toUpperCase();
  return (
    <View
      style={{
        ...styles.container,
        alignSelf: own ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={{
          ...styles.chatContainer,
          borderBottomRightRadius: own ? 0 : responsiveWidth(5),
          borderBottomLeftRadius: own ? responsiveWidth(5) : 0,
        }}>
        <Text
          style={{
            ...styles.userName,
            color: own ? 'black' : Color.PRIMARY,
            opacity: own ? 0.7 : 1,
          }}>
          {_username}
        </Text>
        <Text style={styles.chat}>{chat}</Text>
      </View>
      {time && (
        <Text style={{...styles.time, textAlign: own ? 'right' : 'left'}}>
          {time}
        </Text>
      )}
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: responsiveHeight(1.5),
    marginHorizontal: responsiveWidth(5),
    width: responsiveWidth(60),
  },
  chatContainer: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'rgba(137, 137, 137, .25)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderTopRightRadius: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
  },
  userName: {
    marginBottom: responsiveHeight(0.7),
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
    color: 'pink',
  },
  chat: {
    color: 'black',
    opacity: 0.7,
    lineHeight: responsiveHeight(2.3),
    letterSpacing: 0.7,
  },
  time: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.4),
    color: 'black',
    opacity: 0.6,
  },
});
