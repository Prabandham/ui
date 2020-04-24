import React, { Component } from 'react'
import {
    Card, CardBody,
    CardTitle, Button, Row, Form, FormGroup, Label, Col, Input
} from 'reactstrap';

export default class LoginPageContainer extends Component {
    render() {
        return (
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="6">
                    <Card>
                        <h3 className="text-center">
                            <span className="text-warning">Cost </span>
                            <span className="text-info" style={{ "color": "#2c458b" }}>Tracker</span>
                        </h3>
                        <hr />
                        <CardBody>
                            <CardTitle className="text-center">Login</CardTitle>
                            <Form>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <center>
                                <Button className="float-md-right" color="info">Login</Button>
                            </center>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}
