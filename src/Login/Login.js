import React from 'react';
import Cookies from 'js-cookie';
import styles from './Login.module.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            username : "",
            password : ""
        }
    }

    setUserName = (event) => {
        this.setState({username : event.target.value});
    }
    setPassword = (event) => {
        this.setState({password : event.target.value});
    }

    render() {
        return (
            <div className="wrapper">
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit} className={styles.login_form}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={this.setUserName}></input>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={this.setPassword}></input>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <button onClick={() => window.location.href='/register'}>Register</button>
            </div>
        );
    }
}

export default Login;