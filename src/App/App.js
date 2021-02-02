import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import BootstrapNavBar from './BootstrapNavBar';
import Home from '../Home/Home';
import Stocks from '../Stocks/Stocks';
import Products from '../Products/Products';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Settings from '../Settings/Settings';
import Page404 from '../Error404/Page404';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token : "",
            setToken : ""
        }
    }

    render() {
        return (
            <div className="wrapper">
                <BootstrapNavBar />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute exact path="/stocks" component={Stocks} />
                        <PrivateRoute path="/stocks/products" component={Products} />
                        <PrivateRoute path="/settings" component={Settings} />
                        <Route path="/404" component={Page404} />
                        <Redirect from='*' to='/404' />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}



export default App;