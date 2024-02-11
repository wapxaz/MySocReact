import React, { ChangeEvent } from 'react';
import { AppStateType } from '../../../redux/redux-store';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

//редактирование статуса пользователя при даблклике
//реализация классовую компоненту с локальным стейтом
class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (<div>
            {//режим отображения статуса
            !this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>
                        {this.props.status || "-----"}
                    </span>
                </div>
            }
            {//режим редактирования статуса
            this.state.editMode &&
                <div>
                    <input autoFocus={true} value={this.state.status} onChange={this.onStatusChange} onBlur={this.deactivateEditMode} />
                </div>
            }
        </div>
        );
    }
}

export default ProfileStatus;