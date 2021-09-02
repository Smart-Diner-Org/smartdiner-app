import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THE_REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';


export default function FCM_TokenID(customer_id) {   
    

     
      AsyncStorage.getItem('fcm_Token')
                 .then((value)=>{

      AsyncStorage.getItem('key')
                 .then((token)=>{

      const data = {
            token: value,                     
          }


      fetch(`${THE_REACT_APP_URL}/after_login/app/fcm/token/${customer_id}/store`, {
                  method: 'POST',
                  
                  headers: {
                    'x-access-token':token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                    data
                  ),
                 
              })
               .then((response) => response.json())
              .then((json) => {
              	
                console.log(json)
                
               
              })

              .catch((error) => console.error(error))
              
             
              }) 
          })
       


}