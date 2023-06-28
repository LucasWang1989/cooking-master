import Immutable from 'immutable'
import execute_reducer from "./reducer_helper";

const initialState = Immutable.Map({
    token: "-1",
    username: "none"
})

function change_token(state, data) {
    return state.set("token", data.token).set("username", data.username);
}

const tables = {
    "User_Token_Add_Data": change_token,
}

export default function user_reducer(state = initialState, action) {
    return execute_reducer(state, action, tables)
}