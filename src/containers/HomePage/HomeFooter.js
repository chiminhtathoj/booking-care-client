import { useState } from "react";
import { connect } from 'react-redux';
import "./HomeFooter.scss"


function HomeFooter(props) {
    return (
        <div className="home-footer-container">
            <div className="home-footer-content">
                <div className="footer-content-left">
                    &copy; Chiminhtathoj
                </div>
                <div className="footer-content-right">
                    <a target="_blank" href="https://facebook.com/chiminhtathoj" alt="facebook">
                        <i className="fa-brands fa-facebook customize-facebook"></i>
                    </a>
                    <a target="_blank" href="https://youtube.com" alt="youtube">
                        <i class="fa-brands fa-youtube customize-youtube"> </i>
                    </a>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);