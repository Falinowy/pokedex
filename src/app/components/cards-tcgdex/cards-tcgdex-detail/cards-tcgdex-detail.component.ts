import { Component, OnInit, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsTcgdexFacade } from 'src/app/service/tcgdex/cards-tcgdex.facade';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatInput, MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CardDetailComponent } from '../../shared/card-detail/card-detail.component';

@Component({
    selector: 'app-cards-detail',
    templateUrl: './cards-tcgdex-detail.component.html',
    styleUrls: ['./cards-tcgdex-detail.component.scss'],
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
export class CardsTcgdexDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public facade = inject(CardsTcgdexFacade);
  private toast = inject(MatSnackBar);

  form = new FormGroup({
    illustrator: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    hp: new FormControl<string | number>('', { nonNullable: true, validators: [Validators.required] }),
    dexId: new FormControl<string | number>('', { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    rarity: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    types: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    effect(() => {
      const card = this.facade.selectedCard();
      if (card) {
        this.form.patchValue({
          illustrator: card.illustrator || '',
          hp: card.hp || '',
          dexId: (card.dexId && card.dexId.length > 0) ? card.dexId[0] : '',
          rarity: card.rarity || '',
          types: card.types?.[0] || '',
          name: card.name || '',
        });
        this.form.markAllAsTouched();
      }
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('idCard');
      if (id) {
        this.facade.loadCardDetail(id);
      }
    });
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
