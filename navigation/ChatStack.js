import React, { Component } from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ChatRoomScreen from "../screen/chat/ChatRoomScreen";

const Stack = createStackNavigator();

class NewsStack extends Component {

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        title: "Chat",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="ChatRoomScreen"
                    component={ ChatRoomScreen }
                />
            </Stack.Navigator>
        );
    }
}

export default NewsStack;