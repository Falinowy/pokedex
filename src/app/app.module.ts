import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsPokemontcgComponent } from './components/cards-pokemontcg/cards-pokemontcg/cards-pokemontcg.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CardsPokemontcgDetailComponent } from './components/cards-pokemontcg/cards-pokemontcg-detail/cards-pokemontcg-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { CardsTcgdexComponent } from './components/cards-tcgdex/cards-tcgdex/cards-tcgdex.component';
import { CardsTcgdexDetailComponent } from './components/cards-tcgdex/cards-tcgdex-detail/cards-tcgdex-detail.component';
import { FooterComponent } from './components/shared/footer/footer.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
    CardsPokemontcgComponent,
    CardsPokemontcgDetailComponent,
    CardsTcgdexComponent,
    CardsTcgdexDetailComponent,
    HeaderComponent,
    ActionBarComponent,
    FooterComponent,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
