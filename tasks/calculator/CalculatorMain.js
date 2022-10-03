import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './Calculator';
import HistoryNavigation from './HistoryNavigation';

const Stack = createNativeStackNavigator();

export default function CalculatorMain() {
    
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Calculator"component={Calculator} />
            <Stack.Screen name="History"component={HistoryNavigation} />
        </Stack.Navigator>
    </NavigationContainer>  
    );
}

