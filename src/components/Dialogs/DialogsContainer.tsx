import React from 'react';
import { actions } from '../../redux/dialog-reducer.ts';
import Dialogs from './Dialogs.tsx';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store.ts';

type MapStateToPropsType = {
    dialogsPage: AppStateType["dialogsPage"]
}
type MapDispatchToPropsType = {
    addMessage: (newMessage: string) => void
}
type OwnPropsType = {

}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    };
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {...actions})
)(Dialogs);