/**
 * Created by ls-mac on 2017/5/10.
 */
import React from 'react'
import {NativeModules,Alert,Platform} from 'react-native'

export function isEmptyObject(e) {
    let t;
    for (t in e)
        return !1;
    return !0
}
export function notEmpty(str) {
    if (str && str.length > 0 && str != 'null' && str !="undefined" ) {
        return true;
    } else {
        return false;
    }
}

export function trim(data){
    for(var i in data){
        if(undefined != data[i] && null != data[i]){
            if(typeof data[i] == 'string'){
                data[i] = data[i].replace(/(^\s*)|(\s*$)/g, "");
            }
        }
    }
    return data;
}
