import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import Database from '../../Database';
import {xorBy} from 'lodash/array';
import {Formik} from 'formik';
import * as yup from 'yup';

let db = new Database();

const AddQuoteModal = props => {
  const [groups, setGroups] = useState([]);
  const [listRefresh, setListRefresh] = useState(false);
  const [selectedVals, setSelectedVals] = useState([]);

  useEffect(() => {
    console.log('useEffect! ');
    getQuoteGroups();
  }, [listRefresh]);

  const getQuoteGroups = () => {
    db.getQuoteGroups()
      .then(data => {
        console.log('data retrieved!');
        let qg = [];
        Object.keys(data).forEach(key => {
          let row = {};
          row.item = data[key].groupName;
          row.id = data[key].groupId;
          qg.push(row);
        });
        setGroups(qg);
        console.log('groups' + groups);
      })
      .then(error => {
        console.log('getQuoteGroups error ' + error);
      });
  };

  const quoteFormSchema = yup.object().shape({
    quoteText: yup.string().required("Don't forget to enter the quote!"),
    source: yup
      .string()
      .required('Where did you hear this quote / who said it?'),
  });

  const saveQuote = values => {
    console.log(values);
    let data = {
      quoteText: values.quoteText,
      quoteType: JSON.stringify(values.type),
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

  const onMultiChange = () => {
    return item => setSelectedVals(xorBy(selectedVals, [item], 'id'));
  };

  return (
    <View style={styles.formInputContainer}>
      <Formik
        validationSchema={quoteFormSchema}
        initialValues={{quoteText: '', type: '', source: ''}}
        onSubmit={values => {
          values.type = selectedVals;
          console.log('refresher props before: ' + props.refresh);
          console.log('values: ' + JSON.stringify(values));
          saveQuote(values);
          props.setRefresh(!props.refresh);
          props.closeDisplay();
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
              placeholder={'Who said it / where you heard it'}
              placeholderTextColor={'black'}
              value={values.source}
              onChangeText={handleChange('source')}
              onBlur={handleBlur('source')}
            />
            {errors.source && touched.source && (
              <Text style={styles.errorText}>{errors.source}</Text>
            )}
            <View style={styles.textInput}>
              <SelectBox
                label="Select tags"
                options={groups}
                selectedValues={selectedVals}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />
            </View>
            <View style={styles.buttonContainer}>
              <View>
                <TouchableOpacity
                  style={styles.formButton}
                  title="Save"
                  onPress={handleSubmit}
                  disabled={!isValid}>
                  <Text style={styles.formButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.formButton}
                  large
                  title="Close"
                  onPress={() => {
                    props.closeDisplay();
                    db.listQuotes();
                  }}>
                  <Text style={styles.formButtonText}>Close</Text>
                </TouchableOpacity>
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
  selectBox: {
    padding: 15,
  },
  formButton: {
    alignItems: 'center',
    backgroundColor: '#36ced4',
    padding: 15,
    margin: 10,
    width: 135,
    borderRadius: 70,
  },
  formButtonText: {
    color: 'black',
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});
export default AddQuoteModal;
