import { combineReducers } from 'redux'
import useAuthReducers from './auth'
import useGeneralReducers from './general'


const useReducers = () => {
    const { auth } = useAuthReducers()
    const { general } = useGeneralReducers()
    return combineReducers({
        auth,
        general,
    })
}

export default useReducers
