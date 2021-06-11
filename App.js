import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AddQuote from './src/components/AddQuote';
import QuotesList from './src/components/QuotesList';

const App = () => {
  console.log('This debug is working!');
  const [refresh, setRefresh] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <AddQuote refresh={refresh} setRefresh={setRefresh} />
      <QuotesList refresh={refresh} setRefresh={setRefresh} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
export default App;
