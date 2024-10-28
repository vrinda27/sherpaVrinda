//import : react components
import React from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
import {styles} from './MyModalStyle';
import Toast from 'react-native-toast-message';
// import {toastConfig} from 'src/configs/ToastConfig';

const MyModal = ({visible, setVisibility, onShow, children, height}) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      onShow={onShow}
      transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={{...styles.mainView, height: height}}>{children}</View>
      </View>
      {/* <Toast config={toastConfig} /> */}
    </Modal>
  );
};

export default React.memo(MyModal);
