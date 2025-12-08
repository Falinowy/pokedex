import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsPokemontcgDetailComponent } from './components/cards-pokemontcg/cards-pokemontcg-detail/cards-pokemontcg-detail.component';
import { CardsPokemontcgComponent } from './components/cards-pokemontcg/cards-pokemontcg/cards-pokemontcg.component';
import { CardsTcgdexComponent } from './components/cards-tcgdex/cards-tcgdex/cards-tcgdex.component';
import { HomeComponent } from './components/home/home.component';
import { CardsTcgdexDetailComponent } from './components/cards-tcgdex/cards-tcgdex-detail/cards-tcgdex-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'cards/pokemontcg/:idCard/:types',
    component: CardsPokemontcgDetailComponent,
  },
  { path: 'cards/pokemontcg', component: CardsPokemontcgComponent },
  { path: 'cards/tcgdex', component: CardsTcgdexComponent },
  { path: 'cards/tcgdex/:idCard', component: CardsTcgdexDetailComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
