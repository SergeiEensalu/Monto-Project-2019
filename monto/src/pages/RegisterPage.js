import React, {Component} from "react";
import "../index.css";
import AppNav from "../AppNav";
import {Button, Container, FormGroup} from "reactstrap";
import swal from "sweetalert";


export default class RegisterPage extends Component {
    emptyUser = {
        username: "",
        password: "",
        firstname: "",
        lastname: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            firstname: "",
            lastname: "",
            showErrorUserExist: false,
            showErrorMessage: false,
            user: this.emptyUser
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handlePost = e => {

        e.preventDefault();

        this.state.user.firstname = this.state.firstname;
        this.state.user.lastname = this.state.lastname;
        this.state.user.password = this.state.password;
        this.state.user.username = this.state.username;

        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.user),
        };

        fetch("/api/register", opts)
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                console.log("response : ", response);
                if (!response.ok) {
                    this.setState({
                        showErrorUserExist: true
                    });
                    swal({
                        type: 'error',
                        title: 'No way :(',
                        text: 'User already exist! Try another username!',
                    });
                } else {
                    this.setState({
                            username: "",
                            password: "",
                            password2: "",
                            firstname: "",
                            lastname: "",
                        }
                    );
                    swal({
                        type: 'info',
                        title: 'Jehuuuuuuuuu :В',
                        text: 'You are registered successfully',
                    })

                    this.props.history.push("/login")
                }
            })
    };

    validateForm() {
        return this.state.username.length > 0 && this.validatePassword() && this.state.firstname.length > 0 && this.state.lastname.length > 0;
    }

    validatePassword() {
        if (this.state.password === this.state.password2) {
            return true;
        } else {
            return false;
        }
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


                        <h4 className="loginLabel">username(email)</h4>
                        <FormGroup>

                            <input className="Login" type="username" name="username" value={this.state.username}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        {!this.validatePassword() && <label className="passwordError">Passwords did not match</label>}

                        <h4 className="loginLabel">Password</h4>
                        <FormGroup>
                            <input className="Login" type="password" name="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <h4 className="loginLabel">Password x2</h4>
                        <FormGroup>
                            <input className="Login" type="password" name="password2" value={this.state.password2}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <h4 className="loginLabel">Firstname</h4>
                        <FormGroup>
                            <input className="Login" type="firstname" name="firstname" value={this.state.firstname}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <h4 className="loginLabel">Lastname</h4>
                        <FormGroup>
                            <input className="Login" type="lastname" name="lastname" value={this.state.lastname}
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
}