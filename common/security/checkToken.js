import React from 'react';
import {storage_user_token_key, storage_user_name_key} from "../../actions/user_action";
import axios from "axios";
import { serviceUrl } from "../../common/constant/constant";

export const checkToken = async () => {
    try {
        const token = await storage.load({
            key: storage_user_token_key
        });
        const username = await storage.load({
            key: storage_user_name_key
        });
        if (token && username) return doCheck(token, username);
    } catch (error) {
        console.log("Getting token and username from storage is fail:", error);
    }
    return false;
};

const doCheck = async (token, username) => {
    try {
        const param = {
            "token": token,
            "username": username
        }
        const res = await axios.post(serviceUrl + '/user/check-token', param);
        if (res.status === 200) {
            if (res.data === "success"){
                return true;
            }
        } else {
            console.long('Check token failed:', res);
        }
    }catch (err) {
        console.error('Check token failed:' + error);
    }
    return false;
}

export const deleteToken = async () => {
    try {
        await storage.remove({
            key: storage_user_token_key
        });
        await storage.remove({
            key: storage_user_name_key
        });
        return true;
    } catch (error) {
        console.log("Removing token and user name from storage is fail:", error);
    }
    return false;
};