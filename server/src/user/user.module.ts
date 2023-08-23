import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/users.schema";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {HashService} from "../auth/services/hash.service";


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
    ],
    controllers: [UsersController],
    providers: [UsersService, HashService],
    exports: [UsersService],
})
export class UserModule {

}