import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';
import axios from 'axios';



export default function get_details() {
  
     const [isLoading, setLoading] = useState(true);
     const [restuarant_branch_id, setbranch_id] = useState();
     const [restaurant_name,setname] = useState()

    console.log("Here get_details 1");
     React.useEffect(() => {
         console.log("Here get_details 2");
         
         async function getRestaurantDetailsFromBE() {
                 console.log("get_details Here 3");
                
               try {
                    setLoading("true");
                    const accessToken = await AsyncStorage.getItem('key');
                    console.log("get_details Here 4");
                    console.log(`${REACT_APP_URL}` + "/after_login/restaurant/get_details");

                   
                    const fetchRestaurantDetailResponse = await axios
                    .get(
                      `${REACT_APP_URL}/after_login/restaurant/get_details`,
                      {
                        headers: {
                          "x-access-token": accessToken,
                        },
                      }
                    );

                    
                    // const fetchRestaurantDetailResponse = await fetch(`${REACT_APP_URL}/after_login/restaurant/get_details`, {
                    //     method: 'GET',
                    //     headers: {
                    //         'x-access-token':accessToken,
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/json',
                    //     }
                    // });
                    console.log("fetchRestaurantDetailResponse....");
                    console.log(fetchRestaurantDetailResponse);
                    
                    const fetchedRestaurantDetail = fetchRestaurantDetailResponse.data;
                    console.log("after .json");
                    console.log(fetchedRestaurantDetail);
                    setbranch_id(fetchedRestaurantDetail.restaurantEmployee.restaurant_branch.restaurant_branch_menu[0].restuarant_branch_id);
                    setname(fetchedRestaurantDetail.restaurantEmployee.restaurant_branch.restaurant.name);
                    console.log("get_details Here 5");
               }
               catch (error) {
                 console.log("got exception inside get details...");
                 alert(5);
                 alert(error);
                 console.log(error);
               }
         }
         getRestaurantDetailsFromBE();
     }, []);


     console.log("get_details Here 6");

     return [restuarant_branch_id,restaurant_name];
/*

    useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{
    console.log("value...");
    console.log(value);
    console.log(`${REACT_APP_URL}` + "/after_login/restaurant/get_details");
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
              console.log("call success");
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
    */
}