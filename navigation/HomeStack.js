import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/home/HomeScreen';
import VideoDisplayScreen from "../screen/video/VideoDisplayScreen";
import RecipeDetailScreen from "../screen/recipe/RecipeStepsScreen";
import SearchRecipeScreen from "../screen/recipe/SearchRecipeScreen";
import RecipeScreen from "../screen/recipe/RecipeScreen";

const Stack = createStackNavigator();

class HomeStack extends Component {

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={ HomeScreen }
                    options={{
                        title: "Home",
                        headerStyle: {
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTitleAlign: "center",
                    }}
                />

                <Stack.Screen
                    options={{
                        title: "Video",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="VideoDisplayScreen"
                    component={ VideoDisplayScreen }
                />
                <Stack.Screen
                    options={{
                        title: "Recipe Detail",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="RecipeDetailScreen"
                    component={ RecipeDetailScreen }
                />
                <Stack.Screen
                    options={{
                        title: "RecipeList",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="SearchRecipeScreen"
                    component={ SearchRecipeScreen }
                />
                <Stack.Screen
                    options={{
                        title: "Recipe",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="RecipeScreen"
                    component={ RecipeScreen }
                />
            </Stack.Navigator>
        );
    }
}

export default HomeStack;