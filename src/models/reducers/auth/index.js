import useHelpers from '../../../helpers'
import useStrings from '../../../strings'
import useInitialStates from '../../initialstates'

const useAuthReducers = () => {
    const { useCreateReducer } = useHelpers()
    const { createReducer } = useCreateReducer()

    const { useAuthInitialStates } = useInitialStates()
    const { initialStateAuth } = useAuthInitialStates()

    const { useAuthTypes } = useStrings()
    const {
        LOGIN,
        LOG_OUT,
        EDIT_PROFILE,
    } = useAuthTypes()

    const auth = createReducer(initialStateAuth, {
        [LOGIN](state, action) {
            const { payload } = action
            return {
                ...state,
                auth_token: payload.token,
                name: payload.data.name,
                email: payload.data.email,
                transfer_id: payload.data.transfer_id,
                currency: payload.data.currency,
            }
        },
        [EDIT_PROFILE](state, action) {
            const { payload } = action
            return {
                ...state,
                name: payload.data.name,
                email: payload.data.email,
            }
        },
        [LOG_OUT](state, action) {
            console.log("LOG_OUT ")
            return {
                ...state,
                auth_token: null,
                name: null,
                email: null,
                transfer_id: null,
                currency: null,
            }
        },
    })

    return { auth }
}

export default useAuthReducers
