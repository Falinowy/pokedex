import { Component } from '@angular/core';
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public version: string = packageInfo.version;
  public year: number = new Date().getFullYear();
}
