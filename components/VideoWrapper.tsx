import { View, Text,Dimensions,StyleSheet ,TouchableOpacity,LayoutRectangle,Platform,StatusBar,ActivityIndicator} from 'react-native'
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
     const [videMovementStep, setVideMovementStep] = useState(5);
     const [show, setShow] = useState(false)
    const [videoResizeMode, setVideoResizeMode] = useState<'contain' | 'cover'>('contain');
    const videoPlayerRef = useRef<VideoPlayer>(null);
     const VideoWrapperRef = useRef<any>(null);
     const heightStatus = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    const [loading, setLoading] = useState(true);
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
  
    }
    };
  const prevVideo = (event:any) => {
      if (event.nativeEvent.state === State.ACTIVE) {
          const duration = videoPlayerRef?.current?.state.duration;
          const progress = videoPlayerRef?.current?.state.progress;
        const currentTime = (duration ?? 0) * (progress ?? 0);
          console.log(currentTime);
        videoPlayerRef?.current?.seek(currentTime + 10); // Seek 10 seconds backward
   
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

        storage.load({
            key: 'floatingMenuPosition',
        }).then(res => {
            // console.log("res: ", res);
            setShow(res)
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
            key: 'randomVideoList',
        });
        if(videoList.length === 0){
            const allVideoList = await storage.load({
                key: 'videoList',
            });
            storage.save({
                key: 'randomVideoList',
                data: allVideoList,
            })
        }
        const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
        setvideopath(randomVideo.path);
        setVideoName(randomVideo.name);
        // remove the video from the list
        const updatedVideoList = videoList.filter((video: any) => video.path !== randomVideo.path);
        storage.save({
            key: 'randomVideoList',
            data: updatedVideoList,
        })
    }

  return (
    <View style={{ width: width ,height:height+(heightStatus ?? 0),minWidth:width,minHeight:height+(heightStatus ?? 0)}} ref={VideoWrapperRef} >
          <GestureHandlerRootView style={{ flex: 1 }}>
              <DirectoryPickerComp setVideoList={setVideoList} randomVideo={randomVideo} resizeModeToggler={resizeModeToggler} videoRef={videoPlayerRef} videMovementStep={videMovementStep} setVideMovementStep={setVideMovementStep} setShow={setShow} show={show } />
              <TapGestureHandler
      numberOfTaps={2}
      onHandlerStateChange={onDoubleTap}
              >
                 
                  <View>
                      {loading && <>
                      
                          <View style={{flex:1,justifyContent:'center',alignContent:'center',backgroundColor:'#FFF'}}>
                          <ActivityIndicator size="large" color="#0000ff" />
                      </View>
                      </>}
                      <VideoPlayer 
                          style={{ width: width, height: height+(heightStatus ?? 0) }}
                          ref={videoPlayerRef}
                          onLoadStart={() => setLoading(true)}
                            onLoad={() => setLoading(false)}
            video={{ uri: 'file://' + videopath}}
            videoWidth={width}    
            videoHeight={height>width?(height+(heightStatus ?? 0)):height}
                          pauseOnPress={true}
                       loop={true}   
                     fullScreenOnLongPress={true}
                          resizeMode={videoResizeMode}
                          //   fullscreen={true}
                          
                          autoplay={playing}
                          onEnd={() => {
                            
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

export default React.memo(VideoWrapper)
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
        // opacity:0.5
    }
})