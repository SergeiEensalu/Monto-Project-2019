import React, { Component } from "react";
import AppNav from "../AppNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import {
  Table,
  Container,
  Input,
  Button,
  Label,
  FormGroup,
  Form
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Incomes extends Component {
  emptyItem = {
    description: "",
    incomeDate: new Date(),
    id: 104,
    sum: 0.0,
    category: { id: 1, name: "Travel" }
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      Categories: [],
      Incomes: [],
      date: new Date(),
      item: this.emptyItem
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  async handleSubmit(event) {
    const item = this.state.item;

    await fetch(`/api/incomes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    event.preventDefault();
    this.props.history.push("/incomes");
  }

  handleCategoryChange(event) {
    const text = event.target.options[event.target.selectedIndex].text;
    const value = event.target.value;
    let item = { ...this.state.item };
    item["category"] = { id: value, name: text };
    this.setState({ item });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.incomeDate = date;
    this.setState({ item });
  }

  async remove(id) {
    await fetch(`/api/incomes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let updatedIncomes = [...this.state.Incomes].filter(i => i.id !== id);
      this.setState({ Incomes: updatedIncomes });
    });
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });

    const responseExp = await fetch("/api/incomes");
    const bodyExp = await responseExp.json();
    this.setState({ Incomes: bodyExp, isLoading: false });
  }

  render() {
    const title = <h3>Add Income</h3>;
    const { Categories } = this.state;
    const { Incomes, isLoading } = this.state;

    if (isLoading) return <div>Loading....</div>;

    let optionList = Categories.map(category => (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    ));

    let rows = Incomes.map(income => (
      <tr key={income.id}>
        <td>{income.description}</td>
        <td>{income.sum}</td>
        <td>
          <Moment date={income.incomeDate} format="YYYY/MM/DD" />
        </td>
        <td>{income.category.name}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(income.id)}
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
            </FormGroup>

            <FormGroup>
              <Label for="date">Date</Label>
              <DatePicker
                selected={this.state.item.incomeDate}
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
          <h3>Income List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Description</th>
                <th width="10%">Sum</th>
                <th> Date</th>
                <th> Category</th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
        }
      </div>
    );
  }
}

export default Incomes;
