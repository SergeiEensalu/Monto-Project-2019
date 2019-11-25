import React from "react";
import { inject, observer } from "mobx-react";
import AppNav from "../AppNav";
import "./Transactions.css";
import { decorate, observable } from "mobx";
import Papa from "papaparse";
import {
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
import CategoriesView from "./CategoriesView";
import AccountsView from "./AccountsView";
import BankStatements from "./BankStatements";

import "react-datepicker/dist/react-datepicker.css";

import { Button } from "tabler-react";
import "tabler-react/dist/Tabler.css";

class TransactionView extends React.Component {
  addingIncome;
  isEditing = false;
  editableTransaction = null;

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
      categoriesEdit: false,
      accountEdit: false,
      fileUploading: false,
      bankStatements: [],
      fileFormat: null
    };
    this.editCategories = this.editCategories.bind(this);
    this.editAccounts = this.editAccounts.bind(this);
    this.generateBankStatements = this.generateBankStatements.bind(this);
  }

  editCategories() {
    this.setState({ categoriesEdit: !this.state.categoriesEdit });
  }

  editAccounts() {
    this.setState({ accountsEdit: !this.state.accountsEdit });
  }

  componentDidMount() {
    this.props.transactions.load();
    this.props.categories.load();
    this.props.accounts.load();
  }

  render() {
    if (this.props.transactions.transactions === undefined) {
      return <AppNav></AppNav>;
    }

    if (this.state.categoriesEdit) {
      return (
        <div>
          <CategoriesView editCategories={this.editCategories} />
        </div>
      );
    }

    if (this.state.accountsEdit) {
      return (
        <div>
          <AccountsView editAccounts={this.editAccounts} />
        </div>
      );
    }

    if (this.state.fileUploading) {
      return (
        <div>
          <BankStatements
            bankStatements={this.state.bankStatements}
            fileFormat={this.state.fileFormat}
          />
        </div>
      );
    }

    let categoryList = this.props.categories.categories.map(category => (
      <option
        value={this.props.categories.categories.indexOf(category)}
        key={category.id}
      >
        {category.name}
      </option>
    ));

    let accountList = this.props.accounts.accounts.map(account => (
      <option
        value={this.props.accounts.accounts.indexOf(account)}
        key={account.id}
      >
        {account.name}
      </option>
    ));

    return (
      <>
        <AppNav />
        <Container>
          <div className="wrapper">
            <div>
              <Button
                color="success"
                size="sm"
                icon="plus"
                onClick={() => (this.addingIncome = true)}
              >
                Add income
              </Button>
            </div>
            <div>
              <div>
                <Button
                  color="danger"
                  size="sm"
                  icon="minus"
                  onClick={() => (this.addingIncome = false)}
                >
                  Add expense
                </Button>
              </div>
            </div>
            <div>
              <Button
                className="upload-button"
                color="primary"
                size="sm"
                icon="upload"
              >
                Upload file
                <input type="file" onChange={this.handleFileUpload} />
              </Button>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Sum</th>
                <th>Description</th>
                <th>Date</th>
                <th>Account</th>
                <th>Category</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.transactions.transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    {new Intl.NumberFormat("eu-EE", {
                      style: "currency",
                      currency: "EUR"
                    }).format(transaction.sum)}
                  </td>
                  <td>{transaction.description}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>
                    {transaction.account
                      ? transaction.account.name
                      : "No account"}
                  </td>
                  <td>
                    {transaction.category
                      ? transaction.category.name
                      : "No category"}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() =>
                        this.props.transactions.delete(transaction)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        this.editableTransaction = transaction;
                        this.isEditing = true;
                        this.values.description = this.editableTransaction.description;
                        this.values.sum = this.editableTransaction.sum;
                        this.values.category = this.editableTransaction.category;
                        this.values.account = this.editableTransaction.account;
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal
            isOpen={this.addingIncome !== undefined || this.isEditing}
            toggle={this.hideModal}
            className={this.props.className}
          >
            <Form
              onSubmit={this.isEditing ? this.handleUpdate : this.handleSubmit}
              noValidate
            >
              <ModalHeader toggle={this.hideModal}>
                {this.getHeader()}
              </ModalHeader>

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
                    <select
                      onChange={this.handleCategoryChange}
                      className="form-control"
                    >
                      <option selected value={-1}>
                        No category
                      </option>
                      {categoryList}
                    </select>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => this.editCategories()}
                    >
                      Edit
                    </Button>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="account">Account</Label>
                  <div className="select-row">
                    <select
                      onChange={this.handleAccountChange}
                      defaultValue={""}
                      className="form-control"
                    >
                      <option selected value={-1}>
                        No account
                      </option>
                      {accountList}
                    </select>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => this.editAccounts()}
                    >
                      Edit
                    </Button>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="date">Date</Label>
                  <div className="select-row">
                    <DatePicker
                      className="form-control"
                      onChange={this.handleDateChange}
                      selected={this.values.date}
                    />
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
                <Button color="secondary" onClick={() => this.hideModal()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Container>
      </>
    );
  }

  handleFileUpload = event => {
    let file = event.target.files[0];
    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        complete: this.generateBankStatements,
        header: true
      });
    }
  };

  generateBankStatements(result) {
    let bankStatements = result.data;
    if (bankStatements[0].Selgitus === "Algsaldo") {
      bankStatements.shift();
    }
    if (bankStatements[bankStatements.length - 1].Selgitus === "lõppsaldo") {
      bankStatements.pop();
    }
    if (bankStatements[bankStatements.length - 1].Selgitus === "Käive") {
      bankStatements.pop();
    }
    this.setState({ fileFormat: "CSV" });
    this.setState({ bankStatements: bankStatements });
    this.setState({ fileUploading: true });
  }

  hideModal = () => {
    this.addingIncome = undefined;
    this.isEditing = false;
    this.editableTransaction = null;

    this.values.description = "";
    this.values.sum = "";
    this.values.account = null;
    this.values.category = null;
    this.values.date = new Date();
  };

  getHeader = () => {
    if (this.addingIncome !== undefined) {
      return this.addingIncome ? "Add income" : "Add expense";
    }
    return "Edit transaction";
  };

  handleChange = event => {
    this.values[event.target.name] = event.target.value;
  };

  handleDateChange = date => {
    this.values.date = date;
  };

  handleCategoryChange = event => {
    this.values.category = this.props.categories.categories[event.target.value];
  };

  handleAccountChange = event => {
    this.values.account = this.props.accounts.accounts[event.target.value];
  };

  handleUpdate = async event => {
    event.preventDefault();

    this.editableTransaction.description = this.values.description;
    this.editableTransaction.sum = this.values.sum;
    this.editableTransaction.account = this.values.account;
    this.editableTransaction.category = this.values.category;

    await this.props.transactions.update(this.editableTransaction);
    this.hideModal();
  };

  handleSubmit = async event => {
    event.preventDefault();

    let sum = Math.abs(this.values.sum);

    if (sum === 0) {
      alert("Sum cannot be 0");
    } else {
      await this.props.transactions.add(
        this.values.description,
        this.values.date,
        this.addingIncome ? sum : -sum,
        this.values.category,
        this.values.account
      );
      this.addingIncome = undefined;
    }
    this.hideModal();
  };
}

decorate(TransactionView, {
  isEditing: observable,
  addingIncome: observable,
  values: observable
});

export default inject(
  "transactions",
  "categories",
  "accounts"
)(observer(TransactionView));
