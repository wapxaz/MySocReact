import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import { getIsFetching } from "../../redux/users-selectors.ts";
import { Users } from "./Users.tsx";

type UsersPagePropsType = {
    pageTitle: string
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);

    return (
        <>
            <h2>{props.pageTitle}</h2>
            <div>
                {isFetching ? <Preloader /> : null}
            </div>
            <Users />
        </>
    );
}