
import { createStackNavigator } from '@react-navigation/stack';
import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,} from 'react-native';
import firebase from '../database/firebase'

const CreateUser = () =>{

    const [state,setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handlerChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const createNewUser = async () => {
        if(state.name === '' || state.email === '' || state.password === ""){
            alert('Por favor ingresa todos los campos');
        }else{
            firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                password: state.password
                
            })
            console.log("guardado");
            alert('Guardado!!');
        }
        
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>  
                <TextInput
                    placeholder="Name User" 
                    onChangeText={(value) => handlerChangeText('name',value)}
                />

            </View>
            <View style={styles.inputGroup}>  
                <TextInput 
                    placeholder="Email User"
                    
                    onChangeText={(value) => handlerChangeText('email',value)}
                />

            </View>
            <View style={styles.inputGroup}>  
                <TextInput 
                    secureTextEntry={true}
                    placeholder="Password" 
                    onChangeText={(value) => handlerChangeText('password',value)}
                />
            </View>
            <View>
                <Button title="Guardar" onPress={()=> createNewUser()}/>
            </View>

        </ScrollView>
    )
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

     }
})

export default CreateUser;