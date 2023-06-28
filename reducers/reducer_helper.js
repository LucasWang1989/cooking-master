import Immutable from 'immutable'

/**
 * Data of action should be put in the object of data.
 * @param state
 * @param action
 * @param reducer_tables
 * @returns {*}
 */
export default function execute_reducer(state, action, reducer_tables) {
    const real_state = state || Immutable.Map()

    const reducer = reducer_tables[action.type];
    if (reducer){
        return reducer(real_state,action.data);
    }
    return real_state;
}