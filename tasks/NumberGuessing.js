import { StyleSheet, Text, View, TextInput } from 'react-native';
import {  Button, Alert } from'react-native';
import { useState } from 'react';


let generated = Math.floor(Math.random() * 100) + 1;

export default function NumberGuessing() {

    const [guess, setGuess] = useState(null);
    const [count, setCount]=useState(1);
    const [text, setText] = useState('Guess a number betwwen 1-100');

    const newGame =() => {
        generated =Math.floor(Math.random() * 100) + 1;
        setCount(1);
        setText('Guess a number betwwen 1-100');
    }

    const makeGuess =()=>{ 
        setCount(count+1);
        if(generated == guess){ Alert.alert(`You guessed the number in ${count} guesses`);
                                setText(`You guessed the secret number! The secret number was ${generated}`);
                                setCount(1);}
        else if (generated < guess){ setText(`Your guess ${guess} is too high`)}
        else if (generated > guess){ setText(`Your guess ${guess} is too low`)}
    }

    return( 
    <View style={styles.container}>

        <Button onPress={newGame}title="New Game" />
        <Text>{text}</Text>
        <TextInput keyboardType="numeric" style={{width:200, borderColor: 'gray', borderWidth:1}} onChangeText={text => setGuess(text)}  />
        <Button onPress={makeGuess}title="Make a Guess" />

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