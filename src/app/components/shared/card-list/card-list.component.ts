import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { ActionBarComponent } from '../../action-bar/action-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { computed } from '@angular/core';

export interface NormalizedCard {
  id: string;
  name: string;
  imageUrl?: string;
  routerLink: string;
}

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink,
    ActionBarComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule
  ],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {
  public cards = input<NormalizedCard[]>([]);
  public pageIndex = input<number>(0);
  public pageSize = input<number>(10);
  public totalItems = input<number>(0);
  public showSpinner = input<boolean>(false);
  public errorMessage = input<string | null>(null);
  public showSourceChangeButton = input<boolean>(false);
  public searchQuery = input<string>('');
  public allPokemonNames = input<string[]>([]);

  public filteredNames = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const names = this.allPokemonNames();
    if (!query) return names.slice(0, 50);
    return names
      .filter(name => name.toLowerCase().includes(query))
      .slice(0, 50);
  });

  public pageChange = output<number>();
  public reload = output<void>();
  public sourceChange = output<void>();
  public search = output<string>();

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

  onReload(): void {
    this.reload.emit();
  }

  onChangeSource(): void {
    this.sourceChange.emit();
  }

  onSearch(query: string): void {
    this.search.emit(query);
  }
}

