import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { isAuthFunk, logout } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.isAuthFunk();
    }
    render() {
        return (
            <Header {...this.props} />
        );
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {isAuthFunk, logout })(HeaderContainer);