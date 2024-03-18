import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ReniecService} from "../../services/reniec.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {dniRepetidoValidator, getfieldMessage} from "../../shared/helper/helper";
import {MatTable} from "@angular/material/table";
import {respSelectedFrom} from "../../models/estadocivil.models";
import {MatDialog} from "@angular/material/dialog";
import {ModalsErrorComponent} from "../../shared/components/modals/modal-error/modals-error.component";

export interface TableItem {
  factorIngreso: string;
  factorIngresoId: string;
  monto: number;
}

@Component({
  selector: 'comp-conyuge',
  templateUrl: './form-conyuge.component.html',
  styleUrls: ['./form-conyuge.component.scss']
})
export class FormConyugeComponent implements OnInit, OnChanges {
  datosTabla: any[] = [];
  @Input() factorConyugue: respSelectedFrom[] = []
  @Output() formConyugeValid: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() formDatosConyugue: EventEmitter<{
    formConyuge: {
      nombreconyuge: string,
      primerApellidoConyuge: string,
      segundoApellidoConyuge: string,
      dniconyuge: string,
      cipconyuge: string
    }, dataConyuge: TableItem[]
  }> = new EventEmitter();
  factor: respSelectedFrom[] = []
  nombreconyuge: string = ''
  mostrarMensaje: boolean = false
  datosNecesarios: boolean = false
  inputValueCipConyuge: string = ''
  dataConyuge: TableItem[] = [];
  inputValue: number = 0
  selectedOption: string = ''
  displayedColumns: string[] = ['option', 'value', 'action'];
  ocultar: boolean = true
  @ViewChild(MatTable) table!: MatTable<TableItem>;


  public formConyuge: FormGroup = this.fb.group({
    dniconyuge: ['', [Validators.required, Validators.minLength(8), dniRepetidoValidator()]],
    cipconyuge: ['', [Validators.minLength(6), Validators.maxLength(8)]],
    nombreconyuge: ['', [Validators.required]],
    factor: [''],
    primerApellidoConyuge: [''],
    segundoApellidoConyuge: [''],
    monto: ['']
  })

  constructor(
    private reniecService: ReniecService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    // Subscribirse a los cambios del formulario y si es valido emitir
    this.formConyuge.valueChanges.subscribe(valor => {
      if (this.formConyuge.valid) {
        this.emitirValores()
      }
    })

    // Susbcrimirme al estado del formulario hijo
    this.formConyuge.statusChanges.subscribe(() => {
      this.formConyugeValid.emit(this.formConyuge.valid)
    })
  }

  emitirValores() {
    const {
      nombreconyuge,
      primerApellidoConyuge,
      segundoApellidoConyuge,
      cipconyuge,
      dniconyuge
    } = this.formConyuge.value
    this.formDatosConyugue.emit({
      formConyuge: {nombreconyuge, primerApellidoConyuge, segundoApellidoConyuge, cipconyuge, dniconyuge},
      dataConyuge: this.dataConyuge
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.factor = this.factorConyugue
    }
  }

  ngOnInit(): void {
    this.formConyuge.controls['dniconyuge'].valueChanges.subscribe(d => {
      if (d.length < 1 || d === null) {
        this.ocultar = true
        this.formConyuge.get('nombreconyuge')?.setValue('')
      }
    })


  }


  obtenerDatos() {
    const dni = this.formConyuge.controls['dniconyuge'].value
    if (dni) {
      this.reniecService.getDatosReniec(dni).subscribe(d => {
        if (d.codigoError === '00') {
          const nameCompleto = `${d.nombres} ${d.apellidoPaterno} ${d.apellidoMaterno}`
          this.formConyuge.patchValue({
            nombreconyuge: d.nombres,
            primerApellidoConyuge: d.apellidoPaterno,
            segundoApellidoConyuge: d.apellidoMaterno
          })
          this.formConyugeValid.emit(this.formConyuge.valid)
          this.nombreconyuge = nameCompleto
          this.ocultar = false
        } else {
          this.formConyugeValid.emit(this.formConyuge.valid)
          this.formConyuge.get('dniconyuge')!.setValue('');
          this.ocultar = true
        }
      })
    } else {
      this.formConyuge.get('dniconyuge')?.markAsTouched()
      return;
    }
  }

  addItemTable() {
    if (this.selectedOption && this.inputValue) {
      const existeTipoValor = this.dataConyuge.some(item => item.factorIngresoId === this.selectedOption);
      const selectedId = this.factor.find(item => item.valoCaduDet === this.selectedOption);
      if (!existeTipoValor) {
        this.dataConyuge.push({factorIngreso:selectedId!.secuEntiDet.toString() , monto: this.inputValue,factorIngresoId:this.selectedOption});
        this.table.renderRows();
        // Limpiar campos después de agregar
        this.selectedOption = '';
        this.inputValue =0;
        //oculart mensajes de campos
        this.datosNecesarios = false
        this.mostrarMensaje = false
        this.emitirValores()
        this.formConyugeValid.emit(this.formConyuge.valid)
      } else {
        this.mostrarMensaje = true
        this.datosNecesarios = false
      }
    } else {
      this.datosNecesarios = true
    }

  }

  deleteItem(row: TableItem) {
    const index = this.dataConyuge.indexOf(row);
    if (index > -1) {
      this.emitirValores()
      this.dataConyuge.splice(index, 1);
    }
    this.table.renderRows();
  }


  validatorLengh(field: string) {
    switch (field) {
      case 'dniconyuge':
        return this.formConyuge.controls['dniconyuge'].value.length !== 8;
      case 'cipconyuge':
        return this.formConyuge.controls['cipconyuge'].value.length !== 8
    }
    return null;
  }

  agregarCeros() {
    if (this.inputValueCipConyuge.length === 6) {
      this.inputValueCipConyuge = '00' + this.inputValueCipConyuge;
    }
  }

  isValidField(field: string): boolean | null {
    return (
      this.formConyuge.controls[field].errors &&
      this.formConyuge.controls[field].touched
    );
  }

  getFieldErrors(field: string): string | null {
    return getfieldMessage(field, this.formConyuge);
  }

}
