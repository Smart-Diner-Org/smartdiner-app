import React,{useState,useEffect} from 'react'
import { StyleSheet, View,TextInput,Text,TouchableOpacity,ToastAndroid,KeyboardAvoidingView ,ScrollView } from "react-native";
//import {Button,Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Logo from '../helpers/logo';
import AddItems from './AddItems';

export default function newUser({navigation}){



	return(
    
          <View>
            		<Text style={styles.text}>Thanks for registering with Smart Diner.</Text>
                 <Text style={styles.text1}>We will get back to you soon.</Text>
            		
          </View>
     
		)
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop: '25%',
  },
  text:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:24,
    alignSelf:'center',
    color: "#000466",
    marginTop:250,
    position: 'absolute',
    textAlign:'center',
    marginLeft: 70,
   
  },
  text1:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:24,
    alignSelf:'center',
    color: "#000466",
    marginTop:320,
    position: 'absolute',
    textAlign:'center',
    marginLeft: 70,
   
  },
  
});