import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements"
import { Chats } from './PostLogin/Chats';
import { Search } from './PostLogin/Search';
import { Appointments } from './PostLogin/Appointments';
import { CallHistory } from './PostLogin/CallHistoy';
import { Profile } from './PostLogin/Profile';

import { styles } from '../Styles/HomeStyles';

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();

export const Home = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName="Chats"
                labeled={false}
                activeColor="#5D19FC"
                inactiveColor="grey"
                barStyle={{ backgroundColor: "white" }}
            >
                <Tab.Screen
                    name="Chats"
                    component={Chats}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="chat-outline" type="material-community" color={color} size={24} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="searchengin" type="font-awesome-5" color={color} size={24} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Appointments"
                    component={Appointments}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="bookmarks-outline" type="ionicon" color={color} size={24} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="CallHistoy"
                    component={CallHistory}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="phone-call" type="feather" color={color} size={24} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="user-secret" type="font-awesome" color={color} size={24} />
                        ),
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}