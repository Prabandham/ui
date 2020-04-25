import React, { useState } from "react";
import {
    Row, Col, Input, ListGroupItem, ListGroup, InputGroupAddon, InputGroup, InputGroupText
} from "reactstrap";
import _ from "lodash";

const ConfigComponent = (props) => {
    const [input, setInput] = useState('');
    const onButtonClick = () => {
        props.addIncomeType(input);
        setInput("");
    };
    return(
        <Row>
            <Col md={6}>
                <h4 className={"text-muted"}>
                   Income Types
                </h4>
                <hr />

                <InputGroup>
                    <Input placeholder="Input Type" value={input} onChange={e => setInput(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                        <InputGroupText onClick={onButtonClick}>Add</InputGroupText>
                    </InputGroupAddon>
                </InputGroup>

                <ListGroup>
                    {_.map(props.incomeTypes, (type) => {
                        return(
                            <ListGroupItem className={"justify-content-between"} key={type.ID}>{type.name}</ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Col>
            <Col md={6}>
                <h4 className={"text-muted"}>
                    Income Sources
                </h4>
                <hr />
            </Col>
        </Row>
    )
};

export default ConfigComponent;