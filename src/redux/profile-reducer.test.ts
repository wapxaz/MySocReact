import { PostType, ProfileType } from '../types/types.ts';
import profileReducer, {actions} from './profile-reducer.ts';
//import { render, screen } from '@testing-library/react';
//import App from './App';

let state = {
    posts: [
        { id: 1, post: 'Hi, how are you?', likeCount: 20 },
        { id: 2, post: "It's my first post.", likeCount: 15 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "" as string,
};

test('length post should be incremented', () => {
    // порядок тестов:
    // 1 - подготавливаем исходные данные(test data)
    let action = actions.addPostActionCreator("FirsTest");

    // 2 - выполняем действие(action)
    let newState = profileReducer(state, action);

    // 3 - проверяем ожидания от работы кода(expectation)
    expect(newState.posts.length).toBe(3);
});

test('check added data', () => {
    // порядок тестов:
    // 1 - подготавливаем исходные данные(test data)
    let action = actions.addPostActionCreator("FirsTest");

    // 2 - выполняем действие(action)
    let newState = profileReducer(state, action);

    // 3 - проверяем ожидания от работы кода(expectation)
    expect(newState.posts[2].post).toBe("FirsTest");
});

test('after deleting length should be decrement', () => {
    // порядок тестов:
    // 1 - подготавливаем исходные данные(test data)
    let action = actions.deletePost(1);

    // 2 - выполняем действие(action)
    let newState = profileReducer(state, action);

    // 3 - проверяем ожидания от работы кода(expectation)
    expect(newState.posts.length).toBe(1);
});

test(`after deleting length should't be decrement if id is incorrect`, () => {
    // порядок тестов:
    // 1 - подготавливаем исходные данные(test data)
    let action = actions.deletePost(666);

    // 2 - выполняем действие(action)
    let newState = profileReducer(state, action);

    // 3 - проверяем ожидания от работы кода(expectation)
    expect(newState.posts.length).toBe(2);
});