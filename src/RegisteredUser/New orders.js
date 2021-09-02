import React, { Component,useState,useEffect } from "react";
import { StyleSheet, View, TextInput, Text,ToastAndroid,TouchableOpacity,SafeAreaView,Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { Modal, Portal, Button, Provider,Drawer, List,Surface,RadioButton } from 'react-native-paper';
import Logo from '../helpers/logo';
import getPercentageFromBaseAndFinalValue from "../helpers/CommonFunctions";
import calculateDicountedValueForOrder from "../helpers/CommonFunctions";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import getOrders from '../API_Calls/ReturningUser_Api/getOrders.js';
import {THE_REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';



export default function NewOrders ({navigation,route}) {

   const [data, setData] = useState([]);
   const [internetCheck, setInternetCheck] = useState(0);
   const [isMounted, setIsMounted] = useState(false);
   const [visible, setVisible] = useState(false);
   const [deliveryId,setdeliveryId] = useState(0)
   const [deliveryVisible,setdeliveryVisible] = useState(false);
   const [checked, setChecked] = useState('first');
   const [ID,setId] = useState(0)
   const [stageId,setstageId] = useState();
   const [delivery_status,setdelivery_status] = useState('')
   const [delivery_status_id,setdelivery_status_id] = useState()
   const [deliveyPersonMobile,setdeliveyPersonMobile] = useState()
   const [deliveyPersonName,setdeliveyPersonName] = useState()
   const showDelivery = ()=>setdeliveryVisible(true);
   const deliveryhideModal = () => setdeliveryVisible(false);
   const showModal = () => {setVisible(true) };
   const hideModal = () => setVisible(false);
   const [value, setValue] = React.useState('first');
   const containerStyle = {backgroundColor: 'white', padding: 20, margin: 0};
   const containerStyle1 = {backgroundColor: 'white', padding: 20, marginTop: 10};

   const Count = route.params.Count
   const onGoingingCount = route.params.onGoingingCount
   const outForDeliveryCount = route.params.outForDeliveryCount
   const oldCount = route.params.oldCount
   const [orders,setOrders] = useState(route.params.orders) 

   const [ItemCount,setItemCount] = useState()
   const [ItemName,setItemName] = useState()
   const [Itemquantity,setItemquantity] = useState()
   const [ItemPrice,setItemPrice] = useState()
   const [ItemMeasure,setItemMeasure] = useState()
   const [totalPrice, setTotal_Price] = useState()
   const [totalMrpPrice,setTotal_Mrp_Price] = useState()
   const [deliveryCharge, setdeliveryCharge] = useState()
   const [gstPercentage,setGST] = useState()
   const [baseAmountWithoutGst,setbaseAmountWithoutGst] = useState()
   const [discountedPercentage,setdiscountedPercentage] = useState()
   const [gstAmount,setgstAmount] = useState()
   const [delivery_charge_gst,setdelivery_charge_gst] = useState()
   
   const [addressLine1,setaddressLine1] = useState()
   const [addressLine2,setaddressLine2] = useState()
   const [preOrder,setpreOrder] = useState()
   const [mobile,setMobile] = useState()
   const [email,setEmail] = useState()
   const [name,setName] = useState()

   const id = [];
   const date = [];
   const itemCount = [];

   
  
const cartView = () => {       

      orders.map((order)=>{
        id.push(order.id)
      })
 
      orders.map((order)=>{
        date.push(order.createdAt)                
      })
           
      orders.map((order)=>{
        itemCount.push((order.order_detail_menus).length)
        
      })

      const views = [];
      const modal = [];

       for (let i = 0; i < Count; i++) {
              views.push(
                   
                     <TouchableOpacity  onPress={(e) => { 
                               setId(id[i]) 
                               showModal()   

                               }}>

                        <Surface style={styles.surface3}>
                             {/* <Text style={styles.label}>{delivery_status}</Text>*/}
                              <Text style={styles.text2}>order Id #{id[i]}</Text>
                              <Text style={styles.text2}>{itemCount[i]} Item</Text>
                              <Text style={styles.text2}>date {date[i]}</Text>
                              <Text style={styles.text2}>Time</Text>
                        </Surface> 
                       </TouchableOpacity>    
              );             
          }
      return views;
}


const ItemView = () =>{ 
  const Items = [];

   data.map((orders)=>{

   for (let i = 0; i < data.length; i++) {
     
       Items.push(

             <Surface style={styles.surface}>

                    <Text style={styles.text}> {orders.menu_quantity_measure_price.menu.name}</Text>
                    <Text style={styles.text1}>{orders.menu_quantity_measure_price.measure_values.id}{orders.menu_quantity_measure_price.measure_values.name} Rs.{orders.menu_quantity_measure_price.price}</Text>
                    <Surface style={styles.surface1}>
                            <Text>{orders.menu_quantity_measure_price.quantity_values.quantity}</Text>
                    </Surface> 
                </Surface>
        )
     } 

      })  
   return Items
  
}


const details = [];

useEffect(() => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

       fetch(`${THE_REACT_APP_URL}/after_login/order/${ID}/get_menu_quantity_measure_price_details`, {
                  method: 'GET',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
                
                console.log(json.orderMenuDetails)
                setData(json.orderMenuDetails) 
              
              })
              .catch((error) => console.error(error))
               })
         }, [ID]);

