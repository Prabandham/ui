import { Button, Col, Row } from "reactstrap"
import React, { Component } from 'react'

export default class LandingPageContainer extends Component {
    componentDidMount() {
        this.props.setShowLoginLink(!this.props.isLoggedIn)
    }

    render() {
        return (
            <Row>
                <Col xs="3" className="mt-5">
                    <h1 className="mt-5">
                        <span className="text-warning">Cost </span>
                        <span className="text-info" style={{ "color": "#2c458b" }}>Tracker</span>
                    </h1>
                    <p>
                        An effective and simple cost tracking application.
                        Which does all the work, with cutting edge technology.
                    </p>
                    <p>
                        Track all your expenses and analyse with,
                        Visual Tools that lets you dive into your spedning habbits thus helping you save more.
                    </p>
                    <br />
                    <Button color="warning">Sign up</Button>
                </Col>
                <Col xs="9" className="d-none d-sm-block">
                    <div className="text-center">
                        <img src="/images/landing_page_bg.jpg" alt="landing-page-bg" className="img-fluid"></img>
                    </div>

                </Col>
            </Row>
        )
    }
}
