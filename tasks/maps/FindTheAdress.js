import react, { useState, useEffect } from "react"
import * as Location from'expo-location';
import MapView, { Marker } from'react-native-maps';
import { Text, View, TextInput, Button, Alert } from 'react-native';

export default function FindTheAdress(){

    const [location, setLocation] =useState({   lat:0, lng:0   })
    const[text, setText] =useState('');

    const url=`http://www.mapquestapi.com/geocoding/v1/address?key=LIA0Fn9eOAwmWuhNwQOzGukMaNTohQfA&location=${text}+finland`
    
    const fetchRepositories =()=>{
        fetch(url)
        .then(response => response.json())
        .then(data => setLocation(data.results[0].locations[0].latLng)) 
        .catch(error => {         
            Alert.alert('Error', error); 
        })
    }

    useEffect(() => {
          (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {      
                Alert.alert('No permission to get location')
                return;    
            }
            const location = await Location.getCurrentPositionAsync({});
                setLocation({   lat:location.coords.latitude, lng:location.coords.longitude   });
             })();
        }, []);

    return(

    <View style={{flex:1}}>
        <View style={{flex:1,  alignItems: 'center', justifyContent: 'center',}}>
            <TextInput
            style={{fontSize:18}}
            placeholder="Find"
            onChangeText={text => setText(text)}/>
            <Text/>
            <Button title="Find"
            onPress= {fetchRepositories} />
        </View>

        <View style={{flex:5}}>
        <MapView  style={{ flex: 1 }}  
            region={{latitude:location.lat,
            longitude:location.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221 }}>         

        <Marker 
            coordinate={{latitude:location.lat,
            longitude:location.lng}}/>
        </MapView>        
        </View>
    </View> 

    )
}