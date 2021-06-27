import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Database from '../../Database';
import {Formik, Field} from 'formik';
import CustomTextInput from './CustomTextInput';

const db = new Database();

const EditQuoteGroupModal = props => {
  const [groupId, setGroupId] = useState(props.id);
  const [groupName, setGroupName] = useState(props.item);
  const [updatedQuotes, setUpdatedQuotes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getQuoteTypesToUpdate()
      .then(data => {
        if (isMounted) {
          setUpdatedQuotes(data);
        }
      })
      .then(error => {
        console.log(
          'we ran into an error with getQuoteTypesToUpdate! : ' + error,
        );
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getQuoteTypesToUpdate = () => {
    return db.getQuoteGroupByName(groupName);
  };

  const processQuoteTypeUpdates = (oldName, newName, isUpdate) => {
    let quotes = [];
    for (let i = 0; i < updatedQuotes.length; i++) {
      let row = updatedQuotes[i];
      let parsedObj = JSON.parse(row.quoteType);
      let index = parsedObj.findIndex(x => x.item === oldName);
      if (isUpdate) {
        parsedObj[index].item = newName;
      } else {
        // deleting quote group from quoteType
        parsedObj.splice(index, 1);
      }
      row.quoteType = JSON.stringify(parsedObj);
      const {quoteId, quoteText, quoteType, quoteSource} = row;
      quotes.push({
        quoteId,
        quoteText,
        quoteType,
        quoteSource,
      });
    }
    return quotes;
  };

  const updateQuoteGroupName = values => {
    let hasChanged = values.name !== groupName;
    if (hasChanged) {
      db.updateQuoteGroupName(values.name, groupId).then(r => {
        console.log('success ' + r);
      });
      let updates = processQuoteTypeUpdates(groupName, values.name, true);
      db.updateQuoteTypes(updates).then(r => {
        console.log('Processed quote group updates: ' + r);
      });
    }
  };

  const handleQuoteGroupDeletion = id => {
    // deleteQuoteGroup(id);
    let deletions = processQuoteTypeUpdates(groupName, '', false);
    db.updateQuoteTypes(deletions).then(r => {
      console.log('Deleted quote group: ' + r);
    });
  };

  const deleteQuoteGroup = id => {
    db.deleteQuoteGroup(id)
      .then(result => {
        console.log('deleted quote group at id: ' + id + ', ' + result);
      })
      .error(error => {
        console.log('error deleting quote group: ' + error);
      });
  };

  return (
    <View style={styles.formInputContainer}>
      <Formik
        enableReinitialize
        initialValues={{id: groupId, name: groupName}}
        onSubmit={values => {
          updateQuoteGroupName(values);
          props.setRefreshGroups(!props.refreshGroups);
          props.closeModal();
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
                handleQuoteGroupDeletion(groupId);
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
