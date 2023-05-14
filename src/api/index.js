import useActions from './actions'
import useProviders from './providers'
const useApi = () => {
    return {
        useActions,
        useProviders,
    }
}

export default useApi
