import { ConfigurationModel } from '../../../application'

export const configurationSetup = (): ConfigurationModel => 
({
  baseURL: 'http://206.189.199.14:3333',
  accessTokenKey: 'Authorization',
  accessTokenName: '@finance-service:token',
  publicKey: ''
})
