import useHelpers from '../../../helpers'
import { useSelector } from 'react-redux'

const useAuthSelectors = () => {
    const { useCreateSelector } = useHelpers()
    const { createSelector } = useCreateSelector()

    const authSelector = () =>
        useSelector(
            createSelector(
                (state) => state.auth,
                auth => auth
            )
        )

    const loggedSelector = () =>
        useSelector(
            createSelector(
                (state) => state.auth.auth_token,
                (auth_token) => (auth_token ? true : false)
            )
        )

    return {
        authSelector,
        loggedSelector,
    }
}

export default useAuthSelectors
