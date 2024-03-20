const protocol = 'https'
const host = 'app.fovipol.gob.pe'
const subdomin = 'foviadmin-informacion'
const port = '8181'


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
    recaptcha: '6LdyZp4pAAAAAFQBHFiwLVPwxoUahaevX_qlhMZj'
  }
};
