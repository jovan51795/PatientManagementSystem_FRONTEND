import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formater',
})
export class FormaterPipe implements PipeTransform {
    transform(value: string): string {
        // Remove underscores and convert to camel case
        return value.replace('_', ' ');
    }
}
