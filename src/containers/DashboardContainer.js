import React, { Component } from 'react'

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <h1 className="text-muted text-center">
                Welcome to Cost Tracker, Start integrating the rest of the APIs now !!
            </h1>
        )
    }
}
