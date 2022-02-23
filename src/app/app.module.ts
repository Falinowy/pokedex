import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsDetailComponent } from './components/cards-detail/cards-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TttttttComponent } from './componenttest/ttttttt/ttttttt.component';
import { TttttttsdfsdComponent } from './componenttttttt/tttttttsdfsd/tttttttsdfsd.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardsDetailComponent,
    HeaderComponent,
    TttttttComponent,
    TttttttsdfsdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
