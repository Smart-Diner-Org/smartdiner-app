import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';



export default function AddMenuItems(menuName,CategoryId,discount,priceDetail) {
   
   const data = {
        restaurantBranchId: 2,
        menuName: menuName,
        categoryId: Number(CategoryId),
        discount: Number(discount),
        priceDetails: [priceDetail]
        
      }

  AsyncStorage.getItem('key')
     .then((value)=>{

       fetch(`${REACT_APP_URL}/after_login/create_menu_with_category`, {
                  method: 'POST',
                  headers: {
                    'x-access-token':value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                    body:JSON.stringify(data)
                })
               .then((response) => response.json())
                .then((responseJson) => { 
                    ToastAndroid.show(JSON.stringify(responseJson.message), ToastAndroid.SHORT);               
                })

                .catch((error) => {
                   console.error(error);
                })
            })
}