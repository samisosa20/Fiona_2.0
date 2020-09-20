import { ADD_USER, ADD_PSSD } from "../actions/Login";

const default_state_login = {
  user: "",
  password: "",
};

const login_reducer = (state = default_state_login, action) => {
  switch (action.type) {
    case ADD_USER: {
      console.log(action.user);
      return {
        ...state,
        user: action.user,
      };
    }
    case ADD_PSSD: {
      console.log(action.user);
      return {
        ...state,
        password: action.password,
      };
    }
    default:
      return state;
  }
};

export default login_reducer;
