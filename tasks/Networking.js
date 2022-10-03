import react, { useState } from "react"
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';


export default function Networking(){

    const [keyword, setKeyword] =useState('');
    const [data, setData] =useState([]);

    const fetchRepositories =()=>{
        fetch(`https://api.github.com/search/repositories?q=${keyword}`)
        .then(response => response.json())
        .then(data => setData(data.items))  
        .catch(error => {         
            Alert.alert('Error', error); 
        })
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={data}
                renderItem={({item})=>
                <View>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>{item.full_name}</Text>
                    <Text style={{fontSize:16}}>{item.description}</Text>
                                      
                </View>
                }
            />
            <TextInput
                style={{fontSize:18}}
                placeholder="Keyword"
                onChangeText={text => setKeyword(text)}
            />
            <Button title="Find"
            onPress= {fetchRepositories} />

        </View>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal:10,
      paddingVertical:50
    },
  });
  