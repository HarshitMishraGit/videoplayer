import { View, Text,Dimensions,StyleSheet ,TouchableOpacity} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import VideoPlayer from 'react-native-video-player';
import DirectoryPickerComp from './DirectoryPickerComp';
import storage from '../storage/storage';
import { TapGestureHandler, State, GestureHandlerRootView,PinchGestureHandler } from 'react-native-gesture-handler';
export default function VideoWrapper(props: any) {
    const { uri,setVideoList,setDirName } = props;
    const { width, height } = Dimensions.get('window');
    const [showControls, setShowControls] = useState<boolean>(false);
    const [videoResizeMode, setVideoResizeMode] = useState<'contain' | 'cover'>('contain');
    const videoPlayerRef = useRef<VideoPlayer>(null);
    // console.log("uri",uri)
  const onDoubleTap = (event:any) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        // console.log(videoPlayerRef.current)
    // videoPlayerRef?.current?.seek(videoPlayerRef?.current?.state.currentTime + 10); // Seek 10 seconds forward
    }
    };
    useEffect(() => {
        storage.load({
            key: 'resizeMode',
        }).then(res => {
            // console.log("res: ", res);
            setVideoResizeMode(res);
        }).catch(err => {
            // console.log("err: ", err);
        })
    }, [])
    
    
    const resizeModeToggler = () => {
        setVideoResizeMode(videoResizeMode === 'contain' ? 'cover' : 'contain');
        storage.save({
            key: 'resizeMode',
            data: videoResizeMode === 'contain' ? 'cover' : 'contain',
        })
      };
  return (
      <View style={{ width: width }}>
          {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
              <DirectoryPickerComp setVideoList={setVideoList} setDirName={setDirName} />
              {/* <TapGestureHandler
      numberOfTaps={2}
      onHandlerStateChange={onDoubleTap}
              > */}
                  
                  <View>
 <VideoPlayer 
           ref={videoPlayerRef}
            video={{ uri: 'file://' + uri.path }}
            videoWidth={width}
            videoHeight={height}
            //   autoplay={true}
              pauseOnPress={true}
              fullScreenOnLongPress={true}
                          resizeMode={videoResizeMode}
                        
          />
          
          <View style={styles.float}>
      <Text style={{ color: 'red' }}>{uri.name} </Text>
                      </View>
          <View style={styles.resize}>
                          <TouchableOpacity onPress={resizeModeToggler}>
                              <Text style={{fontSize:28}}>🔳</Text>
                              </TouchableOpacity>
                      </View>
                  </View>
                  {/* </TapGestureHandler> */}
              {/* </GestureHandlerRootView>    */}
    </View>
  )
}

const styles = StyleSheet.create({
    float: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        margin: 30,
       
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10
    },
    resize: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        margin: 25,
       
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:10
    }
})