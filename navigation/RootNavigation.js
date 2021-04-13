import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import LoginUser from '../screens/login';
import CreateUser from '../screens/registerUser';
import UserList from '../screens/userList';
import LoadingScreen from '../screens/LoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();


export default class RootNavigator extends React.Component {
    
    constructor(props){
        super(props);
    }
    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                    headerStyle: {
                    backgroundColor: "#621FF7",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    }}
                >
                    <Stack.Screen
                        name="LoadingScreen"
                        component={LoadingScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginUser"
                        component={LoginUser}
                        options={{ title: "Login" }}
                    />
                    <Stack.Screen
                        name="CreateUser"
                        component={CreateUser}
                        options={{ title: "Crear Usuario" }}
                    />
                    <Stack.Screen
                        name="DrawerNavigator"
                        component={DrawerNavigator}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
      }
}