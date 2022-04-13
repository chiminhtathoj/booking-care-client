import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleOnClick = () => {
        console.log("username: ", username, "password: ", password)
    }
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 login-text">Login</div>
                    <div className="col-12 form-group login-input">
                        <label htmlFor="">Username</label>
                        <input type="text"
                            className="form-control"
                            placeholder='Enter Your Username'
                            value={username}
                            onChange={(e) => handleUsername(e)}
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            className="form-control "
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => handlePassword(e)}
                        />
                    </div>
                    <div className="col-12 login-forgot-text">
                        Forgot your password ?
                    </div>
                    <div className="col-9 login-signup-text">
                        <span>No account ?</span>
                        <a href="#"> Signup</a>
                    </div>
                    <div className="col-3">
                        <button
                            className="btn-login"
                            onClick={handleOnClick}
                        >
                            Login
                        </button>
                    </div>

                    <div className="col-12 text-center login-with">
                        <span>Or Login With</span>
                    </div>
                    <div className="col-12 login-social">
                        <i className="fab fa-google google"></i>
                        <i className="fab fa-facebook-f facebook"></i>
                    </div>
                </div>
            </div>
        </div >
    )
}
// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.btnLogin = React.createRef();
//     }
//     render() {
//         return (
//             <div className="login-background">
//                 <div className="login-container">
//                     <div className="login-content row">
//                         <div className="col-12 login-text">Login</div>
//                         <div className="col-12 form-group login-input">
//                             <label htmlFor="">Username</label>
//                             <input type="text" className="form-control" placeholder='Enter Your Username' />
//                         </div>
//                         <div className="col-12 form-group login-input">
//                             <label htmlFor="">Password</label>
//                             <input type="password" className="form-control " placeholder='Enter Your Password' />
//                         </div>
//                         <div className="col-12 login-forgot-text">
//                             Forgot your password ?
//                         </div>
//                         <div className="col-9 login-signup-text">
//                             <span>No account ?</span>
//                             <a href="#"> Signup</a>
//                         </div>
//                         <div className="col-3">
//                             <button className="btn-login">Login</button>
//                         </div>

//                         <div className="col-12 text-center login-with">
//                             <span>Or Login With</span>
//                         </div>
//                         <div className="col-12 login-social">
//                             <i class="fab fa-google google"></i>
//                             <i class="fab fa-facebook-f facebook"></i>
//                         </div>
//                     </div>
//                 </div>
//             </div >
//         )
//     }
// }

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
