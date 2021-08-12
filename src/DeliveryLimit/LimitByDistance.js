import React,{useState,useEffect, useRef} from 'react'
import { StyleSheet, View,TextInput,TouchableOpacity,KeyboardAvoidingView ,ScrollView,SafeAreaView } from "react-native";
import {Button,Text} from 'react-native-paper';
import AutoCompleteInputView from "native-autocomplete-input";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import setUpStore from './setUpStore'
import GetLocation from './GetLocation'



export default function LimitByDistance({navigation}) {

    
 
	return(
    <ScrollView>
      <View style={styles.container}>
         <TextInput
               placeholder="(Enter delivery limit(km))"
               autoFocus={true}
               maxLength={10}
               keyboardType="numeric"
               placeholderTextColor="rgba(155,155,155,1)"
               keyboardAppearance="dark"
               clearButtonMode="while-editing"
               style={styles.textInput}
               //onChangeText={(e) => setMobile(e)}
               ></TextInput>
          
          <TouchableOpacity
              style={styles.button}
              onPress={()=>navigation.navigate('GetLocation')}
              >
                            
              <Text style={styles.buttonText}>Next <FontAwesome  name='arrow-right' size={20} padding={10}/></Text>
       
 </TouchableOpacity>
      </View>
      </ScrollView>
          
		)

}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:'25%',
     alignSelf:'center'
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  text:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:18,
    color: "#000466",
    marginTop:150,
    position: 'absolute',
    textAlign:'center',
    marginLeft: 70,
    height:60,
    width: 156,
  },
  text1:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:18,
    color: "#000466",
    marginTop:170,
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
    height: 48,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 50,
    marginLeft: 36,
  },
  textInput1: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
    height: 48,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 140,
    marginLeft: 36,
  },
  button: {
        height: 40,
        width:90,
        marginTop: '100%',
        marginLeft: 220,
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


