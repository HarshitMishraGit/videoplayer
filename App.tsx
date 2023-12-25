import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
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


function App(): React.JSX.Element {
  const [fileResponse, setFileResponse] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <DirectoryPickerComp />
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
