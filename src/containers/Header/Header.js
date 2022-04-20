import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from "../../utils/constant"


function Header(props) {
    const { processLogout } = props
    const handleChangeLanguage = (language) => {
        alert(language)
    }
    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={adminMenu} />
            </div>
            <div className="header-languages">
                <span className="language-vi" onClick={() => handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                <span className="language-en" onClick={() => handleChangeLanguage(LANGUAGES.EN)}>EN</span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
