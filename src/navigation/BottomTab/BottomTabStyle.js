import {Platform, StyleSheet} from 'react-native';
import Color from '../../global/Color';
export const styles = StyleSheet.create({
  navigatorStyle: {
    height: Platform.OS === 'ios' ? 80 : 70,
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    padding: 0, // Example padding
    // Shadow for iOS
    shadowColor: 'rgba(3, 104, 166, 0.1)',
    shadowOffset: {width: 8, height: 0},
    shadowOpacity: 1,
    shadowRadius: 13,
    // Shadow for Android
    elevation: 30,
  },
  tabStyle: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 20,
  },
  customTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: '90%', // Align to the center of the tab
    marginLeft: -33, // Adjust to center the tab,
    backgroundColor: 'green',
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 20,
  },
  image: {height: 27, width: 27},
  focusedDot: {
    height: 6,
    width: 6,
    backgroundColor: Color.PRIMARY,
    marginTop: 18,
    borderRadius: 30,
    marginRight: 7,
  },
  drawerIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
