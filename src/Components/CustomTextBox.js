// import {
//   Text,
//   TextInput,
//   View,
//   Animated,
//   Dimensions,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// import {useState, React} from 'react';
// import Color from '../global/Color';

// // global
// const H = Dimensions.get('screen').height;
// const W = Dimensions.get('screen').width;
// const CustomTextBox = ({
//   imageComponent,
//   placeholder,
//   value,
//   onChangeText,
//   err,
//   secureTextEntry = false,
// }) => {
//   const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

//   const toggleSecureEntry = () => {
//     setIsSecureTextEntry(!isSecureTextEntry);
//   };
//   console.log('error------>', err, placeholder);
//   return (
//     // { ...styles.input, borderColor: err == 2  ? '#133072' : '#FFFFFF' }
//     <View
//       style={[
//         styles.input,
//         value?.trim()?.length > 0 ? styles.selectedinput : null,
//       ]}>
//       {imageComponent && (
//         <View style={styles.imageContainer}>{imageComponent}</View>
//       )}
//       <TextInput
//         style={[styles.text, secureTextEntry && {paddingRight: 40}]}
//         value={value}
//         secureTextEntry={isSecureTextEntry}
//         placeholderTextColor="#959FA6"
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//       />
//       {secureTextEntry && (
//         <TouchableOpacity
//           style={styles.togglePassword}
//           onPress={toggleSecureEntry}>
//           <Eye width={24} height={24} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };
// export default CustomTextBox;
// const styles = StyleSheet.create({
//   input: {
//     height: 64,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderRadius: 5,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: Color.PRIMARY,
//   },
//   text: {height: 40, color: '#292929', width: '90%'},
//   togglePassword: {
//     marginRight: 12,
//   },
//   input: {
//     height: 64,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     borderRadius: 5,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: '#959FA6',
//   },
//   imageContainer: {
//     marginRight: 2,
//   },
//   text: {
//     flex: 1,
//     // Your text input styles here
//   },
//   togglePassword: {
//     position: 'absolute',
//     right: 5,
//   },
// });
import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Color from '../global/Color';

// global
const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;

const CustomTextBox = ({
  imageComponent,
  placeholder,
  value,
  onChangeText,
  err,
  secureTextEntry = false,
  editable = true,
  style
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSecureEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  // console.log('error------>', err, placeholder);

  return (
    <View
      style={[
        styles.input,
        isFocused || value?.trim()?.length > 0 ? styles.focusedInput : null,
        style
      ]}>
      {imageComponent && (
        <View style={styles.imageContainer}>{imageComponent}</View>
      )}
      <TextInput
        style={[styles.text, secureTextEntry && {paddingRight: 40}]}
        value={value}
        secureTextEntry={isSecureTextEntry}
        placeholderTextColor="#959FA6"
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.togglePassword}
          onPress={toggleSecureEntry}>
          {/* Replace <Eye /> with your eye icon component */}
          {/* <Eye width={24} height={24} /> */}
          <Image
            source={require('../assest/images/eye.png')}
            style={{width: 24, height: 24}}></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextBox;

const styles = StyleSheet.create({
  input: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center', // Center contents
    alignItems: 'center',
    borderRadius: 5, // This should match the borderRadius of the shadow
    width: '100%',
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#959FA6', // Adjust the border color as needed
    // Shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  focusedInput: {
    borderColor: Color.PRIMARY, // Border color when focused or text is present
  },
  text: {
    flex: 1,
    height: 40,
    color: '#292929',
  },
  togglePassword: {
    position: 'absolute',
    right: 5,
  },
  imageContainer: {
    marginRight: 2,
  },
});
