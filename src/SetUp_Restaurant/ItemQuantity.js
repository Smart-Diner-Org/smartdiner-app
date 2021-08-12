import React,{useState} from 'react'
import { StyleSheet, View,TextInput,Text,TouchableOpacity,KeyboardAvoidingView ,ScrollView } from "react-native";
//import {Button,Text} from 'react-native-paper';
import AutoCompleteInputView from "native-autocomplete-input";
import getQtyMeasureList from '../API_Calls/SetUp_Restaurant_Api/getQtyMeasureList';
import getCategoryList from '../API_Calls/SetUp_Restaurant_Api/getCategoryList';
import AddItems from './AddItems';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ItemQuantity({navigation,route}){

  const[categoryName,setCategoryName] = useState('')
  const[quantityName,setQuantityName] = useState('')
  const[measureName,setMeasureName] = useState('')
  const category = getCategoryList()
  const list = getQtyMeasureList()
  

  let menu = [];
          category.map(function(e){          
              menu.push(e.name)
                   
            })

      

  let menu1 = [];
       list[0].map(function(e){          
          menu1.push(e.name)                    
        })
  let menu2 = [];
        list[1].map(function(e){          
              menu2.push(e.quantity)        
        })

  const _storeCategoryId = (id) => {
              AsyncStorage.setItem('categoryId',id);
           }

  const _storeDataQ_Id = (id) => {
              AsyncStorage.setItem('quantityId',id)
           }

  const _storeDataM_Id = (id) => {
              AsyncStorage.setItem('measureId',id)
           }

           

	return(
        

        <View style={styles.container}>


            <AutoCompleteInputView
                placeholder="Enter category"
                defaultValue={categoryName}
                suggestions={menu}
                onChangeText={(value: string) => {
                  
                  category.map(function(e){
                    if(value==e.name){
                          _storeCategoryId(String(e.id))
                          console.log("+++++++++++++++++++",String(e.id))
                         }
                    })
                  
                }}
                onChangeSuggestion={(index:number, value:string) =>{
                  
                  setCategoryName(value)
                  }}
                textColor={'#000466'}
                style={styles.category}
            />

            <AutoCompleteInputView
                    placeholder="(quantity)"
                    defaultValue={quantityName}
                    suggestions={menu2}
                    autoFocus={true}
                    onChangeText={(value: string) => {
                      list[1].map(function(e){
                          if(value==e.quantity){
                                _storeDataQ_Id(String(e.id))
                                
                               }
                          })
                    }}
                    onChangeSuggestion={(index:number, quantity:string) =>{
                     setQuantityName(quantity)
                    }}
                    textColor={'#000466'}
                    fontSize={17}
                    style={styles.quantity}
            />
            <AutoCompleteInputView
              placeholder="(measure)"
              defaultValue={measureName}
              suggestions={menu1}
              onChangeText={(value: string) => {
                list[0].map(function(e){
                          if(value==e.name){
                                _storeDataM_Id(String(e.id))
                                
                               }
                          })
              }}
              onChangeSuggestion={(index:number, measure:string) =>{
                     //setMeasureName(measure)
                     navigation.navigate('AddItems',{categoryName:categoryName,quantityName:quantityName,measureName:measure})
                     
                    }}
             
              textColor={'#000466'}
              fontSize={17}
              style={styles.measure}
             />
                   
      </View>
           
		)
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     marginTop:'25%'
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
  category: {
    color: "#000466",
    padding:0,
    height: 50,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 100,
    marginLeft: 36,
  },
  quantity: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
    height: 45,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 160,
    marginLeft: 36,
  },
  measure: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
    height: 45,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 160,
    marginLeft: 150,
  },
  enterMobileNumber: {
    fontFamily: "roboto-regular",
    color: "#000466",
    marginTop: 102,
    marginLeft: 90
  },
  button: {
        height: 40,
        width:90,
        marginTop: 430,
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