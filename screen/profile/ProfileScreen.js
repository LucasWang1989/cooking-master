import React from 'react'
import {
    View,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ScrollView, AlertButton, AlertOptions
} from 'react-native';
import {connect} from 'react-redux';
import Profile_Top_View from '../../component/profile_top';
import Set_Profile_Cell from '../../component/set_profile_cell';
import {checkToken, deleteToken} from '../../common/security/checkToken';

const icon_profile_collection = require('../../assets/icons/icon_profile_collection.png');
const icon_profile_history = require('../../assets/icons/icon_profile_history.png');
const icon_profile_upload = require('../../assets/icons/icon_profile_upload.png');
const icon_profile_share = require('../../assets/icons/icon_profile_share.png');
const icon_top_search = require('../../assets/icons/icon_profile_search.png');
const icon_profile_sign_out = require('../../assets/icons/icon_profile_sign_out.png');

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.checkAndNavigate();
    }

    checkAndNavigate() {
        checkToken().then(tokenIsValid => {
                if (!tokenIsValid) {
                    this.props.navigation.replace('LoginScreen');
                }
            }).catch(error => {
                console.error(error);
            });
    }

    signOut() {
        Alert.alert(
            "Are you sure you want to sign out?",
            "",
            [{
                text: "Sign out",
                onPress: ()=> {
                    deleteToken().then(tokenIsDeleted => {
                        if (tokenIsDeleted) {
                            this.props.navigation.replace('LoginScreen');
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                }},{
                text: "Cancel"
            }]
        )
    }

    render (){
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView
                    contentInset={{top:-400}}
                    contentOffset={{y:400}}>
                    <Profile_Top_View/>

                    <View style={{backgroundColor:"#fff",marginTop:20}}>
                        <Set_Profile_Cell
                            leftImageName={icon_top_search}
                            leftTitleName="Search Recipes"
                            onPush={()=>{
                                navigate("SearchRecipeScreen",{"title":"Share Recipes"})
                            }}
                        />
                    </View>

                    <View style={{backgroundColor:"#fff",marginTop:20}}>
                        <Set_Profile_Cell
                            leftImageName={icon_profile_share}
                            leftTitleName="Create Recipes"
                            onPush={()=>{
                                navigate("NewRecipeScreen",{"title":"Share Recipes"})
                            }}
                        />
                        <Set_Profile_Cell
                            leftImageName={icon_profile_upload}
                            leftTitleName="My upload"
                            onPush={()=>{
                                navigate("MyUploadScreen", {"title":"My favorite"});
                            }}
                            separator={false}
                        />
                    </View>

                    <View style={{backgroundColor:"#fff",marginTop:20}}>
                        <Set_Profile_Cell
                            leftImageName={icon_profile_collection}
                            leftTitleName="My favorite"
                            onPush={()=>{
                                navigate("FavouriteRecipeScreen", {"title":"My favorite"});
                            }}
                        />
                        <Set_Profile_Cell
                            leftImageName= {icon_profile_history}
                            leftTitleName="Browsing history"
                            onPush={()=>{
                                navigate("BrowseHistoryScreen",{"title":"Browsing history"});
                            }}
                            separator={false}
                        />
                    </View>

                    <View style={{backgroundColor:"#fff",marginTop:20}}>
                        <Set_Profile_Cell
                            leftImageName={icon_profile_sign_out}
                            leftTitleName="Sign out"
                            onPush={() => {this.signOut()}}
                            separator={false}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
