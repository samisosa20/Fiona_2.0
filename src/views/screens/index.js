import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Account from './Accounts';
import Catego from './Categories';
import Budget from "./Budget"
import CreateBudget from "./Budget/Create"
import ViewBudget from "./Budget/View"
import ReportBudget from "./Budget/Report"
import Movements from "./Movements"
import Report from "./Report"
import Events from "./Events"
import Planned from "./Planned"
import Profile from "./Profile"

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
        Movements,
        Report,
        Events,
        Planned,
        Profile,
    }
}

export default useScreens;