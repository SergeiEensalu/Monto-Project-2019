import React from "react";
import AppNav from "../AppNav";
import {Button, Container, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import {inject, observer} from "mobx-react";

class UserSettingsPage extends React.Component {


    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            changePassword: undefined,

            password: "",
            passwordError: false,

            repeatedPassword: "",
            repeatedPasswordError: false,

            repeatedPassword2: "",
            repeatedPasswordError2: false
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            passwordError: "",
            repeatedPasswordError: "",
            repeatedPasswordError2: ""
        });
    }

    hideModal = () => {
        this.setState({
            changePassword: undefined
        })
        this.clearValues();
    };

    clearValues = () => {
        this.setState({
            password: "",
            passwordError: false,

            repeatedPassword: "",
            repeatedPasswordError: false,

            repeatedPassword2: "",
            repeatedPasswordError2: false
        })
    }

    handleSubmit = async event => {

        event.preventDefault();

        if (this.state.password.length < 8) {
            this.setState({
                passwordError: "Password must be at least 8 characters long"
            });
            return;
        }

        if (this.state.repeatedPassword.length < 8) {
            this.setState({
                repeatedPasswordError: "Password must be at least 8 characters long"
            });
            return;
        }

        if (this.state.repeatedPassword2.length < 8) {
            this.setState({
                repeatedPasswordError2: "Password must be at least 8 characters long"
            });
            return;
        }

        if (this.state.repeatedPassword !== this.state.repeatedPassword2) {
            this.setState({
                repeatedPasswordError: "Entered passwords do not match.",
            });
            return;
        }
        if ((this.state.password === this.state.repeatedPassword)) {
            this.setState({
                passwordError: "Old password the same as new password",
            });
            return;
        }

        var email = this.props.auth.sesstionEmail;

        const status = await this.props.auth.update(email, this.state.password, this.state.repeatedPassword);

        this.clearValues();

        if (status !== undefined) {
            this.setState({
                passwordError: "Entered credentials are invalid.",

            });
        } else {
            this.setState({
                changePassword: undefined,
            });
            setTimeout(() => {
                alert("Password changed successfully.")
            }, 10);
        }

    };


    render() {
        return (
            <>
                <AppNav/>
                <Container className="col-md-4 mt-5">
                    <h1 className="wrapper"> User settings page </h1>
                    <div className="wrapper">
                        <div>
                            <h4>Password</h4>
                        </div>
                        <div>
                            <Button
                                size="sm"
                                icon="plus"
                                onClick={() => this.setState({changePassword: true})}
                            >
                                change password
                            </Button>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div>
                            <h4>Username</h4>
                        </div>
                        <div>
                            <Button
                                size="sm"
                                icon="plus"
                                // onClick={() => this.setState({changePassword: true})}
                            >
                                change username
                            </Button>
                        </div>
                    </div>
                </Container>
                <Modal
                    isOpen={this.state.changePassword !== undefined}
                    toggle={this.hideModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.hideModal}>
                        Change password
                    </ModalHeader>

                    <ModalBody>
                        <Form noValidate={true} onSubmit={this.handleSubmit}>
                            {this.state.passwordError &&
                            <FormText color="danger">{this.state.passwordError}</FormText>}

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="password"
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                />

                            </FormGroup>

                            <FormGroup>
                                <Label for="repeatedPassword">new password</Label>
                                <Input type="password" name="repeatedPassword" id="repeatedPassword"
                                       placeholder="new password"
                                       value={this.state.repeatedPassword}
                                       onChange={this.handleChange}
                                />
                                {this.state.repeatedPasswordError &&
                                <FormText color="danger">{this.state.repeatedPasswordError}</FormText>}
                            </FormGroup>

                            <FormGroup>
                                <Label for="repeatedPassword2">Repeat new password</Label>
                                <Input type="password" name="repeatedPassword2" id="repeatedPassword2"
                                       placeholder="repeat new password"
                                       value={this.state.repeatedPassword2}
                                       onChange={this.handleChange}
                                />
                                {this.state.repeatedPasswordError2 &&
                                <FormText color="danger">{this.state.repeatedPasswordError2}</FormText>}
                            </FormGroup>

                            <Button color="primary" block>Change password</Button>

                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}


export default inject("auth")(observer(UserSettingsPage));

