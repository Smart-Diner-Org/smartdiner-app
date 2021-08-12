import React, { Component,useState } from "react";
import { StyleSheet, View,TextInput,Text,TouchableOpacity,Button,KeyboardAvoidingView,ScrollView} from "react-native";
import Timer from "./Timer";
import Logo from '../helpers/logo';
import storeName from '../SetUp_Restaurant/storeName';
import OTPVerification from '../API_Calls/Register_Api/OTPVerification';


import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function OTPBox ({navigation,route}) {

    
    const hoursMinSecs = { seconds: 60}
    const mobNumber = route.params.mobileNumber
    

    const OTPFilled = (code) => {
      
    OTPVerification(code,mobNumber,navigation)
     
      
    }
    

  return (
    
      <ScrollView>
          <KeyboardAvoidingView
             keyboardVerticalOffset={-500}
            behavior= "padding"
            style={styles.container}
              >
          
       <Logo/>
       <View style={{flex:0.6,justifyContent:"space-evenly",flexDirection:"row",marginTop:140}}>
       <OTPInputView
                style={{width: '70%', height: 200}}
                pinCount={4}
                autoFocusOnLoad={true}
                keyboardAppearance="dark"
                keyboardType="numeric"
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code) => OTPFilled(code)}
            />
            </View>    
         <Timer hoursMinSecs={hoursMinSecs} mobNumber={mobNumber}/>
          {/*<TouchableOpacity
                style={styles.btn}
                onPress={() => resendOTP(mobNumber)}   
                > 
                
                <Text style={styles.btnText}>Resend</Text>
              </TouchableOpacity>*/}
          </KeyboardAvoidingView>
      </ScrollView>
  );

   
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:'25%'
  },
  textInput1: {
     
    fontWeight:"600",
    alignSelf:"center",
    borderBottomWidth:1.7,
    padding:10, 
    fontSize:20, 
    height:50,
    width:"10%", 
    borderBottomColor:"#000466",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    color:"#000466",
    fontWeight:"600",
    borderWidth: 0,
    borderBottomWidth: 3,
  },
 
  underlineStyleHighLighted: {
    borderColor: "#000466",
  },
  btn: {
        flex:1,
        height: 40,
        width:90,
        marginTop: 10,
        marginLeft: 120,
        borderRadius: 5,
        backgroundColor: '#000466',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
  btnText:{
      fontFamily: "roboto-regular",
      color: "white",
      borderRadius: 2,
      width: 90,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    }
  
});