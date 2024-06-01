import { AxiosInstance } from "axios";

import axiosInstance from "./ApiInstance";
import { ResponseResult } from "./types";


export class UserApiService {

    public readonly baseURL: string;
    public readonly initData: string;

    public constructor(initData: string) {
        this.baseURL = process.env.NEXT_PUBLIC_API_URL!
        this.initData = "user=%7B%22id%22%3A1009204894%2C%22first_name%22%3A%22%E3%85%A4%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22rhymezs%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=397055438834441131&chat_type=private&auth_date=1713615351&hash=ee22312faaca35b521f584ef76f8c327dadeda726747b0837b1dd19c41e4f1b0";
    }

    public request(path: string, method: ("POST" | "GET") = "GET", body = {}, headers = {},): Promise<ResponseResult> {
        return new Promise((resolve, reject) => {
            console.log(`${this.baseURL}/api/user/${path}`)
            axiosInstance(`${this.baseURL}/api/user/${path}`, {
                method,
                data: body,
                headers: {
                    hash: this.initData,
                    "ngrok-skip-browser-warning":true
                }
            }).then((r) => {
                resolve(r.data)
            }).catch((e) => {
                reject(e)
            })
        })
    }

    getMyActiveRoom(): Promise<ResponseResult> {

        return this.request("getMyActiveRoom");

    }

    getMe(): Promise<ResponseResult> {

        return this.request("me");

    }

}