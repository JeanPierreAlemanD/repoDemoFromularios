const protocol = 'https'
const host = 'app.fovipol.gob.pe'
const subdomin = 'foviadmin-informacion'
const port = '8181'

// constante public
const api_public = `${protocol}://${host}:${port}/${subdomin}`


export const environment = {
  production: false,
  env:'dev',
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
