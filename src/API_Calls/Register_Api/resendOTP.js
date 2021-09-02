import React from 'react'
import { StyleSheet, View,  ToastAndroid} from "react-native";
import {THE_REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv'



export default function resendOTP (mobNumber) {

        const data = {
                mobile: mobNumber,
                roleId: `${SUPER_ADMIN_ROLE_ID}`,
              }
          
    
        try{

          fetch(`${THE_REACT_APP_URL}/auth/resend_otp`, {
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
                 
                   ToastAndroid.show(JSON.stringify("OTP resended Successfully"), ToastAndroid.SHORT);              
                })
                .catch((error) => {
                   console.error(error);
                });   
              } catch (error) {
             console.error(error);
              }
            }