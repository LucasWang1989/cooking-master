import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated, RefreshControl
} from 'react-native'
import {connect} from 'react-redux'
import {getBannerDatas,getTagDatas,getMainDatas} from "../../actions/home_action";
import Home_Top_Banner from "../../component/home_top_banner";
import {common_theme} from "../../common/commonStyle";
import Button from "../../common/component/button";
import Home_Top_Tag from '../../component/home_top_tag'
import Home_Com from "../../component/home_com";
import {commonStyle} from "../../common/commonStyle";
import axios from "axios";
import { serviceUrl } from "../../common/constant/constant";

const scrollEventThrottle = 1;
class HomeScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            topViewOpacity: new Animated.Value(0),
            home_food_list_data:[],
            home_category_list_data:[]
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

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh() {
        const {dispatch} = this.props;

        this.loadHomeRecipeData().then((home_food_list_data) => {
            dispatch(getBannerDatas(home_food_list_data));
            dispatch(getMainDatas(home_food_list_data));
        })
        this.loadHomeCategoryData().then(() => {
            const {home_category_list_data} = this.state;
            dispatch(getTagDatas(home_category_list_data));
        })
    }


    async loadHomeRecipeData() {
        try {
            const reqPara = {
                keyWord: "",
            }
            const res = await axios.post(serviceUrl + '/recipe/fetch-recipe', reqPara);
            if (res.status === 200) {
                this.setState({home_food_list_data: res.data});
                return res.data;
            } else {
                console.error('Remote servers return data:' + res.data);
            }
        } catch(err) {
            console.error('Load home recipe list failed:' + error);
        }
    }

    async loadHomeCategoryData() {
        try {
            const res = await axios.get(serviceUrl + '/category/fetch-category');
            if (res.status === 200) {
                if (res.data){
                    const allDataTags = res.data;
                }
                this.setState({home_category_list_data: res.data});
            } else {
                console.error('Fetch tags failed:' + res.data);
            }

        }catch(err) {
            console.error('Fetch tags failed:' + error);
        }
    }

    push_food_list(select_tag){
        const {navigate} = this.props.navigation;
        if(select_tag.name === "More") {
            navigate("RecipeScreen");
        }else {
            navigate("SearchRecipeScreen",{select_tag: select_tag});
        }
    }
    push_food_step(select_item){
        const {navigate} = this.props.navigation;
        navigate("RecipeDetailScreen",{select_item: select_item});
    }
    displayVideo(url) {
        const {navigate} = this.props.navigation;
        navigate("VideoDisplayScreen",{url: url});
    }

    startSearch(){
        const {navigate} = this.props.navigation;
        navigate("food_list");
    }

    render (){
        const {top_banners, top_tags, main_data} = this.props;
        return (
            <View style={styles.container}>
                <Animated.View style={[commonStyle.rowCenter,styles.navigationBar,{
                    opacity:this.state.topViewOpacity.interpolate({
                        inputRange:[0,1],
                        outputRange:[0,1]
                    })

                }]}>
                    <Text style={styles.headerTitleStyle}>{"Recommendation"}</Text>
                </Animated.View>
                <Button style={styles.navigationBarRight}
                        iconStyle={styles.searchIcon}
                        onPress={this.startSearch.bind(this)}
                />

                {/* Cotent */}
                <ScrollView style={styles.container}
                            onScroll={this.onScroll.bind(this)}
                            scrollEventThrottle={scrollEventThrottle}
                            refreshControl={<RefreshControl
                                onRefresh={this.onRefresh.bind(this)}
                                title="Loading..."
                                titleColor={"#333"}
                            />}>
                    <Home_Top_Banner top_banners={top_banners} topBannerOnClick={this.displayVideo.bind(this)}/>
                    <Home_Top_Tag top_tags={top_tags} topTagOnClick={this.push_food_list.bind(this)}/>
                    <Home_Com main_data={main_data} bottomFoodOnClick={this.push_food_step.bind(this)}/>
                </ScrollView>
            </View>
        )
    }
}
function mapStateToProps(state) {
    const {home_reducer} = state;
    return home_reducer.toJS();
}
export default connect(mapStateToProps) (HomeScreen);

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
    navigationBarRight:{
        position:'absolute',
        right:10,
        top: common_theme.statusBarHeight,
        flexDirection:'row',
        width:30,
        height:common_theme.navigationBarHeight - common_theme.statusBarHeight,
        zIndex:669,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:"center",
    },
    searchIcon:{
        width:20,
        height:20,
    }
});
