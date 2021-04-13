import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground} from 'react-native';

export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}> 
                <ScrollView style={styles.container}>
                    <View>
                         <Text>Dashboard 2</Text>
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