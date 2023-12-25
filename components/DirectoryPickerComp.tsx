import { View, Text ,StyleSheet, Button} from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker';  

export default function DirectoryPickerComp() {

    const handleDirectory = async () => {
        try {
          const res = await DocumentPicker.pickDirectory();
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
          <Text style={styles.text}>DirectoryPickerComp</Text>
          <Button title="Click me" onPress={handleDirectory} />
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        color:'black',
    }
})