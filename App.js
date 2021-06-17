import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuotesList from './src/components/QuotesList';
import QuoteGroup from './src/components/QuoteGroup';

const App = () => {
  console.log('This debug is working!');
  const Stack = createStackNavigator();

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Quotes List" component={QuotesList} />
        <Stack.Screen name="View Groups" component={QuoteGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
export default App;
