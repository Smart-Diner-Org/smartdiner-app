import React from 'react'
import { StyleSheet, View,  ToastAndroid} from "react-native";



export default function resendOTP (mobNumber) {

        const data = {
                mobile: mobNumber,
              }

    
        try{

          fetch('https://testingapi.smartdiner.co/auth/resend_otp', {
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