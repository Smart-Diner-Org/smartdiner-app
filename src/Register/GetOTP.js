import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, TextInput, Text, ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../helpers/logo';
import requestOTP from '../API_Calls/Register_Api/requestOTP';
import OTPBox from './OTPBox';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { LocalNotification } from '../services/LocalPushController';
import Home from '../RegisteredUser/Home'


 export default function GetOTP ({navigation}) {

  if(AsyncStorage.getItem('key').then((value)=>{

    if(value!==null){
       navigation.navigate("Home")
    }
  }))
  {
   console.log("Not registered")
  }
  

    const [mobile, setMobile] = useState(''); 
      
    HandlePress = () => {
      
     
      if(mobile.length==10){
        
        requestOTP(mobile,navigation)   
      }
      // else{
      //     ToastAndroid.show("Enter valid mobile Number", ToastAndroid.SHORT);
          
      // }
  }    

  	return (      
      <ScrollView>
          <KeyboardAvoidingView
             keyboardVerticalOffset={-500}
            behavior= "padding"
            style={styles.container}
              >
          <SafeAreaView >
         
          <View style={styles.container}>
         
            <Logo/>
           

             <TextInput
               placeholder="(Enter mobile number)"
               autoFocus={true}
               maxLength={10}
               keyboardType="numeric"
               placeholderTextColor="rgba(155,155,155,1)"
               keyboardAppearance="dark"
               clearButtonMode="while-editing"
               style={styles.textInput}
               onChangeText={(e) => setMobile(e)}
               onSubmitEditing={HandlePress()}
               
               ></TextInput>
               
              <TouchableOpacity
                style={styles.button}
                onPress={(e) => HandlePress(e)} 	
                >
                
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            
        </View>
        
      </SafeAreaView>
     </KeyboardAvoidingView>
     </ScrollView>
  )
}


 

 


const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:'12%'   
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
    alignSelf:"center",
    height: 48,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 240,
   
  },
  button: {
        height: 40,
        width:90,
        alignSelf:"center",
        marginTop: '85%',
        borderRadius: 5,
        backgroundColor: '#000466',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    buttonText:{
      fontFamily: "roboto-regular",
      color: "white",
      borderRadius: 2,
      width: 90,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
})