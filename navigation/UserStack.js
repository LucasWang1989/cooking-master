import React, { Component } from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screen/login/LoginScreen";
import RegisterScreen from "../screen/login/RegisterScreen";
import ResetPasswordScreen from "../screen/login/ResetPasswordScreen";
import ProfileScreen from "../screen/profile/ProfileScreen";
import FavouriteRecipeScreen from "../screen/profile/LikeRecipeScreen";
import BrowseHistoryScreen from "../screen/profile/BrowseHistory";
import NewRecipeScreen from "../screen/profile/NewRecipeScreen";
import RecipeDetailScreen from "../screen/recipe/RecipeStepsScreen";
import SearchRecipeScreen from "../screen/recipe/SearchRecipeScreen";
import MyUploadScreen from "../screen/profile/MyUploadScreen";

const Stack = createStackNavigator();

class UserStack extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        title: "Profile"
                    }}
                    name="ProfileScreen"
                    component={ ProfileScreen }
                />
                <Stack.Screen
                    options={{
                        title: "Login"
                    }}
                    name="LoginScreen"
                    component={ LoginScreen }
                />

                <Stack.Screen
                    options={{
                        title: "Sign Up"
                    }}
                    name="RegisterScreen"
                    component={ RegisterScreen }
                />
                <Stack.Screen
                    options={{
                        title: "Reset Password"
                    }}
                    name="ResetPasswordScreen"
                    component={ ResetPasswordScreen }
                />
                <Stack.Screen
                    options={{
                        title: "Browser History",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="BrowseHistoryScreen"
                    component={ BrowseHistoryScreen }
                />
                <Stack.Screen
                    options={{
                        title: "New Recipe",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="NewRecipeScreen"
                    component={ NewRecipeScreen }
                />
                <Stack.Screen
                    options={{
                        title: "My favorite",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="FavouriteRecipeScreen"
                    component={ FavouriteRecipeScreen }
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
                        title: "Search Recipes",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="SearchRecipeScreen"
                    component={ SearchRecipeScreen }
                />
                <Stack.Screen
                    options={{
                        title: "My Upload",
                        headerStyle: {
                            backgroundColor: "#fff",
                        }
                    }}
                    name="MyUploadScreen"
                    component={ MyUploadScreen }
                />
            </Stack.Navigator>
        );
    }
}

export default UserStack;