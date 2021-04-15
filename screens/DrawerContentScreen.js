import React, {Component} from 'react';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {View, StyleSheet} from "react-native";
import { Icon } from 'react-native-elements'
import {loggingOut} from '../database/api'

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class DrawerContentScreen extends Component {

    constructor(props){
        super(props);
        const currentUser = firebase.auth().currentUser;
        this.state={
            userId:currentUser.email ,
        }    
    }


    render(){

        return(
            <View style={styles.container}>
                <DrawerContentScrollView {...this.props}>
                    <View style={styles.topDrawer}>
                        <DrawerItem 
                            icon={() => <Icon type="material-community" name="account-circle" style={styles.icon}/>}
                            label={this.state.userId}
                            
                        />
                    </View>
                    <View style={styles.topDrawer}>
                        <DrawerItem 
                            icon={() => <Icon type="material-community" name="home-outline" style={styles.icon}/>}
                            label="Ver trueques"
                            onPress={() => this.props.navigation.navigate("Ver Trueques")}
                        />
                    </View>
                    <View style={styles.topDrawer}>
                        <DrawerItem 
                            icon={() => <Icon type="material-community" name="home-outline" style={styles.icon}/>}
                            label="Publica tu libro"
                            onPress={() => this.props.navigation.navigate("Publica tu Libro")}
                        />
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawer}>
                    <DrawerItem 
                        icon={() => <Icon type="material-community" name="logout" style={styles.icon}/>}
                        label="Logout"
                        onPress={() => loggingOut()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    icon:{
        color:'#517fa4'
    },
    topDrawer:{
        flex:1   
    },
    bottomDrawer: {
        flex:-1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    }
});