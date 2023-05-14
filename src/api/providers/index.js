import useAuthProviders from './auth'
import useAccountProviders from './account'
import useMovementProviders from './movement'
import useGeneralProviders from './general'
import useEventProviders from './event'
import useBudgetProviders from './budget'
import useHeritageProviders from './heritage'
import usePaymentProviders from './payment'
import useCategoryProviders from './category'
import useReportProviders from './report'

const useProviders = () => {
    return {
        useAuthProviders,
        useAccountProviders,
        useMovementProviders,
        useGeneralProviders,
        useEventProviders,
        useBudgetProviders,
        useHeritageProviders,
        usePaymentProviders,
        useCategoryProviders,
        useReportProviders,
    }
}

export default useProviders
