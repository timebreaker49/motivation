import React, {useEffect, useState} from 'react';
import Database from '../../Database';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

const db = new Database();

const QuoteGroup = () => {
  // default collection?
  const [group, setGroup] = useState([]);

  useEffect(() => {
    let isMounted = true;
    console.log('welp');
    getQuoteGroupByName('motivation').then(data => {
      if (isMounted) {
        setGroup(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [group]);

  const getQuoteGroupByName = groupString => {
    return db.getQuoteGroupByName(groupString);
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };
  const renderItem = ({item}) => (
    <ListItem
      containerStyle={styles.quoteList}
      title={item.quoteId}
      quoteId={item.quoteId}>
      <ListItem.Title>{item.quoteText}</ListItem.Title>
    </ListItem>
  );

  return (
    <View style={styles.quoteList}>
      <Text>Here is where quote groups will be displayed!!</Text>
      <FlatList
        keyExtractor={keyExtractor}
        data={group}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  quoteList: {
    flex: 2,
    backgroundColor: 'white',
  },
});

export default QuoteGroup;
