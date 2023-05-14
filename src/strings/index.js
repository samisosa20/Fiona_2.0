import useAuthTypes from './auth'
import useGeneralTypes from './general'

const useStrings = () => {
    return {
        useAuthTypes,
        useGeneralTypes,
    }
}

export default useStrings
