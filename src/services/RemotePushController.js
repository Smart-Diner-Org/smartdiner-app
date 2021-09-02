import React, { useState,useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FCM_Token from '../API_Calls/Services_API/FCM_Token.js';

export default function RemotePushController () {

  useEffect(() => {
   
    PushNotification.configure({
      onRegister: function(token) {
         
        console.log('TOKEN:', token.token)

        AsyncStorage.setItem('fcm_Token',String(token.token));
        //
      },


      
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)

        // process the notification here
      },
     
            senderID: '314889225950', //sender ID from fcmconsole
            popInitialNotification: true,
            requestPermissions: true,

      })

    PushNotification.createChannel({
        channelId: "ORDERS", // (required)
        channelName: "ORDERS", // (required)
      },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
       );
    PushNotification.createChannel({
        channelId: "OFFERS", // (required)
        channelName: "OFFERS", // (required)
      },
         (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
  
     
  }, [])

  FCM_Token()

  return null

}

