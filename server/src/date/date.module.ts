import { Module } from '@nestjs/common';
import {DateService} from "./date.service";


@Module({
    imports: [],
    controllers: [],
    providers: [DateService],
    exports: [DateService]
})
export class DateModule {}
