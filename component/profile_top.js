import React , {Component} from 'react';
import {
    Text ,
    View,
    Platform,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import {common_theme} from "./../common/commonStyle";
import {connect} from 'react-redux';

class Profile_Top_View extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <View style={styles.containerStyle}>
                <View style={styles.accountViewStyle}>
                    <Image  source={require('./../assets/images/pic_profile_avatar.png')} style={styles.leftIconStyle}/>
                    <View style={styles.rightOutViewStyle}>
                        <Text style={styles.rightInnerTextStyle}>
                            { this.props.username }
                        </Text>
                    </View>
                    <View style={styles.grade}>
                        <Text style={styles.gradeText}>Level: 1</Text>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    const {user_reducer} = state;
    return user_reducer.toJS();
}

export default connect(mapStateToProps,null) (Profile_Top_View);

const styles = StyleSheet.create({
    containerStyle:{
        height: Platform.OS == 'ios'? 550 : 150,
        backgroundColor:common_theme.themeColor,

    },
    accountViewStyle:{
        marginTop:Platform.OS == 'ios' ? 430 : 30,
        alignItems:"center",
    },
    leftIconStyle:{
        width:70,
        height:70,
        borderRadius:35,
    },

    rightOutViewStyle:{
        marginTop:3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center"
    },
    rightInnerTextStyle:{
        fontSize:common_theme.subTitleFontSize,
        color:"#fff",
    },
    grade:{
        backgroundColor:"rgb(0,201,75)",
        paddingLeft:2,
        paddingRight:2,
        paddingTop:1,
        paddingBottom:1,
        marginTop:3,
        borderRadius:3
    },
    gradeText:{
        fontSize:11,
        color:"#fff"
    },
})

