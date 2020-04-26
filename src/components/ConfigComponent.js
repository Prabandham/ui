import {
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";
import React, { useState } from "react";

import _ from "lodash";

const ConfigComponent = (props) => {
    const [input, setInput] = useState('');
		const [accountInput, setAccountInput] = useState('');
    const onButtonClick = () => {
        props.addIncomeSource(input);
        setInput("");
    };
		const onAddAccountClick = () => {
			props.addAccount(accountInput)
			setAccountInput("");
		}
    return(
        <Row>
            <Col md={6}>
                <h4 className={"text-muted"}>
                   Income Sources
                </h4>
                <hr />

                <InputGroup>
                    <Input placeholder="Input Source" value={input} onChange={e => setInput(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                        <InputGroupText onClick={onButtonClick}>Add</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
								<br />
                <ListGroup>
                    {_.map(props.incomeSources, (type) => {
                        return(
                            <ListGroupItem className={"justify-content-between"} key={type.ID}>
                                {type.name}
                                <i className="fa fa-trash float-right" onClick={() => alert("TODO implement")}></i>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Col>
            <Col md={6}>
                <h4 className={"text-muted"}>
										Accounts
                </h4>
                <hr />
                <InputGroup>
                    <Input placeholder="Account" value={accountInput} onChange={e => setAccountInput(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                        <InputGroupText onClick={onAddAccountClick}>Add</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
								<br />
                <ListGroup>
                    {_.map(props.accounts, (type) => {
                        return(
                            <ListGroupItem className={"justify-content-between"} key={type.ID}>
                                {type.name}
                                <i className="fa fa-trash float-right" onClick={() => alert("TODO implement")}></i>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Col>
        </Row>
    )
};

export default ConfigComponent;