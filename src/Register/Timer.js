import React ,{useState}from 'react'
import { StyleSheet,TouchableOpacity,Text, View, ToastAndroid } from "react-native";
import {Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import resendOTP from '../API_Calls/Register_Api/resendOTP';

function Timer ({hoursMinSecs,mobNumber}) {
   
    const [shouldShow, setShouldShow] = useState(false);
    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
   

    const tick = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0) {
            setShouldShow(!shouldShow)
                reset()
            }
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId); 
    });
    const handlePress = () =>{
        if(resendOTP(mobNumber)){
            reset()
        }
    }
    
    return (
        <View>
        <View style={{marginTop:10,flex:1,flexDirection:'row',alignSelf:'center'}}>
            <Text style={{fontSize:20,padding:3}}>
            {`${mins
            .toString()
            .padStart(1, '0')}:${secs.toString().padStart(2, '0')}`}</Text> 
            <Text style={{padding:3}}><FontAwesome  name='clock-o' size={25} /></Text>
            </View>
            {shouldShow ? (
            <TouchableOpacity
                style={styles.btn}
                onPress={() => handlePress()}   
                > 
                
                <Text style={styles.btnText}>Resend</Text>
              </TouchableOpacity>
          ):null}
       </View>
    );
}

export default Timer;


const styles = StyleSheet.create({
  container: {
    flex:1,    
  },
  btn: {
        flex:1,
        height: 40,
        width:90,
        alignSelf:"center",
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#000466',
        
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