export interface requestRegistrar {
  cip: string,
  cipConyuge: string,
  direccion1: string,
  dni: string,
  dniConyuge: string,
  email: string,
  estadoCivil: number
  ingresos: dataIngresos[],
  ingresosConyuge: dataIngresos[]
  ip: string,
  nombres: string,
  nombresConyuge: string,
  numeroPartida: string,
  partRegiImb: string,
  primerApellido: string,
  primerApellidoConyuge: string,
  segundoApellido: string,
  segundoApellidoConyuge: string,
  telefono1: string,
}

export interface dataIngresos {
  factorIngreso: number,
  monto: number
}
