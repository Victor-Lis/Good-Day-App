import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Feather from 'react-native-vector-icons/Feather';

import Home from '../Components/Home';
import Game from '../Components/Game';
import User from '../Components/User';

export default function BottomTabRoute({userUid, setUser}) {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{userUid: userUid}}
                options={{
                    tabBarIcon: ({ color, size }) => {
                      return <Feather name="home" color={color} size={size} />
                    },
                    headerShown: false,
                    headerTintColor: "#fff",
                    tabBarShowLabel: false,
                    tabBarStyle:{
    
                        height: 60,
                        backgroundColor: "#422C0E",
                        alignItems: "center",
    
                    },
                    tabBarIconStyle: {
    
                        height: 100,
                        width: 100,
    
                    },
                    tabBarActiveTintColor: "#fff"
                }
            }
            />
            <Tab.Screen
                name="Game"
                component={Game}
                initialParams={{userUid: userUid}}
                options={{
                    tabBarIcon: ({ color, size }) => {
                      return <Feather name="heart" color={color} size={size} />
                    },
                    headerShown: false,
                    headerTintColor: "#fff",
                    tabBarShowLabel: false,
                    tabBarStyle:{
    
                        height: 60,
                        backgroundColor: "#422C0E",
                        alignItems: "center",
    
                    },
                    tabBarIconStyle: {
    
                        height: 100,
                        width: 100,
    
                    },
                    tabBarActiveTintColor: "#fff"
                }
            }
            />
            <Tab.Screen
                name="User"
                component={User}
                initialParams={{userUid: userUid, setUser: setUser}}
                options={{
                    tabBarIcon: ({ color, size }) => {
                      return <Feather name="user" color={color} size={size} />
                    },
                    headerShown: false,
                    headerTintColor: "#fff",
                    tabBarShowLabel: false,
                    tabBarStyle:{
    
                        height: 60,
                        backgroundColor: "#422C0E",
                        alignItems: "center",
    
                    },
                    tabBarIconStyle: {
    
                        height: 100,
                        width: 100,
    
                    },
                    tabBarActiveTintColor: "#fff"
                }
            }
            />
        </Tab.Navigator>
    );
}
