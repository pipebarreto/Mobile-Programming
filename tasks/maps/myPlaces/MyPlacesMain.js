import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Map';
import MyPlaces from './MyPlaces';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from'react-native-elements';


const Stack = createNativeStackNavigator();

export default function MyPlacesMain() {
    
    return (
    <NavigationContainer>
        <SafeAreaProvider>
        <Header centerComponent={{ text: 'MAPS', style: { color: '#fff'}}} />
        <Stack.Navigator>
            <Stack.Screen name="My Places"component={MyPlaces} />
            <Stack.Screen name="Map"component={Map} />
        </Stack.Navigator>
        </SafeAreaProvider>
    </NavigationContainer>  
    );
}

