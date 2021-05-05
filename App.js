import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './navigation/RootNavigation';
import * as firebase from 'firebase';
import keys from './database/keys';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn:false
    };
    if (!firebase.apps.length) {
      console.log('Connected with Firebase')
      firebase.initializeApp(keys.firebaseConfig);
    }
}
  render(){
    return (
      
          <RootNavigator />
         
    );
}

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
