import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {dniRepetidoValidator, getfieldMessage} from "../../shared/helper/helper";
import {ReniecService} from "../../services/reniec.service";
import {respSelectedFrom} from "../../models/estadocivil.models";
import {MatTable} from "@angular/material/table";


export interface TableItem {
  factorIngreso: string;
  factorIngresoId: string;
  monto: number;
}


@Component({
  selector: 'comp-conviviente',
  templateUrl: './form-conviviente.component.html',
  styleUrls: ['./form-conviviente.component.scss']
})
export class FormConvivienteComponent implements OnInit, OnChanges {
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @Input() factorConviviente: respSelectedFrom[] = []
  @Output() formConvivienteValid: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() formDatosConviviente: EventEmitter<{
    formConviviente: {
      nombreConviviente: string,
      primerApellidoConviviente: string,
      segundoApellidoConviviente: string,
      dniConviviente: string,
      cipConviviente: string
    }, dataConviviente: TableItem[]
  }> = new EventEmitter();

  datosNecesarios: boolean = false
  nombreConviviente: string = ''
  inputValueCipConviviente: string = ''
  ocultar: boolean = true
  estadoCivil: respSelectedFrom[] = []
  errorMessage: string = '';
  selectedOption: string = ''
  factor: respSelectedFrom[] = []
  mostrarMensaje: boolean = false
  inputValue: number = 0
  dataConviviente: TableItem[] = [];
  displayedColumns: string[] = ['option', 'value', 'action'];

  public formConviviente: FormGroup = this.fb.group({
    dniConviviente: ['', [Validators.required, Validators.minLength(8), dniRepetidoValidator()]],
    cipConviviente: ['', [Validators.minLength(6), Validators.maxLength(8)]],
    nombreConviviente: ['', [Validators.required]],
    factor: [''],
    primerApellidoConviviente: [''],
    segundoApellidoConviviente: [''],
    monto: ['']
  })

  constructor(
    private reniecService: ReniecService,
    private fb: FormBuilder
  ) {

    this.formConviviente.valueChanges.subscribe(valor => {
      if (this.formConviviente.valid) {
        this.emitirValores()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.factor = this.factorConviviente
    }
  }

  ngOnInit(): void {
    this.cargarEstadoCivil()
    this.formConviviente.controls['dniConviviente'].valueChanges.subscribe(d => {
      if (d.length < 1) {
        this.ocultar = true
        this.formConviviente.get('nombreConviviente')?.setValue('')
      }
    })
  }

  emitirValores() {
    const {
      nombreConviviente,
      primerApellidoConviviente,
      segundoApellidoConviviente,
      cipConviviente,
      dniConviviente
    } = this.formConviviente.value
    this.formDatosConviviente.emit({
      formConviviente: {
        nombreConviviente,
        primerApellidoConviviente,
        segundoApellidoConviviente,
        cipConviviente,
        dniConviviente
      },
      dataConviviente: this.dataConviviente
    })
  }


  isValidField(field: string): boolean | null {
    return (
      this.formConviviente.controls[field].errors &&
      this.formConviviente.controls[field].touched
    );
  }

  getFieldErrors(field: string): string | null {
    return getfieldMessage(field, this.formConviviente);
  }

  validatorLengh(field: string) {
    switch (field) {
      case 'dniConviviente':
        return this.formConviviente.controls['dniConviviente'].value.length !== 8;
      case 'cipConviviente':
        return this.formConviviente.controls['cipConviviente'].value.length !== 8
    }
    return null;
  }

  cargarEstadoCivil() {
    this.reniecService.getEstadoCivil().subscribe(e => {
      if (!e) return;
      this.estadoCivil = e
    }, error => {
      this.errorMessage = error;
    })
  }

  agregarCeros() {
    if (this.inputValueCipConviviente.length === 6) {
      this.inputValueCipConviviente = '00' + this.inputValueCipConviviente;
    }
  }


  obtenerDatos() {
    const dni = this.formConviviente.controls['dniConviviente'].value
    if (dni) {
      this.reniecService.getDatosReniec(dni).subscribe(d => {
        if (d.codigoError === '00') {
          const nameCompleto = `${d.nombres} ${d.apellidoPaterno} ${d.apellidoMaterno}`
          this.formConviviente.patchValue({
            nombreConviviente: d.nombres,
            primerApellidoConviviente: d.apellidoPaterno,
            segundoApellidoConviviente: d.apellidoMaterno
          })
          this.formConvivienteValid.emit(this.formConviviente.valid)
          this.nombreConviviente = nameCompleto
          this.ocultar = false
        } else {
          this.formConvivienteValid.emit(this.formConviviente.valid)
          this.formConviviente.get('dniConviviente')!.setValue('');
          this.ocultar = true
        }
      })
    } else {
      this.formConviviente.get('dniConviviente')?.markAsTouched()
      return;
    }
  }

  addItemTable() {
    if (this.selectedOption && this.inputValue) {
      const existeTipoValor = this.dataConviviente.some(item => item.factorIngresoId === this.selectedOption);
      const selectedId = this.factor.find(item => item.valoCaduDet === this.selectedOption);
      if (!existeTipoValor) {
        this.dataConviviente.push({
          factorIngreso: selectedId!.secuEntiDet.toString(),
          monto: this.inputValue,
          factorIngresoId: this.selectedOption
        });
        this.table.renderRows();
        // Limpiar campos después de agregar
        this.selectedOption = '';
        this.inputValue = 0;
        //oculart mensajes de campos
        this.datosNecesarios = false
        this.mostrarMensaje = false
        this.emitirValores()
        // this.formConyugeValid.emit(this.formConyuge.valid)
      } else {
        this.mostrarMensaje = true
        this.datosNecesarios = false
      }
    } else {
      this.datosNecesarios = true
    }
  }

  deleteItem(row: TableItem) {
    const index = this.dataConviviente.indexOf(row);
    if (index > -1) {
      this.dataConviviente.splice(index, 1);
      this.emitirValores()
    }
    this.table.renderRows();
  }


}
