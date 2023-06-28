import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList, ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import Common_Food_List_Cell from "../../component/common_cell";
import {delete_like} from "../../actions/profile_action";
import {common_theme} from "../../common/commonStyle";

class LikeRecipeScreen extends React.Component {
    static navigationOptions = ({navigation})=>{
        const {params} = navigation.state;
        return(
            {
                headerTitle:params.title
            }
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[]
        }
    }

    push_food_step(food_list_item){
        const {navigate} = this.props.navigation;
        navigate("RecipeDetailScreen",{select_item: food_list_item})
    }
    delete(index){
        const {dispatch} = this.props;
        dispatch(delete_like(index))
    }

    cell(item/*, sectionId*/, rowId){
        if(item.item === null) return;

        const {food_list_like} = this.props;
        const index = parseInt(rowId)
        let separatorStyle = {}
        if (food_list_like.length != (index)){
            separatorStyle = {
                height:1,
                marginLeft:common_theme.viewMPLeft,
                backgroundColor:common_theme.separatorColor
            }
        }
        return (
            <View>
                <Common_Food_List_Cell
                    food_list_item={item.item}
                    onClick={this.push_food_step.bind(this)}/>
                <View style={separatorStyle}/>
            </View>
        )
    }

    render (){
        const {food_list_like} = this.props;
        const filteredList = food_list_like.filter(item => item !== null);

        return (
            <View style={styles.container}>
                <ScrollView>
                    <FlatList
                        data={filteredList}
                        renderItem={this.cell.bind(this)}
                        keyExtractor={(_, index) => index.toString()}
                        ListFooterComponent={() => {
                            return <Text style={{fontSize: 20, textAlign: 'center',
                                marginVertical: 20, color: '#ccc'}}>
                                ------ No more data ------
                            </Text>
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}
function mapStateToProps(state) {
    const {profile_reducer} = state;
    return {
        ...profile_reducer.toJS()
    }
}
export default connect(mapStateToProps) (LikeRecipeScreen);
// export default LikeRecipeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        contentView:{
            height:common_theme.screenHeight-common_theme.navigationBarHeight - 49,
            width:(common_theme.screenWidth / 10) * 10,
        },
    },
    titleStyle:{
        marginBottom:6,
    },
    textStyle:{
        marginBottom:4,
    },
});
