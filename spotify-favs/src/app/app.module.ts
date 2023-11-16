import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProfileComponent } from './components/pages/profile/profile.component';
import { SpotifyHeaderComponent } from './components/spotify-components/spotify-header/spotify-header.component';
import { TopArtistsComponent } from './components/spotify-components/top-artists/top-artists.component';
import { TopTracksComponent } from './components/spotify-components/top-tracks/top-tracks.component';
import { TopListenedGenresComponent } from './components/spotify-components/top-listened-genres/top-listened-genres.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { ArtistInfoComponent } from './components/spotify-components/artist-info/artist-info.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';

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
    CallbackComponent,
    ProfileComponent,
    SpotifyHeaderComponent,
    TopArtistsComponent,
    TopTracksComponent,
    TopListenedGenresComponent,
    PieChartComponent,
    DoughnutChartComponent,
    ArtistInfoComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
