import React, { useEffect, useState} from 'react';
import {View,Text} from 'react-native';
import {getAllUserById} from '../database/api';
import { ListItem, Avatar } from "react-native-elements";

export default function UserList({data}){
    const [dataUser,setDataUser] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(()=>{
        getAllUserById(data).then(res=>{
            setIsDataLoaded(true)
         setDataUser(res);
         //console.log(dataUser)
         
            
        })
        .catch((err)=>{
           console.log(err)
        })
        return () => {
            
            setDataUser([])
             
        }
       
    },[])
    
    return(
        
        dataUser.map((user) => {
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
                <ListItem.Title>{user.firstName}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            );
        })
    )
}