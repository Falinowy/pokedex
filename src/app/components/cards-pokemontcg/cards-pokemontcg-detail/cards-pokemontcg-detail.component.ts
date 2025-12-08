import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from '../../module/card';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsPokemontcgService } from 'src/app/service/pokemontcg/cards-pokemontcg.service';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cards-pokemontcg-detail',
  templateUrl: './cards-pokemontcg-detail.component.html',
  styleUrls: ['./cards-pokemontcg-detail.component.css'],
  imports: [
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    RouterLink,
    MatProgressSpinner,
  ],
})
export class CardsPokemontcgDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private cardsService = inject(CardsPokemontcgService);
  private router = inject(Router);
  private toast = inject(MatSnackBar);

  idCard: string;
  types: string;
  cardDetails: Card;
  similarPokemons: Card;
  showSpinner = true;
  private cardsDetailSubscription: Subscription;
  private similarCardsSubscription: Subscription;

  form = new UntypedFormGroup({
    artist: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    hp: new UntypedFormControl('', [Validators.required]),
    nationalPokedexNumbers: new UntypedFormControl('', [Validators.required]),
    number: new UntypedFormControl('', [Validators.required]),
    rarity: new UntypedFormControl('', [Validators.required]),
    types: new UntypedFormControl('', [Validators.required]),
    superType: new UntypedFormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getCardDetail();
    this.getSimilarCards();
  }
  setValueForm(): void {
    this.form.setValue({
      artist: this.cardDetails.artist,
      hp: this.cardDetails.hp,
      nationalPokedexNumbers: this.cardDetails.nationalPokedexNumbers,
      number: this.cardDetails.number,
      rarity: this.cardDetails.rarity,
      types: this.cardDetails.types,
      superType: this.cardDetails.supertype,
    });
  }
  getCardDetail(): void {
    this.idCard = this.route.snapshot.params.idCard;
    this.cardsDetailSubscription = this.cardsService
      .getCardDetail(this.idCard)
      .subscribe((result) => {
        this.cardDetails = result.data;
        this.setValueForm();
        this.showSpinner = false;
      });
  }
  getSimilarCards(): void {
    this.types = this.route.snapshot.params.types;
    this.similarCardsSubscription = this.cardsService
      .getSimilarCards(this.types)
      .subscribe((result) => {
        this.similarPokemons = result.data;
        this.showSpinner = false;
      });
  }
  refresh(): void {
    this.idCard = this.route.snapshot.params.idCard;
    this.types = this.route.snapshot.params.types;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnDestroy(): void {
    this.cardsDetailSubscription.unsubscribe();
    this.similarCardsSubscription.unsubscribe();
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
