import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';

const AddQuoteGroupModal = props => {
  return (
    <View style={styles.formInputContainer}>
      <Formik
        initialValues={{name: ''}}
        onSubmit={values => {
          console.log(values);
        }}>
        {({
          handleChange,
          handleBlur,
          // handleSubmit,
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
            <View>
              <TouchableOpacity
                style={styles.formButton}
                large
                title="Close"
                onPress={() => {
                  props.setVisible(!props.visible);
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
