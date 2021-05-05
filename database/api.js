  
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

export async function saveMatch(userId, userPubId, idPublicacion,match) {
  try {
     
    const db = firebase.firestore();
    db.collection('matchs')
      .add({
        userId: userId,
        userPubId: userPubId,
        idPublicacion: idPublicacion,
        match: match,
        
      });
      Alert.alert('Like!');
      //console.log('like');
  } catch (err) {
    Alert.alert('There is something wrong!', err);
  }
}

export async function isMatch(userid,userPub){
  try {
    const data = [];
    const db = firebase.firestore();
    db.collection('matchs').where("userId","==", userPub).where("userPubId", "==",userid)
    .onSnapshot((querySnapshot)=>{
      
      querySnapshot.forEach((doc)=>{
        console.log(doc.id, ' => ', doc.data());
        const {idPublicacion,match,userId,userPubId}=doc.data();
      // data = doc.data();
        data.push({
          idmatch:doc.id,
          idPublicacion,
          match,
          userPubId,
          userId,
        })
      })
      //console.log('match', match)
      if(data === undefined || data === [] || data === null || data.length === 0){
        console.log('No hay match')
        console.log(data)

      }else{ 
        console.log('Hay match')
        console.log(data);
        db.collection('matchs').doc(data[0].idmatch).update({
          match:true,  
        })
        try {
          const data2 = []
          const db = firebase.firestore();
          db.collection('matchs').where("userId","==",userid).where("userPubId","==",userPub)
          .onSnapshot((querySnapshot1)=>{
            querySnapshot1.forEach((doc1)=>{
              const {idPublicacion,match,userId,userPubId}=doc1.data();
              data2.push({
                idmatch:doc1.id,
                idPublicacion,
                match,
                userId,
                userPubId
              }) 
            })
            console.log(data2)
            db.collection('matchs').doc(data2[0].idmatch).update({
              match:true,
            })  
          })
          console.log('okk');          
        }catch (error) {
          Alert.alert('Algo salio mal!:',error.message)
        }
      }  
    })    
  } catch (error) {
    Alert.alert('Algo salio mal!:',error.message)
  }                    
}

export async function getAllMatchs(userid){
  return new Promise ((resolve,reject) =>{
    try{
      const db = firebase.firestore();
      db.collection('Matchs').where("userId","==",userid).where("match","==",true)
      .onSnapshot((querySnapshot)=>{
        const data = [];
        querySnapshot.forEach((doc)=>{
          const {idPublicacion,match,userId,userPubId}=doc1.data();
          data.push({
            idmatch:doc1.id,
            idPublicacion,
            match,
            userId,
            userPubId    
          })
        })
        console.log(data);
        resolve({data});   
      })

    }catch (err){
      reject()
      console.log(err)
    }
  })    

}
