import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';
import axios from 'axios';



export default function getOrders() {
  const [loading, setLoading] = React.useState("true");
  const [restuarant_branch_id, setbranch_id] = useState();
  const [restaurant_name,setname] = useState()
  const [data, setData] = useState();
  const [deliveryPreferrence, setDeliveryPreferrence] = useState();

  let freshCount = 0;
  let onGoingingCount = 0;
  let outForDeliveryCount = 0;
  let oldCount = 0;
  const freshCountID = [];
  const onGoingingCountID = [];
  const outForDeliveryCountID = [];
  const oldCountID = [];

  React.useEffect(() => {
    async function getOrdersFromBE() {
      try {
        const accessToken = await AsyncStorage.getItem('key');
        const fetchRestaurantDetailResponse = await axios
        .get(
          `${REACT_APP_URL}/after_login/restaurant/get_details`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );

        if(fetchRestaurantDetailResponse && fetchRestaurantDetailResponse.data && fetchRestaurantDetailResponse.data.restaurantEmployee){
          const fetchedRestaurantDetail = fetchRestaurantDetailResponse.data;
          const restaurantId = fetchedRestaurantDetail.restaurantEmployee.restaurant_branch.restaurant_branch_menu[0].restuarant_branch_id;
          setbranch_id(restaurantId);
          setname(fetchedRestaurantDetail.restaurantEmployee.restaurant_branch.restaurant.name);
          setDeliveryPreferrence(fetchedRestaurantDetail.restaurantEmployee.restaurant_branch.delivery_partner_preference_id);
          if(restaurantId){
            const fetchOrdersResponse = await fetch(`${REACT_APP_URL}/after_login/restaurant/${restaurantId}/get_orders`, {
                 method: 'GET',
                 headers: {
                   'x-access-token':accessToken,
                    Accept: 'application/json',
                   'Content-Type': 'application/json',
                 }
            });
            const fetchedOrders = await fetchOrdersResponse.json();
            setData(fetchedOrders.orders);
            setLoading("false");
          }
          else setLoading("null");
        }
        else setLoading("null");
      }
      catch (error) {
        console.log("got exception inside get orders...");
        console.log(error);
        setLoading("null");
      }
    }
    getOrdersFromBE();
  }, []);

  if(data!==undefined){
      data.map((order) => {
        if ([1].includes(Number(order.stage_id))) {
          freshCount = freshCount + 1;
        } else if ([2, 3, 4, 5].includes(Number(order.stage_id))) {
          onGoingingCount = onGoingingCount + 1;
        } else if ([6].includes(Number(order.stage_id))) {
          outForDeliveryCount = outForDeliveryCount + 1;
        } else if ([7, 8, 9].includes(Number(order.stage_id))) {
          oldCount = oldCount + 1;
        }
      });
      data.map((order) => {
        if ([1].includes(Number(order.stage_id))) {
          freshCountID.push(order.id)
        } else if ([2, 3, 4, 5].includes(Number(order.stage_id))) {
          onGoingingCountID.push(order.id)
        } else if ([6].includes(Number(order.stage_id))) {
          outForDeliveryCountID.push(order.id)
        } else if ([7, 8, 9].includes(Number(order.stage_id))) {
         oldCountID.push(order.id)
        }

     })
  }
  return [
      data,
      freshCount,
      onGoingingCount,
      outForDeliveryCount,
      oldCount,
      freshCountID,
      onGoingingCountID,
      outForDeliveryCountID,
      oldCountID,
      restuarant_branch_id,
      restaurant_name,
      deliveryPreferrence,
      loading
  ];





/*
    useEffect(() => {
        console.log("incoming restaurant_id 2..." + restaurant_id);
      AsyncStorage.getItem('key')
                 .then((value)=>{
                 console.log("Here 2");
        console.log("incoming restaurant_id 3..." + restaurant_id);
       fetch(`${REACT_APP_URL}/after_login/restaurant/${restaurant_id}/get_orders`, {
                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
              console.log("Here 3");
                console.log(json)
                setData(json.orders)
    console.log("Here 4");
              })

              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

               })
        }, [isLoading])
        ;

console.log("Here 5");
if(data!==undefined){
    console.log("Here 6");

    data.map((order) => {

      if ([1].includes(Number(order.stage_id))) {
        freshCount = freshCount + 1;
      } else if ([2, 3, 4, 5].includes(Number(order.stage_id))) {
        onGoingingCount = onGoingingCount + 1;
      } else if ([6].includes(Number(order.stage_id))) {
        outForDeliveryCount = outForDeliveryCount + 1;
      } else if ([7, 8, 9].includes(Number(order.stage_id))) {
        oldCount = oldCount + 1;
      }
      
    });

   
    console.log("Here 7");
    data.map((order) => {

    if ([1].includes(Number(order.stage_id))) {
        freshCountID.push(order.id)   
      } else if ([2, 3, 4, 5].includes(Number(order.stage_id))) {
        onGoingingCountID.push(order.id)
      } else if ([6].includes(Number(order.stage_id))) {
        outForDeliveryCountID.push(order.id)
      } else if ([7, 8, 9].includes(Number(order.stage_id))) {
       oldCountID.push(order.id)
      }

   })
   console.log("Here 8");
}

    return [data,freshCount,onGoingingCount,outForDeliveryCount,oldCount,freshCountID,onGoingingCountID,outForDeliveryCountID,oldCountID]
    */
}





