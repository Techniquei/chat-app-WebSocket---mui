import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "ebcd32df-6fbe-44b7-9fd9-4184b5603469"
    }
})

export const userAPI = {
    authUser(email:string, password:string){
        return instance.post('/auth/login', {email, password})
    },
    authMe(){
        return instance.get('/auth/me')
    },
    getProfile(userId : string){
        return instance.get(`/profile/${userId}`)
    }
}