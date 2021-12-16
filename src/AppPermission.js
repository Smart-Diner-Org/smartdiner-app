import React, {Component} from 'react';
import { FlatList, PermissionsAndroid, Platform, View, Text } from 'react-native';
import Contacts from 'react-native-contacts';






export default class ContactsList extends Component{
    state={
        Contacts: null
    }

componentDidMount(){
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title : 'Contacts',
                message: 'This app would like to view your contacts'
            }
        ).then((p1) => {
            console.log("response recieved");
            console.log("This is P1" + p1);
            console.log("----------------------");
            Contacts.getAll().then(contacts => {
                contacts.forEach(contact => {
                  // console.log(contact)
                  console.log(contact.givenName)
                  console.log(contact.phoneNumbers)
                })
              })
        })
    }
        
    


render(){
    return (
        <View>
            <FlatList
                data = {this.state.Contacts}
                renderItem={({item})=>{
                    <View>
                        <Text>{`${item.givenName}`}{item.familyName}</Text>
                        {item.phoneNumber.map(phone=>(
                            <Text>{phone.number}</Text>
                        ))}
                    </View>
                }}
                numColumns={1}
                keyExtractor={(item,index) => index}
            />
            <Text>Welcome</Text>
        </View>
    );
}
}