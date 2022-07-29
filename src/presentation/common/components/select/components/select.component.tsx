import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SelectProps, Size, InputStyles, useRequestValidator } from '../../../../common'
import { Select as ChakraSelect, Tooltip, InputGroup, FormLabel, FormHelperText, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { useField } from '@unform/core'

export const Select: React.FC<SelectProps> = ({
  name,
  options = [],
  isDisabled = false,
  formHandle = undefined,
  fieldValidations = [],
  label = undefined,
  helpText = undefined,
  errorMessage = undefined,
  inputStyle = InputStyles.Outline,
  size = Size.Medium,
  placeholder = undefined,
  toolTip = undefined,
  onChangeValue = undefined,
  defaultValue = undefined
}: SelectProps) => {
  const inputRef = useRef<HTMLSelectElement>(null)
  const [currentErrorMessage, setCurrentErrorMessage] = useState<string>(errorMessage)
  const { fieldName, registerField } = useField(name)
  const { requestValidator } = useRequestValidator()

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [])

  const handleSelectChange = useCallback((element: ChangeEvent<HTMLSelectElement>) => {
    if (onChangeValue) {
      const newValue = options.find(option => option.value === inputRef.current.value)
      onChangeValue(newValue)
    }
    if (fieldValidations.length > 0) {
      const dataToValidation = formHandle ? formHandle.getData() : { [name]: inputRef.current.value }
      const errors = requestValidator.validate(fieldValidations, dataToValidation)?.filter(error => error.path === name)
      if (errors?.length > 0) {
        setCurrentErrorMessage(errors[0].message)
      } else {
        setCurrentErrorMessage(undefined)
      }
    }
  }, [fieldValidations, onChangeValue, name])

  const handleSelectOptions = useMemo(() =>
    <>
      {options.map((optionItem, index) =>
        <option
          key={`${name}-option-item-${index}`}
          value={optionItem.value}
        >
          {optionItem.label}
        </option>
      )}
    </>
  , [name, options])

  const handleInput = useMemo(() =>
    <Tooltip
      label={toolTip}
    >
      <ChakraSelect
        variant={inputStyle}
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleSelectChange}
      >
        {handleSelectOptions}
      </ChakraSelect>
    </Tooltip>
  , [name, toolTip, placeholder, size, inputStyle, fieldValidations, formHandle, options, defaultValue])

  const handleInputGroup = useMemo(() =>
    <InputGroup
      size={size}
    >
      {handleInput}
    </InputGroup>
  , [name, toolTip, placeholder, size, inputStyle, defaultValue])

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
      isDisabled={isDisabled}
      marginBottom={'8px'}
    >
      {handleInputLabel}
      {handleInputGroup}
      {handleInputHelpText}
      {handleInputErrorMessage}
    </FormControl>
  )
}
