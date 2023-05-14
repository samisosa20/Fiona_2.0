import useAuthInitialStates from './auth'
import useGeneralInitialStates from './general'

const useInitialStates = () => {
    return {
        useAuthInitialStates,
        useGeneralInitialStates,
    }
}

export default useInitialStates
