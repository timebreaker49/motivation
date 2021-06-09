import React, {useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {Button} from 'react-native-elements';
import AddQuoteModal from './AddQuoteModal';

const AddQuote = props => {
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
      <Button style={styles.button} onPress={toggleModal} title="Add Quote" />
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
  formBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  closeButton: {
    padding: 20,
  },
});

export default AddQuote;
