import { APIResponseType, ResultCodeEnum } from '../api/api';
jest.mock("../api/users-api");
import { usersAPI } from './../api/users-api';
import { actions, follow, unfollow } from "./users-reducer";

let dispatchMock = jest.fn();
let getStateMoc = jest.fn();
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMoc.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
});

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: []
}

test("success follow thunk", async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMoc, {});

    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
});

test("success unfollow thunk", async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMoc, {});

    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
});