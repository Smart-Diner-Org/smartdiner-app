import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, TextInput, Text, ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { Button, Drawer } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../helpers/logo';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NewOrders from './New orders'
import getOrders from '../API_Calls/ReturningUser_Api/getOrders.js';
import get_details from '../API_Calls/ReturningUser_Api/get_details.js';
import GetOTP from '../Register/GetOTP'




 export default function Home ({navigation}) {
   
   const restaurant_id = get_details();
   const data = getOrders(restaurant_id[0]);

   const orders = data[0]
   const freshCount= data[1]
   const onGoingingCount = data[2]
   const outForDeliveryCount = data[3]
   const oldCount = data[4]
   const freshCountID = data[5]
   const onGoingingCountID = data[6]
   const outForDeliveryCountID = data[7]
   const oldCountID = data[8]


  const HandlePress = () =>{

     if(AsyncStorage.removeItem('key')) {
      
      navigation.navigate('GetOTP')
     }

  }

  const reload=()=>window.location.reload();

  return (      
          <ScrollView>
          <View style={styles.container}>
          <TouchableOpacity
                style={styles.logout}
                onPress={(e) => HandlePress()}
                >
                
                <Text style={styles.logoutText}> Log Out </Text>
              </TouchableOpacity>

          <Text style={{marginTop:0,color:'#000466',fontWeight:'bold',alignSelf:'center',fontSize:28}}> {restaurant_id[1]} </Text>
      
          <View style={{flex:1}}>

          <TouchableOpacity
                style={styles.button1}
                 onPress={(e) => {if(data!=undefined){navigation.push("NewOrders",
                  {
                  Count:freshCount,
                  orders:orders,
                  IDArray:freshCountID,
                  restaurant_id:restaurant_id[0],
                  type:1
                })
                }}}
                >
                <Text style={styles.buttonText1}><FontAwesome  name='star' size={25} />  New Orders ({freshCount})</Text>
              </TouchableOpacity>
          <TouchableOpacity
                style={styles.button2}
               
                onPress={() =>  
                   {if(data!=undefined){navigation.push("NewOrders",
                  {
                  Count:onGoingingCount,
                  orders:orders,
                  IDArray:onGoingingCountID,
                  restaurant_id:restaurant_id[0],
                  type:4
                })
                }}}
                     
                >
                
                <Text style={styles.buttonText2}><FontAwesome  name='coffee' size={25} />  Preparing Orders ({onGoingingCount})</Text>
              </TouchableOpacity>            
          <TouchableOpacity
                style={styles.button3}
                onPress={(e) => {if(data!=undefined){navigation.push("NewOrders",
                  {
                  Count:outForDeliveryCount,
                  orders:orders,
                  IDArray:outForDeliveryCountID,
                  restaurant_id:restaurant_id[0],
                  type:6
                })
              }}}      
                >
                
                <Text style={styles.buttonText3}><FontAwesome  name='truck' size={25} />  Out For Delivery ({outForDeliveryCount}) </Text>
              </TouchableOpacity>
          <TouchableOpacity
                style={styles.button4}
                onPress={(e) => {if(data!=undefined){navigation.push("NewOrders",
                  {
                  Count:oldCount,
                  orders:orders,
                  IDArray:oldCountID,
                  restaurant_id:restaurant_id[0],
                  type:8
                })
              }}}  
                >
                
                <Text style={styles.buttonText4}><FontAwesome  name='thumbs-o-up' size={25} />  Completed Orders ({oldCount}) </Text>
              </TouchableOpacity>
              
              
        </View>
        </View> 
        </ScrollView>
     
  )
}


 

 


const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
  text:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:18,
    alignSelf:'center',
    color: "#000466",
    marginTop:10,
    position: 'absolute',
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
    alignSelf:"center",
    height: 48,
    width: 156,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 240,
   
  },
  button1: {
        height: 70,
        width:350,
        alignSelf:'center',
        marginTop: '15%',
        borderRadius: 1.5,      
        backgroundColor: '#e22a28',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText1:{
      fontFamily: "roboto-regular",
      color: "black",
      fontSize:18,
      borderRadius: 2,
      width: 180,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    button2: {
        height: 70,
        width:350,
        alignSelf:'center',
        marginTop: '15%',
        borderRadius: 5,   
        backgroundColor: '#ffc009',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText2:{
      fontFamily: "roboto-regular",
      color: "black",
      borderRadius: 2,
      fontSize:18,
      width: 230,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    button3: {
        height: 70,
        width:350,
       alignSelf:'center',
        marginTop: '15%',
        borderRadius: 5,
        backgroundColor: '#fd7e14',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText3:{
      fontFamily: "roboto-regular",
      color: "black",
      borderRadius: 2,
      fontSize:18,
      width: 220,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    button4: {
        height: 70,
        width:350,
        alignSelf:'center',
        marginTop: '15%',
        borderRadius: 5,
        backgroundColor: '#08a860',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText4:{
      fontFamily: "roboto-regular",
      color: "black",
      borderRadius: 2,
      fontSize:18,
      width: 240,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
 logout: {
        height: 70,
        width:350,
        marginTop:18,
        marginLeft: 130,
        borderRadius: 5,
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
      },
  logoutText:{
      fontFamily: "roboto-regular",
      color: "#000466",
      textDecorationLine: 'underline',
      fontWeight:'bold',
      borderRadius: 2,
      fontSize:21,
      width: 240,
      height: 45,
      marginTop:0,
      marginLeft: 0,
      textAlign:"right"
      
    },
})



