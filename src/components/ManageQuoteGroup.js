import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';

const ManageQuoteGroup = props => {
  const [groups, setGroups] = useState(props.route.params.groupNames);

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  const renderItem = ({item}) => (
    <ListItem containerStyle={styles.quoteList} title={item.item} id={item.id}>
      <ListItem.Title>{item.item}</ListItem.Title>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.formButton}
          large
          title="Add Quote Group">
          <Text style={styles.formButtonText}>Add Quote Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={groups}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formButton: {
    alignItems: 'center',
    backgroundColor: '#36ced4',
    padding: 15,
    margin: 10,
    width: '95%',
    borderRadius: 70,
  },
  formButtonText: {
    color: 'white',
  },
  quoteList: {
    flex: 2,
    backgroundColor: 'white',
  },
});

export default ManageQuoteGroup;
