export interface EncryptMessageProtocol {
  encrypt: (message: string) => string | false
}
