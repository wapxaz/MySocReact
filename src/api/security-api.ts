import { instance } from "./api.ts";

type GetCaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
}