import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';
import {loggingOut} from '../database/api'
import {DrawerNavigator} from '../navigation/DrawerNavigator'

export default function LoadingScreen({ navigation }) {
  
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('DrawerNavigator');
        } else {
          navigation.replace('HomeScreen');
        }
      });
    }
  );

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //height: '100%',
    //width: '100%',
    backgroundColor: '#3FC5AB',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    padding:35
  },
});