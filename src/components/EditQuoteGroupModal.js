import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Database from '../../Database';
import {Formik, Field} from 'formik';
import CustomTextInput from './CustomTextInput';

const db = new Database();

const EditQuoteGroupModal = props => {
  const [groupId, setGroupId] = useState(props.id);
  const [groupName, setGroupName] = useState(props.item);

  const updateQuoteGroupName = values => {
    console.log(values);
  };

  return (
    <View style={styles.formInputContainer}>
      <Formik
        enableReinitialize
        initialValues={{id: groupId, name: groupName}}
        onSubmit={values => {
          updateQuoteGroupName(values);
        }}>
        {({handleSubmit}) => (
          <View>
            <Field
              component={CustomTextInput}
              name="name"
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.formButton}
              large
              title="Close"
              onPress={() => {
                props.closeModal();
              }}>
              <Text style={styles.formButtonText}>Close</Text>
            </TouchableOpacity>
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
              title="Delete"
              onPress={() => {
                props.closeModal();
              }}>
              <Text style={styles.formButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  formButton: {
    alignItems: 'center',
    backgroundColor: '#36ced4',
    padding: 15,
    margin: 5,
    width: '91%',
    borderRadius: 70,
  },
  formButtonText: {
    color: 'white',
  },
  formInputContainer: {
    width: '85%',
    padding: 10,
    elevation: 20,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    backgroundColor: 'white',
    margin: 10,
    color: 'black',
    width: '90%',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
  },
});

export default EditQuoteGroupModal;
