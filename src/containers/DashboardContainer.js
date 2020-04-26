import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Row
} from "reactstrap";
import React, { Component } from 'react'

import AnalyticsComponent from "../components/AnalyticsComponent";
import { ApiConstants } from "../ApiConstants";
import ConfigComponent from "../components/ConfigComponent";
import ExpenseComponent from "../components/ExpenseComponent";
import IncomeComponent from "../components/IncomeComponent";
import _ from "lodash";
import axios from "axios";
import { removeAllCookies } from "../utils/Cookies";

// Global axios interceptor that will log the user out when session expires.
// TODO need to show a falsh as well when this happens.
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        removeAllCookies();
        window.location.href = "/";
    }
    return error;
});

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeSources: [],
            expenseTypes: [],
            accounts: [],
            activeTab: "analytics",
            userId: ""
        }
    };

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/login")
        }
        if (this.state.userId) {
            this.getIncomeSources();
            this.getExpenseTypes();
            this.getAccounts();
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.userInfo.ID !== prevState.userId) {
            return { userId: nextProps.userInfo.ID };
        }
        else return null;
    }

    getExpenseTypes = () => {
        ApiConstants.getExpenseTypes()
            .then(response => {
                this.setState({
                    expenseTypes: response.data,
                })
            })
            .catch(error => {
                console.log(error);
            })
    };

    getIncomeSources = () => {
        const { userId } = this.state;
        ApiConstants.getIncomeSources(userId)
            .then(response => {
                this.setState({
                    incomeSources: response.data,
                })
            })
            .catch(error => {
                console.log(error);
            })
    };

    getAccounts = () => {
        const { userId } = this.state;
        ApiConstants.getAccounts(userId)
            .then(response => {
                this.setState({
                    accounts: response.data,
                })
            })
            .catch(error => {
                console.log(error)
            })
    };

    addIncomeSource = (name) => {
        const { userId } = this.state;
        const params = { name: name };
        ApiConstants.addIncomeSource(userId, params)
            .then(response => {
                let incomeSources = this.state.incomeSources;
                incomeSources.push(response.data);
                this.setState({
                    incomeSources
                })
            })
    };

    addAccount = (name) => {
        const { userId } = this.state;
        const params = { name: name };
        ApiConstants.addAccount(userId, params)
            .then(response => {
                let accounts = this.state.accounts;
                accounts.push(response.data);
                this.setState({
                    accounts
                })
            })
    };

    addIncome = (params) => {
        console.log(params);
    };

    setActiveTab = (event) => {
        const tabName = event.target.id.split("-")[1];
        this.setState({
            activeTab: tabName,
        });
    };


    render() {
        const { accounts, activeTab, incomeSources } = this.state;
        const navItems = ["analytics", "expense", "income", "config"];
        return (
            <Row>
                <Col>
                    <Nav tabs fill className="fixed-bottom bg-light">
                        {_.map(navItems, (item, index) => {
                            return (
                                <NavItem key={index}>
                                    <NavLink
                                        aria-controls={item}
                                        data-toggle="tab"
                                        id={`nav-${item}-tab`}
                                        href={`#${item}`}
                                        role="tab"
                                        className={activeTab === item ? "active" : ""}
                                        onClick={this.setActiveTab}
                                    >
                                        {_.upperFirst(item)}
                                    </NavLink>
                                </NavItem>
                            )
                        })}
                    </Nav>
                    <div className="tab-content">
                        <div
                            className={activeTab === "analytics" ? "tab-pane fade show active" : "tab-pane fade"}
                            id="analytics"
                            role="tabpanel"
                            aria-labelledby="nav-analytics-tab"
                        >
                            {<AnalyticsComponent />}
                        </div>
                        <div
                            className={activeTab === "expense" ? "tab-pane fade show active" : "tab-pane fade"}
                            id="expense"
                            role="tabpanel"
                            aria-labelledby="nav-expense-tab"
                        >
                            <ExpenseComponent />
                        </div>
                        <div
                            className={activeTab === "income" ? "tab-pane fade show active" : "tab-pane fade"}
                            id="income"
                            role="tabpanel"
                            aria-labelledby="nav-income-tab"
                        >
                            <IncomeComponent
                                addIncome={this.addIncome}
                                accounts={accounts}
                                incomeSources={incomeSources}
                            />
                        </div>
                        <div
                            className={activeTab === "config" ? "tab-pane fade show active" : "tab-pane fade"}
                            id="config"
                            role="tabpanel"
                            aria-labelledby="nav-config-tab"
                        >
                            <ConfigComponent
                                accounts={accounts}
                                addAccount={this.addAccount}
                                addIncomeSource={this.addIncomeSource}
                                incomeSources={incomeSources}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}
