import {PermissionsAndroid, Platform, Linking} from 'react-native';
// Function to ask for files and media permissions
export async function askForFilesAndMediaPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Files and media permissions granted');
    } else {
      console.log('Files and media permissions denied');
    }

    // If the Android version is 11 (R) or higher, ask for the MANAGE_EXTERNAL_STORAGE permission
    if (Platform.OS === 'android') {
      const packageName = 'com.videoplayer'; // Replace with your actual package name
      const uri = `package:${packageName}`;
      const canOpen = await Linking.canOpenURL(uri);
      if (canOpen) {
        await Linking.openURL(uri);
      }
    }
  } catch (error) {
    console.error('Error while asking for files and media permissions:', error);
  }
}
