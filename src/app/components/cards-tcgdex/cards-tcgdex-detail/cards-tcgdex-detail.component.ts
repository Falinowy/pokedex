import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import TCGdex, { Card, CardResume, SerieResume } from '@tcgdex/sdk';

const tcgdex = new TCGdex('en');

@Component({
  selector: 'app-cards-detail',
  templateUrl: './cards-tcgdex-detail.component.html',
  styleUrls: ['./cards-tcgdex-detail.component.css'],
  standalone: false,
})
export class CardsTcgdexDetailComponent implements OnInit {
  public idCard: string;
  public cardDetails: Card;
  public lowQualityWebp: string;
  public similarCards: CardResume[];
  public showSpinner = true;
  public set: SerieResume;

  form = new UntypedFormGroup({
    illustrator: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    hp: new UntypedFormControl('', [Validators.required]),
    dexId: new UntypedFormControl('', [Validators.required]),
    name: new UntypedFormControl('', [Validators.required]),
    rarity: new UntypedFormControl('', [Validators.required]),
    types: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, private toast: MatSnackBar) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('idCard');
      if (id) {
        this.getCardDetail();
      }
    });
  }

  public setValueForm(): void {
    this.form.setValue({
      illustrator: this.cardDetails.illustrator,
      hp: this.cardDetails.hp,
      dexId: this.cardDetails.dexId ? this.cardDetails.dexId[0] : '',
      rarity: this.cardDetails.rarity,
      types: this.cardDetails.types,
      name: this.cardDetails.name,
    });
  }

  public getCardDetail(): void {
    this.idCard = this.route.snapshot.params.idCard;
    (async () => {
      const card = await tcgdex.card.get(this.idCard);
      const set = await tcgdex.set.get(card.set.id);
      this.similarCards = set.cards;
      this.cardDetails = card;
      this.lowQualityWebp = this.getImageURL('low', 'webp', card);
      this.setValueForm();
      this.showSpinner = false;
    })();
  }

  public getImageURL(
    size: 'low' | 'high',
    format: 'png' | 'webp',
    set: any
  ): string {
    return set.getImageURL(size, format);
  }

  get valueForm() {
    return this.form.controls;
  }

  public onSubmitCardsDetail(): void {
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
