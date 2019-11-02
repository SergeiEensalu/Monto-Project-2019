import React from "react";
import { inject, observer } from "mobx-react";
import AppNav from "../AppNav";
import "./Transactions.css";
import { decorate, observable } from "mobx";
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
import { FileService } from "../fileUploading/FileService";

import "react-datepicker/dist/react-datepicker.css";

import { Button } from "tabler-react";
import "tabler-react/dist/Tabler.css";

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
      categoriesEdit: false,
      accountEdit: false
    };
    this.fileService = new FileService();
    this.editCategories = this.editCategories.bind(this);
    this.editAccounts = this.editAccounts.bind(this);
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
      // If transactions are still being loaded
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
                <input type="file" onChange={this.handleUploadFile} />
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
                  <td>{transaction.sum}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.date}</td>
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
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal
            isOpen={this.addingIncome !== undefined}
            className={this.props.className}
          >
            <Form onSubmit={this.handleSubmit} noValidate>
              <ModalHeader toggle={this.hideModal}>
                {this.addingIncome ? "Add income" : "Add expense"}
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
                <Button
                  color="secondary"
                  onClick={() => (this.addingIncome = undefined)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Container>
      </>
    );
  }

  handleUploadFile = event => {
    const formData = new FormData();
    let file = event.target.files[0];
    formData.append("file", file);
    this.fileService
      .uploadFileToServer(formData)
      .then(response => {
        console.log("File " + file.name + " is uploaded");
        this.props.transactions.load();
        this.props.categories.load();
        this.props.accounts.load();
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          console.log(
            "Upload error. HTTP error/status code=",
            error.response.status
          );
        } else {
          console.log("Upload error. HTTP error/status code=", error.message);
        }
      });
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
  };
}

decorate(TransactionView, {
  addingIncome: observable,
  values: observable
});

export default inject("transactions", "categories", "accounts")(
  observer(TransactionView)
);
