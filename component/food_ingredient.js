import React ,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import {common_theme,commonStyle} from "./../common/commonStyle";

class Food_Ingredient_View extends Component{

    render(){
        let {ingredients, title}=this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.titleView,commonStyle.row,commonStyle.separatorStyle]}>
                    <Text style={commonStyle.titleFontStyle}>{title}</Text>
                </View>

                <View style={[styles.tagButtonView,commonStyle.rowSpaceBetween]}>
                    <Text style={commonStyle.subTitleFontStyle}>
                        {ingredients}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    },
    titleView:{
        paddingLeft:common_theme.viewMPLeft,
        height:25,
        backgroundColor:'#f3f3f3'
    },
    flatList:{

    },
    tagButtonView:{
        width:common_theme.screenWidth,
        // height:40,
        paddingLeft:10,
        paddingRight:10,
    },
    blackTextStyle:{
        fontSize:common_theme.titleFontSize,
        color:common_theme.titleColor
    },
    separatorStyle:{
        backgroundColor:common_theme.separatorColor,
        height:0.6
    }
})

export default Food_Ingredient_View;