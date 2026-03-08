import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private location = inject(Location);
  private router = inject(Router);


  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  goOverview(): void {
    const path = this.location.path();
    if (path.includes('pokemontcg')) {
      this.router.navigate(['/cards/pokemontcg']);
    } else if (path.includes('tcgdex')) {
      this.router.navigate(['/cards/tcgdex']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  isHomePage(): boolean {
    return this.location.path() === '/home';
  }

  isDetailPage(): boolean {
    const path = this.location.path();
    return (path.includes('pokemontcg/') || path.includes('tcgdex/')) && path.split('/').length > 3;
  }
}
