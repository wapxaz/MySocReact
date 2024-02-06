import React, { useState } from 'react';

const ProfileStatusWithHooks = (props) => {
    // state = {
    //     editMode: false,
    //     status: this.props.status
    // }

    // activateEditMode = () => {
    //     this.setState({
    //         editMode: true
    //     });
    // }
    // deactivateEditMode = () => {
    //     this.setState({
    //         editMode: false
    //     });
    //     this.props.updateStatus(this.state.status);
    // }
    // onStatusChange = (e) => {
    //     this.setState({
    //         status: e.currentTarget.value
    //     });
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.status != this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         });
    //     }
    // }

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (<div>
        {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>
                    {props.status || "-----"}
                </span>
            </div>
        }
        {editMode &&
            <div>
                <input value={status} onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} />
            </div>
        }
    </div>
    );
}

export default ProfileStatusWithHooks;