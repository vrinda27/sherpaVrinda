import {StyleSheet} from 'react-native';
import Color, {dimensions} from '../../global/Color';

const styles = StyleSheet.create({
  topView: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: '5%',
  },
  topViewHome: {
    flexDirection: 'row',

    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: Platform.OS === 'ios' ? '8%' : 0,
  },
  chatView3: {
    backgroundColor: Color.blue,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
    borderRadius: 5,
  },
  chatView4: {
    borderColor: Color.blue,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
    borderRadius: 5,
  },
  chatView: {
    backgroundColor: Color.blue,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  chatView2: {
    borderColor: Color.blue,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  chatImg: {
    width: 22,
    height: 22,
  },
  phoneCallImg: {
    width: 18,
    height: 18,
  },
  datetimeDetails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  recipientHeader: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: Color.black,
  },
  instructionHd: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Color.black,
  },
  recipientvalue2: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Color.textcolor,
  },
  recipientvalue: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: Color.textcolor,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  viewItem2: {
    width: '100%',

    position: 'relative',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',

    minHeight: 170,
  },
  viewItem3: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.OS == 'ios' ? 85 : 140,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 12, height: 0},
    shadowOpacity: 0.05,
    shadowRadius: 17,
    elevation: 17,
    borderTopColor: Color.PRIMARY,
    borderTopWidth: 4,
  },
  modalInnerView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    width: '100%',
  },
  card: {
    padding: 15,
    backgroundColor: Color.white,
    borderRadius: 15,
  },
  cardDesction: {
    padding: 15,
    backgroundColor: Color.white,
    borderRadius: 15,
    marginVertical: 20,
  },
  orderNumberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '0%',
    alignItems: 'center',
    marginBottom: 5,
  },
  notifiactionImg: {
    width: 20,
    height: 25,
  },
  cardHome2: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    padding: 15,
    marginTop: '15%',
  },
  homeCardIntro: {
    shadowColor: Color.homeShadow,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    position: 'absolute',
    width: '92%',
    alignSelf: 'center',
    padding: 15,
    top: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
  },
  drawer: {
    width: 24,
    height: 20,
  },
  welcomesText: {
    fontSize: 18,
    fontFamily: 'BodoniMT',
    color: Color.blue,
    marginTop: '0%',
    marginLeft: 10,
  },
  homemsg: {
    fontSize: 14,
    fontFamily: 'BodoniMT',
    color: Color.black,
    width: '95%',
    marginLeft: 10,
    marginTop: 5,
  },
  btnEdit: {
    width: '30%',
    height: 35,
    borderWidth: 1,
    backgroundColor: Color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
  },
  btnChangePass: {
    width: '30%',
    height: 35,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderColor: Color.blue,
  },
  viewDetails: {
    width: '48%',
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderColor: Color.blue,
  },
  navigateBtn: {
    width: '48%',
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderColor: Color.blue,
  },
  rejectBtn: {
    width: '30%',
    height: 35,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderColor: Color.red,
  },
  acceptBtn: {
    width: '30%',
    height: 35,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderColor: Color.green,
  },
  btnEdit2: {
    width: '37%',
    borderWidth: 1,
    backgroundColor: Color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnChangePass2: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderColor: Color.blue,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  nameView: {
    marginLeft: '5%',
    marginTop: '3%',
  },
  text1: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
    color: Color.black,
  },
  deliveryInfo: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginTop: 0,
    color: Color.black,
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.blue,
  },
  text3: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginTop: 5,
  },
  driverName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginTop: 0,
    color: Color.black,
  },
  driverEmail: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.grey,
  },
  text4: {
    fontSize: 14,
    color: Color.grey,
    fontFamily: 'Roboto-Medium',
  },
  text5: {
    fontSize: 14,
    color: Color.white,
    fontFamily: 'Roboto-Medium',
  },
  text6: {
    fontSize: 14,
    color: Color.blue,
    fontFamily: 'Roboto-Medium',
  },
  viewDetailsText: {
    fontSize: 14,
    color: Color.blue,
    fontFamily: 'Roboto-Bold',
  },
  rejectText: {
    fontSize: 14,
    color: Color.red,
    fontFamily: 'Roboto-Medium',
  },
  acceptText: {
    fontSize: 14,
    color: Color.green,
    fontFamily: 'Roboto-Medium',
  },
  sucessBtn: {
    borderColor: Color.green,
    borderWidth: 1,
    width: '30%',
    alignItems: 'center',
    marginRight: 0,
  },

  sucessText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Color.green,
    padding: 5,
  },
  rejectText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Color.red,
    padding: 5,
  },
  image: {
    width: 40,
    height: 35,
    marginBottom: 8,
  },
  preorder: {
    width: 42,
    height: 42,
    marginBottom: 8,
  },
  image1: {
    width: 35,
    height: 35,
    marginBottom: 8,
  },
  total_deliverd: {
    width: 38,
    height: 36,
    marginBottom: 8,
  },
  totalNewdeliverCountView: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -5,
  },
  totalNewdeliverCountText: {
    fontSize: 10,
    color: Color.white,
    fontFamily: 'Roboto-Medium',
  },
  activeDeliveryImg: {
    width: 40,
    height: 32,
    marginBottom: 8,
  },
  image2: {
    width: 45,
    height: 45,
    marginBottom: 0,
    borderRadius: 8,
    marginRight: 5,
  },
  deliverView: {
    width: '31.5%',
    height: 118,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000', // The color of the shadow
    shadowOffset: {width: 0, height: 8}, // The offset of the shadow
    shadowOpacity: 0.05, // The opacity of the shadow
    shadowRadius: 13, // The blur radius
    elevation: 13,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: '0%',
    marginHorizontal: 10,
    //marginBottom:10
  },
  viewItem: {
    flexDirection: 'row',
    marginTop: '35%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text7: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: Color.PRIMARY,
    textAlign: 'center',
  },

  text8: {
    fontSize: 12,
    color: Color.grey,
    fontFamily: 'Roboto-Medium',
    marginRight: 10,
  },
  text9: {
    fontSize: 12,
    color: Color.white,
    fontFamily: 'Roboto-Medium',
    marginRight: 10,
    backgroundColor: Color.blue,
    marginTop: '3%',
    marginBottom: 10,
    padding: 10,
    width: '50%',
  },
  text10: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#8F93A0',
    textAlign: 'center',
    marginTop: -12,
  },
  deliveryMode: {
    marginRight: 10,
    backgroundColor: Color.blue,
    marginTop: '3%',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  deliveryModeText: {
    fontSize: 12,
    color: Color.white,
    fontFamily: 'Roboto-Medium',
  },
  estimatedView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: Color.blue,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: '5%',
  },
  text10: {
    fontSize: 16,
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    marginLeft: 10,
  },
  text11: {
    fontSize: 16,
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    marginRight: 10,
  },
  markasPickedText: {
    fontSize: 14,
    color: Color.darkYellow,
    fontFamily: 'Roboto-Bold',
    marginLeft: 0,
    marginTop: 0,
  },
  estimatedvalue: {
    fontSize: 14,
    color: Color.white,
    fontFamily: 'Roboto-Bold',
    marginRight: 10,
    marginLeft: 10,
  },
  pickupLoc: {
    fontSize: 12,
    color: Color.black,
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
  },
  locationCardView: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    zIndex: 99,
    marginLeft: 15,
  },
  locationCardViewDetails: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 15,
  },
  locImg: {
    marginRight: 10,
    marginTop: 4,
    width: 12,
    height: 16,
  },
  locImg2: {
    marginRight: 10,
    marginTop: 3,
    width: 12,
    height: 16,
  },
  verticalDots: {
    height: 55,
    borderColor: Color.textcolor,
    marginLeft: 0,
    borderStyle: 'dashed',
    zIndex: 0,
    borderWidth: 0.5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 2,
    width: 1,
    letterSpacing: -2,
  },
  uploadPic: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.white,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  uploadImgageView: {
    height: 100,
    width: 100,
    position: 'relative',
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  deleteItem: {position: 'absolute', right: 5, top: 5},
  where: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: Color.black,
  },
  deleteBtnImg: {width: 25, height: 25},
  whereText: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: Color.black,
    paddingRight: 40,
    color: Color.black,
  },
  dateTime: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: Color.black,
    paddingRight: 10,
  },
  whome: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: Color.blue,
  },
  locImg: {
    marginTop: 15,
  },
  googleMap: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: Color.dark_blue,
    fontFamily: 'Roboto-Medium',
    textDecorationLine: 'underline',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionView: {
    borderRadius: 8,
    width: '99%',
    marginTop: 5,
    height: 100,
  },
  userInput: {
    fontSize: 14,
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Regular',
    width: '100%',
    textAlign: 'top',
    height: 80,
    borderWidth: 1.5,
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  viewAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAmount2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.blue,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  locationCardView2: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: '13%',
    paddingTop: 10,
  },
  weightText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Color.black,
    marginLeft: 10,
  },
  weightText2: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Color.white,
    marginLeft: 5,
  },
  weightValue: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Color.black,
    marginRight: 15,
  },
  weightValue2: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Color.white,
    marginRight: 15,
  },
  nextBtnView: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Color.blue,
    borderRadius: 10,
    marginTop: '10%',
    marginBottom: '5%',
    shadowColor: 'blue',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  closeBtn: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Color.blue,
    borderRadius: 10,
    marginTop: '10%',
    marginBottom: '5%',
    shadowColor: 'blue',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  cancelBtnView: {
    width: '95%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Color.blue,
    borderRadius: 10,
    marginTop: '5%',
    marginBottom: '2%',
  },
  markPickupBtnView: {
    width: '95%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Color.blue,
    borderRadius: 10,
    marginTop: '5%',
  },
  markDelivered: {
    width: '95%',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Color.blue,
    borderRadius: 10,
    marginTop: '5%',
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Color.white,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
  },
  profilename: {
    marginTop: '11%',
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: Color.black,
  },
  rating: {
    marginHorizontal: 1,
    marginTop: 2,
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '15%',
    marginLeft: 10,
  },
  ratingCount: {
    fontSize: 12,
    color: Color.grey,
    fontFamily: 'Roboto-Medium',
  },
  EnvelopemodalView3: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 4,
    alignSelf: 'center',
    // position: 'absolute',
    bottom: -30,
    backgroundColor: Color.white,
    borderRadius: 20,
    left: 0,
    right: 0,
    width: '100%',
  },
  EnvelopemodalView: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 4,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -15,
    backgroundColor: Color.white,
    borderRadius: 20,
    left: 0,
    right: 0,
    width: '100%',
  },
  cancelModal: {
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
    backgroundColor: Color.white,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cancelRideView: {
    width: '100%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelRide: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: Color.white,
  },
  sucessParentViewModal: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  otherrReasonText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
    color: Color.black,
    marginBottom: 5,
  },
  cancelDescriptionView: {
    borderRadius: 8,
    width: '100%',
    height: 100,
    backgroundColor: Color.white,
  },
  cancelInpuReason: {
    textAlignVertical: 'top',
    fontFamily: 'Roboto-Regular',
    width: '100%',
    textAlign: 'top',
    height: 80,
    justifyContent: 'flex-start',
    borderColor: Color.emailBackgroindcolor,
    backgroundColor: Color.white,
  },
  EnvelopemodalView2: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 4,
    padding: 15,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -15,
    backgroundColor: Color.white,
    borderRadius: 20,
    alignItems: 'center',
  },
  viewAge: {
    flexDirection: 'row',
    marginTop: '0%',
  },
  checkbox: {
    width: 25,
    height: 25,
  },
  checkTouch: {
    marginRight: 8,
    marginTop: 2,
  },
  checktext: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.black,
    paddingRight: 50,
    textAlign: 'justify',
  },
  orderNo: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
    color: Color.blue,
  },
  sucessOrderNo: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
    color: Color.blue,
    marginLeft: 10,
  },
  orderText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginTop: 5,
    color: Color.black,
  },
  orderSucessText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginTop: 5,
    color: Color.black,
  },
  okBtn: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  uploadPicModalHeader: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
    color: Color.black,
    textAlign: 'center',
  },
  cancelView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  navigation: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Color.blue,
  },
  selectCancelOrder: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.blue,
    marginTop: 8,
    borderRadius: 8,
    padding: 10,
  },
  UnselectCancelOrder: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.emailBackgroindcolor,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
    padding: 10,
  },
  cancelItemText: {
    marginLeft: '5%',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: Color.black,
  },
  upload: {
    marginTop: '5%',
    flexDirection: 'row',
  },
  uploadMedia: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.blue,
    backgroundColor: Color.white,
    marginRight: 5,
  },
  uploadMediaImg: {
    width: 30,
    height: 30,
  },
  nodataFoundImg: {
    width: 200,
    height: 200,
  },
  nodataView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
    alignSelf: 'center',
  },
  nodataFonudText: {
    fontSize: 18,
    color: Color.black,
    fontFamily: 'Roboto-Bold',
    marginTop: 10,
  },
  cardviewDetails: {
    width: '100%',
    marginTop: '0%',
    padding: 0,
    backgroundColor: Color.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  detialsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  chooseWeightSize: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Color.black,
  },
  pkgNo: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Color.blue,
    textAlign: 'center',
  },
  chooseWeightSize2: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: Color.grey,
  },
  amountpaidDetail: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    backgroundColor: Color.blue,
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  amountpaidText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: Color.white,
    // marginHorizontal: 10
  },
  cameraModal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderColor: '#15141A',
    shadowColor: '#15141A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: 200,
    height: 120,
    justifyContent: 'center',
    marginTop: '0%',
  },
  cameraView: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '15%',
  },
  cameraText: {
    color: Color.black,
    fontSize: 16,
  },
  camerasep: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#98989B',
    marginTop: 10,
  },
  imgCamera: {
    width: 25,
    height: 25,
    marginRight: 10,
    tintColor: Color.blue,
  },
  imgCamera2: {
    width: 25,
    height: 25,
    marginRight: 17,
    tintColor: Color.blue,
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
    backgroundColor: Color.white,
    borderRadius: 10,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  locationText: {
    fontSize: 14,
    color: Color.black,
    fontFamily: 'Roboto-Medium',
    width: '80%',
  },
  updatelocationText: {
    fontSize: 16,
    color: Color.black,
    fontFamily: 'Roboto-Bold',
    width: '80%',
  },
  settingBtn: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
    //borderWidth:1,
    backgroundColor: Color.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '3%',
  },
  locationText2: {
    fontSize: 14,
    color: Color.white,
    fontFamily: 'Roboto-Medium',
  },
  NumberModal: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -25,
    backgroundColor: Color.white,
    borderRadius: 10,
  },
  forgetMsg: {
    fontSize: 16,
    color: Color.black,
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  forgetMsg2: {
    fontSize: 14,
    color: Color.grey,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 0,
  },
  forgetMsg3: {
    fontSize: 14,
    color: Color.blue,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 0,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    textAlign: 'center',
    color: Color.black,
    fontSize: 24,
  },
  focusCell: {
    borderColor: '#000',
  },
  otpBox: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    margin: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    marginStart: 10,
    borderColor: Color.light_grey,
    alignItems: 'center',
  },
  otpInput: {
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    color: Color.black,
    justifyContent: 'center',
    textAlign: 'center',
  },
  blueButton: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    borderRadius: 8,
    backgroundColor: Color.dark_blue,
    alignItems: 'center',
    marginBottom: '10%',
    shadowColor: 'blue',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  blueBtnText: {
    color: Color.white,
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
  modalMainView: {
    backgroundColor: Color.white,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  /////gradient
  gradientImage: {
    width: dimensions.SCREEN_WIDTH,
    height: dimensions.SCREEN_HEIGHT * 0.9,
  },
  profileImg: {
    width: 43,
    height: 43,
    resizeMode: 'contain',
  },
  statusContainer: {
    width: dimensions.SCREEN_WIDTH * 0.9,
    height: 74,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 23,
    backgroundColor: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.83)', // Adjust the color and opacity as needed
    flex: 1,
  },
  searchBar: {
    width: dimensions.SCREEN_WIDTH * 0.77,
    height: 50,
    borderRadius: 5,
    borderColor: Color.PRIMARY,
    borderWidth: 1,
    backgroundColor: Color.WHITE,
    alignSelf: 'center',
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
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
    height: 60,
    borderRadius: 5,
    backgroundColor: Color.PRIMARY,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBox: {
    shadowColor: '#000000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 8, // Vertical offset
    },
    shadowOpacity: 0.05, // Opacity of the shadow (13px * 0.01 = 0.13, then tweak for RN)
    shadowRadius: 13, // Blur radius
    elevation: 8, // For Android shadow
    backgroundColor: '#fff',
    height: 156,
    width: dimensions.SCREEN_WIDTH * 0.43,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 6,
    paddingVertical: 17,
    paddingHorizontal: 12,
  },
});

export default styles;
