import React,{ useState } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground, Alert} from 'react-native';


export class CardCustom extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
           
        };
    }
       
    render(){
        const {dataPub} = this.props;
        console.log(dataPub)
        return(
            <Text>hola</Text>
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