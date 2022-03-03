import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsDetailComponent } from './components/cards-detail/cards-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardsDetailComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
