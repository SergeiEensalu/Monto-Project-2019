import React, {Component} from "react";
import {Button, Container, FormGroup, Label} from "reactstrap";
import AuthenticationService from '../authentication/AuthenticationService';
import "../index.css";
import AppNav from ".//AppNav";
import swal from 'sweetalert';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }


    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push("/dashboard")
            }).catch(() => {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
            swal({
                type: 'error',
                title: 'Oi!',
                text: 'Something went wrong! Try again!',
            });
        })
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

                            <h4 className="loginLabel">Email</h4>
                            <FormGroup>
                                <input className="Login" type="username" name="username" value={this.state.username}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <h4 className="loginLabel">Password</h4>
                            <FormGroup>
                                <input className="Login" type="password" name="password" value={this.state.password}
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <Button className="Login"
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