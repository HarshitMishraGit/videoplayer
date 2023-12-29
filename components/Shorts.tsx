import React,{useState,useEffect,useRef,useCallback} from 'react';
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
  LayoutRectangle,
  LayoutChangeEvent,
  // Added Button component
} from 'react-native';
import DirectoryPickerComp from './DirectoryPickerComp';
import storage from '../storage/storage';
import VideoWrapper from './VideoWrapper';
import { askForFilesAndMediaPermission } from './permissionsHelper';
export default function Shorts(props:any) {
    const {videoList,setVideoList,visibleIndex,setVisibleIndex} = props;
    const [dirName, setDirName] = useState<string>('');

    useEffect(() => {
      askForFilesAndMediaPermission();
    }, []);
    const [layout, setLayout] = useState<LayoutRectangle>({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    });
    useEffect(() => {
      console.log("DirName: ", dirName)
      if (storage) {
        storage.load({
          key: 'videoList',
        }).then(res => {
          // console.log("res: ", res);
          // shuffle the videoList
          const shuffledVideoList = res.sort(() => Math.random() - 0.5);
          setVideoList(shuffledVideoList);
          // setVideoList(res);
        }).catch(err => {
          // console.log("err: ", err);
        })
      }
    }, [storage])
    
   
    const viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
    };
  
    const onViewRef = useRef((viewableItems: any) => {
      if (viewableItems?.viewableItems?.length > 0) {
        const index = viewableItems?.viewableItems?.[0]?.index;
         setVisibleIndex(index);
         console.log("index :", index, "visibleIndex :", visibleIndex);
      }
    });
  
    return (<>
        <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}  onLayout={(e: LayoutChangeEvent) => {
          setLayout(e.nativeEvent.layout);
        }}>
        {videoList.length === 0 && <DirectoryPickerComp setVideoList={setVideoList} />}
        <FlatList
          style={{flex:1,backgroundColor:'black'}}
          data={Array.from(videoList, (path: string) => ({ path }))}
        contentContainerStyle={{ width: '100%' }}
          renderItem={useCallback(
              ({ item, index }: { item: { path: string }, index: number }) => {
              return (<VideoWrapper uri={item?.path} setDirName={setDirName} setVideoList={setVideoList} index={ index}  paused={index !== visibleIndex}
                layout={layout}
                playing={index === visibleIndex}
                visible={index === visibleIndex}/>) 
            },
            [layout,visibleIndex],
                )}
                
          keyExtractor={(item, index) => item.path + index}
          showsVerticalScrollIndicator={false}
          snapToAlignment='start'
          snapToInterval={0}
          decelerationRate={'fast'}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewRef.current}
          pagingEnabled
          windowSize={2}
          />
      </View>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf:'stretch'
     
    },
    text: {
      color:'black',
    }
  });