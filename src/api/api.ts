import axios from "axios";

//API для работы с данными в соцсети
//уровень DAL

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "6025eddf-c4f7-44e7-96e8-ec1661589aa9"
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCapthca {
    CaptchaIsRequired = 10
}
// export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
//     data: D
//     resultCode: ResultCodeEnum
//     messages: RC
// }
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}