useEffect(() => {     
      fetchData(ID)     
      getValues()    
       }, [ID]);     


const fetchData = (ID) =>{
 const label = []
    orders.map((orders)=>{
      if(orders.id == ID){
        label.push(<Text style={styles.label}>{delivery_status}</Text>)

        setTotal_Price(orders.total_price)
        setTotal_Mrp_Price(orders.total_mrp_price)
        setdeliveryCharge(orders.delivery_charge)
        setGST(orders.gst)
        setaddressLine1(orders.delivery_address_one) 
        setaddressLine2(orders.delivery_address_two)
        setpreOrder(orders.preBookingDetail)
        setMobile(orders.customer.mobile)
        setName(orders.customer.name)
        setEmail(orders.customer.email)
        setstageId(orders.stage_id)


        if(orders.delivery_requests && orders.delivery_requests.length > 0){
              var deliveryRequest = orders.delivery_requests[0];
              
               var deliverystageId = deliveryRequest.delivery_stage_id;
               setdelivery_status_id(deliverystageId)
               
              if(deliverystageId === 2 && deliveryRequest.delivery_person){
                  var runnerName = deliveryRequest.delivery_person.name;
                  var runnerContactNumber = deliveryRequest.delivery_person.mobile;
                   setdeliveyPersonMobile(runnerContactNumber)
                   setdeliveyPersonName(runnerName)

                   if(Number(delivery_status_id===1)){
                    setdelivery_status("Looking for a delivery person")
                }
                if(Number(delivery_status_id===2)){
                    setdelivery_status(`delivery person ${deliveyPersonName} & ${deliveyPersonMobile}`)
                }
                if(Number(delivery_status_id===3)){
                    setdelivery_status("Delivery got rejected")
                }
                if(Number(delivery_status_id===4)){
                    setdelivery_status("Delivery reassigned")
                }
                if(Number(delivery_status_id===5)){
                    setdelivery_status(" Delivery completed")
                }
                if(Number(delivery_status_id===6)){
                    setdelivery_status("Successfully Delivered")
                }
                if(Number(delivery_status_id===7)){
                    setdelivery_status("Undelivered")
                }
            }
                 
              }
            }

               

      })
    return label
   
    }

const getValues = () => {
 const values = (calculateDicountedValueForOrder (
                totalPrice,
                totalMrpPrice,
                deliveryCharge,
                gstPercentage
        ))
        
        setbaseAmountWithoutGst(values[0])
        setdiscountedPercentage(values[1])
        setgstAmount(values[2])
        setdelivery_charge_gst(values[3])
        console.log(values)

  }

