export const ADD_USER = "ADD_USER";
export const ADD_PSSD = "ADD_PSSD";

export const return_user = (name, value) => {
  if (name == "user") {
    return {
      type: ADD_USER,
      user: value,
    };
  } else {
    return {
      type: ADD_PSSD,
      password: value,
    };
  }
};
