
import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, TextInput, Text, ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import GetOTP from '../Register/GetOTP'




export default function setUpStore ({navigation}) {

  const moveScreen = () =>{
    navigation.navigate('GetOTP')
  }
  
  setTimeout(() => {
    moveScreen() //this.props.navigation.navigate('Login')
}, 100);

  	return (      
          
          <View style={styles.container}>

            <Text style={styles.text}>Setting Up Your Online Store</Text>            
            <ActivityIndicator animating={true} color='#000466' size={60} marginTop={250} fontWeight="normal" />
            
        </View>

  )
}


 

 


const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:'25%',
     
  },
  text:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:24,
    color: "#000466",
    position: 'absolute',
    alignSelf:'center',
    marginTop:125,
    height:70,
    width:176,
   
  },
   
})