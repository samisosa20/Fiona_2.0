import useInitialStates from './initialstates'
import useReducers from './reducers'
import useSelectors from './selectors'

const useModels = () => {
    return {
        useReducers,
        useInitialStates,
        useSelectors,
    }
}

export default useModels
