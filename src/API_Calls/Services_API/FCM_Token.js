import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';


export default function FCM_Token() {
  
     const [isLoading, setLoading] = useState(true);
    
     useEffect(() => {

      AsyncStorage.getItem('fcm_Token')
                 .then((value)=>{

                 
                 const data = {
                      token: value,
                     
                  }
      

       fetch(`${REACT_APP_URL}/before_login/app/fcm/token/store`, {
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
              .then((json) => {
              	
                console.log(json)
               
              })

              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

              }) 
         }, [isLoading]);

    
}