import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {  Button } from'react-native';
import { useState } from 'react';

export default function Calculator({navigation}) {

  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState([]);

  const add = () => {  setResult(parseFloat(number1)+parseFloat(number2))
    setData([...data, {key: `${number1} + ${number2} = ` + (parseFloat(number1)+parseFloat(number2))}]) 
  }

  const substract = () => { setResult(parseFloat(number1)-parseFloat(number2))
    setData([...data, {key: `${number1} - ${number2} = ` + (parseFloat(number1)-parseFloat(number2))}])
  }
    

  return (

    <View style={styles.container}>

  
      <Text style={{fontSize:20}}>Result: {result}</Text>
      <StatusBar style="auto" />
      <Text/>
      <TextInput keyboardType="numeric" style={{width:200, borderColor: 'gray', borderWidth:1}} onChangeText={text => setNumber1(text)}  />
      <Text/>
      <TextInput keyboardType="numeric" style={{width:200, borderColor: 'gray', borderWidth:1}} onChangeText={text => setNumber2(text)}  />

      <View style={{flexDirection:'row', justifyContent:'center', paddingVertical:10}}>
      <Button onPress={add}title="+" />
      <Button onPress={substract}title="-" />
      </View>
      <Button title="History" onPress={() => navigation.navigate('History', {data:data})} />
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
