import { loginPending, loginSuccess, loginError } from './actions';
import firebase from 'helper/firebase';
const URL = process.env.REACT_APP_API_URL;
const fetchUser = async (role, userEmail) => {
  if (role === 'SUPERADMIN') {
    try {
      const response = await fetch(`${URL}/super-admin`);
      const data = await response.json();
      const user = data.data.filter((item) => item.email === userEmail);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }
  if (role === 'ADMIN') {
    try {
      const response = await fetch(`${URL}/admins`);
      const data = await response.json();
      const user = data.data.filter((item) => item.email === userEmail);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }
  if (role === 'EMPLOYEE') {
    try {
      const response = await fetch(`${URL}/employees`);
      const data = await response.json();
      const user = data.data.filter((item) => item.email === userEmail);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }
};

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        sessionStorage.setItem('role', role);

        return dispatch(
          loginSuccess({
            role,
            token,
            data: (await fetchUser(role, credentials.email)) || 'User not found'
          })
        );
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};
