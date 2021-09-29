import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, TextInput, Text, ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { Button } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DeliverStates from './DeliverStates';
import LimitByDistance from './LimitByDistance'
import setUpStore from './setUpStore'



export default function deliveryLimit ({navigation,route}) {

 

  	return (      
         <ScrollView>
          <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior= "padding" style={styles.container} >
          <View style={styles.container}>
            <Text style={styles.text}>What is your Delivery Limit</Text>

             <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate('LimitByDistance')}>
                    <Text style={styles.buttonText1}>Limit by distance</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button2} onPress={()=>navigation.navigate('setUpStore')}>
                    <Text style={styles.buttonText2}>Delivery all over India</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button3} onPress={()=>navigation.navigate('DeliverStates')}>
                    <Text style={styles.buttonText3}>Deliver to particular states</Text>
              </TouchableOpacity>
               
             
        </View>
        </KeyboardAvoidingView>
     </ScrollView>
  )
}


 

 


const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:'5%'
  },
  text:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:22,
    color: "#000466",
    position: 'absolute',
    alignSelf:'center',
    marginLeft: 70,
    marginTop:25,
    height:70,
    width:166,
   
  },
  button1: {
        height: 40,
        width:240,
        marginTop: '40%',
        alignSelf:'center',
        borderRadius: 5,
        backgroundColor: '#000466',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText1:{
      fontFamily: "roboto-regular",
      fontSize:16,
      color: "white",
      borderRadius: 2,
      width: 240,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    button2: {
        height: 40,
        width:240,
        marginTop: 30,
        alignSelf:'center',
        borderRadius: 5,
        backgroundColor: '#000466',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText2:{
      fontFamily: "roboto-regular",
      fontSize:16,
      color: "white",
      borderRadius: 2,
      width: 240,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    button3: {
        height: 40,
        width:240,
        marginTop: 30,
         alignSelf:'center',
        borderRadius: 5,
        backgroundColor: '#000466',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText3:{
      fontFamily: "roboto-regular",
      fontSize:16,
      color: "white",
      borderRadius: 2,
      width: 240,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
      
})