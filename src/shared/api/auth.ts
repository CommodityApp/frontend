import axios from "../plugins/axios";

export const Login = ( email:string, password:string ):Promise<unknown> => {
    return axios.post("/auth/login", {
        email,
        password
    })
}