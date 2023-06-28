import * as ActionTypes from './action_type'

/**
 * Save token after login successfully.
 * @type {string}
 */
export const storage_user_token_key = "storage-user-token-key";

/**
 * Save token after login successfully.
 * @type {string}
 */
export const storage_user_name_key = "storage-user-name-key";

/**
 * Store browsing history
 * @param food_data
 */
export function change_user_token(token, username) {
    return (dispatch, getState)=>{
        dispatch({
            type:ActionTypes.User_Token_Add_Data,
            data:{
                token: token,
                username: username
            }
        })
        storage.save({
            key: storage_user_token_key,
            data: token
        });
        storage.save({
            key: storage_user_name_key,
            data: username
        });
    }
}

/**
 * Read user and token history
 */
export function read_user_and_token() {
    return (dispatch, getState) => {
        try {
            Promise.all([
                storage.load({ key: storage_user_name_key }),
                storage.load({ key: storage_user_token_key })
            ]).then(res => {
                const username = res[0];
                const token = res[1];
                dispatch({
                    type:ActionTypes.User_Token_Add_Data,
                    data:{
                        token: token,
                        username: username
                    }
                })
            })
        }catch (e) {
            appLog("Initial user and token data error", e);
        }
    }
}