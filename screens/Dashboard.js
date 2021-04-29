import React,{ useState , useEffect,useRef,componentWillUnmount  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Card, ListItem,CardItem,Body,Alert,FlatList,SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {getPublication,saveMatch,isMatch} from '../database/api';
import CardCustom from './CardCustom'
import Swipe from './Swipe'
import BottomBar from './BottomBar' 

export default function Dashboard(){
    const [dataPub,setDataPub] = useState([]);
    const [userId, setUserId] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const  [currentIndex, setCurrentIndex] = useState(0);
    const currentUser = firebase.auth().currentUser;
    const swipesRef = useRef(null)
    useEffect(()=>{
        getPublication(currentUser.uid).then(res=>{
            setDataPub(res.pub)
            console.log(dataPub)
        }).catch((err)=>{
            console.log(err)
        })
        return () => {
            
            setCurrentIndex(0)
            setIsDataLoaded(false)
            setDataPub([])
            setCurrentIndex(0)   
        }
       
    },[])
 
    function handleLike() {
        console.log(currentIndex)
        console.log(dataPub.length);
        saveMatch(currentUser.uid,dataPub[currentIndex].userId,dataPub[currentIndex].idPublicacion,false);
        //isMatch(currentUser.uid,dataPub[currentIndex].userId);
        nextUser()
    }

    function handlePass() {
        console.log(currentIndex)
        nextUser()
    }

    function nextUser() {
        const nextIndex =  currentIndex + 1
        setCurrentIndex(nextIndex)
    }

    function onPressHandler(){
        setIsDataLoaded(true)    
    }

    function handleLikePress() {
        swipesRef.current.openLeft()
    }
    function handlePassPress() {
        swipesRef.current.openRight()
    }
    function verTrueques(){

    }
    return(
        
        <ImageBackground
                    style={styles.background}
                    source={require('../assets/background.jpg')}>
                    <ScrollView style={styles.container}>
                        <View style={styles.inputGroup}>
                            {isDataLoaded === false && <Button title="VER PUBLICACION"  onPress={onPressHandler}/>}
                            {dataPub.length === (currentIndex) &&<Text>No hay mas Libros</Text>}
                            {isDataLoaded === true && dataPub.length != (currentIndex )  && dataPub.length > 1 && dataPub.map((d,i)=> currentIndex===i &&(
                                <Swipe key={i} ref={swipesRef}  dataPub={dataPub} currentIndex={currentIndex} handleLike={handleLike} handlePass={handlePass}></Swipe>
                                
                            ))}
                           
                        </View>
                        {isDataLoaded === true && dataPub.length !=(currentIndex) && <BottomBar handleLikePress={handleLikePress} handlePassPress={handlePassPress} />}
                                
                    </ScrollView>
                </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
        marginTop:1
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