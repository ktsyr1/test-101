import axios from "axios";
import Cookies from "js-cookie"

type ConfigType = {
    url: string
    headers: {
        accept: string;
        'Content-Type': string;
        Authorization: string;
    };
    token: any;
    info: any;
}
export function ConfigApi(): ConfigType {

    let cookies: any = Cookies.get("userInformation")
    let token: any = Cookies.get("userToken")
    let info: any = JSON?.parse(cookies)


    let url = process.env.NEXT_PUBLIC_API || ""
    let headers = {
        "accept": "*/*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    return {
        url, headers, token, info
    }
}

export function refreshToken() {
    let { url } = ConfigApi()
    let refreshToken: any = Cookies.get("refreshToken")


    url += `/Authorization/RefreshToken`
    axios.post(url, { refreshToken })
        .then(res => res)
    return
}