import React,{useState,useEffect, useRef} from 'react'
import { StyleSheet, View,TextInput,Text,TouchableOpacity,KeyboardAvoidingView ,ScrollView,SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//AIzaSyDORUh0mGaVxDgP2ZojKCqVmpXnVOZfAS8

export default function GetLocation ({navigation}) {

 

  return (
   <ScrollView keyboardShouldPersistTaps={'handled'}>
    <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior= "padding" style={styles.container} >
      <GooglePlacesAutocomplete
            placeholder='Search'
            fetchDetails = {true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyDORUh0mGaVxDgP2ZojKCqVmpXnVOZfAS8',
              language: 'en',
            }}
            styles={{
                  textInputContainer: {
                    fontFamily: "roboto-regular",
                    color: "#000466",
                    position: 'absolute',
                    height: 48,
                    width: 300,
                    borderWidth: 1.5,
                    borderColor: "#000466",
                    borderRadius: 3,
                    marginLeft: 16,
                  },
                  textInput: {
                    height: 38,
                    color: '#000466',
                    fontSize: 16,
                    backgroundColor: '#f2f2f2',
                    height: 44,
                  },
                  listView: {
                    marginTop:50,
                    marginLeft: 16,
                    width: 300,
                  },
            
                }}
            
          />
      <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('setUpStore')}
                >
                              
                <Text style={styles.buttonText}>Next <FontAwesome  name='arrow-right' size={20} padding={10}/></Text>
                
          </TouchableOpacity>
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























// import React,{useState} from 'react'
// import { StyleSheet, View,TextInput,Text,TouchableOpacity,KeyboardAvoidingView ,ScrollView,SafeAreaView } from "react-native";
// import { Platform, PermissionsAndroid } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// export default function GetLocation() {

//   const[addressComponent,setAddressComponent] = useState()
//   const[query,setQuery] = useState()
//   const[location,setLocation] = useState([])
  
//   const findCoordinates = () =>{
//     Geocoder.init("AIzaSyDORUh0mGaVxDgP2ZojKCqVmpXnVOZfAS8");

//     Geocoder.from("coimbatore")
//     .then(json => {
//       var location = json.results[0].geometry.location;
//       console.log(location)
//     })
//     .catch(error => console.warn(error));

//     Geocoder.from(11.0168445,76.9558321)
//     .then(json => {
//             var addressComponent = json.results[0];
//             console.log(addressComponent)
//     })
//     .catch(error => console.warn(error));

//     return;
   
//   }
  


//   return(
      
//           <GooglePlacesAutocomplete
//                 placeholder='Search'
//                 minLength={1}
//                 fetchDetails = {true}
//                 onPress={(data, details = null) => {
//                   // 'details' is provided when fetchDetails = true
//                   console.log(data, details);
//                 }}
//                 query={{
//                   key: 'AIzaSyDORUh0mGaVxDgP2ZojKCqVmpXnVOZfAS8',
//                   language: 'en',
//                 }}
//             />

          
//     )

// }