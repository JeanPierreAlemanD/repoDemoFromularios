const protocol = 'http'
const host = 'faisanes.fovipol.gob.pe'
const port = '8080'

// constante public
const api_public = `${protocol}://${host}:${port}`

// http://faisanes.fovipol.gob.pe:8080

export const environment = {
  production: true,
  env:'production',
  api: {
    route: {
      consultarDni: `${api_public}/reniec/personaByDni`,
      consutlaEstado: `${api_public}/entidaddetalle`,
      registrarInscripcion: `${api_public}/inscripcion`
    }
  },
  key: {
    recaptcha: '6LcKzJcpAAAAAEgcEJ3zYFHIiq7LHprghEp6Mf1f'
  }
};
