import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardsService } from 'src/app/service/cards.service';
import { Card } from '../module/card';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cards-detail',
  templateUrl: './cards-detail.component.html',
  styleUrls: ['./cards-detail.component.css']
})
export class CardsDetailComponent implements OnInit, OnDestroy {
  idCard: string;
  types: string;
  cardDetails: Card;
  similarPokemons: Card;
  showSpinner = true;
  private cardsDetailSubscription: Subscription;
  private similarCardsSubscription: Subscription;

  form = new FormGroup({
    artist: new FormControl('', [Validators.required, Validators.minLength(3)]),
    hp: new FormControl('', [Validators.required]),
    nationalPokedexNumbers: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    rarity: new FormControl('', [Validators.required]),
    types: new FormControl('', [Validators.required]),
    superType: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private router: Router,
    private toast: MatSnackBar) { }

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
        superType: this.cardDetails.supertype
      });
  }
  getCardDetail(): void {
    this.idCard = this.route.snapshot.params.idCard;
    this.cardsDetailSubscription = this.cardsService.getCardDetail(this.idCard)
      .subscribe(result => {
        this.cardDetails = result.data;
        this.setValueForm();
      });
  }
  getSimilarCards(): void {
    this.types = this.route.snapshot.params.types;
    this.similarCardsSubscription = this.cardsService.getSimilarCards(this.types)
      .subscribe(result => {
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
  get valueForm(){
    return this.form.controls;
  }
  onSubmitCardsDetail(): void{
    console.log(this.form.value);
    this.onEditSuccess();
  }
  private onEditSuccess(): void{
    this.toast.open('Pokemon has been successfully edited!', '', { panelClass: 'toast-success', duration: 5000});
  }
}
