import React, { Component,useState,useEffect } from "react";
import { Div, StyleSheet, View, TextInput, Text, ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { Button, Drawer } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../helpers/logo';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NewOrders from './New orders'
import getOrders from '../API_Calls/ReturningUser_Api/getOrders.js';
import get_details from '../API_Calls/ReturningUser_Api/get_details.js';
import GetOTP from '../Register/GetOTP';




 export default function Home ({navigation}) {
  const [
    orders,
    freshCount,
    onGoingingCount,
    outForDeliveryCount,
    oldCount,
    freshCountID,
    onGoingingCountID,
    outForDeliveryCountID,
    oldCountID,
    restuarantBranchId,
    restaurantName,
    deliveryPreferrenceId,
    loading
  ] = getOrders();

  const HandlePress = () =>{

     if(AsyncStorage.removeItem('key')) {

      navigation.navigate('GetOTP')
     }

  }

  const reload=()=>window.location.reload();

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.heading} >
        <Text style={{marginTop:0,color:'#000466',fontWeight:'bold',fontSize:28, maxWidth:'60%', width:'auto', height:'auto'}}> {restaurantName} </Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={(e) => HandlePress()}
          >

          <Text style={styles.logoutText}> Log Out </Text>
        </TouchableOpacity>
      </View>



    <View style={{flex:1, height: 1000}}>
     { loading === "true" ? (
        <View>
          <Text style={styles.loadingText}>Loading the orders...</Text>
        </View>
       ) : loading === "null" ? (
        <View>
         <Text style={styles.loadingText}>OOPS! Please try again!</Text>
        </View>
       ) :(
       <View style={styles.allBucketsView}>
        <TouchableOpacity
          style={styles.button1}
           onPress={(e) => {if(orders!=undefined){navigation.push("NewOrders",
            {
            Count:freshCount,
            orders:orders,
            IDArray:freshCountID,
            restaurant_id:restuarantBranchId,
            type:1,
            deliveryPreferrenceId: deliveryPreferrenceId,
            orderTypeName: 'Fresh'
          })
          }}}
          >
          <Text style={styles.buttonText1}><FontAwesome  name='star' size={25} />  New Orders ({freshCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}

          onPress={() =>
             {if(orders!=undefined){navigation.push("NewOrders",
            {
            Count:onGoingingCount,
            orders:orders,
            IDArray:onGoingingCountID,
            restaurant_id:restuarantBranchId,
            type:4,
            orderTypeName: 'Preparing'
          })
          }}}

          >

          <Text style={styles.buttonText2}><FontAwesome  name='coffee' size={25} />  Preparing Orders ({onGoingingCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button3}
            onPress={(e) => {if(orders!=undefined){navigation.push("NewOrders",
              {
              Count:outForDeliveryCount,
              orders:orders,
              IDArray:outForDeliveryCountID,
              restaurant_id:restuarantBranchId,
              type:6,
              orderTypeName: 'Out For Delivery'
            })
          }}}
            >

            <Text style={styles.buttonText3}><FontAwesome  name='truck' size={25} />  Out For Delivery ({outForDeliveryCount}) </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button4}
            onPress={(e) => {if(orders!=undefined){navigation.push("NewOrders",
              {
              Count:oldCount,
              orders:orders,
              IDArray:oldCountID,
              restaurant_id:restuarantBranchId,
              type:8,
              orderTypeName: 'Completed'
            })
          }}}
            >

            <Text style={styles.buttonText4}><FontAwesome  name='thumbs-o-up' size={25} />  Completed Orders ({oldCount}) </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  </View>
  </ScrollView>

  )

}








const styles = StyleSheet.create({
  container: {
     flex: 1,
     padding: 5,
     maxWidth: '100%',
     // backgroundColor: 'red'
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
  loadingText:{
    fontFamily: "roboto-regular",
    // fontWeight:"bold",
    fontSize:20,
    alignSelf:'center',
    color: "#000466",
    marginTop:100,
    // position: 'absolute',
    textAlign:'center',
    // marginLeft: 70,
    // minHeight: 100

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
        height: '15%',
        // width:350,
        width:'100%',
        alignSelf:'center',
        marginTop: '10%',
        borderRadius: 1.5,
        backgroundColor: '#e22a28',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        justifyContent: 'center'
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
        height: '15%',
        width:'100%',
        alignSelf:'center',
        marginTop: '10%',
        borderRadius: 5,
        backgroundColor: '#ffc009',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        justifyContent: 'center'
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
        height: '15%',
        width:'100%',
       alignSelf:'center',
        marginTop: '10%',
        borderRadius: 5,
        backgroundColor: '#fd7e14',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        justifyContent: 'center'
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
        height: '15%',
        width:'100%',
        alignSelf:'center',
        marginTop: '10%',
        borderRadius: 5,
        backgroundColor: '#08a860',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        justifyContent: 'center'
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
        // height: 70,
        // width:'20%',
        marginTop:'-10%',
        marginLeft: '10%',
        borderRadius: 5,
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
        // maxWidth:'30%',
        // width:'auto'
      },
  logoutText:{
      fontFamily: "roboto-regular",
      color: "#000466",
      textDecorationLine: 'underline',
      fontWeight:'bold',
      borderRadius: 2,
      fontSize:21,
      // width: 240,
      // height: 45,
      // marginTop:0,
      // marginLeft: 0,
      textAlign:"right"

    },
    allBucketsView:{
      width: '100%',
      height: '100%'
    },
    heading: {
      // display: 'flex',
      maxWidth:'100%',
      width:'auto',
      padding: '1%',
      marginTop: '2%',
      height: 'auto',
      minHeight: '10%'
    }
})
