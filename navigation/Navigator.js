import React, { Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import RecipeStack from "./RecipeStack";
import ChatStack from './ChatStack';
import UserStack from "./UserStack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import {read_browser_food, read_like_food} from "../actions/profile_action";
import { read_user_and_token } from "../actions/user_action";

const Tab = createBottomTabNavigator();

class Navigator extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        // storage.remove({
        //     key: "storage-likeFoodKey"
        // })
        /**
         * Loading username and token
         */
        dispatch(read_user_and_token());
        /**
         * Loading browsing history
         */
        dispatch(read_browser_food());
        /**
         * Loading favourite recipe data
         */
        dispatch(read_like_food());
    }

    render() {
        return (
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={
                    ({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Recipes') {
                                iconName = focused ? 'book' : 'book-outline';
                            } else if (route.name === 'Chat') {
                                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            } else if (route.name === 'User') {
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        headerShown: false,
                        // tabBarActiveTintColor: 'green',
                        // tabBarInactiveTintColor: 'grey'
                    })
                }
            >
                <Tab.Screen name="Home" component={ HomeStack } />
                <Tab.Screen name="Recipes" component={ RecipeStack } />
                <Tab.Screen name="Chat" component={ ChatStack } />
                <Tab.Screen name="User" component={ UserStack } />
            </Tab.Navigator>
        );
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps) (Navigator);