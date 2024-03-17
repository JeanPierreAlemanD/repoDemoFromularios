import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatChipsModule} from "@angular/material/chips";

MatTableModule
const MATERIAL_MODULE=[
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule,
  MatSelectModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatStepperModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatListModule,
  MatTabsModule,
  MatChipsModule,
  MatRadioModule,
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL_MODULE
  ],
  exports:[
    MATERIAL_MODULE
  ]
})
export class MaterialModule { }
