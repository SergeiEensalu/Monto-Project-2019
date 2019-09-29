import React, { Component } from "react";
import AppNav from "../AppNav";
import {Button, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";
import {Link} from "react-router-dom";

class Categories extends Component {
  emptyItem = {
    id: 105,
    name: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      Categories: [],
      item: this.emptyItem
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/categories");
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });
  }

  async remove(id) {
    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let updatedCategories = [...this.state.Categories].filter(i => i.id !== id);
      this.setState({Categories: updatedCategories});
    });
  }

  async handleSubmit(event) {
    const item = this.state.item;

    console.log(item);

    await fetch(`/api/categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });

    event.peventDefault();
    this.props.history.push("/categories");
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
    const { Categories, isLoading } = this.state;
    if (isLoading) return <div>Loading...</div>;

    let rows = Categories.map(category => (

        <tr key={category.id}>
          <td>{category.name}</td>
          <td>
            <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(category.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
    ));

    return (
        <div>
          <Container>
            <AppNav />
            <h2>Categories</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Title</Label>
                <Input
                    type="text"
                    name="name"
                    id="name"
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
            <h3>Category List</h3>
            <Table className="mt-4">
              <thead>
              <tr>
                <th> Category</th>
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

export default Categories;
