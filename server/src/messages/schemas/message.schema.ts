import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({
    timestamps: true,
})
export class Message {
    @Prop({type: String})
    conversationId: string

    @Prop({type: String})
    sender: string

    @Prop({type: String})
    text: string
}

export const MessageSchema = SchemaFactory.createForClass(Message);