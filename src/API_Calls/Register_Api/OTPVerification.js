import React,{useState} from 'react'
import { StyleSheet, View,ToastAndroid  } from "react-native";
import storeName from '../../SetUp_Restaurant/storeName';
//import saveToken from '../../helpers/Token'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OTPVerification (otp,mobNumber,navigation) {

      
  
      
      
      const data = {
              mobile: mobNumber,
              otp:otp,
          }
          

      const _storeData = (Token) => {        
              AsyncStorage.setItem('key',Token);
           }


      

      try{

           fetch('https://testingapi.smartdiner.co/auth/verify_otp', {
                  method: 'POST',
                  
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                    data
                  ),
              })
           
               .then((response) => response.json())
               .then((responseJson) => {  

                  const Token = responseJson.accessToken
   
                  if (responseJson.accessToken===undefined){

                    ToastAndroid.show(JSON.stringify("OTP was wrong! Try again"), ToastAndroid.SHORT);
                  }
                  else{
                    navigation.navigate("storeName")
                  
                   _storeData(String(Token))
                  
                   
                  }  
                })
                .catch((error) => {
                   console.error(error);
                });   
              } catch (error) {
                  console.error(error);
              }
              
    
            }