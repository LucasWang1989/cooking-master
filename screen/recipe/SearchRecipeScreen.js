import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput
} from 'react-native';
import {connect} from 'react-redux';
import {food_list_unmount_clear, load_recipe_list_data} from "../../actions/food_action";
import {common_theme,commonStyle} from "../../common/commonStyle";
import Button from "../../common/component/button";
import Common_Food_List_Cell from "../../component/common_cell";

const icon_top_search = require("../../assets/icons/icon_top_search.png");

class SearchRecipeScreen extends React.Component {

    constructor(props){
        super(props);
        const { select_tag } = this.props.route.params;
        this.state = {
            searchKeyWord: select_tag && select_tag.name ? select_tag.name : null,
        }
        this.searching = false;
        this.inputSearching = false;
    }
    componentWillMount() {
        const {params} = this.props.route;
        if (!params){
            this.searching = true;
        }
    }

    componentWillUnmount() {
        const dispatch = this.props.dispatch;
        dispatch(food_list_unmount_clear());
    }
    componentDidMount() {
        this.onRefresh(true)
    }
    startSearch(){
        this.inputSearching = true;
        this.onRefresh(true);
    }
    onRefresh(isRefreshing){
        const {params} = this.props.route;
        const dispatch = this.props.dispatch;
        const {rn} = this.props;

        const text = this.state.searchKeyWord;
        dispatch(load_recipe_list_data(text,null, rn, isRefreshing));
    }
    renderItem(item){
        return (
            <Common_Food_List_Cell
                food_list_item={item.item}
                onClick={this.push_food_step.bind(this)}/>
        )
    }
    push_food_step(select_item){
        const {navigate} = this.props.navigation;
        navigate("RecipeDetailScreen", {select_item: select_item})
    }
    itemSeparatorComponent(){
        return(
            <View style={styles.separatorStyle}>

            </View>
        )
    }
    onEndReached(){
        const {isRefreshing,loading} = this.props;
        if (isRefreshing || loading != 0 ){
            return;
        }
        this.onRefresh(false)
    }
    renderFooterView(){
        const {isRefreshing,loading} = this.props;
        let text=""
        if (loading == 1){
            text = "Loading..."
        }else if (loading == 0){
            text = "Pull up to load more"
        }else if (loading == 2){
            text = "Loaded"
        }else if (loading == 3){
            text = "No data"
        }
        if (isRefreshing){
            return null
        }else {
            return <View style={styles.footer}>
                <Text style={styles.text}>{text}</Text>
            </View>
        }
    }
    pop(){
        const {goBack} = this.props.navigation;
        goBack()
    }
    render (){
        const {food_list_data, isRefreshing} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <Button style={styles.back_view}
                            iconStyle={styles.back_icon}
                    />

                    <TextInput ref={ref => {this.textInput = ref}}
                               style={styles.titleView}
                               value={this.state.searchKeyWord}
                               onChangeText={(text) => {this.setState({"searchKeyWord": text})}}
                               // defaultValue={this.searching ? this.state.text : params.select_tag.name}
                               androidLineOfColor="transparent"
                    />

                    <Button style={styles.right_navigation_view}
                            icon={icon_top_search}
                            textStyle={styles.right_navigation_icon}
                            onPress={this.startSearch.bind(this)}
                    />
                </View>

                {!this.searching ?
                    <FlatList style={styles.flat}
                              renderItem={this.renderItem.bind(this)}
                              data={food_list_data}
                              ItemSeparatorComponent={this.itemSeparatorComponent}
                              refreshing={isRefreshing}
                              ListFooterComponent={this.renderFooterView.bind(this)}
                              onEndReachedThreshold={0}
                    />
                    :this.inputSearching?
                        <FlatList style={styles.flat}
                                  renderItem={this.renderItem.bind(this)}
                                  data={food_list_data}
                                  onRefresh={()=>this.onRefresh()}
                                  ItemSeparatorComponent={this.itemSeparatorComponent}
                                  refreshing={isRefreshing}
                                  ListFooterComponent={this.renderFooterView.bind(this)}
                                  onEndReachedThreshold={0}
                                  onEndReached={this.onEndReached.bind(this)}
                        />:null
                }

            </View>
        )
    }
}
function mapStateToProps(state) {
    const {food_reducer} = state;
    return food_reducer.toJS()
}
export default connect(mapStateToProps) (SearchRecipeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flat:{
        flex:1,
        backgroundColor:'#fff'
    },

    separatorStyle:{
        height:0.3,
        backgroundColor:common_theme.separatorColor,
        marginLeft:common_theme.viewMPLeft,
    },
    rightBottom:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    textTagStyle:{
        paddingLeft:5,
        paddingRight:5,
        color:"#fff",
        fontSize:common_theme.thirdFontSize,
    },
    tagView:{
        width:50,
        height:20,
        marginRight:6,
        borderRadius:5,
        backgroundColor:common_theme.themeColor,
        overflow:'hidden'
    },
    back_view:{
        width:40,
        height:40,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"transparent"
    },
    back_icon:{
        width:25,
        height:25
    },
    navigationBar:{
        height:common_theme.navigationBarHeight,
        flexDirection:"row",
        paddingTop:common_theme.statusBarHeight,
        backgroundColor:common_theme.themeColor
    },
    right_navigation_view:{
        width:50,
        height:40,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"transparent"
    },
    right_navigation_icon:{
        fontSize:17,
        color:"#ffffff"
    },
    titleView:{
        flex:1,
        backgroundColor:"#fff",
        padding:0,
        marginTop:10,
        marginBottom:10,
        borderRadius:5,
        fontSize:common_theme.titleFontSize,
        color:common_theme.titleColor,
        paddingLeft:10,
    },
    footer:{
        height:45,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:16,
        color:common_theme.titleColor
    }
});
