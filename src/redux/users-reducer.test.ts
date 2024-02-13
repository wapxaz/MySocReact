import usersReducer, { InitialStateType, actions } from "./users-reducer";

let state: InitialStateType;
// перед каждым тестом state инициализирую этими значениями
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: "Vasya", followed: false, status: "Hey", photos: { small: null, large: null }
            },
            {
                id: 1, name: "Katya", followed: false, status: "ta ta ta", photos: { small: null, large: null }
            },
            {
                id: 2, name: "Stepan", followed: true, status: "Privet", photos: { small: null, large: null }
            },
            {
                id: 3, name: "Alisa", followed: true, status: "Ugu", photos: { small: null, large: null }
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
});

test("follow success", () => {
    const newState = usersReducer(state, actions.followSuccess(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test("unfollow success", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})