import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
    status: string 
    updateStatus: (status: string) => void
}

//редактирование статуса пользователя при даблклике
//реализация через хуки
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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