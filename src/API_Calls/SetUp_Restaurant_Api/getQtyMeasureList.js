import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
//import saveToken from '../../helpers/Token'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function getQtyMeasureList() {

     const [isLoading, setLoading] = useState(true);
     const [data, setData] = useState([]);
     const[data1,setData1] = useState([]);
     const[list,setList] = useState([]);


    useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

       fetch('https://testingapi.smartdiner.co/after_login/get_quantity_measure_values', {

                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                     
                  }
              })
              .then((response) => response.json())
              .then((json) => {
                setData(json.measureValues),setData1(json.quantityValues) 
            })
                
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

               })
        }, []);

    return [data,data1]
}