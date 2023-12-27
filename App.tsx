import React,{useState,useEffect,useRef,useCallback} from 'react';
import Shorts from './components/Shorts';

function App(): React.JSX.Element {
  const [videoList, setVideoList] = useState<string[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0); 
  return (<>
    
    <Shorts videoList={videoList} setVideoList={setVideoList}  visibleIndex={visibleIndex} setVisibleIndex={setVisibleIndex}/>
   
    </>
  );
}



export default App;

