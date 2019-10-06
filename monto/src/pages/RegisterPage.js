import React, {Component} from "react";
import "../index.css";
import AppNav from "../AppNav";
import {Button, Container, FormGroup} from "reactstrap";
import {inject} from "mobx-react";


export default inject("auth")(class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password2: "",
      showErrorUserExist: false,
      showErrorMessage: false
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handlePost = async e => {
    e.preventDefault();

    const status = await this.props.auth.register(this.state.email, this.state.password);

    if (status === 409 /* Conflict */) {
      this.setState({...this.state, showErrorUserExists: true})
    }
  };

  validateForm() {
    return this.state.email.length > 0 &&
      this.state.password.length >= 8 &&
      this.state.password === this.state.password2;
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    )
  }

  render() {
    return (
      <div>
        <AppNav/>
        <Container>
          <form className="loginPageBlock" onSubmit={this.handlePost}>
            <h4 className="loginLabel">Email</h4>
            <FormGroup>
              <input className="Login" type="email" name="email"
                     onChange={this.handleChange}/>
            </FormGroup>

            {this.state.password !== this.state.password2 &&
            <label className="passwordError">Passwords did not match</label>}

            <h4 className="loginLabel">Password</h4>
            <FormGroup>
              <input className="Login" type="password" name="password"
                     onChange={this.handleChange}/>
            </FormGroup>
            <h4 className="loginLabel">Password x2</h4>
            <FormGroup>
              <input className="Login" type="password" name="password2"
                     onChange={this.handleChange}/>
            </FormGroup>
            <Button
              disabled={!this.validateForm()}
              className="Login" type="submit">
              register
            </Button>
          </form>
        </Container>
      </div>
    );
  }
});