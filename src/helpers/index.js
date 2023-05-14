import useValidators from './validators'
import usePatterns from './patterns'
import useQuickFunctions from './quickFunctions'
import useCreateReducer from './createReducer'
import useCreateSelector from './createSelector'

const useHelpers = () => {
    return {
        useValidators,
        usePatterns,
        useQuickFunctions,
        useCreateReducer,
        useCreateSelector,
    }
}

export default useHelpers