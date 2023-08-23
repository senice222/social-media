import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {UserTokenInterface} from "./interfaces/user-token.interface";
import {Model} from "mongoose";
import {CreateTokenDto} from "./dto/create-token.dto";

@Injectable()

export class TokenService {
    constructor(@InjectModel('Token') private readonly tokenModel: Model<UserTokenInterface>) { }

    async createToken(createUserTokenDto: CreateTokenDto): Promise<UserTokenInterface> {
        const userToken = new this.tokenModel(createUserTokenDto);
        return await userToken.save()
    }

    async deleteToken(uId: string, token: string): Promise<any> {
        return await this.tokenModel.deleteOne({ uId, token })
    }

    async deleteAll(uId: string): Promise<any> {
        return await this.tokenModel.deleteMany({ uId });
    }

    async exists(uId: string, token: string): Promise<any> {
        return await this.tokenModel.exists({ uId, token })
    }
}