// [{
//   "createdAt": "2021-08-14T02:54:54.274Z", 
//   "customer": {
//           "createdAt": "2021-08-08T13:31:59.190Z",
//           "email": "nandhinisiva1237@smartdiner.co",
//           "id": 9, 
//           "mobile": "9042235731", 
//           "mobile_verification": true, 
//           "name": "Nandhini Siva",
//           "otp_secret": null,
//           "password": null, 
//           "remember_token": null, 
//           "role_id": "1", 
//           "updatedAt": "2021-08-14T02:54:52.262Z", 
//           "uuid": null
//         },
//   "customer_id": "9", 
//   "delivery_address_one": "sulur",
//   "delivery_address_two": "Kalangal Road, Sulur, Tamil Nadu, India",
//   "delivery_charge": "0",
//   "delivery_g_location": null, 
//   "description": null, 
//   "gst": "0", 
//   "id": 1, 
//   "lat": "11.0166895",
//   "long": "77.1303764", 
//   "mode_of_delivery_id": "1", 
//   "order_detail_menus": [[Object]], 
//   "payment_status_id": "2", 
//   "payment_type_id": "1",
//   "preBookingDetail":
//                {
//                 "createdAt": "2021-08-14T02:54:54.281Z", 
//                 "date_of_delivery": "2021-08-31", 
//                 "id": 1, 
//                 "order_id": "1", 
//                 "status": true, 
//                 "time_of_delivery": "11:30 - 14:31", 
//                 "updatedAt": "2021-08-14T02:54:54.281Z"
//               }, 
//   "restuarant_branch_id": "2", 
//   "stage_id": "7", 
//   "total_mrp_price": "280.00", 
//   "total_price": "266.00",
//   "updatedAt": "2021-08-14T13:06:06.783Z"}
//   ]


 // {"createdAt": "2021-08-14T02:54:56.392Z", 
 // "customer": {"createdAt": "2021-08-08T13:31:59.190Z",
 //  "email": "nandhinisiva1237@smartdiner.co",
 //   "id": 9, 
 //  "mobile": "9042235731", 
 //  "mobile_verification": true, 
 //  "name": "Nandhini Siva",
 //   "otp_secret": null,
 //    "password": null,
 //     "remember_token": null, 
 //     "role_id": "1", 
 //     "updatedAt": "2021-08-14T02:54:52.262Z", 
 //     "uuid": null}, 
 //     "customer_id": "9",
 //      "delivery_address_one": "sulur", 
 //      "delivery_address_two": "Kalangal Road, Sulur, Tamil Nadu, India", 
 //      "delivery_charge": "0",
 //       "delivery_g_location": null, 
 //       "description": null, 
 //       "gst": "0",
 //        "id": 2, 
 //       "lat": "11.0166895", 
 //       "long": "77.1303764", 
 //       "mode_of_delivery_id": "1", 
 //       "order_detail_menus": [[Object]], 
 //       "payment_status_id": "2", "payment_type_id": "2", 
 //       "preBookingDetail": {"createdAt": "2021-08-14T02:54:56.395Z",
 //        "date_of_delivery": "2021-08-31", 
 //        "id": 2, 
 //        "order_id": "2",
 //         "status": true, 
 //         "time_of_delivery": "11:30 - 14:31", 
 //         "updatedAt": "2021-08-14T02:54:56.395Z"}, 
 //         "restuarant_branch_id": "2", 
 //         "stage_id": "7",
 //          "total_mrp_price": "280.00", 
 //          "total_price": "266.00", 
 //          "updatedAt": "2021-08-14T13:06:11.183Z"}, 
         