import Color from '../../global/Color';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    backgroundColor: Color.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
