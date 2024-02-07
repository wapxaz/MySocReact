import React from "react";
import style from "./Paginator.module.css";

let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                pages.map(p => {
                    return <span className={props.currentPage === p ? style.selectedPage : ''} onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
                })
            }
        </div>
    );
}

export default Paginator;