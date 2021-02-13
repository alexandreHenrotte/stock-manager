import React from "react";
import Error from "../GenericComponents/Error";
import styles from "./Register.module.css";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errors: [],
    };
  }

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  setUserName = (event) => {
    this.setState({ username: event.target.value });
  };
  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  setConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  formatErrors = (errors) => {
    var errorsList = errors.split(", ");
    return errorsList;
  };

  handleSubmit = (event) => {
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      fetch(`http://localhost:9000/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          // Registration succeeded
          if (responseJson.registered === true) {
            window.location.href = "/login";
          }

          // Email address already exists in the database
          else if (
            responseJson.name === "MongoError" &&
            responseJson.keyValue.email !== undefined
          ) {
            console.log(responseJson);
            this.setState({
              errors: ["The email address has already been taken"],
            });
          }

          // Username already exists in the database
          else if (
            responseJson.name === "MongoError" &&
            responseJson.keyValue.username !== undefined
          ) {
            console.log(responseJson);
            this.setState({ errors: ["The username has already been taken"] });
          }

          // Fields missing
          else {
            var errorsList = this.formatErrors(responseJson.message);
            this.setState({ errors: errorsList });
          }
        });
    }

    event.preventDefault();
  };

  render() {
    if (this.state.formSubmitted)
      return (
        <div className="wrapper">
          <h1>Register Page</h1>
          <p>Form submitted</p>
        </div>
      );
    else {
      const { errors } = this.state;
      return (
        <div className="wrapper">
          <h1>Register Page</h1>
          <div className="inline_notif">
            {errors.map((error) => (
              <Error error={error} />
            ))}
          </div>
          <form className={styles.register_form}>
            <label>
              <p>Email</p>
              <input type="email" onChange={this.setEmail}></input>
            </label>
            <label>
              <p>Username</p>
              <input type="text" onChange={this.setUserName}></input>
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={this.setPassword}></input>
            </label>
            <label>
              <p>Confirm password</p>
              <input type="password" onChange={this.setConfirmPassword}></input>
            </label>
            <div>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Register;
