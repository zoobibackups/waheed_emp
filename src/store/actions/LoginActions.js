import {LOCAL_LOGIN, LOGIN, SIGN_OUT} from '../types';
export const Login = data => {
  try {
    return async dispatch => {
      dispatch({
        type: LOGIN,
        payload: data,
      });
    };
  } catch (e) {
    console.log(e);
  }
};

export const locallogin = data => {
  try {
    return async dispatch => {
      dispatch({
        type: LOCAL_LOGIN,
        payload: data,
      });
    };
  } catch (e) {
    console.log(e);
  }
};

export const UpdateData = data => {
  try {
    return async dispatch => {
      dispatch({
        type: 'UPDATE',
        payload: data,
      });
    };
  } catch (e) {
    console.log(e);
  }
};

export const Signout = () => {
  try {
    return async dispatch => {
      dispatch({
        type: SIGN_OUT,
      });
    };
  } catch (e) {
    console.log(e);
  }
};
