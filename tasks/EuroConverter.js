import react, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default function EuroConverter(){

const myHeaders = new Headers();
myHeaders.append("apikey", "xMerboYDICVMG3F3gPIprN4N61YOzUS");

const extra='A';

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const [currency, setCurrency] = useState();
  const [amount, setAmount]=useState();
  const [result, setResult]=useState(null);
  const [data, setData] =useState();

  const convertor =()=> setResult(parseFloat(currency)*parseFloat(amount));


  useEffect(()=> fetchData(), []);

  const fetchData =() => {
  fetch("https://api.apilayer.com/exchangerates_data/latest?base=eur", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .then(data=>setData(data))
  .catch(error => console.log('error', error));
  }


  return(

    <View style={styles.container}>

      <Text  style={{fontSize:20}}>Euro Converter</Text>

      <TextInput
                style={{fontSize:18}}
                placeholder="amount"
                onChangeText={text => setAmount(text)}
            />

      <Picker  style={{borderWidth:0.25, position:'absolute', left:0, right:0, bottom:180}}
      z
              selectedValue={currency}
              onValueChange={(itemValue, itemIndex) =>
              setCurrency(itemValue)}>

              
        
        <Picker.Item />

      </Picker>

      <Button title="Convert"
            onPress= {convertor} />



    </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });