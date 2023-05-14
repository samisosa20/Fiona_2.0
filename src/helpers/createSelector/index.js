import { createSelectorCreator, defaultMemoize } from 'reselect'
import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'

const useCreateSelector = () => {
    const createSelector = createSelectorCreator(defaultMemoize, isEqual)
    return {
        createSelector,
        useSelector,
    }
}

export default useCreateSelector
