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
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#36ced4',
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomColor: '#36ced4',
            borderBottomWidth: 1,
          },
        }}>
        <Stack.Screen name="Quote Groups" component={QuoteGroup} />
        <Stack.Screen name="Manage Quotes" component={QuotesList} />
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
