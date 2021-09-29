import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv'
import OTPBox from '../../Register/OTPBox';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function requestOTP (mobile,navigation) {
    
    const data={
          mobile:mobile,
          roleId: `${SUPER_ADMIN_ROLE_ID}`,
        }
    const _storeData = (isNewUser) => {        
            AsyncStorage.setItem('isNewUser',isNewUser);
        }

     try{
        fetch(`${REACT_APP_URL}/auth/check_for_account`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(data)
              })
               .then((response) => response.json())
                .then((responseJson) => {                                      
                         ToastAndroid.show(JSON.stringify(`OTP sent to ${mobile} Successfully`), ToastAndroid.SHORT);
                         navigation.navigate('OTPBox',{mobileNumber:mobile}) 

                        if(responseJson.isNewUser){
                            _storeData(String("isNewUser"))
                        }
                })

                .catch((error) => {
                  console.log("got error from the BE");
                   console.error(error);
                })
            } catch (error){
              console.log("got exception");
             console.error(error);
            }
      
}
