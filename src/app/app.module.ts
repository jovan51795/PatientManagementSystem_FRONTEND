import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { SharedModule } from 'primeng/api';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
