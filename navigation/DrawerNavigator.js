import React, {Component} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import Dashboard from "../screens/Dashboard";
import Dashboard2 from "../screens/Dashboard2";
import DrawerContentScreen from "../screens/DrawerContentScreen";


const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {

    constructor(props){
        super(props);
    }

    HandlerLogout=()=>{
        this.props.onLogout();
    }


    render(){
        return(
            <Drawer.Navigator 
                initialRouteName="Dashboard"
                headerMode={'none'}
                drawerContent={props => <DrawerContentScreen onLogout={this.HandlerLogout}{...props}/>}
            >
                <Drawer.Screen name="Dashboard" component={Dashboard} />
                <Drawer.Screen name="Dashboard2" component={Dashboard2} />
            </Drawer.Navigator>
        );
    }
    
}
