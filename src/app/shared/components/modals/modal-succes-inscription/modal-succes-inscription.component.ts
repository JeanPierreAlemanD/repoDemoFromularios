import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {User} from "../../../../services/user.models";

@Component({
  selector: 'comp-modal-succes-inscription',
  templateUrl: './modal-succes-inscription.component.html',
  styleUrls: ['./modal-succes-inscription.component.scss']
})
export class ModalSuccesInscriptionComponent implements OnInit {

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }


  close() {
    this.dialog.closeAll()
  }

}
