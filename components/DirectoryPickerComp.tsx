import { View, Text ,StyleSheet, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker from 'react-native-document-picker';  
import storage from '../storage/storage';
import * as RNFS from 'react-native-fs';
export default function DirectoryPickerComp(props:any) {
    const { setDirName } = props;
    const [dir, setdir] = useState("")
    storage.load({
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
        //   console.log(
        //     res
        //     );
            setDirName(res?.uri);
            // res.uri = content://com.android.externalstorage.documents/tree/777B-D380%3A.cache%2FMy%20Space
            // absolute path = /storage/777B-D380/.cache/My Space
            // %3A = : so replace it with %2F = / to get the absolute path
                  // Read the directory
            if (res?.uri) {
                // check if the directory exists
                let dirToRead = res?.uri.split('tree')[1];   
                dirToRead = '/storage' + dirToRead.replace(/%3A/g, '%2F');
                const files = await RNFS.readDir(decodeURIComponent(dirToRead));              
                
            // Filter to only include video files
            const videoFiles = files.filter(file => {
            const fileExtension = file.name.split('.').pop();
            return ['mp4', 'avi', 'mov', 'mkv'].includes(fileExtension ?? '');
            });

            console.log(videoFiles);
        }
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