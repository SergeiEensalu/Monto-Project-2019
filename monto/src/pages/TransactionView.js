import React from "react";
import { inject, observer } from "mobx-react";
import AppNav from "../AppNav";
import "./TransactionsView.css"
import { decorate, observable } from "mobx";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import CategoriesView from "./CategoriesView";
import AccountsView from "./AccountsView";
import {Client} from "../util/client";

class TransactionView extends React.Component {
  addingIncome;

  values = {
    description: "",
    date: new Date(),
    sum: "",
    category: null,
    account: null
  };

  constructor(props) {
    super(props);

    this.state = {
      Categories: [],
      Accounts: [],

      categoriesEdit: false,
      accountEdit: false
    };

    this.editCategories = this.editCategories.bind(this);
    this.editAccounts = this.editAccounts.bind(this);
  }

  editCategories() {
    this.setState({categoriesEdit: !this.state.categoriesEdit});
  }

  editAccounts() {
    this.setState({accountsEdit: !this.state.accountsEdit});
  }

  async componentDidMount() {
    await this.props.transactions.load();
    const {json: Categories} = await Client.get("/api/categories");
    const {json: Accounts} = await Client.get("/api/accounts");
    this.setState({Categories, Accounts, });
  }

  render() {
    const {Categories} = this.state;
    const {Accounts} = this.state;

    if (this.state.categoriesEdit) {
      return <div><CategoriesView editCategories={this.editCategories}/></div>
    }

    if (this.state.accountsEdit) {
      return <div><AccountsView editAccounts={this.editAccounts}/></div>
    }

    let categoryList = Categories.map(category => (
        <option value={Categories.indexOf(category)} key={category.id}>
          {category.name}
        </option>
    ));

    let accountList = Accounts.map(account => (
        <option value={Accounts.indexOf(account)} key={account.id}>
          {account.name}
        </option>
    ));

    return <>
      <AppNav/>
      <Container>
        <button className="button-icon" onClick={() => this.addingIncome = true}>+</button>
        <button className="button-icon" onClick={() => this.addingIncome = false}>-</button>

        <Table>
          {this.props.transactions.transactions.map(transaction => <tr key={transaction.id}>
            <td>{transaction.sum}</td>
            <td>{transaction.description}</td>
            <td>{transaction.date}</td>
            <td>{transaction.account ? transaction.account.name : "No account"}</td>
            <td>{transaction.category ? transaction.category.name : "No category"}</td>
            <td>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.props.transactions.delete(transaction)}
              >
                Delete
              </Button>
            </td>
          </tr>)}
        </Table>

        <Modal isOpen={this.addingIncome !== undefined} toggle={this.hideModal} className={this.props.className}>
          <Form onSubmit={this.handleSubmit} noValidate>
            <ModalHeader toggle={this.hideModal}>{this.addingIncome ? "Add income" : "Add expense"}</ModalHeader>

            <ModalBody>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={this.values.description}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="category">Category</Label>
                <div className="select-row">
                  <select onChange={this.handleCategoryChange}>
                    <option selected value={-1}>No category</option>
                    {categoryList}
                  </select>
                  <Button size="sm" color="danger" onClick={() => this.editCategories()}>Edit</Button>
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="account">Account</Label>
                <div className="select-row">
                  <select onChange={this.handleAccountChange} defaultValue={""}>
                    <option selected value={-1}>No account</option>
                    {accountList}
                  </select>
                  <Button size="sm" color="danger" onClick={() => this.editAccounts()}>Edit</Button>
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="date">Date</Label>
                <div className="select-row">
                  <DatePicker className="form-control" onChange={this.handleDateChange} selected={this.values.date}/>
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="sum">Sum</Label>
                <Input
                  type="number"
                  name="sum"
                  id="sum"
                  value={this.values.sum}
                  onChange={this.handleChange}
                />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    </>
  }

  hideModal = () => {
    this.addingIncome = undefined;
  };

  handleChange = event => {
    this.values[event.target.name] = event.target.value;
  };

  handleDateChange = date => {
    this.values.date = date;
  };

  handleCategoryChange = event => {
    this.values.category = this.state.Categories[event.target.value];
  }

  handleAccountChange = event => {
    this.values.account = this.state.Accounts[event.target.value];
  }

  handleSubmit = async event => {
    event.preventDefault();

    await this.props.transactions.add(this.values.description, this.values.date, this.addingIncome ? this.values.sum : -this.values.sum,
        this.values.category, this.values.account);
    this.addingIncome = undefined;
  };
}

decorate(TransactionView, {
  addingIncome: observable,
  values: observable
});

export default inject("transactions")(observer(TransactionView));