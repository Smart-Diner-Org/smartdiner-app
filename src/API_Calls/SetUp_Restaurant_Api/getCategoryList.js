import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THE_REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';



export default function getCategoryList() {
  
     const [isLoading, setLoading] = useState(true);
     const [data, setData] = useState([]);

    useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

       fetch(`${THE_REACT_APP_URL}/after_login/get_menu_categories`, {
                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
                setData(json.menuCategories)
              })

              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

               })
        }, []);

    return data
}


