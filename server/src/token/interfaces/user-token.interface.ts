import { Document } from 'mongoose';

export interface UserTokenInterface extends Document {
    readonly token: string,
    readonly uid: string;
    readonly expireAt: string
}