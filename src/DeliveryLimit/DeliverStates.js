import React,{useState} from 'react'
import { StyleSheet, View,TextInput,TouchableOpacity,KeyboardAvoidingView ,ScrollView,SafeAreaView } from "react-native";
import {Button,Text} from 'react-native-paper';
import AutoCompleteInputView from "native-autocomplete-input";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import setUpStore from './setUpStore'
import getStates from '../API_Calls/DeliveryLimitApi/getStates';

export default function DeliverStates({navigation,route}) {

  const list = getStates()

  let List = [];
          list.map(function(e){          
              List.push(e.name)
                   
            })


	return(
     <ScrollView>
          <KeyboardAvoidingView
             keyboardVerticalOffset={-500}
            behavior= "padding"
            style={styles.container}
              >
      <View>
        <AutoCompleteInputView
              suggestions={List}
              autoFocus={true}
              onChangeText={(value: string) => {
                console.log(value)
              }}
             
              textColor={'#000466'}
              style={styles.textInput}
            />
        <TouchableOpacity
              style={styles.button}
              onPress={()=>navigation.navigate('setUpStore')} 
              >
                            
                <Text style={styles.buttonText}>Next  <FontAwesome  name='arrow-right' size={20} padding={10}/></Text>
            
          </TouchableOpacity>
      </View>
     </KeyboardAvoidingView>
     </ScrollView>    
		)

}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:'25%',
     alignSelf:'center'
  },
  textInput: {
    color: "#000466",
    padding:0,
    height: 45,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 105,
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


