import * as ActionTypes from './action_type';
import Immutable from 'immutable';
import axios from "axios";
import { serviceUrl } from "../common/constant/constant";

/**
 * Storage key of favorite food
 * @type {string}
 */
const like_food_key = "storage-likeFoodKey"

/**
 *  Load recipes
 * @param isRefreshing
 * @param rn
 * @param pn
 * @returns {function(*, *)}
 */

export function load_recipe_list_data(searchText, cid=null, pageNo=0, isRefreshing) {
    return (dispatch, getState)=>{
        if (isRefreshing){
            dispatch(food_list_data_change_refreshing(true, 0))
        }else {
            dispatch(food_list_change_loading(1, pageNo))
        }
        if (cid==null){
            const dict = {
                keyWord: searchText,
            }

            axios.post(serviceUrl + '/recipe/fetch-recipe', dict).then(res => {
                if (res.status === 200) {
                    loading_refreshing_food_list(dispatch, res, isRefreshing);
                } else {
                    console.error('Load recipe list failed:' + res.data);
                }
            }).catch(err => {
                console.error('Load recipe list failed:' + error);
            });
        }
    }
}

/**
 * Set isLike according to selected recipe id.
 */
export function set_is_like_recipe(id) {
    return (dispatch, getState)=> {
        storage
            .load({
                key: like_food_key,
            })
            .then(response => {
                for (let j = 0; j < response.length; j++) {
                    if (response[j] !== null && response[j].id === id) {
                        dispatch({
                            type: ActionTypes.Food_Like_Add_Data,
                            data: {isLike: true}
                        })
                    }
                }
            })
            .catch(error => {
                console.log("Fill up isLike info error:" + error);
            });
    }
}

/**
 * Refreshing_food_list
 * @param dispatch
 * @param response
 * @param isRefreshing
 */
function loading_refreshing_food_list(dispatch, response, isRefreshing) {
    dispatch(food_list_change_loading_data(Immutable.fromJS(response.data),0,/*(rn+pn)*/))
}

/**
 * @returns {function(*)}
 */
export function food_list_unmount_clear() {
    return dispatch=>{
        dispatch({
            type:ActionTypes.Food_List_Unmount_Clear
        })
    }
}

/**
 * @returns {function(*)}
 */
export function food_step_unmount_clear() {
    return dispatch=>{
        appLog("componentDidUnmount")
        dispatch({
            type:ActionTypes.Food_Step_Unmount_Clear
        })
    }
}
/**
 *
 * @param isRefreshing
 * @returns {{type: string, data: {isRefreshing: *}}}
 */
function food_list_data_change_refreshing(isRefreshing, rn) {
    return {
        type:ActionTypes.Food_List_Refreshing,
        data:{
            isRefreshing: isRefreshing,
            rn: rn
        }
    }
}

/**
 *  loading recipe list
 * @param data
 * @param loading
 * @returns {{type: null, data: {food_list_data: *, loading: *}}}
 */

function food_list_change_loading_data(data, loading, rn) {
    return {
        type:ActionTypes.Food_List_Loading_Data,
        data:{
            food_list_data: data,
            loading: loading,
            rn: rn
        }
    }
}

/**
 * @param loading 0: load 1, loading 2,loaded 3,no data 4,error
 * @returns {{type, data: {loading: *}}}
 */
function food_list_change_loading(loading, rn) {
    return {
        type:ActionTypes.Food_List_Loading,
        data:{
            loading:loading,
            rn:rn
        }
    }
}