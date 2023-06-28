import * as ActionTypes from './action_type'


/**
 * The storage key of browsing history
 * @type {string}
 */
const browser_food_key = "storage-browserFoodKey"

/**
 * Save key of favorite food
 * @type {string}
 */
const like_food_key = "storage-likeFoodKey"

/**
 * Store browsing history
 * @param food_data
 */
export function save_browser_food(food_data) {
    return (dispatch,getState)=>{

        let {profile_reducer} = getState();
        profile_reducer = profile_reducer.toJS();

        const food_list_browser = profile_reducer.food_list_browser;
        let index = false;
        food_list_browser.map(item=>{
            if (food_data.id == item.id){
                index = true;
            }
        })
        if (!index) {
            food_list_browser.push(food_data)
            dispatch({
                type:ActionTypes.Food_Browser_Add_Data,
                data:{
                    food_data:food_data
                }
            })
            storage.save({
                key: browser_food_key,
                data:food_list_browser
            })
        }
    }
}

/**
 * Read browsing history
 */
export function read_browser_food() {
    return (dispatch, getState)=>{
        storage.load({
            key: browser_food_key
        }).then(response => {
            appLog(response);
            dispatch({
                type:ActionTypes.Food_Browser_Load_Data,
                data:{
                    food_list_browser:response
                }
            });
        }).catch((error)=>{
            appLog(error);
        })
    }
}

/**
 * Save recipes you like.
 * @param food_data
 */
export function save_like_food(food_data) {
    return (dispatch, getState)=> {

        let {profile_reducer} = getState();
        profile_reducer = profile_reducer.toJS();

        const food_list_like = profile_reducer.food_list_like;
        let index = -1;
        food_list_like.map((item, itemIndex)=>{
            if (item && food_data.id === item.id){
                index = itemIndex;
            }
        })
        // Add to list
        if (index < 0){
            food_list_like.push(food_data)
            dispatch({
                type: ActionTypes.Food_Like_Add_Data,
                data: {
                    food_data: food_data,
                    isLike: true
                }
            })
            storage.save({
                key: like_food_key,
                data:food_list_like
            })

        // Delete from list due to dislike.
        }else {
            food_list_like.splice(index,1);
            dispatch({
                type:ActionTypes.Food_Like_Delete_Data,
                data:{
                    index:index,
                    isLike:false,
                }
            })
            storage.save({
                key: like_food_key,
                data:food_list_like
            })
        }
    }
}

/**
 * Delete browsing history
 * @param index
 * @returns {function(*, *)}
 */
export function delete_browser(index) {

    return (dispatch,getState)=>{

        let {profile_reducer} = getState();
        profile_reducer = profile_reducer.toJS();

        const food_list_browser = profile_reducer.food_list_browser;

        food_list_browser.splice(index,1)

        dispatch({
            type:ActionTypes.Food_Browser_Delete_Data,
            data:{
                index:index,
            }
        })
        storage.save({
            key: browser_food_key,
            data:food_list_browser
        })
    }

}
/**
 * Cancel like food
 */
export function delete_like(index) {

    return (dispatch,getState)=>{

        let {profile_reducer} = getState();
        profile_reducer = profile_reducer.toJS();

        const food_list_like = profile_reducer.food_list_like;
        food_list_like.splice(index,1)

        dispatch({
            type:ActionTypes.Food_Like_Delete_Data,
            data:{
                index:index,
                isLike:false,
            }
        })
        storage.save({
            key: like_food_key,
            data:food_list_like
        })
    }

}
/**
 * Fetch favourite recipes.
 */
export function read_like_food() {
    return (dispatch, getState)=>{
        storage.load({
            key:like_food_key
        }).then(response=>{
            appLog(response)
            dispatch({
                type:ActionTypes.Food_Like_Load_Data,
                data:{
                    food_list_like: response
                }
            })
        }).catch((error)=>{
            appLog(error)
        })
    }
}