import { View, Text,Dimensions } from 'react-native'
import React,{useState} from 'react'
import VideoPlayer from 'react-native-video-player';
import DirectoryPickerComp from './DirectoryPickerComp';

export default function VideoWrapper(props: any) {
    const { uri,setVideoList,setDirName } = props;
    const { width, height } = Dimensions.get('window');
    const [showControls, setShowControls] = useState<boolean>(false);
  return (
    <View style={{width:width}}>
      <DirectoryPickerComp setVideoList={setVideoList} setDirName={setDirName}/>
        <VideoPlayer 
            video={{ uri: 'file://' + uri.path }}
            videoWidth={width}
            videoHeight={height}
            //   autoplay={true}
              pauseOnPress={true}
              fullScreenOnLongPress={true}
          />
          
     
    </View>
  )
}