import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';



export default function get_details() {
  
     const [isLoading, setLoading] = useState(true);
     const [restuarant_branch_id, setbranch_id] = useState();
     const [restaurant_name,setname] = useState()
     

    useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

       fetch(`${REACT_APP_URL}/after_login/restaurant/get_details`, {
                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
                console.log(json)
               
                setbranch_id(json.restaurantEmployee.restaurant_branch
                  .restaurant_branch_menu[0].restuarant_branch_id),
                setname(json.restaurantEmployee.restaurant_branch.restaurant.name)

              })

              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

               })
        }, [isLoading]);
   
    console.log(1)

    return [restuarant_branch_id,restaurant_name]
}