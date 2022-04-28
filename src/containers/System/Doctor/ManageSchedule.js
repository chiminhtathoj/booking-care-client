import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";


function ManageSchedule(props) {
    return (
        <>
            <div>chiminhtathoj</div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
