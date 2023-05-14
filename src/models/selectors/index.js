import { useSelector } from 'react-redux'
import useAuthSelectors from './auth'
import useGeneralSelectors from './general'

const useSelectors = () => {
    return {
        useSelector,
        useAuthSelectors,
        useGeneralSelectors,
    }
}

export default useSelectors
