import { useState } from "react";
import { connect } from 'react-redux';


function About(props) {
    return (
        <div className="section-share section-about">
            <div className="section-about-header">
                Truyền thông nói gì về Chiminhtathoj
            </div>
            <div className="section-about-content">
                <div className="content-left">
                    <iframe width="570px" height="320px" src="https://www.youtube.com/embed/FyDQljKtWnI"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullscreen></iframe>
                </div>
                <div className="content-right">
                    <p>Truyền thông chưa bao giờ nói gì về mình cả :(((</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);