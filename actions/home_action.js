import *as ActionTypes from './action_type';
import Immutable from 'immutable';
import axios from "axios";
import {load_recipe_list_data} from "../actions/food_action";
import { serviceUrl } from "../common/constant/constant";

/**
 *  Get the recommended rotation photo on the homepage
 * @returns {function(*, *)}
 */
export function getBannerDatas(home_food_list_data) {
    return (dispatch, getState)=>{
        let banners = Immutable.List();
        let bannerCount = 0;
        for (let i=0;i<home_food_list_data.length;i++){
            const recipe = home_food_list_data[i];
            if(recipe.mediaType === '1' && bannerCount < 4) {
                const data = Immutable.fromJS(home_food_list_data[i])
                banners = banners.push(data);
                bannerCount++;
            }
        }
        dispatch({
            type:ActionTypes.Home_GetBannerData,
            data:{
                top_banners:banners
            }
        })
    }
}

/**
 * Getting recommend recipes
 * @returns {function(*, *)}
 */
export function getMainDatas(home_food_list_data) {
    return (dispatch,getState)=>{
        dispatch({
            type:ActionTypes.Home_GetMainData,
            data:{
                main_data:Immutable.fromJS(home_food_list_data)
            }
        })
    }
}

/**
 * Fetch all categories.
 * @returns {function(*, *)}
 */
export function getAllTagData(tag_select_index){
    return (dispatch, getState)=>{
        dispatch({
            type:ActionTypes.Menu_Update_LoadTags,
            data:{
                menu_tag_refreshing:true
            }
        })

        axios.get(serviceUrl + '/category/fetch-category').then(res => {
            if (res.status === 200) {
                if (res.data){
                    const allDataTags = res.data;
                    const tags = [];
                    for (let i=0; i<allDataTags.length; i++){
                        const data = allDataTags[i];
                        data["key"] = data.name;
                        data["isOpen"] = true;
                        tags.push(data);
                    }
                    dispatch({
                        type:ActionTypes.Menu_AllTagsData,
                        data:{
                            tags_data:Immutable.fromJS(tags),
                            menu_tag_refreshing:false
                        }
                    })
                    dispatch(load_recipe_list_data(tags[tag_select_index].name, null/*9*/, 0, true));
                }


            } else {
                console.error('Fetch tags failed:' + res.data);
            }
        }).catch(err => {
            console.error('Fetch tags failed:' + error);
        });
    }
}

/**
 *  The current selected category.
 * @param left_tag_select_index
 * @returns {function(*, *)}
 */
export function changeTag(left_tag_select_index){
    return (dispatch,getState)=>{
        dispatch({
            type:ActionTypes.Menu_ChangeTag,
            data:{
                left_tag_select_index: left_tag_select_index
            }
        })
    }
}

/**
 *  Getting 10 categories randomly.
 * @returns {function(*, *)}
 */
export function getTagDatas(home_category_list_data) {
    return (dispatch, getState)=>{
        let top_tags = Immutable.List();
        let dataLength = Math.min(11, home_category_list_data.length);
        for (let i=0; i<dataLength; i++){
            const data = Immutable.fromJS(home_category_list_data[i])
            data["key"] = Math.random()
            top_tags = top_tags.push(data)
        }

        dispatch({
            type:ActionTypes.Home_GetBannerTagsData,
            data:{
                top_tags:top_tags
            }
        })
    }
}