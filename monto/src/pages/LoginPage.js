import React, {Component} from "react";
import {Button, Container, FormGroup} from "reactstrap";
import "../index.css";
import AppNav from "../AppNav";
import {inject} from "mobx-react";


export default inject("auth")(
  class LoginPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: "",
        hasLoginFailed: false,
        showSuccessMessage: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.loginClicked = this.loginClicked.bind(this);
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    async loginClicked() {
      const status = await this.props.auth.login(this.state.email, this.state.password);

      if (status !== undefined) {
        this.setState({...this.state, showSuccessMessage: false, hasLoginFailed: true})
      }
    }

    handleSubmit = event => {
      event.preventDefault();
    };

    render() {
      return (
        <div>
          <AppNav/>
          <Container>
            <form onSubmit={this.handleSubmit} className="loginPageBlock">
              {this.state.hasLoginFailed && "Login failed"}
              <h4 className="loginLabel">Email</h4>
              <FormGroup>
                <input
                  className="Login"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <h4 className="loginLabel">Password</h4>
              <FormGroup>
                <input
                  className="Login"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                className="Login"
                disabled={!this.validateForm()}
                onClick={this.loginClicked}
              >
                Login
              </Button>
            </form>
          </Container>
        </div>
      );
    }
  }
)