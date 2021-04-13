
import React,{ useState } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground, Alert} from 'react-native';
import { registration,loggingOut } from '../database/api';

export default class CreateUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            lastname:"",
            email:"",
            password: "",
            password2: ""
        };
    }
    createNewUser = async () => {
        registration(
            this.state.email,
            this.state.password,
            this.state.lastName,
            this.state.name,
          );
        Alert.alert('Usuario Creado!');
        loggingOut();
        this.props.navigation.navigate('LoadingScreen');
        emptyState();
        
        
        
    }

    render(){
        return(
            <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}>        
                <ScrollView style={styles.container}>
                    <View style={styles.inputGroup}>  
                        <TextInput
                            placeholder="First Name" 
                            onChangeText={(value) =>  this.setState({name: value})}
                        />

                    </View>
                    <View style={styles.inputGroup}>  
                        <TextInput
                            placeholder="Last Name" 
                            onChangeText={(value) =>  this.setState({lastName: value})}
                        />

                    </View>
                    <View style={styles.inputGroup}>  
                        <TextInput 
                            placeholder="Email User"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={(value) =>  this.setState({email: value})}
                        />

                    </View>
                    <View style={styles.inputGroup}>  
                        <TextInput 
                            secureTextEntry={true}
                            placeholder="Password" 
                            onChangeText={(value) =>  this.setState({password: value})}
                        />
                    </View>
                    <View style={styles.inputGroup}>  
                        <TextInput 
                            secureTextEntry={true}
                            placeholder="Password" 
                            onChangeText={(value) =>  this.setState({password2: value})}
                        />
                    </View>
                    <View>
                        <Button title="Guardar" onPress={this.createNewUser.bind(this)}/>
                    </View>

                </ScrollView>
            </ImageBackground>     
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'

     }, 
    background: {
        flex: 1
    
    }
})

