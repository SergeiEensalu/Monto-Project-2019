import React, { Component } from "react";
import AppNav from "../AppNav";
import CategoriesView from "./CategoriesView";
import AccountsView from "./AccountsView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Table
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Expenses extends Component {
    emptyItem = {
        description: "",
        expensedate: new Date(),
        id: 104,
        sum: 0.0,
        category: { id: 1, name: "Travel" },
        account: {id: 1, name: "Swed", type: "b"}
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            Categories: [],
            Accounts: [],
            Expenses: [],
            date: new Date(),
            item: this.emptyItem,

            categoriesEdit: false,
            accountEdit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);

        this.editCategories = this.editCategories.bind(this);
        this.editAccounts = this.editAccounts.bind(this);
    }

    editCategories() {
        this.setState({categoriesEdit: !this.state.categoriesEdit});
    }

    editAccounts() {
        this.setState({accountsEdit: !this.state.accountsEdit});
    }

    async handleSubmit(event) {
        const item = this.state.item;

        await fetch(`/api/expenses`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        event.peventDefault();
        this.props.history.push("/expenses");
    }

    handleCategoryChange(event) {
        // const text = event.target.options[event.target.selectedIndex].text;
        // const value = event.target.value;
        // let item = { ...this.state.item };
        // item["category"] = { id: value, name: text };
        // this.setState({ item });
        let item = { ...this.state.item };
        item.category = this.state.Categories[event.target.value];
        this.setState({item});
    }

    handleAccountChange(event) {
        let item = { ...this.state.item };
        item.account = this.state.Accounts[event.target.value];
        this.setState({item});
        console.log(item);
        console.log(this.state);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
        console.log(target);
        console.log(name);
        console.log(value);
        console.log(item);
    }

    handleDateChange(date) {
        let item = { ...this.state.item };
        item.expensedate = date;
        this.setState({ item });
        console.log(item);
    }

    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(() => {
            let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({ Expenses: updatedExpenses });
        });
    }

    async componentDidMount() {
        const response = await fetch("/api/categories");
        const body = await response.json();
        this.setState({ Categories: body, isLoading: false });

        const responseAcc = await fetch("/api/accounts");
        const bodyAcc = await responseAcc.json();
        this.setState({ Accounts: bodyAcc, isLoading: false });

        const responseExp = await fetch("/api/expenses");
        const bodyExp = await responseExp.json();
        this.setState({ Expenses: bodyExp, isLoading: false });
        console.log(bodyExp);
    }

    render = props => {
        const title = <h3>Add Expense</h3>;
        const { Categories } = this.state;
        const { Accounts } = this.state;
        const { Expenses, isLoading } = this.state;

        if (isLoading) return <div>Loading....</div>;

        if (this.state.categoriesEdit) {
            return <div> <CategoriesView editCategories = {this.editCategories}/> </div>
        }

        if (this.state.accountsEdit) {
            return <div> <AccountsView editAccounts = {this.editAccounts}/> </div>
        }

        let optionList = Categories.map(category => (
            <option value={Categories.indexOf(category)} key={category.id}>
                {category.name}
            </option>
        ));

        let accountList = Accounts.map(account => (
            <option value={Accounts.indexOf(account)} key={account.id}>
                {account.name}
            </option>
        ));

        let rows = Expenses.map(expense => (
            <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.sum}</td>
                <td>
                    <Moment date={expense.expensedate} format="YYYY/MM/DD" />
                </td>
                <td>{expense.category.name}</td>
                <td>{expense.account.name}</td>
                <td>
                    <Button
                        size="sm"
                        color="danger"
                        onClick={() => this.remove(expense.id)}
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
                    {title}

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Title</Label>
                            <Input
                                type="description"
                                name="description"
                                id="description"
                                onChange={this.handleChange}
                                autoComplete="name"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select onChange={this.handleCategoryChange}>{optionList}</select>
                            <Button size="sm" color="danger" onClick={() => this.editCategories()}>
                            {/*<Button size="sm" color="danger" tag={Link} to="/categories">*/}
                                Edit
                            </Button>
                        </FormGroup>

                        <FormGroup>
                            <Label for="account">Account</Label>
                            <select onChange={this.handleAccountChange}>{accountList}</select>
                            <Button size="sm" color="danger" onClick={() => this.editAccounts()}>
                            {/*<Button size="sm" color="danger" tag={Link} to="/accounts">*/}
                                Edit
                            </Button>
                        </FormGroup>

                        <FormGroup>
                            <Label for="date">Date</Label>
                            <DatePicker
                                selected={this.state.item.expensedate}
                                onChange={this.handleDateChange}
                            />
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="sum">Sum</Label>
                                <Input
                                    type="text"
                                    name="sum"
                                    id="sum"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
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
                {""}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Description</th>
                            <th width="10%">Sum</th>
                            <th> Date</th>
                            <th> Category</th>
                            <th> Account</th>
                            <th width="10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Container>
                }
            </div>
        );
    };
}
export default Expenses;
