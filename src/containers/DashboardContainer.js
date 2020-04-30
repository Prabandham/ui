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
import { ErrorHandler } from '../utils/ErrorHandler';
import ExpenseComponent from "../components/ExpenseComponent";
import IncomeComponent from "../components/IncomeComponent";
import _ from "lodash";

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomeSources: [],
            expenseTypes: [],
            accounts: [],
            incomes: [],
            expenses: [],
            activeTab: "analytics",
            userId: "",
            formErrors: {}
        }
    };

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/login")
        }
        if (this.props.userInfo.ID !== "") {
            this.getIncomeSources();
            this.getExpenseTypes();
            this.getAccounts();
        }
    };

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
        const { userInfo } = this.props;
        ApiConstants.getIncomeSources(userInfo.ID)
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
        const { userInfo } = this.props;
        ApiConstants.getAccounts(userInfo.ID)
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
        const { userInfo } = this.props;
        const params = { name: name };
        ApiConstants.addIncomeSource(userInfo.ID, params)
            .then(response => {
                let incomeSources = this.state.incomeSources;
                incomeSources.push(response.data);
                this.setState({
                    incomeSources
                })
            })
            .catch(error => { this.setState({ formErrors: { incomeSourceErrors: ErrorHandler(error) } }) });
    };

    addAccount = (params) => {
        const { userInfo } = this.props;
        ApiConstants.addAccount(userInfo.ID, params)
            .then(response => {
                let accounts = this.state.accounts;
                accounts.push(response.data);
                this.setState({
                    accounts,
                    formErrors: {}
                })
            })
            .catch(error => { this.setState({ formErrors: { accountErrors: ErrorHandler(error) } }) });
    };

    getIncomes = () => {
        const { userInfo } = this.props;
        ApiConstants.getIncomes(userInfo.ID)
            .then(response => {
                this.setState({
                    incomes: response.data
                })
            })
    }

    addIncome = (params) => {
        const { userInfo } = this.props;
        ApiConstants.addIncome(userInfo.ID, params)
            .then(response => {
                let incomes = this.state.incomes;
                incomes.push(response.data);
                this.setState({
                    incomes,
                    formErrors: {}
                })
            })
            .catch(error => { this.setState({ formErrors: { incomeErrors: ErrorHandler(error) } }) });
    };

    getExpenses = () => {
        const { userInfo } = this.props;
        ApiConstants.getExpenses(userInfo.ID)
            .then(response => {
                this.setState({
                    expenses: response.data
                })
            })
    };

    addExpense = (params) => {
        const { userInfo } = this.props;
        ApiConstants.addExpense(userInfo.ID, params)
            .then(response => {
                let expenses = this.state.expenses;
                expenses.push(response.data);
                this.setState({
                    expenses,
                    formErrors: {}
                })
            })
            .catch(error => { this.setState({ formErrors: { expenseErrors: ErrorHandler(error) } }) });
    };

    setActiveTab = (event) => {
        const tabName = event.target.id.split("-")[1];
        this.setState({ activeTab: tabName });
        if (tabName === "income") { this.getIncomes() };
        if (tabName === "expense") { this.getExpenses() };
        if (tabName === "config") { this.getAccounts() };
    };

    render() {
        const { accounts, activeTab, incomeSources, incomes, expenseTypes, expenses, formErrors } = this.state;
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
                            <ExpenseComponent
                                accounts={accounts}
                                addExpense={this.addExpense}
                                expense_types={expenseTypes}
                                expenses={expenses}
                                formErrors={formErrors}
                            />
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
                                formErrors={formErrors}
                                incomes={incomes}
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
                                formErrors={formErrors}
                                incomeSources={incomeSources}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}
