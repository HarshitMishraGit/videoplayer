import React,{useState,useEffect} from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  FlatList,

  // Added Button component
} from 'react-native';
import DirectoryPickerComp from './components/DirectoryPickerComp';
import storage from './storage/storage';
import VideoWrapper from './components/VideoWrapper';
function App(): React.JSX.Element {
  const [videoList, setVideoList] = useState<string[]>(['']);
  const [dirName, setDirName] = useState<string>('');
  
  useEffect(() => {
    console.log("DirName: ", dirName)
    if (storage) {
      storage.load({
        key: 'videoList',
      }).then(res => {
        // console.log("res: ", res);
        setVideoList(res);
      }).catch(err => {
        // console.log("err: ", err);
      })
    }
  }, [storage])
  const videoData = [
    {
    uri:'/storage/777B-D380/cachedir/My Space/RDT_20231225_123445.mp4'
    
    },
    {
    uri:'/storage/777B-D380/cachedir/My Space/RDT_20231225_123445.mp4'
    
    },
    {
    uri:'/storage/777B-D380/cachedir/My Space/RDT_20231225_123445.mp4'
    
    },
    {
    uri:'/storage/777B-D380/cachedir/My Space/RDT_20231225_123445.mp4'
    
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      {/* <DirectoryPickerComp  setDirName={setDirName}/> */}
      <FlatList
        style={{flex:1,backgroundColor:'black'}}
        data={Array.from(videoList, path => ({ path }))}
        contentContainerStyle={{ width: '100%' }}
        renderItem={({ item }: { item: { path: string } }) => <VideoWrapper uri={item?.path} setDirName={setDirName} setVideoList={setVideoList} />}
        snapToAlignment='start'
        snapToInterval={0}
        decelerationRate={'fast'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color:'black',
  }
});

export default App;

