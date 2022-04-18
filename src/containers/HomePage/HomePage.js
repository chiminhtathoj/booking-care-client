import { useState } from "react";
import { connect } from 'react-redux';
import HomeHeader from "./HomeHeader";
import "./HomePage.scss"


function HomePage() {
    return (
        <HomeHeader />
    )
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);