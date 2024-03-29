import { InferActionsTypes } from "./redux-store";

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

const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOG/ADD_MESSAGE': {
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

export const actions = {
    addMessage: (newMessage: string) => ({ type: 'SN/DIALOG/ADD_MESSAGE', newMessage } as const)
}

type InitialStateType = typeof initialState
// список всех ActionType через тип-обертку
type ActionsTypes = InferActionsTypes<typeof actions>

export default dialogReducer;