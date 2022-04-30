import React, { Component, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'
import "./App.scss"

import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars"
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import Doctor from '../routes/Doctor';

import { CustomToastCloseButton } from '../components/CustomToast';


function App(props) {
    const [bootstrapped, setBootstrapped] = useState(false)
    const handlePersistorState = () => {
        const { persistor } = props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (props.onBeforeLift) {
                Promise.resolve(props.onBeforeLift())
                    .then(() => setBootstrapped({ bootstrapped: true }))
                    .catch(() => setBootstrapped({ bootstrapped: true }));
            } else {
                setBootstrapped({ bootstrapped: true });
            }
        }
    };
    useEffect(() => {
        handlePersistorState()
    }, [])
    return (
        <Fragment>
            <Router history={history}>
                <div className="main-container">
                    <div className="content-container">
                        <Switch>
                            <>
                                <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                </CustomScrollbars>
                            </>
                        </Switch>
                    </div>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </Router>
        </Fragment>
    )

}
// class App extends Component {

//     handlePersistorState = () => {
//         const { persistor } = this.props;
//         let { bootstrapped } = persistor.getState();
//         if (bootstrapped) {
//             if (this.props.onBeforeLift) {
//                 Promise.resolve(this.props.onBeforeLift())
//                     .then(() => this.setState({ bootstrapped: true }))
//                     .catch(() => this.setState({ bootstrapped: true }));
//             } else {
//                 this.setState({ bootstrapped: true });
//             }
//         }
//     };

//     componentDidMount() {
//         this.handlePersistorState();
//     }

//     render() {
//         return (
//             <Fragment>
//                 <Router history={history}>
//                     <div className="main-container">
//                         {/* {this.props.isLoggedIn && <Header />} */}

//                         <div className="content-container">
//                             <Switch>
//                                 <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
//                                     <Route path={path.HOME} exact component={(Home)} />
//                                     <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
//                                     <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
//                                     <Route path={path.HOMEPAGE} component={HomePage} />
//                                 </CustomScrollbars>
//                             </Switch>
//                         </div>

//                         <ToastContainer
//                             position="bottom-right"
//                             autoClose={4000}
//                             hideProgressBar={false}
//                             newestOnTop={false}
//                             closeOnClick
//                             rtl={false}
//                             pauseOnFocusLoss
//                             draggable
//                             pauseOnHover
//                         />
//                     </div>
//                 </Router>
//             </Fragment>
//         )
//     }
// }

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

export default connect(mapStateToProps, mapDispatchToProps)(App);