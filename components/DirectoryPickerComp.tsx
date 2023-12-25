import { View, Text ,StyleSheet, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker from 'react-native-document-picker';  
import storage from '../storage/storage';
export default function DirectoryPickerComp(props:any) {
    const { setDirName } = props;
    const [dir, setdir] = useState("")
    let dirName = storage.load({
        key: 'dirName',
    }).then(res => {
        console.log("res: ", res);
        setdir(res);
    }).catch(err => {
        console.log("err: ", err);
    })

    
    const handleDirectory = async () => {
        try {
          const res = await DocumentPicker.pickDirectory();
          console.log(
            res
            );
            setDirName(res?.uri);
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
          <Text style={styles.text}>dir : { dir}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        color:'black',
    }
})