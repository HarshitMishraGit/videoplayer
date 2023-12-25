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
function App(): React.JSX.Element {
  const [dirName, setDirName] = useState("");

  
  // useEffect(() => {
  //   console.log("DirName: ", dirName)
  //   if (dirName && storage) {
  //     storage.save({
  //       key: 'dirName',  // Note: Do not use underscore("_") in key!
  //       data: dirName,
  //     });
  //   }
  // }, [dirName,storage])
  
  return (
    <SafeAreaView style={styles.container}>
      <DirectoryPickerComp  setDirName={setDirName}/>
      {/* <FlatList
        data={[{key: 'a'}, {key: 'b'}]}
        renderItem={({ item }) => <Text style={styles.text}>{item.key}</Text>}
      /> */}
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

