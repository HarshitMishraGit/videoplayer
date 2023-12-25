/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button, // Added Button component
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomePage from './components/Screens/HomePage';
import DocumentPicker from 'react-native-document-picker';
function App(): React.JSX.Element {
  const openDocumentFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
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
    <SafeAreaView style={styles.style}>
      <View>
        <Text style={styles.text}>Document Picker</Text>
        <Button title="Click me" onPress={openDocumentFile} />
      </View>
    </SafeAreaView>
  );
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

export default App;
