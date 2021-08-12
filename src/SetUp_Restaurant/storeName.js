import React,{useState,useEffect} from 'react'
import { StyleSheet, View,TextInput,Text,TouchableOpacity,ToastAndroid,KeyboardAvoidingView ,ScrollView } from "react-native";
//import {Button,Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Logo from '../helpers/logo';
import AddItems from './AddItems';

export default function storeName({navigation}){

 
  const[name,setname]=useState('')

  
   const HandlePress = () => {
       
          if(/^[A-Za-z\s]+$/.test(name)){         
              navigation.navigate('AddItems')           
            }
             else{
                ToastAndroid.show("Enter valid Name", ToastAndroid.SHORT);
             }
           

       }

	return(
     <ScrollView>
      <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior= "padding" style={styles.container} >
          <View>
            		<Text style={styles.text}>YOUR STORE NAME</Text>
            		<TextInput
            				style={styles.textInput}
            				placeholder="(Enter store name)"
                    autoFocus={true}
                    onChangeText={(e) => setname(e)}       
                 ></TextInput>
                <TouchableOpacity style={styles.button} onPress={(e) => HandlePress()} >       
                      <Text style={styles.buttonText}>Next <FontAwesome  name='arrow-right' size={20} padding={10}/></Text>
                     
                 </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
     </ScrollView>
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
    fontSize:18,
    alignSelf:'center',
    color: "#000466",
    marginTop:150,
    position: 'absolute',
    textAlign:'center',
    marginLeft: 70,
    height:60,
    width: 156,
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
    alignSelf:'center',
    height: 40,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 220,
    marginLeft: 36,
  },
  
  button: {
        height: 40,
        width:90,
        alignSelf:'flex-end',
        marginTop: '100%',
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
       
    },
    buttonText:{
      fontFamily: "roboto-regular",
      fontWeight:"600",
      fontSize:18,
      color: "#000466",
      borderRadius: 2,
      width: 100,
      height: 65,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center",
      padding:10
      
    }
});