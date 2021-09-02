import React, { Component,useState,useEffect } from 'react'
import { StyleSheet, View,Text ,ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THE_REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';



export default function getOrders() {
  
     const [isLoading, setLoading] = useState(true);
     const [data, setData] = useState([]);
      

    useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

       fetch(`${THE_REACT_APP_URL}/after_login/restaurant/2/get_orders`, {
                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
                
                setData(json.orders)

              })

              .catch((error) => console.error(error))
              .finally(() => setLoading(false));

               })
        }, []);
   


    return data
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
         