import { View, Text,Dimensions,StyleSheet ,TouchableOpacity,LayoutRectangle} from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import VideoPlayer from 'react-native-video-player';
import DirectoryPickerComp from './DirectoryPickerComp';
import storage from '../storage/storage';
import { TapGestureHandler, State, GestureHandlerRootView,PinchGestureHandler } from 'react-native-gesture-handler';
import FloatingMenu from './FloatingMenu';
 function VideoWrapper(props: any) {
    const { uri,setVideoList,index,visible,playing,paused } = props;
    const { width, height } = Dimensions.get('window');
    const [videopath, setvideopath] = useState<string>(uri.path);
    const [videoName, setVideoName] = useState(uri.name)
     const [videMovementStep, setVideMovementStep] = useState(5)
     const [show, setShow] = useState(false)
    const [videoResizeMode, setVideoResizeMode] = useState<'contain' | 'cover'>('contain');
    const videoPlayerRef = useRef<VideoPlayer>(null);
    const VideoWrapperRef = useRef<any>(null);
    // console.log("uri",uri)
  const onDoubleTap = (event:any) => {
      if (event.nativeEvent.state === State.ACTIVE) {
          const duration = videoPlayerRef?.current?.state.duration;
          const progress = videoPlayerRef?.current?.state.progress;
          if (!duration || !progress)
              return;
        let currentTime = (duration ?? 0) * (progress ?? 0);
            // console.log(currentTime);
          if (currentTime === duration) {
                videoPlayerRef?.current?.seek(0);
            
          } else {
              
              videoPlayerRef?.current?.seek(currentTime + videMovementStep); // Seek 10 seconds backward
        }
    // videoPlayerRef?.current?.seek(videoPlayerRef?.current?.state.currentTime + 10); // Seek 10 seconds forward
    }
    };
  const prevVideo = (event:any) => {
      if (event.nativeEvent.state === State.ACTIVE) {
          const duration = videoPlayerRef?.current?.state.duration;
          const progress = videoPlayerRef?.current?.state.progress;
        const currentTime = (duration ?? 0) * (progress ?? 0);
          console.log(currentTime);
        videoPlayerRef?.current?.seek(currentTime + 10); // Seek 10 seconds backward
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
  
      
    const randomVideo = async () => {
        const videoList = await storage.load({
            key: 'videoList',
        });
        const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
        setvideopath(randomVideo.path);
        setVideoName(randomVideo.name);
        // also while changing the video shuffle the videoList
    
    }
  return (
      <View style={{ width: width }} ref={VideoWrapperRef}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <DirectoryPickerComp setVideoList={setVideoList} randomVideo={randomVideo} resizeModeToggler={resizeModeToggler} videoRef={videoPlayerRef} videMovementStep={videMovementStep} setVideMovementStep={setVideMovementStep} setShow={setShow} show={show } />
              <TapGestureHandler
      numberOfTaps={2}
      onHandlerStateChange={onDoubleTap}
              >
                 
                  <View>
 <VideoPlayer 
           ref={videoPlayerRef}
            video={{ uri: 'file://' + videopath}}
            videoWidth={width}
            videoHeight={height}
              pauseOnPress={true}
              fullScreenOnLongPress={true}
                          resizeMode={videoResizeMode}
                          fullscreen={true}
                          autoplay={playing}
                          onEnd={() => {
                              videoPlayerRef?.current?.seek(0);
                          }}
          />
          
          <View style={styles.float}>
      <Text style={{ color: 'red' }}>{videoName} </Text>
                      </View>
              {!show && <View style={styles.resize}>
                          <FloatingMenu videoRef={videoPlayerRef} videMovementStep={videMovementStep} setVideMovementStep={setVideMovementStep} setShow={setShow} show={ show} />
                          <TouchableOpacity onPress={randomVideo}>
                              <Text style={{fontSize:28}}>🔃</Text>
                              </TouchableOpacity>
                  
                          <TouchableOpacity onPress={resizeModeToggler}>
                              <Text style={{fontSize:28}}>🔳</Text>
                              </TouchableOpacity>

                      </View>}
                      </View>
                      </TapGestureHandler>
                 
              </GestureHandlerRootView>   
    </View>
  )
}

export default VideoWrapper
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
         gap:10,
          alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        opacity:0.5
    }
})