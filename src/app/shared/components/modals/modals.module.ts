import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalSuccesInscriptionComponent} from './modal-succes-inscription/modal-succes-inscription.component';
import {MatButtonModule} from "@angular/material/button";
import {MaterialModule} from "../../material/material.module";
import { ModalsErrorComponent } from './modal-error/modals-error.component';
import { ModalInvalidFormCoyugeComponent } from './modal-invalid-form-coyuge/modal-invalid-form-coyuge.component';

const ELEMENT_MODALS = [
  ModalSuccesInscriptionComponent
]


@NgModule({
  declarations: [
    ModalSuccesInscriptionComponent,
    ModalsErrorComponent,
    ModalInvalidFormCoyugeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialModule,
  ], exports: [
    ELEMENT_MODALS
  ]
})
export class ModalsModule {
}
