import {Injectable} from '@nestjs/common';
import {CreateUserDto} from '../auth/dto/create-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {HashService} from '../auth/services/hash.service';
import {User, UserDocument} from './schemas/users.schema';
import * as _ from 'lodash';
import {UserI} from "./interfaces/user.interface";


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private hashService: HashService
    ) {
    }

    async getUserByEmail(email: string): Promise<UserI>  {
        const user = await this.userModel.findOne({email}).exec()
        return user
    }

    async getUserById(id: string): Promise<UserI> {
        const user = await this.userModel.findById(id).populate('createdPosts')
        return user
    }

    async create(createUserDto: CreateUserDto): Promise<UserI> {
        const hash = await this.hashService.hashPassword(createUserDto.password)
        const createdUser = new this.userModel(_.assignIn(createUserDto, { password: hash}));
        return await createdUser.save();
    }

    async uploadUserAvatar(file: Express.Multer.File): Promise<Express.Multer.File> {
        return file
    }
}