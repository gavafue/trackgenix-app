import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Layout from 'Components/Layout';
import AccountInactive from 'Components/Auth/Errors/AccountInactive';
const authRoutes = [{ name: 'Login', path: '/auth/login' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Redirect to={`${url}/login`} />
        <Route path="/accountInactive" component={AccountInactive} />;
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
