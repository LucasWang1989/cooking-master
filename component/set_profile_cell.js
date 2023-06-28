import React , {Component} from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import {common_theme} from "./../common/commonStyle";

let {width} = Dimensions.get('window')

export default class Set_Profile_Cell extends Component {

    static defaultProps = {

        leftImageName:'',

        leftTitleName:"",

        rightTitleName:'',

        rightImageName:"",

        separator:true
    }

    constructor(props){
        super(props);
    }

    render(){
        const imagePath = this.props.leftImageName;

        return(
            <TouchableOpacity onPress={()=>this.props.onPush()}>
                <View style={styles.cellViewStyle}>
                    <View style={styles.leftOutViewStyle}>
                        <Image style={styles.leftIconStyle}
                               source={ imagePath }

                        />
                        <Text style={styles.leftTextStyle}>{this.props.leftTitleName}</Text>
                    </View>
                </View>
                {this.props.separator ?
                    <View style={styles.separatorStyle}></View>
                    :null
                }

            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    cellViewStyle:{
        backgroundColor:'white',
        width:width,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    leftOutViewStyle:{
        flexDirection:'row',
        alignItems:'center'
    },
    leftIconStyle:{
        width:20,
        height:20,
        marginLeft:15,
        resizeMode:'contain'
    },
    leftTextStyle:{
        color:common_theme.titleColor ,
        marginLeft:10,
        fontSize:common_theme.titleFontSize
    },
    rightOutViewStyle:{
        marginRight:common_theme.viewMPRight,
        flexDirection:'row',
        alignItems:'center'
    },
    rightLeftIconStyle:{
        width:24,
        height:13,
        marginRight:common_theme.viewMPRight
    },
    rightIconStyle:{
        height:13,
        width:8,
    },
    separatorStyle:{
        height:0.5,
        backgroundColor:common_theme.separatorColor,
        marginLeft:15
    }
});
