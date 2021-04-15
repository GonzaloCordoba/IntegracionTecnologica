import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Card, ListItem,CardItem,Body,Alert} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {getPublication} from '../database/api';

export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        const currentUser = firebase.auth().currentUser;
        
        this.state={
            userId: currentUser.uid,
            dataPub:null
           
        }
        this.onPressHandler();
    }
    // getImageUri = async () =>{
    //      this.state.dataPub.forEach((pub) => {
    //          firebase
    //          .storage()
    //          .ref(`images/${pub.userId}`)
    //          .getDownloadURL()
    //          .then(resolve => {
    //              console.log(pub);
    //              this.state.dataPub.push({
    //                  uri:resolve
    //              })
    //          }) 
    //          .catch(error => {
    //              console.log(error);
    //          });
    //      })  
    //  }

    componentDidMount = async () =>{
    
    }
    onPressHandler = async () => {
        try {
            let uri = '';
            const db = firebase.firestore();
                 
            db.collection('publications').where("userId","!=",this.state.userId)
              .onSnapshot((querySnapshot)=>{
                  querySnapshot.forEach((doc)=>{
                      const pub = [];
                      const {nameAuthorBook,stateBook,nameBook,userId}=doc.data();
                      firebase
                        .storage()
                        .ref(`images/${doc.data().userId}`)
                        .getDownloadURL()
                        .then(resolve => {
                        //console.log(resolve);
                        pub.push({
                            idPublicacion:doc.id,
                            nameAuthorBook,
                            stateBook,
                            nameBook,
                            userId,
                            uri:resolve
                        })
                        this.setState({dataPub:pub})
                        //console.log(pub)
                
                    }) 
                    .catch(error => {
                    console.log(error);
                    });
                      //console.log(doc.id,"=>",doc.data())
                      
                     
                    
                  })
              })
                    
        } 
        catch (err) {
            Alert.alert('There is something wrong!', err.message);
         }       
    }
    render(){
        console.log(this.state.dataPub)
        
        const p = this.state.dataPub;
        const d = JSON.stringify(this.state.dataPub);
        if(this.state.dataPub === undefined || this.state.dataPub === null || this.state.dataPub === 0 || this.state.dataPub === ''){
            return(
                <ImageBackground
                style={styles.background}
                source={require('../assets/background.jpg')}> 
                <ScrollView style={styles.container}>
                    <Text>No hay datos...</Text>
                </ScrollView>
            </ImageBackground>      
            );        
        }else{
            return(
                <ImageBackground
                    style={styles.background}
                    source={require('../assets/background.jpg')}> 
                    <ScrollView style={styles.container}>

                        {/* {
                           p.map((index) =>{
                               return(
                                <ListItem 
                                    key={index.idPublicacion}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{index.nameBook}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                               )           
                           }) 
                        }; */}

                        <View><Text>{d  }</Text></View>                        
                    </ScrollView>
                 </ImageBackground > 

                // <ImageBackground
                //     style={styles.background}
                //     source={require('../assets/background.jpg')}> 
                //     <ScrollView style={styles.container}>
                //         <View style={styles.inputGroup}>
                //             <Button title="VER PUBLICACION" onPress={this.onPressHandler.bind(this)}/>
                //         </View>
                   
                        
                //     </ScrollView>
                // </ImageBackground>  
            );
        }
        // return(
        //     <ImageBackground
        //         style={styles.background}
        //         source={require('../assets/background.jpg')}> 
        //         <ScrollView style={styles.container}>
        //             <View style={styles.inputGroup}>
        //                 <Button title="VER PUBLICACION" onPress={this.onPressHandler.bind(this)}/>
        //             </View>
               
                    
        //         </ScrollView>
        //     </ImageBackground>  
        // );
    }  

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