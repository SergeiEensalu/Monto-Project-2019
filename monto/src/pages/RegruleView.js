import React, { Component } from "react";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Table,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import AppNav from "../AppNav";
import {decorate, observable} from "mobx";
import {inject, observer} from "mobx-react";

class RegrulesView extends Component {
    values = {
        id: 105,
        reg: "",
        category: null
    };

    addingRegrule = false;
    isEditing = false;
    editableRegrule = null;

    componentDidMount() {
        this.props.regrules.load();
        this.props.categories.load();
    }

    handleSubmit = async event => {
        event.preventDefault();
        await this.props.regrules.add(
            this.values.reg,
            this.values.category
        );
        this.hideModal();
    };

    handleUpdate = async event => {
        event.preventDefault();

        this.editableRegrule.reg = this.values.reg;
        this.editableRegrule.category = this.values.category;

        await this.props.regrules.update(this.editableRegrule);
        this.hideModal();
    };

    handleChange = event => {
        this.values[event.target.name] = event.target.value;
    };

    handleCategoryChange = event => {
        this.values.category = this.props.categories.categories[event.target.value];
    };

    hideModal = () => {
        this.addingRegrule = false;
        this.isEditing = false;

        this.values.reg = "";
        this.values.category = null;
    };

    render() {
        if (this.props.regrules.regrules === undefined) {
            return <AppNav></AppNav>;
        }

        let rows = this.props.regrules.regrules.map(regrule => (
            <tr key={regrule.id}>
                <td>{regrule.reg}</td>
                <td>{regrule.category}</td>
                <td>
                    <Button
                        size="sm"
                        color="danger"
                        onClick={() => this.props.regrules.delete(regrule)}
                    >
                        Delete
                    </Button>
                </td>
                <td>
                    <Button
                        size="sm"
                        onClick={() => {
                            this.editableRegrule = regrule;
                            this.isEditing = true;
                            this.values.name = this.editableRegrule.reg;
                            this.values.type = this.editableRegrule.category;
                        }}
                    >
                        Edit
                    </Button>
                </td>
            </tr>
        ));

        return (
            <div>
                <AppNav />
                <Container style={{width: 600, alignItems: 'center', justifyContent: 'center'}}>
                    <div>
                        <div>
                            <Button
                                color="success"
                                size="sm"
                                icon="plus"
                                onClick={() => (this.addingRegrule = true)}
                            >
                                Add regrule
                            </Button>
                        </div>
                    </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th> Regrule</th>
                            <th> Type</th>
                            <th width="10%"></th>
                            <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                    <Modal
                        isOpen={this.addingRegrule || this.isEditing}
                        toggle={this.hideModal}
                        className={this.props.className}
                    >
                        <Form onSubmit={this.isEditing ? this.handleUpdate : this.handleSubmit} noValidate>
                            <ModalHeader toggle={this.hideModal}>
                                {this.isEditing ? "Add new regrule" : "Edit the regrule"}
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.values.name}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="type">Type</Label>
                                    <Input
                                        type="text"
                                        name="type"
                                        id="type"
                                        value={this.values.type}
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
                                    onClick={() =>
                                        this.hideModal()
                                    }
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                    <div>
                        <Button
                            color="success"
                            size="sm"
                            icon="plus"
                            onClick={this.props.editRegrules}
                        >
                            Go back
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

decorate(RegrulesView, {
    addingRegrule: observable,
    isEditing: observable,
    values: observable
});

export default inject("regrules", "categories")(
    observer(RegrulesView)
);