import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormaterPipe } from 'src/app/pipes/formater.pipe';

@NgModule({
    declarations: [FormaterPipe],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [ReactiveFormsModule, FormsModule, FormaterPipe],
})
export class SharedModule {}
