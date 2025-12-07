import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from '../../module/card';
import { UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsTcgdexService } from 'src/app/service/tcgdex/cards-tcgdex.service';

@Component({
    selector: 'app-cards-detail',
    templateUrl: './cards-tcgdex-detail.component.html',
    styleUrls: ['./cards-tcgdex-detail.component.css'],
    standalone: false
})
export class CardsTcgdexDetailComponent implements OnInit, OnDestroy {
  idCard: string;
  types: string;
  cardDetails: Card;
  similarPokemons: Card;
  showSpinner = true;
  private cardsDetailSubscription: Subscription;
  private similarCardsSubscription: Subscription;

  form = new UntypedFormGroup({
    artist: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    hp: new UntypedFormControl('', [Validators.required]),
    nationalPokedexNumbers: new UntypedFormControl('', [Validators.required]),
    number: new UntypedFormControl('', [Validators.required]),
    rarity: new UntypedFormControl('', [Validators.required]),
    types: new UntypedFormControl('', [Validators.required]),
    superType: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsTcgdexService,
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
    console.log(this.route);
  }
  getSimilarCards(): void {
    this.types = this.route.snapshot.params.types;
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
