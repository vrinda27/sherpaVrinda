import {StyleSheet} from 'react-native';
import Color, {dimensions} from '../../global/Color';

const styles = StyleSheet.create({
  jobDetailContainer: {
    width: dimensions.SCREEN_WIDTH * 0.93,
    height: 'auto',
    backgroundColor: 'white',
    // iOS shadow properties
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.05,
    shadowRadius: 13,
    // Android elevation
    elevation: 8,
    alignSelf: 'center',
  },
  conatiner: {
    width: dimensions.SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    marginVertical: 15,
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
    width: dimensions.SCREEN_WIDTH * 0.89,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 58,
  },
  routing: {
    width: 'auto',
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
  mapPointer: {
    height: 40,
    width: 40,
  },
  jobStatus: {
    width: dimensions.SCREEN_WIDTH * 0.89,
    height: 70,
    borderRadius: 10,
    backgroundColor: Color.WHITE,
    borderColor: Color.PRIMARY,
    borderWidth: 1,
    marginTop: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  arrowRight: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  ModalFilterView: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    bottom: -20,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  jobFlaList: {
    width: dimensions.SCREEN_WIDTH * 0.9,
    height: 62,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.light_gray,
    backgroundColor: 'white',
    // iOS shadow properties
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.05, // 0D hex converted to decimal opacity
    shadowRadius: 13,
    // Android elevation
    elevation: 8,
    marginVertical: 5,

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  buttonModal: {
    width: dimensions.SCREEN_WIDTH * 0.43,
    height: 50,
    borderRadius: 5,
    backgroundColor: Color.PRIMARY,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImageBox: {
    height: 70,
    width: 80,
    position: 'relative',
    marginRight: 29,
    marginHorizontal: 26,
    marginBottom: 12,
    flexDirection: 'row',
  },
  imagePickerStyle: {
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteIcon: {
    // backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    left: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    top: 1,
  },
});

export default styles;
