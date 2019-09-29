import React, { Component } from "react";
import AppNav from "../AppNav";
import {Button, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import {Link} from "react-router-dom";

class Accounts extends Component {
    emptyItem = {
        id: 105,
        name: "",
        type: ""
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            Accounts: [],
            item: this.emptyItem
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/api/accounts");
        const body = await response.json();
        this.setState({ Accounts: body, isLoading: false });
    }

    async remove(id) {
        await fetch(`/api/accounts/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(() => {
            let updatedAccounts = [...this.state.Accounts].filter(i => i.id !== id);
            this.setState({Accounts: updatedAccounts});
        });
    }

    async handleSubmit(event) {
        const item = this.state.item;

        console.log(item);

        await fetch(`/api/accounts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        event.peventDefault();
        this.props.history.push("/accounts");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    render() {
        const { Accounts, isLoading } = this.state;
        if (isLoading) return <div>Loading...</div>;

        let rows = Accounts.map(account => (

            <tr key={account.id}>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>
                    <Button
                        size="sm"
                        color="danger"
                        onClick={() => this.remove(account.id)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));

        return (
            <div>
                <AppNav />
                <Container>

                    <h2>Accounts</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="type">Type</Label>
                            <Input
                                type="text"
                                name="type"
                                id="type"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">
                                Save
                            </Button>{" "}
                            <Button color="secondary" tag={Link} to="/">
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                </Container>
                <Container>
                    <h3>Account List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th> Account</th>
                            <th> Type</th>
                            <th width="10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Accounts;
