import React ,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'
import {commonStyle,common_theme} from "./../common/commonStyle";
import NetWorkImage from "../common/component/netWorkImage";

const numColumns = 2

const contentMargin = common_theme.viewMPLeft

class Home_Com extends Component{

    renderColumnItem(data){
        let separatorStyle = {};
        const {bottomFoodOnClick} = this.props;

        if ((data.index+1) % numColumns == 0 ){
            separatorStyle = {
                marginLeft:contentMargin,
                marginRight:contentMargin
            }
        }else{
            separatorStyle = {
                marginLeft:contentMargin,
            }
        }

        return (
            <TouchableOpacity activeOpacity={0.1}
                              style={[separatorStyle, styles.contentButtonView,commonStyle.rowCenter]}
                              onPress={()=>bottomFoodOnClick(data.item)}>
                <NetWorkImage style={styles.albumStyle}
                              uri={data.item.coverPageUrl}/>
                <View style={[styles.textView,commonStyle.rowCenter,{}]}>
                    <Text style={styles.whiteTextStyle}>{data.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        const {main_data}=this.props;

        if (main_data.length){
            return (
                <View style={styles.container}>
                    <View style={[styles.titleView,commonStyle.row,commonStyle.separatorStyle]}>
                        <Text style={commonStyle.titleFontStyle}>{"Popular Recipes"}</Text>
                    </View>
                    <View>
                        <FlatList style={styles.flatList}
                                  data={main_data}
                                  renderItem={this.renderColumnItem.bind(this)}
                                  numColumns={numColumns}
                                  scrollEnabled={false}/>
                    </View>
                </View>
            )
        }else {
            return (
                null
            )
        }
    }
}
export default Home_Com;

const styles = StyleSheet.create({
    container:{

    },
    titleView:{
        paddingLeft:common_theme.viewMPLeft,
        height:30,
        backgroundColor:'#f3f3f3'
    },
    flatList:{
        flex:1,
    },
    contentButtonView:{
        width:(common_theme.screenWidth - (numColumns+1) * contentMargin) / numColumns,
        height:190,
        marginTop:contentMargin,
    },
    whiteTextStyle:{
        width:(common_theme.screenWidth - (numColumns+1) * contentMargin) / numColumns,
        color:"#ffffff",
        fontSize:common_theme.titleFontSize,
        textAlign:'center'
    },
    textView:{
        position:'absolute',
        bottom:0,
        left:0,
        width:(common_theme.screenWidth - (numColumns+1) * contentMargin) / numColumns,
        height:20,
        backgroundColor:'rgba(0,0,0,0.3)',
        overflow:"hidden",
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
    },
    albumStyle:{
        width:(common_theme.screenWidth - (numColumns+1) * contentMargin) / numColumns,
        height:190,
        borderRadius:5,
        overflow:"hidden"
    }
})