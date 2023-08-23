import {UserI} from "./user.interface";


export interface IReadableUser extends UserI {
    accessToken?: string
}