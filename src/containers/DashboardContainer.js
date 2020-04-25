import React, { Component } from 'react'
import {ApiConstants} from "../ApiConstants";
import {
    Nav, NavItem, NavLink,
    Row, Col
} from "reactstrap";
import axios from "axios";
import _ from "lodash";
import AnalyticsComponent from "../components/AnalyticsComponent";
import ConfigComponent from "../components/ConfigComponent";
import IncomeComponent from "../components/IncomeComponent";
import ExpenseComponent from "../components/ExpenseComponent";
import {removeAllCookies} from "../utils/Cookies";

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
            incomeTypes: [],
            incomeSources: [],
            expenseTypes: [],
            activeTab: "analytics"
        }
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/login")
        }
        this.getExpenseTypes();
        this.getIncomeTypes();
        this.getIncomeSources()
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

    getIncomeTypes = () => {
        const { userInfo } = this.props;
        ApiConstants.getIncomeTypes(userInfo.ID)
            .then(response => {
                this.setState({
                    incomeTypes: response.data,
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

    addIncomeType = (name) => {
        const { userInfo } = this.props;
        const params = { name: name };
        ApiConstants.addIncomeType(userInfo.ID, params)
            .then(response => {
                let incomeTypes = this.state.incomeTypes;
                incomeTypes.push(response.data);
                this.setState({
                    incomeTypes
                })
            })
    };

    setActiveTab = (event) => {
        const tabName = event.target.id.split("-")[1];
        this.setState({
            activeTab: tabName,
        });
    };

    render() {
        const { activeTab, incomeTypes, incomeSources } = this.state;
        const navItems = ["analytics", "expense", "income", "config"];
        return (
            <Row>
                <Col>
                    <Nav tabs fill className="fixed-bottom bg-light">
                        {_.map(navItems, (item, index) => {
                            return(
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
                            <ExpenseComponent/>
                        </div>
                        <div
                            className={activeTab === "income" ? "tab-pane fade show active" : "tab-pane fade"}
                            id="income"
                            role="tabpanel"
                            aria-labelledby="nav-income-tab"
                        >
                            <IncomeComponent
                                incomeTypes={incomeTypes}
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
                                addIncomeType={this.addIncomeType}
                                incomeTypes={incomeTypes}
                                incomeSources={incomeSources}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}
