import { useDispatch } from 'react-redux'
import useAuthActions from './auth'
import useAccountActions from './account'
import useMovementActions from './movement'
import useGeneralActions from './general'
import useBudgetActions from './budget'
import useCategoryActions from './category'
import useEventActions from './event'
import useHeritageActions from './heritage'
import usePaymentActions from './payment'
import useReportActions from './report'

const useActions = () => {
    const dispatch = useDispatch()

    return {
        dispatch,
        useAuthActions,
        useAccountActions,
        useMovementActions,
        useGeneralActions,
        useBudgetActions,
        useCategoryActions,
        useEventActions,
        useHeritageActions,
        usePaymentActions,
        useReportActions,
    }
}

export default useActions
