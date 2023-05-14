import useInterceptor from './interceptor'
import useStoreConfig from './redux'

const useConfig = () => {
    return {
        useInterceptor,
        useStoreConfig,
    }
}

export default useConfig
