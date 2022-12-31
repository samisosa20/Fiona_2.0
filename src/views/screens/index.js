import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Account from './Accounts';

const useScreens = () => {
    return {
        Login,
        Register,
        Forgot,
        Account,
    }
}

export default useScreens;