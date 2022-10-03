import { StyleSheet, Text, View, TextInput } from 'react-native';
import Calculator from './tasks/calculator/Calculator';
import Networking from './tasks/Networking';
import NumberGuessing from './tasks/NumberGuessing';
import ShoppingList from './tasks/ShoppingList';
import RecipeFinder from './tasks/recipeFinder/RecipeFinder';
import EuroConverter from './tasks/EuroConverter';
import FindTheAdress from './tasks/maps/FindTheAdress';
import ShoppingListSQL from './tasks/shopping_SQL/ShoppingListSQL';
import ShoppingListFirebase from './tasks/shoppingListFirebase/ShoppingListFirebase';



export default function App() {


  return (

    <ShoppingListFirebase />

  )
}
