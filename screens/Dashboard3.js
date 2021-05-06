import React,{ useState, useEffect  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Alert} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {savePublication, getImageUri,getAllMatchs,getAllUserById} from '../database/api';
import * as ImagePicker from 'expo-image-picker';
import UserList from './userList'
import { ListItem, Avatar } from "react-native-elements";



export default function Dashboard3(){
    const currentUser = firebase.auth().currentUser;
    const [dataUser,setDataUser] = useState([]);
    const [match,setMatch] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
    useEffect(()=>{
        getAllMatchs(currentUser.uid).then(res=>{
            
            //console.log(match)
            getAllUserById(res.data).then((res1)=>{
                setDataUser(res1);
                console.log(dataUser)
                setMatch(res.data)
                
            })
        })
        .catch((err)=>{
            console.log(err)
        })
        return () => {
            
            setDataUser([])
            setMatch([])
            setIsDataLoaded(false)    
        }
           
    },[])
    
    function onPressHandler(){
        setIsDataLoaded(true)
 
    }
    return(
        
            <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}> 
                <ScrollView style={styles.container}>
                {isDataLoaded ==false &&<Button title="VER MATCHES" onPress={onPressHandler}/>}
                {isDataLoaded==true && dataUser.map((user) => {
                    return (
                    <ListItem
                        key={user.userId}
                        bottomDivider
                    >
                    <ListItem.Chevron />
                        <Avatar
                        source={{
                            uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                        }}
                        rounded
                        />
                        <ListItem.Content>
                        <ListItem.Title>{user.firstName} {user.lastName}</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    );
                })}
                </ScrollView>
            </ImageBackground>  
        
    ) 

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        marginTop:10
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