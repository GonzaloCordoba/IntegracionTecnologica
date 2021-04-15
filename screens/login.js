import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Alert} from 'react-native';
import {signIn} from '../database/api';
import * as Location from 'expo-location';

export default class LoginUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            email:"",
            password: "",
            latitude:"",
            longitude:"",
            errorMsg:""
        };
    }

    getGeolocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        this.setState({latitude});
        this.setState({longitude})
        console.log(this.state.longitude);
    }

    LoginUserOk = async () => {
        signIn(
            this.state.email,
            this.state.password,
            this.state.latitude,
            this.state.longitude
            
          );
        
        Alert.alert('Logueado!');
        this.props.navigation.navigate('LoadingScreen');
        emptyState();
        this.setstate = { 
            email:"",
            password: "",
            latitude:"",
            longitude:"",
            errorMsg:""
        };
    }
    
    render() {
        return(
        <ImageBackground
            style={styles.background}
            source={require('../assets/background.jpg')}>         
            <ScrollView style={styles.container}>
            
                <View style={styles.inputGroup}>  
                    <TextInput
                        placeholder="Email User" 
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(value) =>  this.setState({email: value})}
                        onFocus={this.getGeolocation.bind(this)}
                    />

                </View>
                <View style={styles.inputGroup}>  
                    <TextInput 
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(value) =>  this.setState({password: value})}
                    />
                </View>
                
                <View>
                    <Button title="Ingresar" onPress={this.LoginUserOk.bind(this)}/>
                </View>

            </ScrollView>
        </ImageBackground>    
        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        marginTop:100
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'

     },
     titulo:{
         textAlign:'right'
     },
     background:{
        flex: 1
    
     }
})