const updateStatus = () => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

                  const data = {
                    stageId: 8,
                  }

       fetch(`${THE_REACT_APP_URL}/after_login/order/${ID}/update_status`, {
                  method: 'POST',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(data)
              })
               .then((response) => response.json())
              .then((json) => {
                console.log(json)
                setOrders(json.orders)   
                
              })

              .catch((error) => console.error(error))
             

               })
      
    
}
const cancelOrder = () => {

      AsyncStorage.getItem('key')
                 .then((value)=>{

                  const data = {
                    cancellationReason: "Others",
                  }

       fetch(`${THE_REACT_APP_URL}/after_login/order/${ID}/cancel`, {
                  method: 'POST',
                  headers: {       
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify(data)
              })
               .then((response) => response.json())
              .then((json) => {
                console.log(json)
                
              })

              .catch((error) => console.error(error))
             

               })
      
    
}

const requestDelivery = (ID)=>{


  AsyncStorage.getItem('key')
                 .then((value)=>{

                  const data = {
                    preferredDelivery : 2
                  }
            
      fetch(`${THE_REACT_APP_URL}/after_login/order/${ID}/assign_delivery_partner`, {
                  method: 'POST',
                  headers: {
                    'x-access-token':value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                    data
                  ),     
                  
              })
               .then((response) => response.json())
              .then((json) => {
                console.log(json)
                
              })

              .catch((error) => console.error(error))
             

               })

}

  	return (      
          
          <View style={styles.container}>
              <Text style={{marginTop:30,color:'white',fontWeight:'bold',alignSelf:'center',fontSize:28}}> ORDERS </Text>
            <ScrollView>
              {cartView()}
              
            </ScrollView>

            <Provider>
                      <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <ScrollView>
                              {/*{menu_details(ID)}*/}

                              <TouchableOpacity
                              style={styles.close}
                              onPress={(e) => hideModal()}   
                              >
                              <Text style={styles.closeText}> x </Text>
                              </TouchableOpacity>
                              <Text style={styles.text4}>Order Bag #{ID}</Text>
                              {ItemView()}
                              <Text style={styles.text2}>Total   {totalMrpPrice} </Text>
                              <Text style={styles.text2}>Total After Discount   {baseAmountWithoutGst} </Text> 
                              <Text style={styles.text2}>Delivery Charge     {deliveryCharge}</Text>
                              <Text style={styles.text2}>CGST({gstPercentage/2})     {((gstAmount+delivery_charge_gst)/2).toFixed(2)}</Text>
                              <Text style={styles.text2}>SGST({gstPercentage/2})     {((gstAmount+delivery_charge_gst)/2).toFixed(2)}</Text>
                              <Text style={styles.text3}>Total Paid       {totalPrice}</Text>  
                              <View style={{ borderBottomColor: '#000466',borderBottomWidth: 0.6,marginTop:20,}}/>
                              <Surface style={styles.surface2}>
                                   <View style={{flex:0.6,justifyContent:"space-evenly",flexDirection:"column",marginTop:0}}>
                                        <Text style={styles.text2}>Customer Details</Text>
                                        <Text style={styles.texty}>{name}</Text>
                                        <Text style={styles.texty}>{addressLine1}</Text>
                                        <Text style={styles.texty}>{addressLine2}</Text>
                                        <Text style={styles.text0}>{mobile}</Text>
                                        <Text style={styles.text0}>{email}</Text> 
                                        </View>

                                    <TouchableOpacity
                                          style={styles.invoice}
                                          //onPress={(e) => HandlePress(e)}   
                                          >
                                          <Text style={styles.invoiceText}> Download Invoice</Text>
                                   </TouchableOpacity>
                              </Surface> 

                              <TouchableOpacity
                              style={styles.accept}
                              onPress={(e) => {updateStatus(), showDelivery()}}   
                              > 
                              <Text style={styles.acceptText}>  Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.cancel}
                              onPress={(e) => cancelOrder()}   
                              >
                              <Text style={styles.cancelText}> Cancel</Text>
                            </TouchableOpacity>
                            </ScrollView>
                            </Modal>
                           
                        </Portal>
               </Provider>
                <Provider>
                      <Portal>
                          <Modal visible={deliveryVisible} onDismiss={deliveryhideModal} contentContainerStyle={containerStyle1}>
                           

                                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                        <View style={{flexDirection:"row"}}>
                                          <RadioButton value="first" />
                                          <Text style={styles.poptext}>Own delivery</Text>                                   
                                          
                                        </View>
                                        
                                        <View style={{flexDirection:"row"}}>
                                          
                                          <RadioButton value="second" />
                                          <Text style={styles.poptext}>Delivery Partner</Text>
                                        </View>
                                      </RadioButton.Group>
                                     <TouchableOpacity
                                          style={styles.accept}
                                          onPress={(e) => {deliveryhideModal(),requestDelivery(ID)}}   
                                          > 
                                          <Text style={styles.acceptText}>  Go -> </Text>
                                    </TouchableOpacity>
                                 
                            </Modal>
                    </Portal>
               </Provider>
            
         </View>
     
  )
}


 







 


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor:'#000466'
  },
  Logo:{
    marginTop:0,
    marginLeft:0,
    height:76,
    width: 76,
  },
  label:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:14,
      borderRadius: 8,
      width: 180,
      height: 25,
      marginTop:7,
      borderWidth:1,
      borderColor:"red",
      marginLeft: 3,
      textAlign:"center"
  },
  text:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:14,
      borderRadius: 2,
      width: 160,
      height: 85,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
  },
  poptext:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:18,
      flexDirection:'column',
      borderRadius: 2,
      width: 140,
      height: 30,
      marginTop:0,
      marginLeft: 0,
      textAlign:"center"
  },
  text0:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:14,
      borderRadius: 2,
      marginTop:30,
      marginLeft: 20,
  },
  texty:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:15,
      borderRadius: 2,
      marginTop:30,
      marginLeft: 20,
  },
  text1:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:14,
      borderRadius: 2,
      width: 100,
      height: 85,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
  },
  text2:{
    justifyContent: "space-between",
    flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
      
  },
  text3:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:18,
      borderRadius: 2,
      marginTop:10,
      marginLeft: 170,
  },
  text4:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:18,
      borderRadius: 2,
      marginTop:10,
      marginLeft: 210,
      marginBottom:10
  },
  surface: {
    padding: 10,
    height: 100,
    width: 350,
    elevation: 4,
    flexDirection:'row'
  },
  surface1: {
    padding: 8,
    height: 40,
    width: 40,
    marginLeft:15,
    marginTop:20,
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  surface2: {
    padding: 10,
    height: 200,
    width: '100%',
    marginTop:10,
    elevation: 2,
    flexDirection:'column'
  },
  surface3: {
    padding: 10,
    height: 180,
    width: '80%',
    marginLeft:40,
    marginTop:10,
    elevation: 2,
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
  close: {
        height: 40,
        width:40,
        marginLeft: 0,
        borderRadius: 1.5,
        borderWidth: 1,
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    closeText:{
      fontFamily: "roboto-regular",
      color: "red",
      fontSize:28,
      textAlign:"center"
      
    },
   invoice: {
        height: 40,
        width:140,
        marginTop: '15%',
        alignSelf:"center",
        borderRadius: 1.5,
        backgroundColor: '#000466',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    invoiceText:{
      fontFamily: "roboto-regular",
      color: "white",
      fontSize:14,
      borderRadius: 2,
      marginTop: '6%',
      marginLeft: 0,
      textAlign:"center"
      
    },
  cancel: {
        height: 40,
        width:150,
        alignSelf:"center",
        marginTop: '5%',
        borderRadius: 1.5,
        backgroundColor: '#fc424b',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    cancelText:{
      fontFamily: "roboto-regular",
      color: "black",
      fontSize:18,
      borderRadius: 2,
      width: 130,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    accept: {
        height: 40,
        width:150,
        alignSelf:"center",
        marginTop: '5%',
        borderRadius: 1.5,
        backgroundColor: '#08a860',
        shadowColor: '#000466',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },
    acceptText:{
      fontFamily: "roboto-regular",
      color: "black",
      borderRadius: 2,
      fontSize:18,
      width: 130,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
})