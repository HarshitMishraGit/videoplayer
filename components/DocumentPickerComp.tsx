import { View, Text,Button,StyleSheet } from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker';  
export default function DocumentPickerComp() {
    const openDocumentFile = async () => {
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.video],
          });
          console.log(
            res
          );
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
          } else {
            throw err;
          }
        }
      }
  return (
    <View>
        <View>
        <Text style={styles.text}>Document Picker</Text>
        <Button title="Click me" onPress={openDocumentFile} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    style: {
      backgroundColor: 'white',
    },
    text: {
      color: 'black',
      fontSize: 24,
      textAlignVertical: 'center',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  