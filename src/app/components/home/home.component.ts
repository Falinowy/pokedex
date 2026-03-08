import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
private router = inject(Router);



public selectApi(type: 'pokemontcg' | 'tcgdex') {
    this.router.navigate([`/cards/${type}`])
      .then(ok => {
        console.log('navigate result:', ok);
      })
      .catch(err => {
        console.error('navigate error:', err);
      });
  }
}
