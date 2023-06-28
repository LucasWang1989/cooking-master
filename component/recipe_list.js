import React from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import {common_theme} from "./../common/commonStyle";
import {connect} from 'react-redux';
import Common_Food_List_Cell from "./common_cell";

class Recipe_list extends React.Component{

    static defaultProps = {
        columns: common_theme.screenWidth > 320 ? 4 : 3,
        width: common_theme.screenWidth,
    }

    renderItem(item){
        const {cellOnClick} = this.props;

        return (
            <Common_Food_List_Cell
                food_list_item={item.item}
                onClick={cellOnClick}/>
        )
    }

    itemSeparatorComponent(){
        return(
            <View style={styles.separatorStyle}/>
        )
    }

    onEndReached(){
        const {isRefreshing,loading} = this.props;
        if (isRefreshing || loading != 0 ){
            return;
        }
    }

    render(){
        const {key, food_list_data, isRefreshing} = this.props;

        return(
            <View style = {styles.container} key = {key ? key: "key"}>
                <FlatList style={styles.flat}
                          renderItem={this.renderItem.bind(this)}
                          data={food_list_data}
                          keyExtractor={(item) => {
                              return item.id.toString();
                          }}
                          ItemSeparatorComponent={this.itemSeparatorComponent}
                          refreshing={isRefreshing}
                          onEndReachedThreshold={0}
                          onEndReached={this.onEndReached.bind(this)}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    const {food_reducer} = state;
    return food_reducer.toJS()
}

export default connect(mapStateToProps, null) (Recipe_list);

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})