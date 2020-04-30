import {
    Alert,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from "reactstrap";
import React, { useEffect, useState } from "react";

import Select from "react-select";
import _ from "lodash";

const ExpenseComponent = (props) => {
    return (
        <>
            <AddExpenseModal {...props} />
            <ExpensesTable {...props} />
        </>
    )
};


const AddExpenseModal = (props) => {
    const [open, setModal] = useState(false);
    const [expenseType, setExpenseType] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseDescription, setExpenseDescription] = useState("");
    const [expenseAccount, setExpenseAccount] = useState("");
    const [formValidation, setFormValidation] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const toggle = () => {
        setModal(!open);
        setExpenseType("");
        setExpenseAmount(0);
        setExpenseDescription("");
        setExpenseAccount("");
        setFormSubmitted(false);
        if (formValidation) {
            setFormValidation(!formValidation);
        }
    };

    // Listen for props changes on formErrors
    useEffect(() => {
        // if the props has any errors in it, then show errors.
        if (props.formErrors.expenseErrors !== undefined) {
            setFormValidation(true)
        }
        // If the props has no error in it and the form was submitted then don't show any errors
        // And close the modal
        else if (props.formErrors.expenseErrors === undefined && formSubmitted) {
            setFormValidation(false);
            toggle();
        }
    }, [props.formErrors]);

    const addExpense = () => {
        setFormSubmitted(true);
        props.addExpense({
            expense_type_id: expenseType,
            expense_amount: Number(expenseAmount),
            account_id: expenseAccount,
            description: expenseDescription
        })
    }

    return (
        <Row>
            <Col sm="12">
                <Button
                    color="info" onClick={toggle} size="sm" outline={true} className="float-right mr-5"
                >
                    Add Expense
                </Button>
                <Modal isOpen={open} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Expense</ModalHeader>
                    <ModalBody>
                        {formValidation && props.formErrors.expenseErrors !== undefined &&
                            <Alert color="danger" isOpen={formValidation}>
                                {props.formErrors.expenseErrors}
                            </Alert>
                        }
                        <Form>
                            <FormGroup>
                                <Label>Expense Type</Label>
                                <Select placeholder="Expense Type"
                                    onChange={e => setExpenseType(e.value)}
                                    options={_.map(props.expense_types, (expense) => {
                                        return { value: expense.ID, label: expense.name }
                                    })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Expense Amount</Label>
                                <Input type="number" placeholder="Amount" onChange={e => setExpenseAmount(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Expense Description</Label>
                                <Input type="text" placeholder="Description" onChange={e => setExpenseDescription(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Expense From Account</Label>
                                <Select placeholder="Account"
                                    onChange={e => setExpenseAccount(e.value)}
                                    options={_.map(props.accounts, (account) => {
                                        return { value: account.ID, label: account.name }
                                    })}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            size="sm"
                            outline={true}
                            className="float-right"
                            onClick={addExpense}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </Col>
        </Row>
    )
}

const ExpensesTable = (props) => (
    <Row className={"mt-3 ml-5 mr-5 mb-5"}>
        <Table hover responsive bordered>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Expense On</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Account</th>
                </tr>
            </thead>
            <tbody>
                {_.map(props.expenses, (expense, index) => {
                    return (
                        <tr key={expense.ID}>
                            <td>{index + 1}</td>
                            <td>{expense.ExpenseType.name}</td>
                            <td className="text-right">{expense.amount}</td>
                            <td>{expense.Description}</td>
                            <td>{expense.Account.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </Row>
);

export default ExpenseComponent;