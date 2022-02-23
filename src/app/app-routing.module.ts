import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsDetailComponent } from './components/cards-detail/cards-detail.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent },
  { path: 'cards/:idCard/:types', component: CardsDetailComponent },
  { path: '**', redirectTo: '/cards' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
