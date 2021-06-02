import React, {useEffect, useState} from 'react';
import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Database from '../../Database';
import EditQuote from './EditQuoteModal';

const QuotesList = props => {
  const [isLoading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [
    notFound,
    setFound,
  ] = 'No quotes found!\nPlease tap add quote to add one!';
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');
  const [refresh, setRefresh] = useState(props.refresh);

  const onPress = quoteId => {
    setVisible(true);
    setId(quoteId);
  };

  const closeDisplay = () => {
    setVisible(false);
    getQuotes();
  };

  useEffect(() => {
    console.log('props refresh in QL: ' + props.refresh);
    getQuotes();
  }, [refresh]);

  const getQuotes = () => {
    db.listQuotes()
      .then(data => {
        console.log('Just got quotes! ' + data);
        setQuotes(data);
        setLoading(false);
      })
      .then(error => {
        console.log('We got an error: ', error);
        setLoading(false);
      });
    console.log('Quotes: ' + quotes);
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };
  const renderItem = ({item}) => (
    <ListItem
      title={item.quoteId}
      onPress={() => onPress(item.quoteId)}
      quoteId={item.quoteId}>
      <ListItem.Title>{item.quoteText}</ListItem.Title>
    </ListItem>
  );

  return (
    <View>
      {quotes.length < 1 ? (
        <View>
          <Text>{notFound}</Text>
        </View>
      ) : null}
      <FlatList
        keyExtractor={keyExtractor}
        data={quotes}
        renderItem={renderItem}
      />
      {visible ? (
        <Modal animationType="slide" onRequestClose={() => closeDisplay()}>
          <View style={styles.formBox}>
            <EditQuote
              visible={visible}
              closeDisplay={() => closeDisplay()}
              quoteId={id}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};
const db = new Database();

const styles = StyleSheet.create({
  formBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});

export default QuotesList;
