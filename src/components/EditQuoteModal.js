import React, {useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Database from '../../Database';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomTextInput from './CustomTextInput';

let db = new Database();

export default class EditQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.quoteId,
      text: '',
      type: '',
      source: '',
    };
  }

  componentDidMount() {
    this.getQuote(this.props.quoteId);
    console.log('Retrieving quote');
  }

  getQuote(quoteId) {
    db.quoteById(quoteId)
      .then(result => {
        console.log('quote retrieved: ' + result);
        let quote = result;
        this.setState({
          id: quote.quoteId,
          text: quote.quoteText,
          type: quote.quoteType,
          source: quote.quoteSource,
        });
        console.log('quote text: ' + this.state.text);
      })
      .catch(error => {
        console.log('Error in quote retrieval: ' + error);
      });
  }

  render() {
    const quoteFormSchema = yup.object().shape({
      quoteText: yup.string().required("Don't forget to enter the quote!"),
      type: yup.string().required('What type of quote is ?'),
      source: yup
        .string()
        .required('Where did you hear this quote / who said it?'),
    });

    const updateQuote = values => {
      console.log('Some values: ' + values);
      console.log(
        'text ' +
          values.text +
          'type' +
          values.type +
          'source ' +
          values.source,
      );
      let data = {
        quoteText: values.text,
        quoteType: values.type,
        quoteSource: values.source,
      };
      db.updateQuote(this.state.id, data)
        .then(result => {
          console.log('updateQuote: ' + result);
        })
        .catch(error => {
          console.log('Error: ', error);
          this.setState({
            isLoading: false,
          });
        });
      this.props.closeDisplay();
    };

    const deleteQuote = quoteId => {
      db.deleteQuote(quoteId)
        .then(result => {
          console.log('deleted quote, ' + result);
        })
        .catch(error => {
          console.log('Error deleting quote, ' + error);
        });
    };

    return (
      <View style={styles.formInputContainer}>
        <Formik
          // validationSchema={quoteFormSchema} // To come back to
          initialValues={{
            text: this.state.text,
            type: this.state.type,
            source: this.state.source,
          }}
          enableReinitialize
          onSubmit={values => {
            updateQuote(values);
          }}>
          {({handleSubmit}) => (
            <View>
              <Field
                component={CustomTextInput}
                name="text"
                style={styles.textInput}
                multiline={true}
              />
              <Field
                component={CustomTextInput}
                name="type"
                style={styles.textInput}
              />
              <Field
                component={CustomTextInput}
                name="source"
                style={styles.textInput}
              />
              <View style={styles.saveButton}>
                <Button
                  title="Save"
                  onPress={handleSubmit}
                  // disabled={!isValid}
                />
              </View>
              <View style={styles.saveButton}>
                <Button
                  style={styles.button}
                  large
                  title="Delete"
                  onPress={() => {
                    deleteQuote(this.state.id);
                    this.props.closeDisplay();
                  }}
                />
              </View>
              <View style={styles.saveButton}>
                <Button
                  style={styles.button}
                  large
                  title="Close"
                  onPress={() => {
                    this.props.closeDisplay();
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formInputContainer: {
    width: '85%',
    padding: 10,
    elevation: 20,
    backgroundColor: '#e6e6e6',
  },
  saveButton: {
    width: '95%',
    padding: 5,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
