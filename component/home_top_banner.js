import React ,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {common_theme} from "./../common/commonStyle";
import Swiper from 'react-native-swiper';
import NetWorkImage from "./../common/component/netWorkImage";
import {commonStyle} from "./../common/commonStyle";
import { FontAwesome } from '@expo/vector-icons';

class Home_Top_Banner extends Component{

    renderPagination(index, total){
        const dots = [];
        const { top_banners } = this.props;

        if (!top_banners.length){
            return null
        }

        for (let i=0; i< total; i++){
            let dot = {backgroundColor:'rgba(0,0,0,.3)', width: 6, height:6,borderRadius:3, margin:3};
            if(index == i){
                dot = {backgroundColor: common_theme.themeColor, width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3}
            }
            dots.push(<View key={top_banners[i].id} style={dot}/>)
        }

        return(
            <View style={[styles.paginationStyle,commonStyle.rowSpaceBetween]}>

                <View style={{flexDirection:'row',alignItems:"center"}}>
                    <Text style={styles.title}>{top_banners[index].title}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:"center"}}>
                    {dots}
                </View>
            </View>
        )
    }

    render(){
        const {top_banners, topBannerOnClick} = this.props;
        const banners = top_banners.map((item, index) => {
            return <TouchableOpacity key={index}
                               activeOpacity={1}
                                     onPress={()=>{topBannerOnClick(item.coverVideoUrl)}}>

                        <NetWorkImage style={styles.imageStyle}
                                      uri={item.coverPageUrl}/>
                        <View style={styles.playIcon}>
                            <FontAwesome name="play-circle" size={48} color="rgba(255, 255, 255, 0.6)" />
                        </View>
                    </TouchableOpacity>
        });

        return (
            <Swiper
                height={height}
                autoplay={true}
                loop={true}
                renderPagination={
                    this.renderPagination.bind(this)
                }>
                {banners}
            </Swiper>
       )
    }
}

const height = 190
const styles = StyleSheet.create({
    imageStyle:{
        width:common_theme.screenWidth,
        height:height,
    },
    paginationStyle:{
        position:'absolute',
        bottom:0,
        height:40,
        width:common_theme.screenWidth,
        backgroundColor:"rgba(0,0,0,0.2)",
        paddingLeft:common_theme.viewMPLeft / 2,
        paddingRight:common_theme.viewMPRight / 2,
    },
    playIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -24 }, { translateY: -24 }],
    },
    title:{
        color:"#fff",
        fontSize:common_theme.titleFontSize,
        width:common_theme.screenWidth * 0.7
    }
});

export default Home_Top_Banner;