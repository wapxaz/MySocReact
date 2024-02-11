import React from 'react';
import Header from './Header.tsx';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer.ts';
import { AppStateType } from '../../redux/redux-store.ts';

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchToPropsType = {
    logout: () => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props} />
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {logout})(HeaderContainer);