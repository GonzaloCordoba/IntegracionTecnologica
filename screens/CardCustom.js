import React,{ useState } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground, Alert,FlatList,Image} from 'react-native';


export default function CardCustom({dataPub ,currentIndex}){
    //console.log(dataPub)
    return(
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Image source={{ uri: dataPub.uri }} style={{ width: 250, height: 200 ,borderRadius: 10,marginBottom:10}}/>
            <View>
                <Text style={{fontSize:25, fontWeight:'bold', color:'#073361'}}>Nombre: {dataPub.nameBook}</Text>
                <Text style={{fontSize:25, fontWeight:'bold', color:'#073361'}}>Autor: {dataPub.nameAuthorBook}</Text>
                <Text style={{fontSize:25, fontWeight:'bold', color:'#073361'}}>Estado: {dataPub.stateBook}</Text>
            </View>
        </View>
        
        
        
    )
}

