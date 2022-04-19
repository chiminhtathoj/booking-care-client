import { useState } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss"
import logo from "../../assets/logo.svg"
import { LANGUAGES } from "../../utils/constant"
import { changeLanguageApp } from "../../store/actions"


function HomeHeader(props) {
    const handleLanguage = (language) => {
        props.changeLanguageAppReducer(language)
    }
    const language = props.language
    return (
        <>
            <div className="home-header-container">

                <div className="home-header-content">
                    <div className="header-content-left">
                        <i className="fa-solid fa-bars"></i>
                        <img src={logo} alt="logo" className="header-logo" />
                    </div>
                    <div className="header-content-center">
                        <div className="child-content-center"><b><FormattedMessage id="home-header.special" /></b>
                            <div className="subs-title"><FormattedMessage id="home-header.search-doctor" /></div>
                        </div>
                        <div className="child-content-center"><b><FormattedMessage id="home-header.health-facility" /></b>
                            <div className="subs-title"><FormattedMessage id="home-header.select-room" /></div>
                        </div>
                        <div className="child-content-center"><b><FormattedMessage id="home-header.doctor" /></b>
                            <div className="subs-title"><FormattedMessage id="home-header.select-doctor" /></div>
                        </div>
                        <div className="child-content-center"><b><FormattedMessage id="home-header.examination-package" /></b>
                            <div className="subs-title"><FormattedMessage id="home-header.health-check" /></div>
                        </div>

                    </div>
                    <div className="header-content-right">
                        <div className="header-support"> <i className="fa-solid fa-circle-question"></i>
                            <FormattedMessage id="home-header.support" />
                        </div>
                        <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi "}> <span onClick={() => handleLanguage(LANGUAGES.VI)}>VN</span> </div>
                        <div className={language === LANGUAGES.EN ? "language-en active" : "language-en "}><span onClick={() => handleLanguage(LANGUAGES.EN)}>EN</span> </div>
                    </div>
                </div>

                <div className="home-header-banner">
                    <div className="banner-top">
                        <div className="title-first">
                            <FormattedMessage id="banner.title-first" />
                        </div>
                        <div className="title-second">
                            <FormattedMessage id="banner.title-second" />
                        </div>
                        <div className="search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Tìm chuyên khoa" />
                        </div>
                    </div>
                    <div className="banner-bot">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-hospital"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.examination-specialized" /></div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-mobile"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.examination-remote" /></div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-stethoscope"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.general-check" /></div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-microscope"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.medical-test" />c</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-user-doctor"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.mental-health" /></div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-tooth"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.dental-examination" /></div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-book-medical"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.surgery-package" /></div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-truck-medical"></i></div>
                                <div className="text-child"><FormattedMessage id="banner.medical-products" /></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}


const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppReducer: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);