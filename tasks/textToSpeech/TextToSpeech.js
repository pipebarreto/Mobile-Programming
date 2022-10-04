import * as React from 'react';
import { useState} from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function TextToSpeech(){

    const [toRead, setToRead] = useState('Write something to hear');

    const speak = () => {
        Speech.speak(toRead);
      };
    
      return (
        <View style={styles.container}>
         <TextInput style={{width:200, borderColor: 'gray', borderWidth:1}}
            multiline={true}
            placeholder='Write something to hear'
            onChangeText={text => setToRead(text)}  />
          <Button title="Press to hear some words" onPress={speak} />
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
    listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
     },
  });
