//Packages
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'

const useGeneralProviders = () => {
    const generalProvider = () => {
        const request = axios({
            method: 'GET',
            url: `general`,
        })

        return trackPromise(request)
    }

    return { generalProvider }
}

export default useGeneralProviders
