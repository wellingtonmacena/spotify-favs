import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CallbackComponent } from './components/pages/callback/callback.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingInterceptor } from './middlewares/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SpinnerComponent,
    HomeComponent,
    LoginComponent,
    MessagesComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    {      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
