import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';


export default function getStates(Token) {


   const [isLoading, setLoading] = useState(true);
     const [data, setData] = useState([]);

    useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

       fetch(`${REACT_APP_URL}/after_login/get_states`, {
                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
                setData(json.states)
              })

              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

               })
        }, []);
            
            return data
}