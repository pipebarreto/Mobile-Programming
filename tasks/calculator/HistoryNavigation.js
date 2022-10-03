import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoryNavigation({ route}){

    const{ data } = route.params;
    
return(

    <View style={styles.container}>
      <FlatList data={data}renderItem={({item}) =>
        <Text style={{fontSize:18}}>{item.key}</Text>} 
        keyExtractor={(item, index) => index.toString()}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical:50
    },
  });
  