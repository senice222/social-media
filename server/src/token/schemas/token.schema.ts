import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "../../user/schemas/users.schema";


@Schema()
export class Token {
    @Prop({unique: true, required: true})
    token: string;
    @Prop({required: true, ref: 'User'})
    uId: string;
    @Prop({required: true})
    expireAt: Date
}

export const TokenSchema = SchemaFactory.createForClass(Token);