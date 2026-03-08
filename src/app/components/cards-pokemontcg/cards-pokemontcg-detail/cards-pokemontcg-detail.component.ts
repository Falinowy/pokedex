import { Component, OnInit, inject, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsPokemontcgFacade } from 'src/app/service/pokemontcg/cards-pokemontcg.facade';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatInput, MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CardDetailComponent } from '../../shared/card-detail/card-detail.component';

@Component({
  selector: 'app-cards-pokemontcg-detail',
  templateUrl: './cards-pokemontcg-detail.component.html',
  styleUrls: ['./cards-pokemontcg-detail.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    CardDetailComponent
  ],
})
export class CardsPokemontcgDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public facade = inject(CardsPokemontcgFacade);
  private router = inject(Router);
  private toast = inject(MatSnackBar);

  idCard: string;
  types: string;

  form = new FormGroup({
    artist: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    hp: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    nationalPokedexNumbers: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    number: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    rarity: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    types: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    superType: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    effect(() => {
      const card = this.facade.selectedCard();
      if (card) {
        this.form.patchValue({
          artist: card.artist || '',
          hp: card.hp || '',
          nationalPokedexNumbers: card.nationalPokedexNumbers?.[0]?.toString() || '',
          number: card.number || '',
          rarity: card.rarity || '',
          types: card.types?.[0] || '',
          superType: card.supertype || '',
        });
        this.form.markAllAsTouched();
      }
    });
  }

  ngOnInit(): void {
    this.idCard = this.route.snapshot.params.idCard;
    this.facade.loadCardDetail(this.idCard);

    this.types = this.route.snapshot.params.types;
    if (this.types) {
      this.facade.loadSimilarCards(this.types);
    }
  }

  refresh(): void {
    this.idCard = this.route.snapshot.params.idCard;
    this.types = this.route.snapshot.params.types;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  get valueForm() {
    return this.form.controls;
  }

  onSubmitCardsDetail(): void {
    console.log(this.form.value);
    this.onEditSuccess();
  }

  private onEditSuccess(): void {
    this.toast.open('Pokemon has been successfully edited!', '', {
      panelClass: 'toast-success',
      duration: 5000,
    });
  }
}
