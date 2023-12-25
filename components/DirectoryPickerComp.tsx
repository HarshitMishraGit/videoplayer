import { View, Text ,StyleSheet, Button,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker from 'react-native-document-picker';  
import storage from '../storage/storage';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function DirectoryPickerComp(props:any) {
    const { setVideoList ,setDirName } = props;
    const [dir,setdir] = useState<string>('');
    storage.load({
        key: 'dirName',
    }).then(res => {
        // console.log("res: ", res);
        setdir(res);
    }).catch(err => {
        // console.log("err: ", err);
    })

    

const handleDirectory = async () => {
        try {
            const res = await DocumentPicker.pickDirectory();
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
            return ['mp4', 'avi', 'mov', 'mkv','ts'].includes(fileExtension ?? '');
            });
              setVideoList(videoFiles);
              // save it inside storage
              storage.save({
                key: 'videoList',
                data: videoFiles,
              });
            console.log("Directory changed ");
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
    <View style={styles.floatingContainer}>
      
      <TouchableOpacity onPress={handleDirectory}  >
        <Text style={{fontSize:20}}>. . .</Text>
     </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    floatingContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 10,
     borderRadius: 5,
      zIndex:10
    },
  
})