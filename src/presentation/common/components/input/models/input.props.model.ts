import { InputType, Size, InputStyles } from '../../../../common'
import { FieldValidationModel } from '@/protocols/request-validator'
import { InputMaskProtocol } from '@/protocols/input-mask'
import { FormHandles } from '@unform/core'

export type InputProps = {
  formHandle?: FormHandles
  isDisabled?: boolean
  label?: string
  defaultValue?: string
  helpText?: string
  errorMessage?: string
  fieldValidations?: FieldValidationModel[]
  inputMask?: InputMaskProtocol
  name: string
  size?: Size
  type?: InputType
  toolTip?: string
  placeholder?: string
  inputStyle?: InputStyles
  onHandleLeftElement?: () => JSX.Element
  onHandleRightElement?: () => JSX.Element
}
