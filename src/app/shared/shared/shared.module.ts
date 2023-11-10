import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormaterPipe } from 'src/app/pipes/formater.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@NgModule({
    declarations: [FormaterPipe, DateFormatPipe],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [ReactiveFormsModule, FormsModule, FormaterPipe, DateFormatPipe],
})
export class SharedModule {}
