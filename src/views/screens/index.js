import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Account from './Accounts';
import Catego from './Categories';
import Budget from "./Budget"
import CreateBudget from "./Budget/Create"
import ViewBudget from "./Budget/View"
import ReportBudget from "./Budget/Report"

const useScreens = () => {
    return {
        Login,
        Register,
        Forgot,
        Account,
        Catego,
        Budget,
        CreateBudget,
        ViewBudget,
        ReportBudget,
    }
}

export default useScreens;