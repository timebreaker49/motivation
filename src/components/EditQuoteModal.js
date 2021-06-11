import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Database from '../../Database';
import {Formik, Field} from 'formik';
// import * as yup from 'yup';
import CustomTextInput from './CustomTextInput';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash/array';

let db = new Database();

const EditQuote = props => {
  const [id, setId] = useState(props.quoteId);
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');

  const [groups, setGroups] = useState([]); // quote groups to be selected
  const [selectedVals, setSelectedVals] = useState([]); // holds selected values to be initially populated

  useEffect(() => {
    getQuoteGroups();
    getQuote(id);
    console.log('Attempted to retrieve quote id: ' + id);
  }, [id]);

  const getQuote = quoteId => {
    db.quoteById(quoteId)
      .then(result => {
        console.log('quote retrieved successfully, id: ' + result.quoteId);
        setId(result.quoteId);
        setText(result.quoteText);
        setSource(result.quoteSource);
        setSelectedVals(JSON.parse(result.quoteType));
      })
      .catch(error => {
        console.log('Error in quote retrieval: ' + error);
      });
  };

  const getQuoteGroups = () => {
    db.getQuoteGroups()
      .then(data => {
        let qg = [];
        Object.keys(data).forEach(key => {
          let row = {};
          row.item = data[key].groupName;
          row.id = data[key].groupId;
          qg.push(row);
        });
        setGroups(qg);
      })
      .then(error => {
        console.log('getQuoteGroups error ' + error);
      });
  };

  const updateQuote = values => {
    console.log('Update values: ' + values);
    let data = {
      quoteText: values.text,
      quoteType: JSON.stringify(selectedVals),
      quoteSource: values.source,
    };
    db.updateQuote(id, data)
      .then(result => {
        console.log('updateQuote: ' + result);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  // const quoteFormSchema = yup.object().shape({
  //   quoteText: yup.string().required("Don't forget to enter the quote!"),
  //   type: yup.string().required('What type of quote is ?'),
  //   source: yup
  //     .string()
  //     .required('Where did you hear this quote / who said it?'),
  // });

  const deleteQuote = quoteId => {
    db.deleteQuote(quoteId)
      .then(result => {
        console.log('deleted quote, ' + result);
      })
      .catch(error => {
        console.log('Error deleting quote, ' + error);
      });
  };

  const onMultiChange = () => {
    return item => setSelectedVals(xorBy(selectedVals, [item], 'id'));
  };

  return (
    <View style={styles.formInputContainer}>
      <Formik
        // validationSchema={quoteFormSchema} // To come back to
        initialValues={{
          text: text,
          type: type,
          source: source,
        }}
        enableReinitialize
        onSubmit={values => {
          updateQuote(values);
          props.closeDisplay();
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
              name="source"
              style={styles.textInput}
            />
            <View style={styles.quoteSelect}>
              <SelectBox
                label="Select tags"
                options={groups}
                selectedValues={selectedVals}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />
            </View>
            <TouchableOpacity
              style={styles.formButton}
              large
              title="Close"
              onPress={() => {
                props.closeDisplay();
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
                deleteQuote(id);
                props.closeDisplay();
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
  formInputContainer: {
    width: '85%',
    padding: 10,
    elevation: 20,
    backgroundColor: '#e6e6e6',
  },
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
  quoteSelect: {
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    margin: 10,
    padding: 5,
    width: '90%',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
  },
});

export default EditQuote;
