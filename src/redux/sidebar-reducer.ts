//стартовые данные
let initialState = [
    { id: 3, name: 'Masha', img: 'https://www.rri.res.in/sites/default/files/2022-09/Abhisek%20Tamang.jpg' },
    { id: 4, name: 'Olya', img: 'https://img.youtube.com/vi/Y8p_QOuRbzw/maxresdefault.jpg' },
    { id: 5, name: 'Petya', img: 'https://www.discoverwalks.com/blog/wp-content/uploads/2023/03/michael_b._jordan_cannes_2018.jpg' }
];

type ActionsTypes = {}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    return state;
}

export default sidebarReducer;