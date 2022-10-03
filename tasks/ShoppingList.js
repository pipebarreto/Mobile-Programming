import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import {  Button, Alert } from'react-native';
import { useState } from 'react';

export default function ShoppingList() {

  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const add = () => {setData([...data, {key: text}]);
                    setText('');}

    return (

    <View style={styles.container}>


      <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}} onChangeText={text => setText(text)}  value={text}/>
      <Button onPress={add}title="Add to Shopping List" />
      <FlatList data={data}renderItem={({item}) =><Text>{item.key}</Text>}  keyExtractor={(item, index) => index.toString()}/>

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
  });
