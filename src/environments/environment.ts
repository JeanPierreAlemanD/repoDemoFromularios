const protocol = 'http'
const host = '192.168.33.21'
const port = '8181'
const port_dos = '9090';
const api_public = `${protocol}://${host}:${port}`
const api_public_90 = `${protocol}://${host}:${port_dos}`


export const environment = {
  production: false,
  env:'dev',
  api: {
    route: {
      consultarDni: `${api_public}/reniec/personaByDni`,
      consutlaEstado: `${api_public_90}/entidaddetalle`,
      registrarInscripcion: `${api_public}/inscripcion`
    }
  },
  key: {
    recaptcha: '6LcKzJcpAAAAAEgcEJ3zYFHIiq7LHprghEp6Mf1f'
  }
};
