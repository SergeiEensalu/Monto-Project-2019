import React, {Component} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import AuthenticationService from './AuthenticationService';
import "./index.css";
import AppNav from "./AppNav";

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
        })
    }


    handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <AppNav/>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        {this.state.showSuccessMessage && <div className="alert alert-warning">Login Sucessful</div>}
                        <Label>Email</Label>
                        <FormGroup>
                            <input type="username" name="username" value={this.state.username}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <Label>Password</Label>
                        <FormGroup>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <Button
                            disabled={!this.validateForm()}
                            onClick={this.loginClicked}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}