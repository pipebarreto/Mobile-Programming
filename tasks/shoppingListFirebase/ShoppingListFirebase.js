import { StyleSheet, Text, View, FlatList } from 'react-native';

import { useState, useEffect } from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Header } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Input, Button } from'react-native-elements';
import { ListItem, Icon, Right } from'react-native-elements';

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

        renderItem = ({ item, index }) => (
          
        <ListItem.Swipeable bottomDivider
          rightContent={ 
            <Button title="Delete" icon={{ name: 'delete', color: 'white' }}
                         buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                         onPress={() => deleteItem(index)}/>}>

          {/*Swipable and button both functional*/}
                                    
          <ListItem.Content>
            <ListItem.Title>{item.product}</ListItem.Title>
            <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron type="material"
                                name="delete"
                                color="red"
        onPress={() => deleteItem(index)}/>

          </ListItem.Swipeable>
        )            

  return (

    <SafeAreaProvider>
    <Header centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }} />

    <View style={{paddingTop:25}}>
      

      <Input
      placeholder='Product'
      onChangeText={text => setProduct(text)} />

      <Input
      placeholder='Amount'
      onChangeText={text => setAmount(text)}  />

      <Button icon={{name: 'save'}} onPress={add} title="Add to Shopping List" />


      <FlatList  style={{paddingTop:20}} data={items} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}/>
      

    </View>
    </SafeAreaProvider>

  );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',

    },
    listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
     },
  });



