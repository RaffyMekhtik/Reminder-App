import { combineReducers } from 'redux'
import {listReducer} from './listReducer'

const myReducer = combineReducers({
    listReducer
})

export default function rootReducer( state, action ){
    return myReducer( state, action )
}

