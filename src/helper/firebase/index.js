import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { setAuthentication } from 'redux/auth/actions';
import store from 'redux/store';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
const fetchUser = async (role, email) => {
  const URL = {
    SUPERADMIN: `${process.env.REACT_APP_API_URL}/super-admin`,
    ADMIN: `${process.env.REACT_APP_API_URL}/admins`,
    EMPLOYEE: `${process.env.REACT_APP_API_URL}/employees`
  };
  try {
    const response = await fetch(`${URL[role]}`);
    const data = await response.json();
    const user = data.data.filter((item) => item.email === email);
    return user[0];
  } catch (error) {
    console.log(error);
  }
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const tokenListener = () => {
  // Every time the token change, it is saved on sessionStorage
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      const userData = await fetchUser({ role }.role, user.email);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', { role }.role);
      sessionStorage.setItem('userStatus', userData?.active);
      store.dispatch(
        setAuthentication({
          token,
          role,
          data: userData
        })
      );
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('userStatus');
      store.dispatch(setAuthentication({}));
    }
  });
};

export default firebaseApp;
