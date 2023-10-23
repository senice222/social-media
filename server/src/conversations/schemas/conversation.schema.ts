import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop({type: Array})
    members: []

}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);