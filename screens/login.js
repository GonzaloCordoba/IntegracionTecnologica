import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground} from 'react-native';
import {signIn} from '../database/api';

export default class LoginUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            email:"",
            password: ""
        };
    }

    LoginUserOk = async () => {
        signIn(
            this.state.email,
            this.state.password,
          );
        Alert.alert('Logueado!');
        this.props.navigation.navigate('LoadingScreen');
        emptyState();
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
                        onChangeText={(value) =>  this.setState({email: value})}
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

