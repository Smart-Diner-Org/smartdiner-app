import 'react-native-gesture-handler';   //sMARt1321kk11@
import React, { Component } from "react";
import { StyleSheet, View,Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RemotePushController from './src/services/RemotePushController';

import GetOTP from './src/Register/GetOTP';
import OTPBox from './src/Register/OTPBox';
import storeName from './src/SetUp_Restaurant/storeName';
import newUser from './src/SetUp_Restaurant/newUser';
import AddItems from './src/SetUp_Restaurant/AddItems';
import ItemQuantity from './src/SetUp_Restaurant/ItemQuantity';
import deliveryLimit from './src/DeliveryLimit/deliveryLimit';
import LimitByDistance from './src/DeliveryLimit/LimitByDistance';
import DeliverStates from './src/DeliveryLimit/DeliverStates';
import setUpStore from './src/DeliveryLimit/setUpStore';
import GetLocation from './src/DeliveryLimit/GetLocation';
import Home from './src/RegisteredUser/Home';
import NewOrders from './src/RegisteredUser/New orders';



const Stack = createStackNavigator();

 export default function App() {
  return (
        <NavigationContainer>
              <Stack.Navigator headerShown="none">
                <Stack.Screen options={{headerTitle: 'Test', headerShown: false}} name="GetOTP"  component={GetOTP} />
                <Stack.Screen  options={{headerTitle: ' ',headerTransparent: true}} name="OTPBox" component={OTPBox} />
                <Stack.Screen  options={{headerTitle: ' ',headerTransparent: true}} name="storeName" component={storeName} />
                <Stack.Screen  options={{headerTitle: ' ',headerTransparent: true}} name="AddItems" component={AddItems} />
                <Stack.Screen  options={{headerTitle: ' ',headerTransparent: true}} name="ItemQuantity" component={ItemQuantity} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="deliveryLimit"  component={deliveryLimit} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="LimitByDistance"  component={LimitByDistance} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="DeliverStates"  component={DeliverStates} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="setUpStore"  component={setUpStore} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="GetLocation"  component={GetLocation} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="Home"  component={Home} />
                <Stack.Screen options={{headerTitle: ''}} name="NewOrders"  component={NewOrders} />
                <Stack.Screen options={{headerTitle: '', headerTransparent: true}} name="newUser"  component={newUser} />
                 


              </Stack.Navigator>
              <RemotePushController/>
            </NavigationContainer>        

   )}