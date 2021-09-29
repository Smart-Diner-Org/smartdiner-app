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
import Home from './Home';
import {REACT_APP_URL,SUPER_ADMIN_ROLE_ID} from 'react-native-dotenv';
import { deliveryStageStatus, roleIDs, deliveryPreferences, paymentStatuses, paymentTypes, paymentStatuseText } from '../helpers/constants';



export default function NewOrders ({navigation,route}) {

   const [loading, setLoading] = React.useState("true");
   const [isSaving, setIsSaving] = React.useState(false);
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
   const [deliveryPersonDetail, setDeliveryPersonDetail] = useState();
   const showDelivery = () =>{if(type===1){setdeliveryVisible(true)}};
   const deliveryhideModal = () => setdeliveryVisible(false);
   const showModal = () => {setVisible(true) };
   const hideModal = () => setVisible(false);
   const [value, setValue] = React.useState('first');
   const containerStyle = {backgroundColor: 'white', padding: 20, margin: 10};
   const containerStyle1 = {backgroundColor: 'white', padding: 20, marginTop: 10};

   const Count = route.params.Count;
   const arr = route.params.IDArray;
   const restaurant_id = route.params.restaurant_id;
   const type = route.params.type
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
   const [baseAmountWithoutGst,setbaseAmountWithoutGst] = useState(0)
   const [priceWithoutDeliveryCharge,setpriceWithoutDeliveryCharge] = useState(0)
   const [discountedPercentage,setdiscountedPercentage] = useState(0)
   const [gstAmount,setgstAmount] = useState(0)
   const [delivery_charge_gst,setdelivery_charge_gst] = useState(0)
   
   const [addressLine1,setaddressLine1] = useState()
   const [addressLine2,setaddressLine2] = useState()
   const [preOrder,setpreOrder] = useState()
   const [mobile,setMobile] = useState()
   const [email,setEmail] = useState()
   const [name,setName] = useState()
   const [deliveryPreferrenceId, setDeliveryPreferrence] = useState(route.params.deliveryPreferrenceId);
   const [paymentTypeId, setPaymentTypeId] = useState();
   const [paymentStatusId, setPaymentStatusId] = useState();
   const [deliveryServiceCharge, setDeliveryServiceCharge] = useState();

const date = [];
const itemCount = [];
const deliveryStatuses = [];
const paymentStatus = [];

const cartView = () => {
    for (let i = 0; i <  arr.length; i++) { 

      orders.map((order)=>{

          if(order.id == arr[i]){

              const createdDate = new Date( order.createdAt );


                let hours = createdDate.getHours();
                let minutes = createdDate.getMinutes();
                let ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes.toString().padStart(2, '0');
                let strTime = hours + ':' + minutes + ' ' + ampm;


              date.push(strTime + ", " + createdDate.toDateString());




            itemCount.push((order.order_detail_menus).length)
            paymentStatus.push(paymentStatuseText[order.payment_status_id]);
            const tempDeliveryData = {};
            if(order.delivery_requests && order.delivery_requests.length>0 && order.delivery_requests[0]){
                tempDeliveryData['status'] = deliveryStageStatus[order.delivery_requests[0].delivery_stage_id];
                if(order.delivery_requests[0].price)
                    tempDeliveryData['deliveryPrice'] = "Delivery charge - " + order.delivery_requests[0].price;
                if(order.delivery_requests && order.delivery_requests[0]['delivery_person']
                 && order.delivery_requests[0]['delivery_person']['role_id'] == roleIDs.deliveryAgent)
                 tempDeliveryData['deliveryPersonDetail'] = order.delivery_requests[0]['delivery_person']['name'] + ' - ' +  order.delivery_requests[0]['delivery_person']['mobile']
            }
            deliveryStatuses.push(tempDeliveryData);
        }
      })
  }

      const views = [];
      const modal = [];
     

       for (let i = 0; i < Count; i++) {
        if(deliveryStatuses[i] && deliveryStatuses[i]['status'] && deliveryStatuses[i]['deliveryPersonDetail']){
              views.push(
                 <TouchableOpacity  onPress={(e) => {
                   setId(arr[i])
                   showModal()
                   }}>
                    <Surface style={styles.surface3}>
                      <Text style={styles.label}>{deliveryStatuses[i]['status']}</Text>
                      <Text style={styles.label}>{deliveryStatuses[i]['deliveryPersonDetail']}</Text>
                      <Text style={styles.label}>{deliveryStatuses[i]['deliveryPrice']}</Text>
                      <Text style={styles.text2}>order Id #{arr[i]}</Text>
                      <Text style={styles.text2}>{itemCount[i]} Item</Text>
                      <Text style={styles.paymentStatus}>{paymentStatus[i]}</Text>
                      <Text style={styles.text2}>Order received at {date[i]}</Text>
                    </Surface>
                   </TouchableOpacity>
              );
        }
        else if (deliveryStatuses[i] && deliveryStatuses[i]['status'] && !deliveryStatuses[i]['deliveryPersonDetail']){
            views.push(
                 <TouchableOpacity  onPress={(e) => {
                           setId(arr[i])
                           showModal()


                           }}>

                    <Surface style={styles.surface3}>
                          <Text style={styles.label}>{deliveryStatuses[i]['status']}</Text>
                          <Text style={styles.text2}>order Id #{arr[i]}</Text>
                          <Text style={styles.text2}>{itemCount[i]} Item</Text>
                          <Text style={styles.paymentStatus}>{paymentStatus[i]}</Text>
                          <Text style={styles.text2}>Order received at {date[i]}</Text>
                    </Surface>
                   </TouchableOpacity>
            );
        }
        else{
            views.push(
                 <TouchableOpacity  onPress={(e) => {
                           setId(arr[i])
                           showModal()
                           }}>
                    <Surface style={styles.surface3}>
                          <Text style={styles.text2}>order Id #{arr[i]}</Text>
                          <Text style={styles.text2}>{itemCount[i]} Item</Text>
                          <Text style={styles.paymentStatus}>{paymentStatus[i]}</Text>
                          <Text style={styles.text2}>Order received at {date[i]}</Text>
                    </Surface>
                   </TouchableOpacity>
            );
        }
       }
      return views;
}



useEffect(() => {
    setLoading("true");
      AsyncStorage.getItem('key')
                 .then((value)=>{


       fetch(`${REACT_APP_URL}/after_login/order/${ID}/get_menu_quantity_measure_price_details`, {
                  method: 'GET',
                  headers: {
                    'x-access-token':value,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
               .then((response) => response.json())
              .then((json) => {
                setData(json.orderMenuDetails)
                setLoading("false");
              })
              .catch((error) => console.error(error))
                setLoading("null");
               })
}, [ID]);



const ItemView = () => { 
 
 const view = [];

    data.map((orders)=>{ 
         view.push(

             <Surface style={styles.surfaceNithish}>
                    <Text style={styles.textNithish}> {orders.menu_quantity_measure_price.menu.name}</Text>
                    <View style={styles.viewNithish}>
                      <Text style={styles.quantityMeasure}>{orders.menu_quantity_measure_price.measure_values.id}{orders.menu_quantity_measure_price.measure_values.name}</Text>
                      <Text style={styles.itemPrice}>Rs.{orders.menu_quantity_measure_price.price}</Text>
                    </View>
                    <Surface style={styles.surface1Nithish}>
                            <Text>{orders.menu_quantity_measure_price.quantity_values.quantity}</Text>
                    </Surface> 
                </Surface>
              )
            })
        

    
   return view
  
}


useEffect(() => {
    async function initiate() {


        await setTotal_Price(null)
        await setTotal_Mrp_Price(null)
        await setdeliveryCharge(null)
        await setGST(null)
        await setaddressLine1(null)
        await setaddressLine2(null)
        await setpreOrder(null)
        await setMobile(null)
        await setName(null)
        await setEmail(null)
        await setstageId(null)
        await setdelivery_status_id(null)
        await setdelivery_status(null)
        await setdeliveyPersonMobile(null)
        await setdeliveyPersonName(null)
        await setDeliveryPersonDetail(null);
        await setPaymentTypeId(null);
        await setPaymentStatusId(null);
        await setDeliveryServiceCharge(null);

        const orderData = await fetchData(ID)

        await setTotal_Price(orderData[0])
        await setTotal_Mrp_Price(orderData[1])
        await setdeliveryCharge(orderData[2])
        await setGST(orderData[3])
        await setaddressLine1(orderData[4])
        await setaddressLine2(orderData[5])
        await setpreOrder(orderData[6])
        await setMobile(orderData[7])
        await setName(orderData[8])
        await setEmail(orderData[9])
        await setstageId(orderData[10])
        await setPaymentTypeId(orderData[11]);
        await setPaymentStatusId(orderData[12]);
        await setdelivery_status(orderData[13])
        await setDeliveryPersonDetail(orderData[14]);
        await setDeliveryServiceCharge(orderData[15]);

        if(orderData[0]){
            await getValues(
                orderData[0],
                orderData[1],
                orderData[2],
                orderData[3]
            )
        }
    }
    if(ID){
        initiate();
    }
}, [ID]);


async function fetchData (ID){
    const label = []
    orders.map(async (orders)=>{
      if(orders.id == ID){
        label.push(orders.total_price);
        label.push(orders.total_mrp_price);
        label.push(orders.delivery_charge);
        label.push(orders.gst);
        label.push(orders.delivery_address_one);
        label.push(orders.delivery_address_two);
        label.push(orders.preBookingDetail);
        label.push(orders.customer.mobile);
        label.push(orders.customer.name);
        label.push(orders.customer.email);
        label.push(orders.stage_id);
        label.push(orders.payment_type_id);
        label.push(orders.payment_status_id);
        if(orders.delivery_requests && orders.delivery_requests.length > 0){
              var deliveryRequest = orders.delivery_requests[0];
              
               var deliverystageId = deliveryRequest.delivery_stage_id;
                label.push(deliveryStageStatus[deliverystageId]);

                 if(deliveryRequest['delivery_person'] && deliveryRequest['delivery_person']['role_id'] == roleIDs.deliveryAgent){
                    label.push(": " + deliveryRequest['delivery_person']['name'] + " - " + deliveryRequest['delivery_person']['mobile']);
                    if(deliveryRequest['price']){
                        label.push("Delivery charge: " + deliveryRequest.price);
                     }
                 }
              }
            }
      })
    return label
    }

async function getValues (totalPrice, totalMrpPrice, deliveryCharge, gstPercentage) {
    const values = (calculateDicountedValueForOrder (
        totalPrice,
        totalMrpPrice,
        deliveryCharge,
        gstPercentage
    ))
        
    setbaseAmountWithoutGst(values[0])
    setpriceWithoutDeliveryCharge(values[1])
    setdiscountedPercentage(values[2])
    setgstAmount(values[3])
    setdelivery_charge_gst(values[4])
  }

const reload=()=>window.location.reload();

async function acceptOrder(){
    if(Number(paymentTypeId) === Number(paymentTypes['onlinePayment']) && !(Number(paymentStatusId) === Number(paymentStatuses['paid']))){
        alert("Can't accept!\nThe payment not received yet.");
        return true;
    }
    if (deliveryPreferrenceId === deliveryPreferences["all"]) {
        showDelivery();
    }
    else if(deliveryPreferrenceId === deliveryPreferences["service"]){
        requestDelivery(deliveryPreferences["service"]);
    }
    else{
        updateStatus();
    }
}

const updateStatus = () => {
        setIsSaving(true);
      AsyncStorage.getItem('key')
                 .then((value)=>{
                  let stageId = 0;
                  if(type===1){
                    stageId=type+3;

                    
                  }else if(type===4){
                    stageId=type+2;
                  }else if(type===6){
                    stageId=type+2;
                  }else if(type===8){
                    stageId=type;
                  }

                  const data = {
                    stageId: Number(stageId),
                  }
       fetch(`${REACT_APP_URL}/after_login/order/${ID}/update_status`, {
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
                setIsSaving(false);
                navigation.push("Home")
              })

              .catch((error) => {console.error(error);setIsSaving(false);})
               })
      
    
}
const cancelOrder = () => {
     setIsSaving(true);
      AsyncStorage.getItem('key')
                 .then((value)=>{
                  const data = {
                    cancellationReason: "Others",
                  }

       fetch(`${REACT_APP_URL}/after_login/order/${ID}/cancel`, {
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
                  setIsSaving(false);
                  navigation.push("Home")
              })

              .catch((error) => console.error(error))
             

               })
      
    
}

async function requestDelivery(){
    setIsSaving(true);
    try{
        const accessToken = await AsyncStorage.getItem('key');
    //  AsyncStorage.getItem('key')
    //                 .then((value)=>{
        const data = {
            preferredDelivery : 2
        }
        const requestDeliveryResponse = await fetch(`${REACT_APP_URL}/after_login/order/${ID}/assign_delivery_partner`, {
            method: 'POST',
            headers: {
                'x-access-token': accessToken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                data
            )
        });
        if(requestDeliveryResponse){
            const deliveryRequest =  await requestDeliveryResponse.json();
            if(requestDeliveryResponse.status === 200){
                deliveryhideModal();
                updateStatus();
            }
            else if(deliveryRequest && deliveryRequest.message){
                alert('Could not assign a delivery partner.' + deliveryRequest.message)
            }
            else{
                alert("Something happened! Could not assign a delivery partner.")
            }
        }
        else{
            alert("Something happened! Could not assign a delivery partner.")
        }
        setIsSaving(false);
    }
    catch (error) {
        console.log("got exception inside request delivery...");
        alert("Something happened! Could not assign a delivery partner.")
        console.log(error);
        setIsSaving(false);
    }

//        .catch((error) => console.error(error))
//               })

}


const getInvoice = (ID)=>{


  AsyncStorage.getItem('key')
                 .then((value)=>{


      fetch(`${REACT_APP_URL}/after_login/order/${ID}/get_invoice`, {
                  method: 'GET',
                  headers: {
                    'x-access-token':value,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },    
                  
              })
               .then((response) => response.json())
              .then((json) => {
              })

              .catch((error) => console.error(error))
             

               })

}

  	return (      
          
          <View style={styles.container}>
              <Text style={{marginTop:30,color:'white',fontWeight:'bold',alignSelf:'center',fontSize:28}}> {route.params.orderTypeName} Orders </Text>
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
                              <View>
                                  <Text style={styles.text4}>Order Bag #{ID}</Text>
                                  <Text style={styles.text4}>{delivery_status}{deliveryPersonDetail}</Text>
                                  {deliveryServiceCharge && <Text style={styles.text4}>{deliveryServiceCharge}</Text>}
                              </View>
                                { loading === "true" ? (
                                        <View>
                                          <Text style={styles.loadingText}>Loading the order detail...</Text>
                                        </View>
                                       ) : loading === "null" ? (
                                        <View>
                                         <Text style={styles.loadingText}>OOPS! Please try again!</Text>
                                        </View>
                                       ) :(
                                            ItemView()
                                            )}
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.priceDetailsText1}>Total    </Text>
                                <Text style={styles.priceDetailsText2}>{totalMrpPrice}</Text>
                              </View>
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.priceDetailsText1}>Discount on MRP </Text>
                                <Text style={styles.priceDetailsText2}> {discountedPercentage} %</Text>
                               </View>
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.priceDetailsText1}>Total After Discount</Text>
                                <Text style={styles.priceDetailsText2}> {baseAmountWithoutGst}</Text>
                               </View>
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.priceDetailsText1}>Delivery Charge </Text>
                                <Text style={styles.priceDetailsText2}> {deliveryCharge}</Text>
                               </View>
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.priceDetailsText1}>CGST({gstPercentage/2})</Text>
                                <Text style={styles.priceDetailsText2}> {Number((+gstAmount/2)+(+delivery_charge_gst/2)).toFixed(2)}</Text>
                               </View>
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.priceDetailsText1}>SGST({gstPercentage/2})</Text>
                                <Text style={styles.priceDetailsText2}> {Number((+gstAmount/2)+(+delivery_charge_gst/2)).toFixed(2)}</Text>
                               </View>
                              <View style={styles.priceDetailsView}>
                                <Text style={styles.text3}>Total Paid</Text>
                                <Text style={styles.text3}> {totalPrice}</Text>
                              </View>
                              <View style={{ borderBottomColor: '#000466',borderBottomWidth: 0.6,marginTop:20,}}/>
                              <Surface style={styles.surface2}>
                               <View style={{flexDirection:"column"}}>
                                   <View style={{flexDirection:"column"}}>
                                        <Text style={styles.text22}>Customer Details : </Text>
                                        <Text style={styles.text0}>{name}</Text>
                                        <Text style={styles.text0}>{addressLine1}</Text>
                                        <Text style={styles.text0}>{addressLine2}</Text>
                                        <Text style={styles.text0}>{mobile}</Text>
                                        <Text style={styles.text0}>{email}</Text> 
                                        <TouchableOpacity
                                          style={styles.invoice}
                                          onPress={() => getInvoice(ID)}   
                                          >
                                          <Text style={styles.invoiceText}> Download Invoice</Text>
                                        </TouchableOpacity>
                                      </View>  

                                    
                                   </View>
                              </Surface>
                              {isSaving ? (
                               <View>
                                <Text style={styles.acceptText}> Saving... </Text>
                               </View>
                               ): (
                               <View>
                              { type===1 ? (
                                  <TouchableOpacity
                                  style={styles.accept}
                                  onPress={(e) =>  acceptOrder()}
                                  >
                                  <Text style={styles.acceptText}> Accept </Text>
                                </TouchableOpacity> ) : type===4 ? (
                                <TouchableOpacity
                                  style={styles.accept}
                                  onPress={(e) =>  updateStatus()}
                                  >
                                  <Text style={styles.acceptText}> Out For Delivery </Text>
                                </TouchableOpacity>
                                ) : type===6 ? (
                                <TouchableOpacity
                                  style={styles.accept}
                                  onPress={(e) =>  updateStatus()}
                                  >
                                  <Text style={styles.acceptText}> Delivered </Text>
                                </TouchableOpacity>
                                ) : (
                                    <View>
                                      <Text style={styles.acceptText}></Text>
                                    </View>
                                )}
                             { type !== 8 && (
                            <TouchableOpacity
                              style={styles.cancel}
                              onPress={(e) => cancelOrder()}   
                              >
                              <Text style={styles.cancelText}> Cancel</Text>
                            </TouchableOpacity>
                            )}
                            </View>
                            )}
                            </ScrollView>
                            </Modal>
                           
                        </Portal>
               </Provider>
                <Provider>
                      <Portal>
                          <Modal visible={deliveryVisible} contentContainerStyle={containerStyle1}>
                           

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
                                      {isSaving ? (
                                     <View>
                                      <Text style={styles.acceptText}> Saving... </Text>
                                     </View>
                                     ): (
                                     <View>
                                         {<TouchableOpacity
                                              style={styles.accept}
                                              onPress={(e) => {requestDelivery()}}
                                              >
                                              <Text style={styles.acceptText}>  Go -> </Text>
                                        </TouchableOpacity>}
                                     </View>)}
                                 
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
      width: 120,
      height: 85,
      marginTop:10,
      marginLeft: 0,
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
      marginTop:5,
      marginLeft: 0,
  },
  texty:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:15,
      borderRadius: 2,
      marginTop:30,
      marginLeft: 0,
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
  text22:{
    
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    fontWeight:'bold',
    borderRadius: 2,
    marginTop:5,
      
  },
  text21:{
    justifyContent: "space-between",
    flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    marginLeft:210,
      
  },
  text20:{
    justifyContent: "space-between",
    flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    marginLeft:104,
      
  },
  text23:{
    justifyContent: "space-between",
    flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    marginLeft:130,
      
  },
  text24:{
    justifyContent: "space-between",
    flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    marginLeft:140,
      
  },
  text25:{
    justifyContent: "space-between",
    flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    marginLeft:190,
      
  },
  text3:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:18,
      fontWeight:'bold',
      borderRadius: 2,
      marginTop:10,
      // marginLeft: 160,
  },
  text4:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:18,
      borderRadius: 2,
      marginTop:10,
