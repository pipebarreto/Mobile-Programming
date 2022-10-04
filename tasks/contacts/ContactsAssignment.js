import * as Contacts from'expo-contacts';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default function ContactsAssignment(){

    const [contact, setContact] = useState({});

      const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) { 
                 setContact(data);
                }  
            }}

      console.log(contact)

    return(

        <View style={styles.container}>

        <View style={styles.listcontainer}>
        <Button onPress={getContacts}title="Get Contacts" />
        </View>

        <FlatList keyExtractor={(item, index) => index.toString()} 
                data={contact}
                renderItem={({item}) =>
        <View  style={styles.listcontainer}>
            {item.phoneNumbers != null && (
            <Text>{item.name}    {item.phoneNumbers[0].number}</Text>
            )}
        </View>
                }/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical:50   

    },
    listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
     },
  });
