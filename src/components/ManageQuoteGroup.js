import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import AddQuoteGroupModal from './AddQuoteGroupModal';

const ManageQuoteGroup = props => {
  const [groups, setGroups] = useState(props.route.params.groupNames);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState('');

  const onPress = itemId => {
    setVisible(!visible);
    setId(itemId);
  };

  const closeModal = () => {
    setVisible(!visible);
    // also need to refresh quote groups
  };

  const keyExtractor = (item, index) => {
    return index.toString();
  };

  const renderItem = ({item}) => (
    <ListItem
      containerStyle={styles.quoteList}
      title={item.item}
      id={item.id}
      onPress={() => onPress()}>
      <ListItem.Title>{item.item}</ListItem.Title>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.formButton}
          large
          title="Add Quote Group"
          onPress={() => setVisible(!visible)}>
          <Text style={styles.formButtonText}>Add Quote Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={keyExtractor}
        data={groups}
        renderItem={renderItem}
      />
      {visible ? (
        <Modal
          animationType="slide"
          style={styles.modalStyle}
          onRequestClose={() => closeModal()}>
          <View style={styles.formBox}>
            <AddQuoteGroupModal setVisible={setVisible} visible={visible} />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  formBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
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
  modalStyle: {
    backgroundColor: 'transparent',
  },
  quoteList: {
    flex: 2,
    backgroundColor: 'white',
  },
});

export default ManageQuoteGroup;
