import React, { useState } from "react";
import s from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumder: number) => void
}
let Paginator: React.FC<PropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.pageSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.pageSize + 1;
    let rightPortionPageNumber = portionNumber * props.pageSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber -1)}}>PREV</button>}
            {
                pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={ cn({
                        [s.selectedPage]: props.currentPage === p
                    }, s.pageNumber) } key={p} onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
                })
            }
            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
    );
}

export default Paginator;