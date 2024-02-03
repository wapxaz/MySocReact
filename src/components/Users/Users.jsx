import React from "react";
import style from "./Users.module.css";

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            { id: 1, photoUrl: 'https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg', followed: false, fullName: 'Andrey K.', status: 'I love life', location: { city: 'Moscow', country: 'Russia' } },
            { id: 2, photoUrl: 'https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg', followed: true, fullName: 'Sergey A.', status: 'Help me!', location: { city: 'Almaty', country: 'Kazahstan' } },
            { id: 3, photoUrl: 'https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg', followed: false, fullName: 'Kate S.', status: 'I can everything', location: { city: 'Denpasar', country: 'Bali' } }
        ]
        );
    }
    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={style.photoUser} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country},</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
}

export default Users;