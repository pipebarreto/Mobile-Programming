import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import {  Button } from'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from'expo-sqlite';

export default function ShoppingListSQL() {

  const db = SQLite.openDatabase('coursedb.db');

  const [data, setData] = useState([]);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');


  const add = () => {
      db.transaction(tx => {   
         tx.executeSql('insert into shopping_list (amount, product) values (?, ?);',  [amount, product]);    
        }, null, updateList)
      }

  const deleteItem = (id) => {
      db.transaction(tx => {   
         tx.executeSql('delete from shopping_list where id = ?;',  [id]);    
        }, null, updateList)
      }
  
  const updateList = () => { 
     db.transaction(tx => {    
      tx.executeSql('select * from shopping_list;', [], (_, { rows }) =>      
      setData(rows._array)    
      );   
    }, null, null);
  }

  useEffect(() => {  db.transaction(tx => {    
    tx.executeSql('create table if not exists shopping_list (id integer primary key not null, amount int, product text);');
    }, null, updateList);}, []);


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
                data={data}
                renderItem={({item}) =>
        <View  style={styles.listcontainer}>
            <Text>{item.product}, {item.amount}</Text>
            <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>   Bought</Text>
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
