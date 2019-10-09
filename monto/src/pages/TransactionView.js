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

class TransactionView extends React.Component {
  addingIncome;

  values = {
    description: "",
    date: new Date(),
    sum: ""
  };

  componentDidMount() {
    this.props.transactions.load();
  }

  render() {
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
                  <select className="form-control" onChange={this.handleChange}></select>
                  <Button size="sm" color="danger" onClick={() => this.editCategories()}>Edit</Button>
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="account">Account</Label>
                <div className="select-row">
                  <select className="form-control" onChange={this.handleChange}></select>
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

  handleSubmit = async event => {
    event.preventDefault();

    await this.props.transactions.add(this.values.description, this.values.date, this.addingIncome ? this.values.sum : -this.values.sum);
    this.addingIncome = undefined;
  };
}

decorate(TransactionView, {
  addingIncome: observable,
  values: observable
});

export default inject("transactions")(observer(TransactionView));