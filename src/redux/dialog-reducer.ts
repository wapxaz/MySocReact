const ADD_MESSAGE = 'social-network/dialog/ADD-MESSAGE';

type DialogType = {
    id: number
    name: string
    img: string
}
type MessagesType = {
    id: number
    message: string
}
//стартовые данные
let initialState = {
    dialogs: [
        { id: 1, name: 'Vanya', img: 'https://i.cbc.ca/1.6255520.1644591326!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/evelyn-bradley.jpg' },
        { id: 2, name: 'Oleg', img: 'https://penntoday.upenn.edu/sites/default/files/2021-08/St.%20Julian-Varnon-headshot_MAIN.jpg' },
        { id: 3, name: 'Masha', img: 'https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg' },
        { id: 4, name: 'Olya', img: 'https://img.youtube.com/vi/Y8p_QOuRbzw/maxresdefault.jpg' },
        { id: 5, name: 'Petya', img: 'https://www.discoverwalks.com/blog/wp-content/uploads/2023/03/michael_b._jordan_cannes_2018.jpg' },
        { id: 6, name: 'Ken', img: 'https://people.com/thmb/ZgtjavC9W8bmobnykYYrQ806u4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/oprah-winfrey-people-1-fc18eac4118e4ea0b5a01b1b3e3f2ae6.jpg' }

    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Where are you from?' },
        { id: 4, message: 'hello' },
        { id: 5, message: 'I am here' }
    ] as Array<MessagesType>
};

export type InitialStateType = typeof initialState

const dialogReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 6,
                message: action.newMessage
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default:
            return state;
    }
}

type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessage: string
}
export const addMessageActionCreator = (newMessage: string): addMessageActionCreatorType => ({ type: ADD_MESSAGE, newMessage })

export default dialogReducer;