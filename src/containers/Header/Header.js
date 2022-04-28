import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from "../../utils/constant"
import _ from "lodash"


function Header(props) {
    const [menuApp, setMenuApp] = useState([])
    const { processLogout, language, userInfo } = props
    const handleChangeLanguage = (language) => {
        props.changeLanguageAppReducer(language)
    }
    useEffect(() => {
        const { userInfo } = props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            if (userInfo.roleId === USER_ROLE.ADMIN)
                menu = adminMenu
            if (userInfo.roleId === USER_ROLE.DOCTOR)
                menu = doctorMenu
        }
        setMenuApp(menu)
    }, [])
    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={menuApp} />
            </div>
            <div className="header-languages">
                <span className="text-welcome" style={{ textTransform: "capitalize" }}>  <FormattedMessage id="home-header.welcome" />,
                    {userInfo && userInfo.firstName ? " " + userInfo.firstName : ""} !</span>
                <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi "} onClick={() => handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                <span className={language === LANGUAGES.EN ? "language-en active" : "language-en "} onClick={() => handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                <div className="btn btn-logout" onClick={processLogout} title="log out">
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>

            {/* nút logout */}

        </div>
    );
}

// class Header extends Component {
//     const { processLogout } = this.props
// render() {
//     const { processLogout } = this.props;

//     return (
//         <div className="header-container">
//             {/* thanh navigator */}
//             <div className="header-tabs-container">
//                 <Navigator menus={adminMenu} />
//             </div>
//             <div className="header-languages">
//                 <span className="language-vi" onClick={() => handleChangeLanguage(LANGUAGES.VI)}>VN</span>
//                 <span className="language-en" onClick={() => handleChangeLanguage(LANGUAGES.EN)}>EN</span>
//                 <div className="btn btn-logout" onClick={processLogout} title="log out">
//                     <i className="fas fa-sign-out-alt"></i>
//                 </div>
//             </div>

//             {/* nút logout */}

//         </div>
//     )
// }
// }
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppReducer: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
