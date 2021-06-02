import React, {useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Database from '../../Database';
import {Formik} from 'formik';
import * as yup from 'yup';

let db = new Database();

const AddQuoteModal = props => {
  const quoteFormSchema = yup.object().shape({
    quoteText: yup.string().required("Don't forget to enter the quote!"),
    type: yup.string().required('How would you categorize this quote?'),
    source: yup
      .string()
      .required('Where did you hear this quote / who said it?'),
  });

  const saveQuote = values => {
    console.log(values);
    let data = {
      quoteText: values.quoteText,
      quoteType: values.type,
      quoteSource: values.source,
    };
    db.addQuote(data)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('Error: ', error);
        this.setState({
          isLoading: false,
        });
      });
  };

  return (
    <View style={styles.formInputContainer}>
      <Formik
        validationSchema={quoteFormSchema}
        initialValues={{quoteText: '', type: '', source: ''}}
        onSubmit={values => {
          console.log('refresher props before: ' + props.refresh);
          saveQuote(values);
          props.setRefresh(!props.refresh);
          props.closeDisplay();
          // console.log('refresher props after: ' + props.refresh);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View>
            <TextInput
              name="quoteText"
              style={styles.textInput}
              placeholder={'Example: "Day one or one day?"'}
              placeholderTextColor={'black'}
              value={values.quoteText}
              onChangeText={handleChange('quoteText')}
              onBlur={handleBlur('quoteText')}
              multiline={true}
            />
            {errors.quoteText && touched.quoteText && (
              <Text style={styles.errorText}>{errors.quoteText}</Text>
            )}
            <TextInput
              style={styles.textInput}
              placeholder={'How would you categorize this quote?'}
              placeholderTextColor={'black'}
              value={values.type}
              onChangeText={handleChange('type')}
              onBlur={handleBlur('type')}
            />
            {errors.type && touched.type && (
              <Text style={styles.errorText}>{errors.type}</Text>
            )}
            <TextInput
              style={styles.textInput}
              placeholder={'Who said it / where you heard it'}
              placeholderTextColor={'black'}
              value={values.source}
              onChangeText={handleChange('source')}
              onBlur={handleBlur('source')}
            />
            {errors.source && touched.source && (
              <Text style={styles.errorText}>{errors.source}</Text>
            )}
            <View style={styles.buttonContainer}>
              <View style={styles.saveButton}>
                <Button
                  title="Save"
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </View>
              <View style={styles.saveButton}>
                <Button
                  style={styles.button}
                  large
                  title="Close"
                  onPress={() => {
                    props.closeDisplay();
                    db.listQuotes();
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  formInputContainer: {
    width: '85%',
    padding: 10,
    elevation: 20,
    backgroundColor: '#e6e6e6',
  },
  saveButton: {
    width: 175,
    padding: 15,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    margin: 10,
    width: '90%',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
export default AddQuoteModal;
