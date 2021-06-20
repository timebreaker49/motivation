import React, {useEffect, useState} from 'react';
import Database from '../../Database';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import SelectBox from 'react-native-multi-selectbox';
import {isEmpty} from 'lodash';

const db = new Database();

const QuoteGroup = () => {
  const [group, setGroup] = useState([]); // quote group displayed after user selection
  const [selectedGroup, setSelectedGroup] = useState({}); // quote group selected
  const [groupNames, setGroupNames] = useState([]); // all quote group name options

  useEffect(() => {
    let isMounted = true;
    let groupName = isEmpty(selectedGroup) ? 'motivation' : selectedGroup.item; // needs a string, not an object
    getQuoteGroupByName(groupName).then(data => {
      if (isMounted) {
        setGroup(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedGroup]);

  useEffect(() => {
    let isMounted = true;
    getQuoteGroups()
      .then(data => {
        if (isMounted) {
          let quoteGroup = [];
          Object.keys(data).forEach(key => {
            quoteGroup.push({
              item: data[key].groupName,
              id: data[key].groupId,
            });
          });
          setGroupNames(quoteGroup);
        }
      })
      .then(error => {
        console.log('getQuoteGroups error ' + error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getQuoteGroupByName = groupName => {
    return db.getQuoteGroupByName(groupName);
  };

  const getQuoteGroups = () => {
    return db.getQuoteGroups();
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

  function onChange() {
    return val => setSelectedGroup(val);
  }

  return (
    <View style={styles.quoteList}>
      <View style={styles.textInput}>
        <SelectBox
          label="Select quote group"
          options={groupNames}
          value={selectedGroup}
          onChange={onChange()}
          hideInputFilter={false}
        />
      </View>
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
  textInput: {
    fontSize: 14,
    width: '95%',
    backgroundColor: 'white',
    color: 'black',
    margin: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
  },
});

export default QuoteGroup;
