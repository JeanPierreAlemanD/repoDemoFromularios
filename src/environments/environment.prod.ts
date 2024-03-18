const protocol = 'http'
const host = 'faisanes.fovipol.gob.pe'
const subdomin = 'foviadmin-informacion'
const port = '8080'


// constante public
const api_public = `${protocol}://${host}:${port}/${subdomin}`

// http://faisanes.fovipol.gob.pe:8080
export const environment = {
  production: true,
  env: 'production',
  api: {
    route: {
      consultarDni: `${api_public}/reniec/personaByDni`,
      consutlaEstado: `${api_public}/entidaddetalle`,
      registrarInscripcion: `${api_public}/inscripcion`
    }
  },
  key: {
    recaptcha: '6Lf1mJspAAAAAIY5inTKf804tZ_L01LG15nOLe-M'
  }
};
