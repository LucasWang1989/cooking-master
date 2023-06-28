import {combineReducers} from 'redux';
import home_reducer from './home_reducer';
import food_reducer from './food_reducer';
import profile_reducer from './profile_reducer';
import user_reducer from './user_reducer'

const root_reducer = combineReducers({
    home_reducer,
    food_reducer,
    profile_reducer,
    user_reducer,
})

export default root_reducer;