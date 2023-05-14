import useHelpers from '../../../helpers'
import useStrings from '../../../strings'
import useInitialStates from '../../initialstates'

const useGeneralReducers = () => {
    const { useCreateReducer } = useHelpers()
    const { createReducer } = useCreateReducer()

    const { useGeneralInitialStates } = useInitialStates()
    const { initialStateGeneral } = useGeneralInitialStates()

    const { useGeneralTypes } = useStrings()
    const {
        SET_GENERAL,
        CLEAR_GENERAL,
    } = useGeneralTypes()

    const general = createReducer(initialStateGeneral, {
        [SET_GENERAL](state, action) {
            const { payload } = action
            return {
                ...state,
                currencies: payload.currencies,
                groups: payload.groups,
            }
        },
        [CLEAR_GENERAL]() {
            return initialStateGeneral
        },
    })

    return { general }
}

export default useGeneralReducers
