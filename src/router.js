import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import asyncComponent from './util/AsyncComponent'
import Signup from './containers/pages/Signup/Signup'
// import App from './containers/App/App';
// import AppClinic from './containers/AppClinic/App';
// import AppAdmin from './containers/AppAdmin/App';
// import asyncComponent from './util/AsyncComponent';
// import Auth0 from './helpers/auth0';
// import { BrowserRouter } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/main'}
          component={asyncComponent(() =>
            import('./containers/pages/Landing/Landing')
          )}
        />
        <Route
          exact
          path={'/'}
          component={asyncComponent(() =>
            import('./containers/pages/Signin/Signin')
          )}
        />
        
        <PrivateRoute
          path="/signup"
          component={Signup}
          isLoggedIn={true}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null,
}))(PublicRoutes);
