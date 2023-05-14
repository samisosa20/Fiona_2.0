import useHelpers from '../../../helpers'
import { useSelector } from 'react-redux'

const useGeneralSelectors = () => {
    const { useCreateSelector } = useHelpers()
    const { createSelector } = useCreateSelector()

    const currencySelector = () =>
        useSelector(
            createSelector(
                (state) => state.general,
                general => general.currencies
            )
        )
    
    const groupSelector = () =>
        useSelector(
            createSelector(
                (state) => state.general,
                general => general.groups
            )
        )

    return {
        currencySelector,
        groupSelector,
    }
}

export default useGeneralSelectors
