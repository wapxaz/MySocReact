import React, { useEffect, useState } from 'react';

//редактирование статуса пользователя при даблклике
//реализация через хуки
const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

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
        {//режим отображения статуса
        !editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>
                Status: {props.status || "-----"}
                </span>
            </div>
        }
        {//режим редактирования статуса
        editMode &&
            <div>
                Status: <input value={status} onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} />
            </div>
        }
    </div>
    );
}

export default ProfileStatusWithHooks;