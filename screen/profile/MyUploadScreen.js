import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import {connect} from 'react-redux'
import Common_Food_List_Cell from "../../component/common_cell";
import {delete_browser} from "../../actions/profile_action";
import axios from "axios";
import { serviceUrl } from "../../common/constant/constant";


class MyUploadScreen extends React.Component {
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
            food_list_my_upload: []
        }
    }

    componentDidMount(): void {
        this.fetchMyUpload();
        // alert(this.state.food_list_my_upload);
    }

    fetchMyUpload() {
        axios.get(serviceUrl + "/user/fetch-my-upload?username="
            + this.props.username).then(res => {
                if(res.status === 200) {
                    this.setState({food_list_my_upload: res.data})
                }
            })
    }

    push_food_step(food_list_item){
        const {navigate} = this.props.navigation;
        navigate("RecipeDetailScreen",{select_item: food_list_item})
    }
    delete(index){
        const {dispatch} = this.props;
        dispatch(delete_browser(index));
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

        renderCell(item){
        return (
            <View>
                <Common_Food_List_Cell
                    food_list_item={item.item}
                    onClick={this.push_food_step.bind(this)}/>
            </View>
        )
    }

    render (){
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.food_list_my_upload}
                    renderItem={this.renderCell.bind(this)}
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
    const {user_reducer} = state;
    return {
        ...user_reducer.toJS()
    }
}
export default connect(mapStateToProps)(MyUploadScreen);

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
