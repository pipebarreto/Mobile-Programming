import react, { useState, useEffect } from "react"
import { StyleSheet, View, FlatList } from 'react-native';
import * as Location from'expo-location';
import MapView, { Marker } from'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from'react-native-elements';
import { Input, Button, Text } from'react-native-elements';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { ListItem } from'react-native-elements';


export default function MyPlaces({navigation}){

    const [items, setItems] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [place, setPlace] = useState('');

    const firebaseConfig = {
        apiKey: "AIzaSyCxKUtbTpUiMgf31HAqTmnJzQGVzDIaONQ",
        authDomain: "shopping-list-usa-server.firebaseapp.com",
        projectId: "shopping-list-usa-server",
        storageBucket: "shopping-list-usa-server.appspot.com",
        messagingSenderId: "266882946073",
        appId: "1:266882946073:web:9c7c7cd5f913a4f2bd4688"
      };

      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
    
    
      useEffect(() => {
        const itemsRef = ref(database, 'places/'); 
         onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();   
            if(!data) {
              setItems([]);
              setIndexes([]);}        
            else{
            setItems(Object.values(data));
            setIndexes(Object.keys(data));
            }
          })}, 
          []);

    const add = () => { 
        push(    
            ref(database, 'places/'),     
            { 'place': place});          
        }
    
    const deleteItem = (id) => {
        const idToDelete = indexes[id];
        remove(    
            ref(database, `places/${idToDelete}`));
        }


    renderItem = ({ item, index }) => (
        
          
        <ListItem onPress={() => navigation.navigate('Map', {data:item.place})} 
                  onLongPress={() => deleteItem(index)}  bottomDivider>
                                        
            <ListItem.Content>
                <ListItem.Title>{item.place}</ListItem.Title>          
            </ListItem.Content>

            <ListItem.Subtitle style={{color:"grey"}}>Show on map</ListItem.Subtitle>    
            <ListItem.Chevron/>

             
        </ListItem>)       



    return(

    
        <View style={{paddingTop:25, paddingHorizontal:10}}>


        <Input label="PLACEFINDER" labe placeholder='Type address' onChangeText={text => setPlace(text)} />
        
        <Button icon={{name: 'save'}}  onPress={add} title="Save" />

        <FlatList  style={{paddingTop:20}} data={items} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}/>


        </View>

    

    )
}