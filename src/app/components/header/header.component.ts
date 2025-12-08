import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private location = inject(Location);


  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  isHomePage(): boolean {
    return this.location.path() === '/home';
  }
}
