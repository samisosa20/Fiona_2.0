import useStrings from '../../../strings'
import useProviders from '../../providers'

import { AppDispatch } from "../../../config/redux"


const useGeneralActions = () => {

    // Providers
    const { useGeneralProviders } = useProviders()
    const { generalProvider } = useGeneralProviders()

    // Types
    const { useGeneralTypes } = useStrings()
    const { SET_GENERAL } = useGeneralTypes()

    const actGeneral =
        () =>
        async (dispatch) => {
            const response = await generalProvider()
            dispatch({ type: SET_GENERAL, payload: response.data })
        }

    return {
        actGeneral,
    }
}

export default useGeneralActions
