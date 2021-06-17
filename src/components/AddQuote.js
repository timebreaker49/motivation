import React, {useState} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Text} from 'react-native';
import AddQuoteModal from './AddQuoteModal';
import {useNavigation} from '@react-navigation/native';

const AddQuote = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeDisplay = () => {
    setModalVisible(false);
    console.log('display closed, refresh: ' + props.refresh);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.formButton}
          large
          title="Add Quote"
          onPress={toggleModal}>
          <Text style={styles.formButtonText}>Add Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.formButton}
          large
          title="View Groups"
          onPress={() => navigation.navigate('View Groups')}>
          <Text style={styles.formButtonText}>View Groups</Text>
        </TouchableOpacity>
      </View>
      {modalVisible ? (
        <Modal animationType="slide" onRequestClose={closeDisplay}>
          <View style={styles.formBox}>
            <AddQuoteModal
              modalVisible={modalVisible}
              closeDisplay={closeDisplay}
              setRefresh={props.setRefresh}
              refresh={props.refresh}
            />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
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
    width: '45%',
    borderRadius: 70,
  },
  formButtonText: {
    color: 'white',
  },
  closeButton: {
    padding: 20,
  },
});

export default AddQuote;
