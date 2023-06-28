import React, { Component } from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import RecipeScreen from "../screen/recipe/RecipeScreen";
import RecipeDetailScreen from "../screen/recipe/RecipeStepsScreen";

const Stack = createStackNavigator();

class RecipeStack extends Component {

    render() {
        return (
            <Stack.Navigator>
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
            </Stack.Navigator>
        );
    }
}

export default RecipeStack;