//      marginLeft: 210,
      marginBottom:10,
      alignSelf: 'flex-end'
  },

  surfaceNithish: {
    padding: 10,
    height: 100,
    width: '95%',
    elevation: 4,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000466',
    borderRadius: 12
  },
  surface1Nithish: {
    padding: 8,
    height: 40,
    width: 'auto',
    maxWidth: '20%',
    marginLeft:2,
   
    borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    display: 'flex'
  },
  viewNithish: {
    width: 'auto',
    maxWidth: '40%',
    fontSize:14,
  },
  quantityMeasure:{
    fontFamily: "roboto-regular",
    color: "#212529",
  },
  itemPrice: {
    fontFamily: "roboto-regular",
    color: "#000466",
  },
   textNithish:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:14,
      borderRadius: 2,
      maxWidth: '40%',
      height: 85,
      marginTop:10,
      marginLeft: 0,
  },
  text1Nithish:{
    fontFamily: "roboto-regular",
      color: "#000466",
      fontSize:14,
      borderRadius: 2,
      width: 'auto',
      maxWidth: '40%',
      height: 85,
      marginTop:10,
      marginLeft: 0,
      display: 'flex',
      flexDirection:'column'
  },
  priceDetailsView: {
    flexDirection:"row",
    width: '95%',
    justifyContent: "space-between",
  },
  priceDetailsText1: {
    // justifyContent: "space-between",
    // flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    width: 'auto',
    maxWidth: '60%'
  },
  priceDetailsText2: {
    // justifyContent: "space-between",
    // flexDirection:'column',
    fontFamily: "roboto-regular",
    color: "#000466",
    fontSize:18,
    borderRadius: 2,
    marginTop:10,
    // marginLeft:104,
    width: 'auto',
    maxWidth: '40%'
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
    paddingBottom: 10,
    width: '100%',
    marginTop:5,
    elevation: 2,
    flexDirection:'column'
  },
  surface3: {
    padding: 10,
//    height: 180,
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
        shadowRadius: 20
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
        marginTop:10,
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
//      width: 130,
      height: 45,
      marginTop:10,
      marginLeft: 0,
      textAlign:"center"
      
    },
    paymentStatus:{
        color: "rgb(226, 42, 40)",
        justifyContent: "space-between",
        flexDirection:'column',
        fontFamily: "roboto-regular",
        fontSize:18,
        borderRadius: 2,
        marginTop:10,
    }
})