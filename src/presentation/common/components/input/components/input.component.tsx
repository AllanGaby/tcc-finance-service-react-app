import React, { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { InputProps, InputType, Size, InputStyles, useRequestValidator } from '../../../../common'
import {
  Input as ChakraInput,
  Tooltip,
  InputGroup,
  InputRightElement,
  IconButton,
  FormLabel,
  FormHelperText,
  FormControl,
  FormErrorMessage,
  Textarea
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon, EmailIcon } from '@chakra-ui/icons'
import { useField } from '@unform/core'

export const Input: React.FC<InputProps> = ({
  name,
  isDisabled = false,
  formHandle = undefined,
  fieldValidations = [],
  label = undefined,
  defaultValue = undefined,
  helpText = undefined,
  errorMessage = undefined,
  inputStyle = InputStyles.Outline,
  inputMask = undefined,
  size = Size.Medium,
  placeholder = undefined,
  toolTip = undefined,
  onHandleLeftElement = undefined,
  onHandleRightElement = undefined,
  type = InputType.Text
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [currentType, setCurrentType] = useState<InputType>(type)
  const [currentErrorMessage, setCurrentErrorMessage] = useState<string>(undefined)
  const { fieldName, registerField } = useField(name)
  const { requestValidator } = useRequestValidator()

  useEffect(() => {
    setCurrentErrorMessage(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (currentType === InputType.Textarea) {
      registerField({
        name: fieldName,
        ref: inputTextareaRef.current,
        path: 'value'
      })
    } else {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value'
      })
    }
  }, [currentType])

  const handleInputKeyUp = useCallback((_: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (fieldValidations.length > 0) {
      const inputValue = currentType === InputType.Textarea ? inputTextareaRef.current.value : inputRef.current.value
      const dataToValidation = formHandle ? formHandle.getData() : { [name]: inputValue }
      const error = requestValidator.validate(fieldValidations, dataToValidation)?.filter(error => error.path === name)
      if (error?.length > 0) {
        setCurrentErrorMessage(error[0].message)
      } else {
        setCurrentErrorMessage(undefined)
      }
    }
  }, [fieldValidations])

  const handleInputMask = useCallback((event: FormEvent<HTMLInputElement>) => {
    if (inputMask) {
      inputRef.current.value = inputMask.mask(inputRef.current.value)
    }
  }, [inputMask])

  const handleCustomLeftElement = useCallback(() =>
    onHandleLeftElement &&
    <>
      {onHandleLeftElement()}
    </>
  , [onHandleLeftElement])

  const handleCustomRightElement = useCallback(() =>
    onHandleRightElement &&
    <InputRightElement>
      {onHandleRightElement()}
    </InputRightElement>
  , [onHandleRightElement])

  const handleInput = useMemo(() =>
    <Tooltip
      label={toolTip}
    >
      <ChakraInput
        variant={inputStyle}
        ref={inputRef}
        name={name}
        type={currentType}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onInput={handleInputMask}
        onKeyUp={handleInputKeyUp}
        isDisabled={isDisabled}
      />
    </Tooltip>
  , [name, currentType, toolTip, placeholder, size, inputStyle, fieldValidations, formHandle, defaultValue, isDisabled])

  const handlePasswordViewOffButton = useMemo(() =>
    type === InputType.Password &&
    currentType === InputType.Password &&
    <InputRightElement>
      <Tooltip
        label='Exibir a senha'
      >
        <IconButton
          aria-label='view password'
          icon={<ViewIcon />}
          onClick={() => setCurrentType(InputType.Text)}
        />
      </Tooltip>
    </InputRightElement>
  , [currentType])

  const handlePasswordViewButton = useMemo(() =>
    type === InputType.Password &&
    currentType === InputType.Text &&
    <InputRightElement>
      <Tooltip
        label='Esconder a senha'
      >
        <IconButton
          aria-label='view off'
          icon={<ViewOffIcon />}
          onClick={() => setCurrentType(InputType.Password)}
        />
      </Tooltip>
    </InputRightElement>
  , [currentType])

  const handleEmailIcon = useMemo(() =>
    currentType === InputType.Email &&
    <InputRightElement>
      <EmailIcon />
    </InputRightElement>
  , [currentType])

  const handleLeftElement = useMemo(() =>
    <>
      {handleCustomLeftElement()}
    </>
  , [onHandleLeftElement])

  const handleRightElement = useMemo(() =>
    <>
      {handlePasswordViewOffButton}
      {handlePasswordViewButton}
      {handleEmailIcon}
      {handleCustomRightElement()}
    </>
  , [currentType, onHandleRightElement])

  const handleInputGroup = useMemo(() =>
    currentType !== InputType.Textarea &&
    <InputGroup
      size={size}
    >
      {handleLeftElement}
      {handleInput}
      {handleRightElement}
    </InputGroup>
  , [name, currentType, toolTip, placeholder, size, inputStyle, defaultValue, onHandleLeftElement, onHandleRightElement])

  const handleInputTextarea = useMemo(() =>
    currentType === InputType.Textarea &&
    <Tooltip
      label={toolTip}
    >
      <Textarea
        name={name}
        isDisabled={isDisabled}
        ref={inputTextareaRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyUp={handleInputKeyUp}
      />
    </Tooltip>
  , [name, currentType, toolTip, placeholder, size, inputStyle, defaultValue, isDisabled])

  const handleInputLabel = useMemo(() =>
    label &&
    <FormLabel
      htmlFor={name}
    >
      {label}
    </FormLabel>
  , [name, label])

  const handleInputHelpText = useMemo(() =>
    !currentErrorMessage &&
    helpText &&
    <FormHelperText>
      {helpText}
    </FormHelperText>
  , [name, helpText, currentErrorMessage])

  const handleInputErrorMessage = useMemo(() =>
    currentErrorMessage &&
    <FormErrorMessage>
      {currentErrorMessage}
    </FormErrorMessage>
  , [name, currentErrorMessage])

  return (
    <FormControl
      isInvalid={Boolean(currentErrorMessage)}
      marginBottom={'8px'}
    >
      {handleInputLabel}
      {handleInputGroup}
      {handleInputTextarea}
      {handleInputHelpText}
      {handleInputErrorMessage}
    </FormControl>
  )
}
