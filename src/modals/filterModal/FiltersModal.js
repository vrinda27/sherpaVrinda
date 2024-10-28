//import : react components
import React, {useRef, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
} from 'react-native';
//import : custom components
import MyText from 'components/MyText/MyText';
import DateSelector from 'components/DateSelector/DateSelector';
import MyButton from 'components/MyButton/MyButton';
// global
import {Colors, MyIcon} from 'global/Index';
//third parties
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
//styles
import {styles} from './FiltersModalStyle';

const FiltersModal = ({
  visible,
  setVisibility,
  setSelectedPropDate,
  setSelectedPropStatus,
  setSelectedPropType,
  nextFunction,
}) => {
  //variables : filter type data
  const filterProposalStatus = [
    {id: 1, name: 'Approved', value: 2},
    {id: 2, name: 'Cancelled', value: 3},
    {id: 3, name: 'Pending', value: 1},
  ];
  const filterTypeData = [
    {id: 1, name: 'Stock', value: 'stock'},
    {id: 2, name: 'Setting Changes', value: 'setting_changes'},
    {id: 3, name: 'Group Invite', value: 'group_invite'},
    {id: 4, name: 'Expulsion', value: 'expulsion'},
  ];
  const stockPropTypeData = [
    {id: 1, name: 'Buy', value: 'buy'},
    {id: 2, name: 'Sell', value: 'sell'},
  ];
  //hook : states
  const [propDate, setPropDate] = useState(new Date());
  const [propType, setPropType] = useState({});
  const [stockPropType, setStockPropType] = useState({});
  const [propStatus, setPropStatus] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  const applyFilter = () => {
    const paramsData = {
      // option_type: isFilterApply ? selectedProposalType?.value : '',
      // type: isFilterApply ? propStockType : '',
      // status: isFilterApply ? selectedPropStatus : '',
      created_date: propDate,
    };
    setSelectedPropDate(propDate);
    closeModal();
    nextFunction(paramsData);
  };
  const clearState = () => {
    setSelectedProposalType('');
    setPropStockType('');
    setSelectedOption(null);
  };
  const resetFilter = async () => {
    closeModal();
    nextFunction();
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={closeModal} style={{flex: 1}}>
          <Image
            source={require('assets/images/back-arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <MyText
            text="Filters"
            textColor={Colors.DARK_GREY}
            textAlign="center"
            fontSize={16}
            fontFamily="medium"
          />
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <ScrollView>
            {renderHeader()}
            <MyText
              text={'Select Date'}
              textColor={Colors.DARK_GREY}
              fontSize={16}
              fontFamily="medium"
              marginBottom={10}
            />
            <DateSelector
              Title={
                moment(propDate).format('YYYY/MM/DD') ==
                moment(new Date()).format('YYYY/MM/DD')
                  ? 'Select Date'
                  : // : moment(orderDate).format('MMMM Do YYYY')
                    moment(propDate).format('MM/DD/YYYY')
              }
              onPress={() => setShowCalendar(true)}
              dateViewStyle={{borderWidth: 0}}
              calenderViewStyle={{height: 50}}
            />
            <MyText
              text={'Select Status'}
              textColor={Colors.DARK_GREY}
              fontSize={16}
              fontFamily="medium"
              marginBottom={10}
              marginTop={40}
            />
            <View style={styles.flexRowView}>
              {filterProposalStatus.map((item, index) => {
                return (
                  <FilterRadioBtn
                    item={item}
                    Title={item.name}
                    value={item.value}
                    val={propStatus?.value}
                    setValue={setPropStatus}
                  />
                );
              })}
            </View>
            <MyText
              text={'Select Proposal Type'}
              textColor={Colors.DARK_GREY}
              fontSize={16}
              fontFamily="medium"
              marginVertical={10}
            />
            <View style={styles.flexRowView}>
              {filterTypeData.map(item => {
                return (
                  <FilterRadioBtn
                    item={item}
                    Title={item.name}
                    value={item.value}
                    val={propType.value}
                    setValue={setPropType}
                  />
                );
              })}
            </View>
            {Object?.keys(propType)?.length > 0 && propType == 'stock' ? (
              <>
                <MyText
                  text={'Choose Option'}
                  textColor={Colors.DARK_GREY}
                  fontSize={16}
                  fontFamily="medium"
                  marginBottom={10}
                  marginTop={20}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {stockPropTypeData.map(item => {
                    return (
                      <FilterRadioBtn
                        item={item}
                        Title={item.name}
                        val={propStockType}
                        value={stockPropType?.value}
                        setValue={setStockPropType}
                      />
                    );
                  })}
                </View>
              </>
            ) : null}
            <MyButton onPress={applyFilter} title="Apply" />
            <MyButton
              onPress={() => {
                clearState();
                setTimeout(() => {
                  resetFilter();
                }, 500);
              }}
              title="Reset"
              textColor={Colors.BLACK}
              backgroundColor={Colors.LIGHT_GREY}
            />
          </ScrollView>
        </View>
      </View>
      <DatePicker
        modal
        mode="date"
        open={showCalendar}
        date={propDate}
        maximumDate={new Date()}
        onConfirm={date => {
          setShowCalendar(false);
          setPropDate(date);
        }}
        onCancel={() => {
          setShowCalendar(false);
        }}
      />
    </Modal>
  );
};

export default FiltersModal;

const FilterRadioBtn = ({Title, item, val, value, setValue}) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        alignSelf: 'flex-start',
      }}
      onPress={() => setValue(item)}>
      <MyText
        text={Title}
        textColor={Colors.DARK_GREY}
        fontSize={14}
        marginLeft={5}
      />
    </Pressable>
  );
};
