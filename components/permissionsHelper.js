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
  } catch (error) {
    console.error('Error while asking for files and media permissions:', error);
  }
}
