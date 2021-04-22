  
import * as firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native';

export async function registration(email, password, lastName, name) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName: lastName,
        firstName: name,
      });
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function signIn(email, password,latitude,longitude) {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;

        const db = firebase.firestore();
        db.collection('users')
        .doc(currentUser.uid)
        .update({
           latitude:latitude,
           longitude:longitude
        });    
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function putLocation(location){
    try {
        
    } catch (err) {
        Alert.alert('There is something wrong!', err.message);
    }
}

export async function savePublication(nameBook, nameAuthorBook, stateBook,uri,userId) {
    try {
       
      const db = firebase.firestore();
      db.collection('publications')
        .add({
          nameBook: nameBook,
          nameAuthorBook: nameAuthorBook,
          stateBook: stateBook,
          userId: userId,
          uri:uri
          
        });
        Alert.alert('Guardada!');
    } catch (err) {
      Alert.alert('There is something wrong!', err.message);
    }
  }

  export async function getPublication(userid) {
    return new Promise ((resolve,reject) =>{
      try{
        const db = firebase.firestore();
        db.collection('publications').where("userId","!=",userid)
        .onSnapshot((querySnapshot)=>{
          const pub = [];
          querySnapshot.forEach((doc)=>{
            const {nameAuthorBook,stateBook,nameBook,userId,uri}=doc.data();
            pub.push({
              idPublicacion:doc.id,
              nameAuthorBook,
              stateBook,
              nameBook,
              userId,
              uri
            })
          })
          resolve({pub})   
        })

      }catch (err){
        reject()
        console.log(err)
      }
    })    

  }

export async function getImageUri(userId){
  return new Promise ((resolve,reject) =>{
    try{
        firebase
      .storage()
      .ref(`images/${userId}`)
      .getDownloadURL()
      .then(res => {
        resolve({res});
      }) 
      .catch(error => {
          console.log(error);
      });
      
    }catch(err){
      reject();
    }  
  })

}