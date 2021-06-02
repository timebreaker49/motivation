import React, {Component} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {Button} from 'react-native-elements';
import AddQuoteModal from './AddQuoteModal';

class AddQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      buttonText: 'Add Quote',
    };
    this._toggleModal = this._toggleModal.bind(this);
  }
  _toggleModal() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  closeDisplay = () => {
    this.setState({modalVisible: false});
    console.log('display closed, refresh: ' + this.props.refresh);
    // this.getQuotes();
  };

  render() {
    return (
      <View>
        <Button
          style={styles.button}
          onPress={() => this._toggleModal()}
          title="Add Quote"
        />
        {this.state.modalVisible ? (
          <Modal animationType="slide" onRequestClose={this.closeDisplay}>
            <View style={styles.formBox}>
              <AddQuoteModal
                modalVisible={this.state.modalVisible}
                closeDisplay={this.closeDisplay}
                setRefresh={this.props.setRefresh}
                refresh={this.props.refresh}
              />
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}
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
