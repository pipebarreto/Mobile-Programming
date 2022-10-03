import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import {  Button, Alert } from'react-native';
import { useState, useEffect } from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function ShoppingListFirebase() {

  const [items, setItems] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  
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
    const itemsRef = ref(database, 'data/'); 
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
        ref(database, 'data/'),     
        { 'product': product, 'amount': amount});
      
    }

    const deleteItem = (id) => {
        const idToDelete = indexes[id];
        remove(    
            ref(database, `data/${idToDelete}`));
        }

  return (

    <View style={styles.container}>


      <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}} 
      placeholder='Product'
      onChangeText={text => setProduct(text)} />
      <Text/>
      <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}} 
      placeholder='Amount'
      onChangeText={text => setAmount(text)}  />

      <Button onPress={add}title="Add to Shopping List" />


      <FlatList keyExtractor={(item, index) => index.toString()} 
                data={items} 
                renderItem={({item, index}) =>
        <View  style={styles.listcontainer}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={{color: '#0000ff'}} onPress={() => deleteItem(index)}>   Bought</Text>
        </View>
      
      } />

    </View>
 
  );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical:180

    },
    listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
     },
  });



