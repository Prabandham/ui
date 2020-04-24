import React, { Component } from 'react'
import {
    Card, CardBody,
    CardTitle, Button, Row, Form, FormGroup, Label, Col, Input, Alert
} from 'reactstrap';
import { ApiConstants } from "../ApiConstants";
import {getCookies, setCookies} from "../utils/Cookies";

export default class LoginPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginFailureMessage: "",
            showAlert: false,
        };
    }

    componentDidMount() {
        if (Boolean(getCookies("authToken"))) {
            this.props.history.push("/dashboard");
        }
        this.props.setShowLoginLink(false);
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    onAlertDismiss = () => {
        this.setState({
            showAlert: false,
            loginFailureMessage: "",
        })
    };

    onLoginClick = () => {
        const { setLoginStatus } = this.props;
        ApiConstants.login(this.state)
            .then(response => {
                const data = response.data;
                setCookies("authToken", `${data.authToken}`);
                setCookies("userId", `${data.userId}`);
                setCookies("userInfo", `${JSON.stringify(data.userInfo)}`);
                this.props.history.push("/dashboard");
                setLoginStatus(true);
            })
            .catch(error => {
                const status = error.response.status;
                if (status === 401 || status === 400) {
                    this.setState({
                        loginFailureMessage: error.response.data.error,
                        showAlert: true
                    })
                }
            });
    };

    showLoginFailureMessage = () => {
        const { loginFailureMessage, showAlert } = this.state;
        return(
            <div>
                {showAlert &&
                    <Alert color="danger" isOpen={showAlert} toggle={this.onAlertDismiss}>
                        {loginFailureMessage}
                    </Alert>
                }
            </div>
        )
    };

    render() {
        const { email, password } = this.state;
        return (
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="6">
                    {this.showLoginFailureMessage()}
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
                                        <Input
                                            id="exampleEmail"
                                            invalid
                                            name="email"
                                            onChange={this.onChangeEmail}
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            onChange={this.onChangePassword}
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                            <center>
                                <Button
                                    className="float-md-right"
                                    color="info"
                                    onClick={this.onLoginClick}
                                >
                                    Login
                                </Button>
                            </center>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}
