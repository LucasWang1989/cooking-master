import React from 'react'
import {
    View,
    RefreshControl,
    Text,
    StyleSheet,
    ScrollView,
    Animated
} from 'react-native'
import {common_theme,commonStyle} from "../../common/commonStyle"
import NetWorkImage from "../../common/component/netWorkImage";
import Food_Ingredient_View from '../../component/food_ingredient'
import Food_Step_View from '../../component/food_step'
import Button from "../../common/component/button";
import Food_Detail_Tags from "../../component/food_detail_tag";
import {food_step_unmount_clear, set_is_like_recipe} from '../../actions/food_action'
import {connect} from 'react-redux'
import {isEmptyObject} from "../../common/utils/util";
import {save_browser_food, save_like_food} from "../../actions/profile_action";
import VideoDisplayScreen from "./../video/VideoDisplayScreen";

const scrollEventThrottle = 1;
const icon_food_like_selected = require('../../assets/icons/icon_food_like_selected.png');
const icon_food_like = require('../../assets/icons/icon_food_like.png');

class RecipeStepsScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            // Animation
            topViewOpacity:new Animated.Value(0)
        }
    }

    onScroll(event){
        const y = event.nativeEvent.contentOffset.y;
        const maxY = 150;
        if (y <= maxY){
            Animated.timing(this.state.topViewOpacity,{
                toValue:y/maxY,
                duration:scrollEventThrottle,
                useNativeDriver: true
            }).start()
        }else {
            Animated.timing(this.state.topViewOpacity,{
                toValue:1,
                duration:scrollEventThrottle,
                useNativeDriver: true
            }).start()
        }
    }

    like(){
        const {route, dispatch, isLike} = this.props;
        const {select_item} = route.params;
        dispatch(save_like_food(select_item));
    }

    componentWillUnmount() {
        const dispatch = this.props.dispatch;
        dispatch(food_step_unmount_clear());
    }
    componentDidMount() {
        const {params} = this.props.route;
        const {dispatch} = this.props;
        const {select_item} = params;
        dispatch(save_browser_food(select_item));
        dispatch(set_is_like_recipe(select_item.id));
    }

    render(){
        const {route, food_step_refreshing, isLike} = this.props;
        const {select_item} = route.params;
        let isVideo = select_item.mediaType === '1';

        return(
            <View style={styles.container}>
                <Animated.View style={[commonStyle.rowCenter,styles.navigationBar,{
                    opacity:this.state.topViewOpacity.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,1]
                    })

                }]}>
                    <Text style={styles.headerTitleStyle}>{select_item.title}</Text>
                </Animated.View>

                {isEmptyObject(select_item) ? null :
                    <Button icon={isLike ? icon_food_like_selected
                            : icon_food_like}
                            onPress={this.like.bind(this)}
                            iconStyle={styles.rightIconStyle}
                            style={[styles.like, commonStyle.rowCenter]}
                    />
                }

                <ScrollView style={styles.container}
                            onScroll={this.onScroll.bind(this)}
                            scrollEventThrottle={scrollEventThrottle}
                            refreshControl={<RefreshControl
                                refreshing={food_step_refreshing}
                            />}>

                    {isEmptyObject(select_item) ?
                        null:
                        <View>
                            { isVideo ?
                                <VideoDisplayScreen
                                    url={select_item.coverVideoUrl}
                                    style={styles.topView}/>
                                :
                                <View style={styles.topView}>
                                    <NetWorkImage uri={select_item.coverPageUrl} style={styles.topIcon}/>
                                </View>
                            }

                            <View style={[commonStyle.column,{paddingLeft:6,paddingRight:6}]}>
                                <Text style={styles.titleTextView}>{select_item.title}</Text>
                                <Text style={styles.imtroText}>{select_item.intro}</Text>
                                <Food_Detail_Tags tags={select_item.recipeCategoryRelations} />
                            </View>

                            <Food_Ingredient_View title="Ingredients" ingredients={select_item.ingredients}/>
                            <Food_Ingredient_View title="Sub Ingredients" ingredients={select_item.subIngredients}/>

                            <View style={styles.stepsView}>
                                <Food_Step_View
                                    // onClickStepImage={this.foodStepImageDetail.bind(this)}
                                    title={"Steps"}
                                    ingredients={select_item.recipeSteps}/>
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    const {food_reducer} = state;
    return food_reducer.toJS()
}
export default connect(mapStateToProps) (RecipeStepsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ffffff"
    },
    navigationBar:{
        position:'absolute',
        left:0,
        top:0,
        height:common_theme.navigationBarHeight,
        width:common_theme.screenWidth,
        backgroundColor:common_theme.themeColor,
        zIndex:666
    },
    headerTitleStyle:{
        marginTop:common_theme.statusBarHeight,
        fontSize:17,
        color:"#fff",
        fontWeight:'bold'
    },
    topView:{
        width:common_theme.screenWidth,
        height:200,
    },
    topIcon:{
        width:common_theme.screenWidth,
        height:200,
    },
    titleTextView:{
        fontSize:17,
        color:common_theme.titleColor,
        marginTop:6,
    },
    imtroText:{
        fontSize:common_theme.subTitleFontSize,
        color:common_theme.subTitleColor,
        marginTop:6,
    },
    stepsView:{

    },
    backIcon:{
        width:25,
        height:25
    },
    rightIconStyle:{
        width:20,
        height:20
    },
    backButton:{
        position:'absolute',
        left:0,
        top:common_theme.statusBarHeight,
        width:40,
        height:40,
        backgroundColor:'transparent',
        zIndex:6666
    },
    like:{
        position:'absolute',
        right:0,
        top:common_theme.statusBarHeight,
        width:40,
        height:40,
        backgroundColor:'transparent',
        zIndex:666666
    }
});
