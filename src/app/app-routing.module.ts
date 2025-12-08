import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'cards/pokemontcg/:idCard/:types',
    loadComponent: () => import('./components/cards-pokemontcg/cards-pokemontcg-detail/cards-pokemontcg-detail.component').then(m => m.CardsPokemontcgDetailComponent),
  },
  { path: 'cards/pokemontcg', loadComponent: () => import('./components/cards-pokemontcg/cards-pokemontcg/cards-pokemontcg.component').then(m => m.CardsPokemontcgComponent) },
  { path: 'cards/tcgdex', loadComponent: () => import('./components/cards-tcgdex/cards-tcgdex/cards-tcgdex.component').then(m => m.CardsTcgdexComponent) },
  { path: 'cards/tcgdex/:idCard', loadComponent: () => import('./components/cards-tcgdex/cards-tcgdex-detail/cards-tcgdex-detail.component').then(m => m.CardsTcgdexDetailComponent) },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
