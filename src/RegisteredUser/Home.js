import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, TextInput, Text, ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { Button, Drawer } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Logo from '../helpers/logo';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NewOrders from './New orders'
import getOrders from '../API_Calls/ReturningUser_Api/getOrders.js';




 export default function Home ({navigation}) {
    
   const orders = getOrders()
   
   const[freshCount,setfreshCount]=useState()
   const[onGoingingCount,setonGoingingCount]=useState()
   const[outForDeliveryCount,setoutForDeliveryCount]=useState()
   const[oldCount,setoldCount]=useState()

   
   const count = (orders) =>{
    let freshCount = 0;
    let onGoingingCount = 0;
    let outForDeliveryCount = 0;
    let oldCount = 0;
    orders.map((order) => {
      if ([1].includes(Number(order.stage_id))) {
        freshCount = freshCount + 1;
      } else if ([2, 3, 4, 5].includes(Number(order.stage_id))) {
        onGoingingCount = onGoingingCount + 1;
      } else if ([6].includes(Number(order.stage_id))) {
        outForDeliveryCount = outForDeliveryCount + 1;
      } else if ([7, 8, 9].includes(Number(order.stage_id))) {
        oldCount = oldCount + 1;
      }
      setfreshCount(freshCount) 
      setonGoingingCount(onGoingingCount)
      setoutForDeliveryCount(outForDeliveryCount) 
      setoldCount( oldCount)
      
    });
  }  
   



  	return (      

          <View style={styles.container}>

          <Text style={{marginTop:50,color:'#000466',fontWeight:'bold',alignSelf:'center',fontSize:28}}> ADMIN PANEL </Text>
      
          <View style={{flex:1}}>
         
          <TouchableOpacity
                style={styles.button1}
                 onPress={(e) => {count(orders),navigation.navigate("NewOrders",
                  {
                  Count:freshCount,
                  orders:orders
                })
                }}
                >
                <Text style={styles.buttonText1}><FontAwesome  name='star' size={25} />  New Orders</Text>
              </TouchableOpacity>
          <TouchableOpacity
                style={styles.button2}
               
                onPress={() =>  
                   {count(orders),navigation.navigate("NewOrders",
                  {
                  Count:onGoingingCount,
                  orders:orders
                })
                }}
                     
                >
                
                <Text style={styles.buttonText2}><FontAwesome  name='coffee' size={25} />  Preparing Orders</Text>
              </TouchableOpacity>            
          <TouchableOpacity
                style={styles.button3}
                onPress={(e) => {count(orders),navigation.navigate("NewOrders",
                  {
                  Count:outForDeliveryCount,
                  orders:orders
                })
              }}      
                >
                
                <Text style={styles.buttonText3}><FontAwesome  name='truck' size={25} />  Out For Delivery</Text>
              </TouchableOpacity>
          <TouchableOpacity
                style={styles.button4}
                onPress={(e) => {count(orders),navigation.navigate("NewOrders",
                  {
                  Count:oldCount,
                  orders:orders
                })
              }}   
                >
                
                <Text style={styles.buttonText4}><FontAwesome  name='thumbs-o-up' size={25} />  Completed Orders</Text>
              </TouchableOpacity>
              
        </View>
        </View> 
     
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
        marginLeft:10,
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
        marginLeft:10,
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
        marginLeft:10,
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
        marginLeft:10,
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
})



