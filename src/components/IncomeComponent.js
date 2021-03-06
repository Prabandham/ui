import "react-datepicker/dist/react-datepicker.css";

import {
    Alert,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
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

const IncomeComponent = (props) => {
    const { incomeSources } = props;
    return (
        <>
            {incomeSources.length === 0 ?
                (
                    <h4 className={"text-center text-muted"}>
                        You have not configured any Source of income or Accounts yet,
                        Please configure them in the Config tab.
                    </h4>
                )
                :
                (
                    <>
                        <AddIncomeForm {...props} />
                        <Incomes {...props} />
                    </>
                )
            }
        </>
    )
};

const AddIncomeForm = (props) => {
    const [open, setModal] = useState(false);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState(0);
    const [account, setAccount] = useState("");
    const [formValidation, setFormValidation] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const toggle = () => {
        setModal(!open);
        setSource("");
        setAmount(0);
        setAccount("");
        setFormSubmitted(false);
        if (formValidation) {
            setFormValidation(!formValidation);
        }
    }

    // Listen for props changes on formErrors
    useEffect(() => {
        // if the props has any errors in it, then show errors.
        if (props.formErrors.incomeErrors !== undefined) {
            setFormValidation(true)
        }
        // If the props has no error in it and the form was submitted then don't show any errors
        // And close the modal
        else if (props.formErrors.inomeErrors === undefined && formSubmitted) {
            setFormValidation(false);
            toggle();
        }
    }, [props.formErrors]);

    const addIncome = () => {
        setFormSubmitted(true);
        props.addIncome({
            income_source_id: source,
            amount: Number(amount),
            account_id: account
        })
    }

    return (
        <Row>
            <Col>
                <Button
                    color="info" onClick={toggle} size="sm" outline={true} className="float-right mr-5"
                >
                    Add Income
                </Button>
                <Modal isOpen={open} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Income</ModalHeader>
                    <ModalBody>
                        {formValidation && props.formErrors.incomeErrors !== undefined &&
                            <Alert color="danger" isOpen={formValidation}>
                                {props.formErrors.incomeErrors}
                            </Alert>
                        }
                        <Form>
                            <FormGroup>
                                <Select
                                    placeholder="Source of Income"
                                    options={_.map(props.incomeSources, (source) => { return { value: source.ID, label: source.name } })}
                                    onChange={e => setSource(e.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                            </FormGroup>
                            {/* <FormGroup>
                                <Label>Received On</Label>
                                <DatePicker selected={receivedOn} onChange={e => { setReceivedOn(e) }} />
                            </FormGroup> */}
                            <FormGroup>
                                <Select
                                    placeholder="Account"
                                    options={_.map(props.accounts, (account) => { return { value: account.ID, label: account.name } })}
                                    onChange={e => setAccount(e.value)}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="info"
                            className="btn-sm float-right"
                            onClick={addIncome}
                            outline={true}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </Modal>
            </Col>
        </Row>
    )
};

const Incomes = (props) => {
    return (
        <Row className={"mt-3 ml-5 mr-5 mb-5"}>
            <Table hover responsive bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Account</th>
                        <th>Received On</th>
                    </tr>
                </thead>
                <tbody>
                    {_.map(props.incomes, (income, index) => {
                        return (
                            <tr key={income.ID}>
                                <td>{index + 1}</td>
                                <td>{income.IncomeSource.name}</td>
                                <td className="text-right">{income.amount}</td>
                                <td>{income.Account.name}</td>
                                <td>{income.created_at}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Row>
    )
}

export default IncomeComponent;
