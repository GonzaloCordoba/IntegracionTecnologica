import React,{ useState  } from 'react';
import {View,Text,TextInput,ScrollView,StyleSheet, Button,ImageBackground,Card, ListItem,CardItem,Body,Alert,FlatList,SafeAreaView} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {getPublication} from '../database/api';
import CardCustom from './CardCustom'
import Swipe from './Swipe'

export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        const currentUser = firebase.auth().currentUser;
        this.state={
            userId: currentUser.uid,
            dataPub:[],
            isDataLoaded:false,
            currentIndex:1,

        }

        //this.onPressHandler();
    }

    componentDidMount(){
        getPublication(this.state.userId).then(res=>{
            this.setState({dataPub:res.pub})
            //console.log(this.state.dataPub)
        }).catch((err)=>{
            console.log(err)
        })
    }

    onPressHandler(){
        this.setState({isDataLoaded:true})
        
       
    }
    onPressHandler2 = async () => {
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




        if(this.state.isDataLoaded === false){
            return(
                <ImageBackground
                    style={styles.background}
                    source={require('../assets/background.jpg')}>
                    <ScrollView style={styles.container}>
                        <View style={styles.inputGroup}>
                            <Button title="VER PUBLICACION"  onPress={this.onPressHandler.bind(this)}/>
                        </View>


                    </ScrollView>
                </ImageBackground>
            );
        }else{
            const p = this.state.dataPub;
            const d = JSON.stringify(this.state.dataPub);
            //console.log(p);
            return(
                <ImageBackground
                    style={styles.background}
                    source={require('../assets/background.jpg')}>
                    <ScrollView  style={styles.container}>
                    {/* <CardCustom dataPub={this.state.dataPub} key={this.state.dataPub.idPublicacion}></CardCustom> */}
                
                    <Swipe dataPub={this.state.dataPub} currentIndex={this.state.currentIndex}></Swipe>
                    
                   
                     {/* <FlatList
                        data={this.state.dataPub}
                        renderItem={({item})=><Text>{item.nameBook}</Text>}
                     /> */}
                        {/* {
                           d.map((index,i) =>{
                               return(
                                <ListItem
                                    key={i}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{index.nameBook}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                               )
                           })
                        };  */}
                         {/* <View><Text>{d }</Text></View>                         */}
                    </ScrollView >
                 </ImageBackground >


            );
        }

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