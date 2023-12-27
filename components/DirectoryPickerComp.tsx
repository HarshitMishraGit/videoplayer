import { View, Text ,StyleSheet, Button,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentPicker from 'react-native-document-picker';  
import storage from '../storage/storage';
import * as RNFS from 'react-native-fs';
import FloatingMenu from './FloatingMenu';
import RNRestart from 'react-native-restart'; 
export default function DirectoryPickerComp(props:any) {
    const { setVideoList ,randomVideo ,resizeModeToggler ,show,videoPlayerRef, videMovementStep, setVideMovementStep,setShow } = props;
  const [dir, setdir] = useState<string>('');
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
                console.log(decodeURIComponent(dirToRead))
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
              }).then(() => {
                console.log("videoList saved successfully");
                RNRestart.restart();
              })
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
        <Text style={{fontSize:25,color:'gray'}}>📂</Text>
      </TouchableOpacity>
        {show && <View style={styles.resize}>
        <FloatingMenu videoRef={videoPlayerRef} videMovementStep={videMovementStep} setVideMovementStep={setVideMovementStep} setShow={setShow} show={show} />
                 <TouchableOpacity onPress={randomVideo}>
                     <Text style={{fontSize:28}}>🔃</Text>
                     </TouchableOpacity>
         
                 <TouchableOpacity onPress={resizeModeToggler}>
                     <Text style={{fontSize:28}}>🔳</Text>
                     </TouchableOpacity>

             </View>}
      </View>
  )
}

const styles = StyleSheet.create({

    floatingContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
      gap: 10,
      top: 10,
      right: 10,
     borderRadius: 5,
    zIndex: 10,
      opacity:0.5
  },
  resize: {
    right: 0,
     gap:10,
    alignItems: 'center',
    justifyContent: 'center',
 
    zIndex: 10,
    opacity:0.5
}
  
})