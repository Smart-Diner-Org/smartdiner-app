import * as React from 'react';
import { Image,StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <Image
          style={styles.Logo}
          source={require('../assets/logo.png')}
            />
  );
};

export default Logo;


const styles = StyleSheet.create({

  Logo:{
    marginTop:120,
    position: 'absolute',
    alignSelf:"center",
    height:60,
    width: 156,
  },
});