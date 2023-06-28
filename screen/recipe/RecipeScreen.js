import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import {getAllTagData, changeTag} from '../../actions/home_action';
import {common_theme,commonStyle} from "../../common/commonStyle";
import Button from '../../common/component/button';
import RecipeListComponent from '../../component/recipe_list';
import {load_recipe_list_data} from "../../actions/food_action";


class RecipeScreen extends React.Component {

    static navigationOptions = {
        header:null
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh(){
        const {dispatch, menu_tag_refreshing, left_tag_select_index} = this.props;
        if (!menu_tag_refreshing){
            dispatch(getAllTagData(left_tag_select_index))
        }
    }

    changeTag(select_index, select_name){
        const {dispatch, left_tag_select_index} = this.props;
        if (left_tag_select_index != select_index){
            dispatch(changeTag(select_index));
            dispatch(load_recipe_list_data(select_name, null/*9*/, 0, true));
        }
    }

    renderHorizontal(){
        const {tags_data, left_tag_select_index} = this.props;
        if (tags_data.length <= 0 ) return null;

        const topView = tags_data.map((item, index)=>{
            let backgroundStyle = {}
            if (index == left_tag_select_index){
                backgroundStyle = {
                    borderTopWidth:3,
                    borderTopColor:common_theme.themeColor,
                    backgroundColor:"#fff"
                }
            }

            return (
                <Button
                        key={item.id}
                        text={item.name}
                        textStyle={[styles.leftText]}
                        onPress={this.changeTag.bind(this, index, item.name)}
                    style={[styles.leftButton, commonStyle.rowCenter, backgroundStyle]}
                />
            );
        });

        return (
            <View style={[styles.container]}>
                <ScrollView
                    ref="scrollView"
                    style={styles.scrollView}
                    horizontal = { true }
                >
                    <View style={styles.categoryView}>
                        {topView}
                    </View>
                </ScrollView>

                <View style={styles.contentView}>
                    <RecipeListComponent
                        tag={tags_data[left_tag_select_index]}
                        columns={common_theme.screenWidth > 320 ? 3 : 2}
                        width={(common_theme.screenWidth / 10)*7.5}
                        showTitleView={false}
                        cellOnClick={this.push_food_step.bind(this)}
                    />
                </View>
            </View>
        )
    }

    push_food_step(select_item){
        const {navigate} = this.props.navigation;
        navigate("RecipeDetailScreen",{select_item: select_item})
    }

    render (){
        const {menu_tag_refreshing} = this.props;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}
                            refreshControl={<RefreshControl
                                onRefresh={this.onRefresh.bind(this)}
                                refreshing={menu_tag_refreshing}
                                title="Loading..."
                                titleColor={"#333"}
                            />}
                >
                    {this.renderHorizontal()}

                </ScrollView>
            </View>
        )
    }
}
function mapStateToProps(state) {
    const {home_reducer} = state;
    return home_reducer.toJS();
}
export default connect(mapStateToProps) (RecipeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#fff'
    },
    categoryView:{
        // width:common_theme.screenWidth,
        height: 40,
        // backgroundColor: 'yellow',
        flexDirection:'row',
        // justifyContent: 'space-between',
    },
    contentView:{
        height:common_theme.screenHeight-common_theme.navigationBarHeight - 49,
        width:(common_theme.screenWidth / 10) * 10,
    },
    leftText:{
        fontSize:15,
        color:"#333",
        paddingLeft:6,
        paddingRight:6,
    },
    leftButton:{
        height:40,
        backgroundColor:'transparent',
        width: (common_theme.screenWidth / 10) * 2,
    },
    scrollView:{
        backgroundColor:"rgba(230,230,230,0.9)"
    }
});
