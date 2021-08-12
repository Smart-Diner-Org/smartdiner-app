import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import OTPBox from '../../Register/OTPBox';


export default function requestOTP (mobile,navigation) {

 
    
    const data={
          mobile:mobile,
          roleId: 1,
        } 

     try{
        fetch('https://testingapi.smartdiner.co/auth/check_for_account', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(data)
              })
               .then((response) => response.json())
                .then((responseJson) => { 
                   ToastAndroid.show(JSON.stringify("OTP sent Successfully"), ToastAndroid.SHORT);
                   navigation.navigate('OTPBox',{mobileNumber:mobile}) 
                               
                })

                .catch((error) => {
                   console.error(error);
                })
            } catch (error){
             console.error(error);
            }
      
}
