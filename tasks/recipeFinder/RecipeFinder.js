import react, { useState } from "react"
import { StyleSheet, Text, View, TextInput, FlatList, Button, Image } from 'react-native';


export default function RecipeFinder(){

    const [keyword, setKeyword] =useState('');
    const [data, setData] =useState([]);

    const fetchRepositories =()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
        .then(response => response.json())
        .then(data => setData(data.meals))  
        .catch(error => {         
            Alert.alert('Error', error); 
        })
    }

    return (
        <View style={styles.container}>

            <FlatList
                style={{paddingVertical:10}}
                data={data}
                renderItem={({item})=>
                <View style={{paddingVertical:10}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>{item.strMeal}</Text>

                    <Image 
                        style={{width:150,height:70}}
                        source={{uri: item.strMealThumb}} />
                                  
                </View>
                }
            />
            <View  style={{paddingVertical:30}}>
                <TextInput
                    style={{fontSize:18}}
                    placeholder="Keyword"
                    onChangeText={text => setKeyword(text)}
                /><Text/>
                <Button title="Find"
                onPress= {fetchRepositories} />

            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal:5,
      paddingVertical:50
    },
  });
  