import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Account from './Accounts';
import Catego from './Categories';

const useScreens = () => {
    return {
        Login,
        Register,
        Forgot,
        Account,
        Catego,
    }
}

export default useScreens;