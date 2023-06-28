import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import { Text, Switch } from 'react-native-paper';
import { CheckBox } from '@rneui/themed';
import Button from '../login/components/Button';
import TextInput from '../login/components/TextInput';
import Header from "../login/components/Header";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { serviceUrl } from "../../common/constant/constant";
import {connect} from "react-redux";

const NewRecipeScreen = (props) => {
    const [coverImage, setCoverImage] = useState(null);
    const [recipeVideo, setRecipeVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState();
    const [mainIngredients, setMainIngredients] = useState('');
    const [subIngredients, setSubIngredients] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [isVideo, setIsVideo] = React.useState(false);
    const [steps, setSteps] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        (async () => {
            await getPermission();
        })();
        fetchCategories();
        setUsername(props.username);
    }, []);

    const getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status !== 'granted') {
            console.log('Permission denied');
        }
    };

    const handleCategorySelection = (category) => {
        const updatedSelection = selectedCategories.includes(category.id)
            ? selectedCategories.filter((item) => item !== category.id)
            : [...selectedCategories, category.id];
        setSelectedCategories(updatedSelection);
    };

    const onToggleIsVideoSwitch = () => setIsVideo(!isVideo);

    const handleImageUpload = async (mediaType) => {
        let mediaTypes = mediaType === 0
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: mediaTypes,
        });
        if (result.assets && result.assets.length > 0) {
            await uploadFileToServer(result.assets[0].uri).then(res => {
                console.log(res)
                mediaType === 0 ? setCoverImage(res) : setRecipeVideo(res);
            }).catch(err => {
                console.error('Cover image upload failed:' + err);
            });
        }
    };

    const handleStepImageUpload = async (index) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (result.assets && result.assets.length > 0) {
            await uploadFileToServer(result.assets[0].uri).then(res => {
                const updatedSteps = [...steps];
                updatedSteps[index].image = res;
                setSteps(updatedSteps);
            }).catch(err => {
                console.error('Step image upload failed:' + err);
            });
        }
    };

    const uploadFileToServer = async (fileUri) => {
        let fileUrl = null;
        let filename = fileUri.split('/').pop();
        const uriComponents = fileUri.split('.');
        const fileType = uriComponents[uriComponents.length - 1];

        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            type: fileType,
            name: filename
        });

        await axios.post(serviceUrl + '/file/upload',
            formData).then(res => {
                if (res.status === 200) {
                    fileUrl = res.data;
                } else {
                    console.error('Image upload failed:' + res.data);
                }
            }).catch(err => {
                console.error('Image upload failed:' + error);
        });

        return fileUrl;
    };

    const fetchCategories = () => {
        axios.post(serviceUrl + '/category/fetch-category')
            .then(res => {
            if (res.status === 200) {
                setCategories(res.data);
            } else {
                console.error('Image upload failed:' + res.data);
            }
        }).catch(err => {
            console.error('Image upload failed:' + error);
        });
    };

    const handleAddStep = () => {
        const newStep = {
            order: `${steps.length + 1}`,
            image: '',
            content: '',
        };
        setSteps([...steps, newStep]);
    };

    const handleStepImageChange = (index, image) => {
        const updatedSteps = [...steps];
        updatedSteps[index].image = image;
        setSteps(updatedSteps);
    };

    const handleStepDescriptionChange = (index, description) => {
        const updatedSteps = [...steps];
        updatedSteps[index].description = description;
        setSteps(updatedSteps);
    };

    const postRecipe = () => {
        const recipeData = {
            title,
            selectedCategories,
            mainIngredients,
            subIngredients,
            introduction,
            isVideo,
            coverImage,
            recipeVideo,
            steps,
            username
        };
        submitRecipe(recipeData).then(res => {

        })
    };

    const submitRecipe = async (recipeData) => {
        try {
            console.log(serviceUrl + '/recipe/create-recipe')
            console.log(JSON.stringify(recipeData))
            const response = await axios.post(serviceUrl + '/recipe/create-recipe', recipeData);

            if(response.status === 200) {
                console.log('Recipe submission success:', response.data);
                Alert.alert(
                    "Create recipes success!",
                    '',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                props.navigation.replace('ProfileScreen');
                            }
                        }
                    ]
                );
            }

        } catch (error) {
            console.error('Recipe submission success:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Header>Share the delight, share the recipe!</Header>
                    <TextInput
                        label="Recipe Name"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        ...styles.blockArea
                    }}>
                        <Text
                            style={{paddingRight: 10}}
                            variant="titleMedium">
                            Tags:
                        </Text>
                        <ScrollView
                            horizontal={true}>
                            {categories.map((category) => (
                                <View key={category.id} >
                                    <CheckBox
                                        checked={selectedCategories.includes(category.id)}
                                        onPress={() => handleCategorySelection(category)}
                                        title={category.name}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <TextInput
                        label="Main ingredients"
                        value={mainIngredients}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={setMainIngredients}
                    />
                    <TextInput
                        label="Sub ingredients"
                        value={subIngredients}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={setSubIngredients}

                    />
                    <TextInput
                        label="Introduction"
                        value={introduction}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={setIntroduction}
                    />

                    {/*Upload cover image and recipe video.*/}
                    <View style={styles.blockArea}>
                        <View style={{flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{paddingRight: 10}}
                                variant="titleMedium">
                                Video:
                            </Text>
                            <Switch value={isVideo} onValueChange={onToggleIsVideoSwitch} />
                        </View>

                        {isVideo && <View>
                            {coverImage && <Image
                                source={{ uri: coverImage }}
                                style={styles.image} />}
                            <Button
                                style={{height: 45}}
                                mode="contained-tonal"
                                icon="image-size-select-actual"
                                onPress={() => handleImageUpload(0)}>
                                Select Cover Image
                            </Button>

                            {recipeVideo && <Image
                                source={require('../../assets/images/upload-video-success.png')}
                                style={styles.video} />}
                            <Button
                                style={{height: 45}}
                                mode="contained-tonal"
                                icon="video-box"
                                onPress={() => handleImageUpload(1)}
                            >
                                Select Tutorial Video
                            </Button>

                        </View>}

                        {!isVideo && <View>
                            {coverImage && <Image
                                source={{ uri: coverImage }}
                                style={styles.image} />}
                            <Button
                                style={{height: 45}}
                                mode="contained-tonal"
                                icon="image-size-select-actual"
                                onPress={() => handleImageUpload(0)}>
                                Select Cover Image
                            </Button>
                        </View>}
                    </View>


                    {/*****Add recipe steps.******/}
                    <View style={styles.blockArea}>
                        {steps.map((step, index) => (
                            <View key={index} style={styles.stepContainer}>
                                <Text
                                    variant="titleMedium">
                                    Step {step.order}:
                                </Text>
                                {step.image && (
                                    <Image source={{ uri: step.image }} style={styles.image} />
                                )}
                                <TouchableOpacity
                                    onPress={() => handleStepImageUpload(index)}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>Select Image</Text>
                                </TouchableOpacity>
                                <TextInput
                                    label="Step Guide"
                                    multiline={true}
                                    numberOfLines={3}
                                    value={step.description}
                                    onChangeText={text => handleStepDescriptionChange(index, text)}
                                />
                            </View>
                        ))}

                        <Button
                            mode="Outlined"
                            icon="plus-thick"
                            onPress={handleAddStep}>
                            Add Step
                        </Button>
                    </View>
                    <Button mode="contained" onPress={postRecipe}>
                        Submit
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: 'white',
    },
    formContainer: {
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepContainer: {
        marginBottom: 16,
    },
    image: {
        width: Dimensions.get("window").width - 45,
        height: 200,
        marginVertical: 8,
    },
    video: {
        width: Dimensions.get("window").width - 45,
        height: 200,
        marginVertical: 8,
    },
    blockArea: {
        // marginBottom: 8,
        marginTop: 8,
        borderWidth: 1,
        padding: 8,
        borderColor: 'grey',
        borderRadius: 4
    }
});

function mapStateToProps(state) {
    const {user_reducer} = state;
    return user_reducer.toJS();
}
export default connect(mapStateToProps,null) (NewRecipeScreen);

// export default NewRecipeScreen;
