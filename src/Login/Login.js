import React from "react";
import styles from "./Login.module.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onLoginSuccess = () => {
    console.log("Succeed !");
  };
  onLoginFailure = (errorMessage) => {
    console.log(errorMessage);
  };

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    const data = new FormData(event.target);

    fetch(`http://localhost:9000/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        resJson.success
          ? this.onLoginSuccess()
          : this.onLoginFailure(resJson.errorMessage);
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="wrapper">
        <h1>Login Page</h1>
        <form className={styles.login_form} onSubmit={this.handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" name="email" onChange={this.setEmail}></input>
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={this.setPassword}
            ></input>
          </label>
          <div>
            <input type="submit" value="Login"></input>
          </div>
        </form>
        <button onClick={() => (window.location.href = "/register")}>
          Register
        </button>
      </div>
    );
  }
}

export default Login;
