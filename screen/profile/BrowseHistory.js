import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated
} from 'react-native'
import {connect} from 'react-redux'
import Common_Food_List_Cell from "../../component/common_cell";
import {delete_browser} from "../../actions/profile_action";
import { Swipeable } from 'react-native-gesture-handler';
import {commonStyle,common_theme} from "../../common/commonStyle";

class BrowseHistoryScreen extends React.Component {
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
    }
    push_food_step(food_list_item){
        const {navigate} = this.props.navigation;
        navigate("RecipeDetailScreen",{select_item: food_list_item})
    }
    delete(index){
        const {dispatch} = this.props;
        dispatch(delete_browser(index));
        // this.forceUpdate();
    }

    renderRightActions = (id) => (progress, drgX) => {

        // Style of delete.
        return (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={this.delete(id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        );
    };

    cell(item, sectionId, rowId){
        const {food_list_browser} = this.props;
        const index = parseInt(rowId)
        let separatorStyle = {}

        if (food_list_browser.length != (index+1)){
            separatorStyle = {
                height:0.6,
                marginLeft:common_theme.viewMPLeft,
                backgroundColor:common_theme.separatorColor
            }
        }

        return (
            <View>
                <Swipeable
                    renderRightActions={this.renderRightActions(rowId)}
                >
                    <Common_Food_List_Cell
                        food_list_item={item.item}
                        onClick={this.push_food_step.bind(this)}/>
                </Swipeable>

            </View>
        )
    }

    render (){
        const {food_list_browser} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={food_list_browser}
                    renderItem={this.cell.bind(this)}
                    ListFooterComponent={() => {
                        return <Text style={{fontSize: 20, textAlign: 'center',
                            marginVertical: 20, color: '#ccc'}}>
                            ------ No more data ------
                        </Text>
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                                marginVertical: 5
                            }}
                        />
                    }}
                />
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
export default connect(mapStateToProps) (BrowseHistoryScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff'
    },
    titleStyle:{
        marginBottom:6,
    },
    textStyle:{
        marginBottom:4,
    },
    deleteButton: {
        width: 80,
        height: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
