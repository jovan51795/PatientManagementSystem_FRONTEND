import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string): string {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(value, 'MMM. d, y, h:mm a');
        return formattedDate || value; // Return the formatted date or the original value if formatting fails
    }
}
