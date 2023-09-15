import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class DateService {
    formatDate(date: Date): string {
        return format(date, 'MMMM dd yyyy, HH:mm a');
    }
}
