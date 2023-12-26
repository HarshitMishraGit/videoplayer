import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function FloatingMenu(props: any) {
  const { videoRef,videMovementStep,setVideMovementStep } = props;

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleMovementStep = () => {
    const options = [5, 10, 15, 20];
    const index = options.indexOf(videMovementStep);
    const newIndex = (index + 1) % options.length;
    setVideMovementStep(options[newIndex]);

  }
  // const handleLoop = () => {
  //   //  make loop true
  //   videoRef?.current?.setLoop(!videoRef?.current?.props.loop);
  // }
  return (<>
      <TouchableOpacity onPress={toggleMenu} >
        <Text style={{fontSize:28}}>💿</Text>
      </TouchableOpacity>
    <View >
      {menuVisible && (
        <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleMovementStep}>
              <Text style={{ fontSize: 20 }}>{ videMovementStep} <Text  style={{ fontSize: 10 }}>sec</Text></Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleLoop}>
            <Text style={{ fontSize: 20 }}>{ videoRef?.current?.props.loop== true?'🔁':'🔴'}</Text>
        </TouchableOpacity> */}
     
        </View>
      )}
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: -30,
    width: 50,
    height: 100,
    marginBottom: 50,
    backgroundColor: 'gray',
  },
  container: {
    position: 'relative',
  }
  ,
  menuButton: {
    position: 'absolute',
    bottom: 0,
    alignContent: 'center',
    
  }
});