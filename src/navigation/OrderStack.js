import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Order from '../screens/Order/Order';
import CompletedJobDetail from '../screens/CompletedJobDetail/CompletedJobDetail';
import CompletedJob from '../screens/CompletedJob/CompletedJob';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={Order}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompletedJob"
        component={CompletedJob}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="CompletedJobDetail"
        component={CompletedJobDetail}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
