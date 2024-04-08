import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import storage from '../storage/storage';

export default function FloatingMenu(props: any) {
  const { videoRef,videMovementStep,setVideMovementStep,setShow,show } = props;

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
  const handleShow = () => {
    //  make loop true
    setShow((e: boolean) => !e);

    storage.save({
      key:"floatingMenuPosition",
      data: !show
    })
  }
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
          <TouchableOpacity onPress={handleShow}>
            <Text style={{ fontSize: 20 }}>{ show== true?'⬇️':'⬆️'}</Text>
        </TouchableOpacity>
     
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
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:-40,
    right: 30,
    width: 100,
    height: 50,
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