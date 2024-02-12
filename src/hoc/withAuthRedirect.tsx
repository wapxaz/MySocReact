import { AppStateType } from './../redux/redux-store';
import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

//редирект на страницу авторизации
export function withAuthRedirect<WCP extends React.JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        
        if (!isAuth) {
            return <Navigate to={ "/login" } />
        }
        return <WrappedComponent {...restProps as WCP}/>;
    }

    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
}