import {IsDateString, IsString } from "class-validator";
import mongoose from "mongoose";


export class CreateTokenDto {
    token: string;

    @IsString()
    uId: string;

    @IsDateString()
    expireAt: string;
}