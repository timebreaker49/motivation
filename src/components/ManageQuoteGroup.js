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
import EditQuoteGroupModal from './EditQuoteGroupModal';

const ManageQuoteGroup = props => {
  const [groups, setGroups] = useState(props.route.params.groupNames);
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const onPress = (itemId, itemTitle) => {
    setEditModalVisible(!visible);
    setId(itemId);
    setName(itemTitle);
  };

  const closeModal = () => {
    setVisible(false);
    setEditModalVisible(false);
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
      onPress={() => onPress(item.id, item.item)}>
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
        <Modal animationType="slide" onRequestClose={() => closeModal()}>
          <View style={styles.formBox}>
            <AddQuoteGroupModal setVisible={setVisible} visible={visible} />
          </View>
        </Modal>
      ) : null}
      {editModalVisible ? (
        <Modal animationType="fade" onRequestClose={() => closeModal()}>
          <View style={styles.formBox}>
            <EditQuoteGroupModal id={id} item={name} closeModal={closeModal} />
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
