import {ImageBackground, StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen ({navigation}) {
  return (
     <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}>
            <View>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain">
          </Image>
        </View>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>Bienvenido a Tinder-Libros</Text>
      </View> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateUser')} >
        <Text style={styles.buttonText}>Registrar</Text>
       </TouchableOpacity>
      <Text style={styles.inlineText}>Ya tenes una cuenta?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginUser')}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
     </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#2760ae',
    padding: 5,
    margin: '2%'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },
});