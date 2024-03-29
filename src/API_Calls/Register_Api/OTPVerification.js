import React,{useState} from 'react'
import { StyleSheet, View,ToastAndroid  } from "react-native";
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv'
import newUser from '../../SetUp_Restaurant/newUser';
import Home from '../../RegisteredUser/Home'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FCM_TokenID from '../Services_API/FCM_TokenID.js';


export default function OTPVerification (otp,mobNumber,navigation) {

 
      const data = {
              mobile: mobNumber,
              otp:otp,
              roleId: `${SUPER_ADMIN_ROLE_ID}`,
              application: 'app',
          }
        

      const _storeData = (Token) => {        
              AsyncStorage.setItem('key',Token);
           }

      AsyncStorage.getItem('isNewUser')
                 .then((isNewUser)=>{
     
      try{

           fetch(`${REACT_APP_URL}/auth/verify_otp`, {
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

                 console.log(responseJson)
                  const Token = responseJson.accessToken
   
                  if (responseJson.accessToken===undefined){

                    ToastAndroid.show(JSON.stringify("OTP was wrong! Try again"), ToastAndroid.SHORT);
                  }
                  else{

                    AsyncStorage.getItem('key').then((value)=>{
                      if(value===null){
                          AsyncStorage.setItem('key',String(Token)).then((value2) => {
                            if(responseJson.customer&& responseJson.customer.restaurants.length>0) {
                              navigation.navigate("Home")
                              FCM_TokenID(responseJson.customer.id)
                            } 
                            else{
                              navigation.navigate("newUser")
                            }
                          })
                      }
                      else{
                        if(responseJson.customer&& responseJson.customer.restaurants.length>0) {
                          navigation.navigate("Home")
                          FCM_TokenID(responseJson.customer.id)
                        } 
                        else{
                          navigation.navigate("newUser")
                        }
                      }
                    })




                    // if(AsyncStorage.getItem('key').then((value)=>{
                    //             if(value===null){
                    //                 _storeData(String(Token))
                    //             }
                    // }))
                    
                    //  if(responseJson.customer&& responseJson.customer.restaurants.length>0) {

                    //      navigation.navigate("Home")
                    //      FCM_TokenID(responseJson.customer.id)
                                                     
                    //     } 
                    //   else{
                    //     navigation.navigate("newUser")
                        
                    //   }  
                     
                  }
                })
                .catch((error) => {
                   console.error(error);
                });   
              } catch (error) {
                  console.error(error);
              }
              
           })

            }