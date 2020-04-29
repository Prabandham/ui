import {
    Alert,
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import React, { useEffect, useState } from "react";

import _ from "lodash";

const ConfigComponent = (props) => {
    return (
        <Row>
            <Col md={3}>
                <IncomeSources {...props} />
            </Col>
            <Col md={9}>
                <Accounts {...props} />
            </Col>
        </Row>
    )
};

const IncomeSources = (props) => {
    const [input, setInput] = useState('');
    const onButtonClick = () => {
        props.addIncomeSource(input);
        setInput("");
    };
    return (
        <>
            <h4 className={"text-muted"}>
                Income Sources
            </h4>
            <hr />

            <InputGroup>
                <Input placeholder="Input Source" value={input} onChange={e => setInput(e.target.value)} />
                <InputGroupAddon addonType="append">
                    <InputGroupText onClick={onButtonClick}>Add</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <FormFeedback style={{ display: props.formErrors.incomeSourceErrors === undefined ? "none" : "block" }}>{props.formErrors.incomeSourceErrors}</FormFeedback>
            <ListGroup className="mt-4">
                {_.map(props.incomeSources, (type) => {
                    return (
                        <ListGroupItem className={"justify-content-between"} key={type.ID}>
                            {type.name}
                            <i className="fa fa-trash float-right" onClick={() => alert("TODO implement")}></i>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </>
    )
}

const Accounts = (props) => {
    return (
        <>
            <h4 className={"text-muted"}>
                Accounts
                </h4>
            <hr />
            <Row>
                <Col>
                    <AddAccountModal {...props} />
                </Col>
            </Row>
            <Row className="mt-4 mb-5">
                <Col>
                    <ListGroup>
                        {_.map(props.accounts, (account) => {
                            return (
                                <ListGroupItem className={"justify-content-between"} key={account.ID}>
                                    {account.name}
                                    <span className="text-muted"> ({account.balance})</span>
                                    <i className="fa fa-trash float-right" onClick={() => alert("TODO implement")}></i>
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
};

const AddAccountModal = (props) => {
    const [open, setModal] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    const [accountIfsc, setAccountIfsc] = useState("");
    const [formValidation, setFormValidation] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const toggle = () => {
        setModal(!open);
        setFormSubmitted(false);
        if (formValidation) {
            setFormValidation(!formValidation);
        }
    }
    const onAddAccountClick = () => {
        setFormSubmitted(true);
        const params = {
            name: accountName,
            address: accountAddress,
            balance: Number(accountBalance),
            ifsc_code: accountIfsc
        }
        props.addAccount(params)
    }

    // Listen for props changes on formErrors
    useEffect(() => {
        // if the props has any errors in it, then show errors.
        if (props.formErrors.accountErrors !== undefined) {
            setFormValidation(true)
        }
        // If the props has no error in it and the form was submitted then don't show any errors
        // And close the modal
        else if (props.formErrors.accountErrors === undefined && formSubmitted) {
            setFormValidation(false);
            toggle();
        }
    }, [props.formErrors]);

    return (
        <>
            <Button
                className="float-right"
                size="md"
                color="info"
                outline={true}
                onClick={toggle}
            >
                Add Account
            </Button>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Expense</ModalHeader>
                <ModalBody>
                    {formValidation && props.formErrors.accountErrors !== undefined &&
                        <Alert color="danger" isOpen={formValidation}>
                            {props.formErrors.accountErrors}
                        </Alert>
                    }
                    <Form>
                        <FormGroup>
                            <Label>Account Name</Label>
                            <Input type="text" placeholder="Name of Account" onChange={e => setAccountName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="text" placeholder="Address" onChange={e => setAccountAddress(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Balance</Label>
                            <Input type="number" placeholder="Opening Balance" onChange={e => setAccountBalance(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>IFSC</Label>
                            <Input type="text" placeholder="IFSC CODE" onChange={e => setAccountIfsc(e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        size="sm"
                        outline={true}
                        className="float-right"
                        onClick={onAddAccountClick}
                    >
                        Add
                        </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ConfigComponent;