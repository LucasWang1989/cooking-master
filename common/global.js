/**
 * Add a log function to the app to print the log in the dev environment,
 * but not in the production environment
 */

global.appLog = function (message){
    if (__DEV__){
        console.log(message)
    }
}

/**
 * Set the number of global pagination
 */

global.pageSize = 30;


import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';


/**
 * global storage object
 * @type {Storage}
 */
const storage = new Storage({
    // Maximum capacity, the default value is 1000 pieces of data cycle storage
    size: 1000,

    // Storage engine: use AsyncStorage for RN, use window.localStorage for web
    // If not specified, the data will only be saved in memory and will be lost
    // after restarting
    storageBackend: AsyncStorage,

    // Data expiration time, the default is a whole day (1000 * 3600 * 24 milliseconds),
    // if set to null, it will never expire
    defaultExpires: null,

    // Cache data in memory when reading and writing. Enabled by default.
    enableCache: true,

    // If there is no corresponding data in storage, or the data has expired,
    // The corresponding sync method will be called to seamlessly return the latest data.
    // The specific description of the sync method will be mentioned later
    // You can write the sync method here in the constructor
    // Or write to another file, where require imports
    // Or at any time, directly assign and modify storage.sync

})

global.storage = storage;



