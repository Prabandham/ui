import "react-datepicker/dist/react-datepicker.css";

import {
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
    Row
} from "reactstrap";
import React, { memo, useState } from "react";

import DatePicker from "react-datepicker";
import Select from "react-select";
import _ from "lodash";

const IncomeComponent = (props) => {
    const { incomeSources } = props;
    return (
        <>
            {incomeSources.length === 0 ?
                (
                    <h4 className={"text-center text-muted"}>
                        You have not configured any Income Type and Income Source yet,
                        Please configure them in the Config tab.
                    </h4>
                )
                :
                (<AddIncomeForm {...props} />)
            }
        </>
    )
};

const AddIncomeForm = (props) => {
    const [open, setModal] = useState(false);
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState(0);
    const [account, setAccount] = useState("");
    const [receivedOn, setReceivedOn] = useState("");
    const toggle = () => setModal(!open);
    const addIncome = () => {
        props.addIncome({
            income_source_id: source,
            amount: amount,
            received_on: receivedOn,
            account_id: account
        })
    }
    return (
        <Row>
            <Col>
                <Button
                    color="info" onClick={toggle} size="sm" outline={true} className="float-right"
                >Add Income</Button>
                <Modal isOpen={open} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Income</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Select
                                    options={_.map(props.incomeSources, (source) => { return { value: source.ID, label: source.name } })}
                                    onChange={e => setSource(e.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Received On</Label>
                                <DatePicker selected={receivedOn} onChange={e => { setReceivedOn(e) }} />
                            </FormGroup>
                            <FormGroup>
                                <Select
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

export default memo(IncomeComponent);
