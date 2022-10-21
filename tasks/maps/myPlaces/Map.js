import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ route}){

    const{ data } = route.params;

    const [location, setLocation] =useState({   lat:0, lng:0   })
 
    const url=`http://www.mapquestapi.com/geocoding/v1/address?key=LIA0Fn9eOAwmWuhNwQOzGukMaNTohQfA&location=${data}+finland`
    
    useEffect(()=> fetchData(), []);

    const fetchData =()=>{
        fetch(url)
        .then(response => response.json())
        .then(data => setLocation(data.results[0].locations[0].latLng)) 
        .catch(error => {         
            Alert.alert('Error', error); 
        })
    }

    return(

        <MapView  style={{ flex: 1 }}  
            region={{latitude:location.lat,
            longitude:location.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221 }}>         

        <Marker 
            coordinate={{latitude:location.lat,
            longitude:location.lng}}/>
        </MapView>        


    )
}