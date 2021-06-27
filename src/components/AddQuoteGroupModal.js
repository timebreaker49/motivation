import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import Database from '../../Database';

const db = new Database();

const AddQuoteGroupModal = props => {
  const addQuoteGroup = quoteGroup => {
    console.log('quoteGroup to be added: ' + quoteGroup);
    db.addQuoteGroup(quoteGroup)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('Error in adding quote group: ' + error);
      });
  };

  return (
    <View style={styles.formInputContainer}>
      <Formik
        initialValues={{name: ''}}
        onSubmit={values => {
          addQuoteGroup(values.name);
          props.setRefreshGroups(!props.refreshGroups);
          props.closeModal();
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          // errors,
          // touched,
          // isValid,
        }) => (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder={'Name of quote group'}
              placeholderTextColor={'black'}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.formButton}
                large
                title="Save"
                onPress={handleSubmit}>
                <Text style={styles.formButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formButton}
                large
                title="Close"
                onPress={() => {
                  props.closeModal();
                }}>
                <Text style={styles.formButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  formButton: {
    alignItems: 'center',
    backgroundColor: '#36ced4',
    padding: 15,
    margin: 10,
    width: '45%',
    borderRadius: 70,
  },
  formInputContainer: {
    width: '85%',
    padding: 10,
    elevation: 20,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    margin: 10,
    padding: 10,
    width: '90%',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
  },
});

export default AddQuoteGroupModal;
