import React,{useState,useEffect} from 'react';
import { StyleSheet, View,TextInput,Text,TouchableOpacity,KeyboardAvoidingView,ScrollView ,RefreshControl } from "react-native";
import {Button} from 'react-native-paper';
import Logo from '../helpers/logo';
import ItemQuantity from './ItemQuantity';
import getCategoryList from '../API_Calls/SetUp_Restaurant_Api/getCategoryList';
import AddMenuItems from '../API_Calls/SetUp_Restaurant_Api/AddMenuItem';
import Swiper from 'react-native-swiper';
import deliveryLimit from '../DeliveryLimit/deliveryLimit';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddItems({navigation,route}){

  const categoryName = route.params?.categoryName
  const QuantityName = route.params?.quantityName
  const MeasureName = route.params?.measureName

  const [index, setIndex] = useState(0);
  const[menuName,setMenuName]=useState('')
  const[CategoryId,setCategoryId] = useState('')
  const [QuantityId,setQuantityId] = useState('')
  const [MeasureId,setMeasureId] = useState('')
  const[originalPrice,setOriginalPrice]=useState('')
  const[discount,setDiscount]=useState('')


 AsyncStorage.getItem('categoryId')
                 .then((value)=>{setCategoryId(value)  })
 AsyncStorage.getItem('quantityId')
                 .then((value)=>{setQuantityId(value) })
 AsyncStorage.getItem('measureId')
                 .then((value)=>{setMeasureId(value) })




  const priceDetail = {
    
          "originalPrice": Number(originalPrice),
          "quantityValueId": Number(QuantityId),
          "measureValueId": Number(MeasureId)
    } 

  const handleIncrement = () => {
    setIndex(prevIndex => prevIndex + 1)
  };
  const handleDecrement = () => {
    setIndex(prevIndex => prevIndex - 1);
  }

  const HandlePress = () => {
     AddMenuItems(menuName,CategoryId,discount,priceDetail)
  }


  const InputField =(Token1)=>{
    return(
      <View style={styles.container}> 
               <TextInput 
               placeholder="(Name)"
               defaultValue={menuName}
               secureTextInput={true}
               placeholderTextColor="rgba(155,155,155,1)"
               keyboardAppearance="dark"
               clearButtonMode="while-editing"
               style={styles.textInput}
               onChangeText={(e) => setMenuName(e)}
               ></TextInput>
               <TextInput
               placeholder="(Original Price)"
               defaultValue={originalPrice}
               secureTextInput={true}
               placeholderTextColor="rgba(155,155,155,1)"
               keyboardAppearance="dark"
               clearButtonMode="while-editing"
               style={styles.textInput1}
               onChangeText={(e) => setOriginalPrice(e)}
               
               ></TextInput>
              
               <TextInput
               placeholder="(Discount %)"
               defaultValue={discount}
               secureTextInput={true}
               placeholderTextColor="rgba(155,155,155,1)"
               keyboardAppearance="dark"
               clearButtonMode="while-editing"
               style={styles.textInput2}
               onChangeText={(e) => setDiscount(e)}
               
               ></TextInput>
               
                <TextInput
                 placeholder="Item Category"
                 secureTextInput={true}
                 defaultValue={categoryName}
                 placeholderTextColor="rgba(155,155,155,1)"
                 keyboardAppearance="dark"
                 clearButtonMode="while-editing"
                 style={styles.textInput3}
                 onFocus={(e) => navigation.navigate('ItemQuantity')}
                 onChangeText={(e) => SetCategory(Value)}
                 
                 ></TextInput>
                  <Text style={styles.text1}>How are you selling?</Text>           
                <TextInput
                 placeholder="(quantity)"
                 secureTextInput={true}
                 defaultValue={QuantityName}
                 placeholderTextColor="rgba(155,155,155,1)"
                 keyboardAppearance="dark"
                 clearButtonMode="while-editing"
                 style={styles.textInput4}
                 onFocus={(e) => navigation.navigate('ItemQuantity')}
                 onChangeText={(e) => setQuantityName(e)}
                 ></TextInput>
                  <TextInput
                 placeholder="(Measure)"
                 secureTextInput={true}
                 defaultValue={MeasureName}
                 placeholderTextColor="rgba(155,155,155,1)"
                 keyboardAppearance="dark"
                 clearButtonMode="while-editing"
                 style={styles.textInput5}
                 onFocus={(e) => navigation.navigate('ItemQuantity')}
                 onChangeText={(e) => setMeasure(Measure)}
                 ></TextInput>

                 <TouchableOpacity style={styles.button} 
                    onPress={(e) => HandlePress(e)}
                  >
                  
                  <Text style={styles.buttonText}>Save Item</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}  onPress={()=>navigation.navigate('deliveryLimit')}>
                    <Text style={styles.buttonText1}>Finish adding Items</Text>
                </TouchableOpacity>
                </View>
          )
      }

    const ShowField=()=>{
          const views = [];
          for (let i = 0; i < index+1; i++) {
              views.push(       
                  <View key={i} >

                      {InputField()}
                  </View>
              );
             
          }
          return views;
    }

	return(
   
    <ScrollView >
          <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior= "padding"  >
          <Text style={styles.text}>Add Items that you are selling</Text>          
           <Swiper 
                    style={styles.wrapper} 
                    showsButtons={true}
                    index={index}
                    showsPagination={true}
                    dot={
                     <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 10, height: 10,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 0}} />
                    }
                    activeDot={
                      <View style={{backgroundColor: '#000466', width: 10, height: 10, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 0}} />
                    }  
                    nextButton={
                      <TouchableOpacity onPress={() => handleIncrement()}>
                      <Text style={styles.nextText}>›</Text>
                       </TouchableOpacity>
                    } 
                    prevButton={
                      <TouchableOpacity  onPress={() => handleDecrement()}>
                      <Text style={styles.prevText}>‹</Text>
                      </TouchableOpacity>
                    } 
                  >
                 {ShowField()}
                
              </Swiper>
                
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
  wrapper: {},
  text:{
    fontFamily: "roboto-regular",
    fontWeight:"bold",
    fontSize:18,
    marginTop:'5%',
    alignSelf:'center',
    color: "#000466",
    position: 'absolute',
    textAlign:'center',
    marginLeft: 70,
    height:50,
    width:166,
   
  },

   text1:{
    fontFamily: "roboto-regular",
    fontWeight:"normal",
    fontSize:16,
    marginTop:257,
    color: "#000466",
    position: 'absolute',    
    height:50,
    width:166,
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
    marginTop: 60,
  },
  textInput1: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
     alignSelf:'center',
    height: 40,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 110,
    
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
     alignSelf:'center',
    height: 40,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 160,
    
  },
  textInput3: {
    fontFamily: "roboto-regular",
    color: "#000466",
    position: 'absolute',
     alignSelf:'center',
    height: 40,
    width: 256,
    borderWidth: 1.5,
    borderColor: "#000466",
    borderRadius: 3,
    marginTop: 210,
    
  },
  textInput4: {
    fontFamily: "roboto-regular",
    fontSize:14,
    color: "#000466",
    position: 'absolute',
    height: 40,
    width: 70,
    borderBottomWidth:1.7,
    borderBottomColor: "#000466",
    borderRadius: 3,
    marginTop: 280,
    marginLeft:'0%'
    },
  textInput5: {
    fontFamily: "roboto-regular",
    fontSize:14,
    color: "#000466",
    position: 'absolute',
    height: 40,
    width: 30,
    borderBottomWidth:1.7,
    borderBottomColor: "#000466",
    borderRadius: 3,
    marginTop: 280,
    marginLeft:'20%'
  },
  button: {
        height: 40,
        width:90,
        marginTop: '90%',
        marginLeft:'40%',
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
    button1: {
        height: 40,
        width:140,
        marginTop: 80,
        alignSelf:'center',
        marginBottom:10,
        borderRadius: 5,
        backgroundColor: '#000466',
        
    },
    buttonText1:{
      fontFamily: "roboto-regular",
      color: "white",
      borderRadius: 2,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    prevText:{
      fontFamily: "roboto-regular",
      fontSize:40,
      color: "#000466",
      borderRadius: 2,
      marginTop:300,
      marginLeft: 20,
      textAlign:"center"
    },
    nextText:{
      fontFamily: "roboto-regular",
      fontSize:40,
      color: "#000466",
      borderRadius: 2,
      marginTop:300,
      marginRight: 20,
      textAlign:"center"
    }
    
});

