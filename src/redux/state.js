const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';

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
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                post: this._state.profilePage.newPostText,
                likeCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);

        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);

        } else if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 6,
                message: this._state.dialogsPage.newMessage
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newMessage = '';
            this._callSubscriber(this._state);

        } else if (action.type === UPDATE_NEW_MESSAGE) {
            this._state.dialogsPage.newMessage = action.newMessage;
            this._callSubscriber(this._state);

        }
    }
};

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) => ({
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    })
export const addMessageActionCreator = () => ({type: ADD_MESSAGE})
export const updateNewMessageActionCreator = (text) => ({
        type: UPDATE_NEW_MESSAGE,
        newMessage: text
    })

export default store;