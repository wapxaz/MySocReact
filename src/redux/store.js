import profileReducer from "./profile-reducer.ts";
import dialogReducer from "./dialog-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";

//самописный store REDUX - по нему изучал, как всё устроено
//сейчас не используется

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, post: 'Hi, how are you?', likeCount: 20 },
                { id: 2, post: "It's my first post.", likeCount: 15 }
            ],
            newPostText: "Hello"
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Vanya', img: 'https://i.cbc.ca/1.6255520.1644591326!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/evelyn-bradley.jpg' },
                { id: 2, name: 'Oleg', img: 'https://penntoday.upenn.edu/sites/default/files/2021-08/St.%20Julian-Varnon-headshot_MAIN.jpg' },
                { id: 3, name: 'Masha', img: 'https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg' },
                { id: 4, name: 'Olya', img: 'https://img.youtube.com/vi/Y8p_QOuRbzw/maxresdefault.jpg' },
                { id: 5, name: 'Petya', img: 'https://www.discoverwalks.com/blog/wp-content/uploads/2023/03/michael_b._jordan_cannes_2018.jpg' },
                { id: 6, name: 'Ken', img: 'https://people.com/thmb/ZgtjavC9W8bmobnykYYrQ806u4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/oprah-winfrey-people-1-fc18eac4118e4ea0b5a01b1b3e3f2ae6.jpg' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How are you?' },
                { id: 3, message: 'Where are you from?' },
                { id: 4, message: 'hello' },
                { id: 5, message: 'I am here' }
            ],
            newMessage: ''
        },
        sidebarFriends: [
            { id: 3, name: 'Masha', img: 'https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg' },
            { id: 4, name: 'Olya', img: 'https://img.youtube.com/vi/Y8p_QOuRbzw/maxresdefault.jpg' },
            { id: 5, name: 'Petya', img: 'https://www.discoverwalks.com/blog/wp-content/uploads/2023/03/michael_b._jordan_cannes_2018.jpg' }
        ]
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.sidebarFriends = sidebarReducer(this._state.sidebarFriends, action);

        this._callSubscriber(this._state);
    }
};

export default store;