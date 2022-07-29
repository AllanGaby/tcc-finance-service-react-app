import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SwitchProps, Size } from '../../../../common'
import { Switch as SwitchChakra, FormControl, FormLabel, Tooltip, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { useField } from '@unform/core'

export const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  errorMessage = undefined,
  helpText = undefined,
  toolTip = undefined,
  isDisabled = false,
  size = Size.Medium,
  value = '0',
  checkedValue = '1',
  uncheckedValue = '0'
}: SwitchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentValue, setCurrentValue] = useState<string>(undefined)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [])

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value)
    }
  }, [value])

  const handleSwitchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let newValue: string
    if (currentValue === checkedValue) {
      newValue = uncheckedValue
    } else {
      newValue = checkedValue
    }
    inputRef.current.value = newValue
    setCurrentValue(newValue)
  }, [currentValue, checkedValue, uncheckedValue])

  const handleInputHelpText = useMemo(() =>
    !errorMessage &&
    helpText &&
    <FormHelperText>
      {helpText}
    </FormHelperText>
  , [helpText, errorMessage])

  const handleInputErrorMessage = useMemo(() =>
    errorMessage &&
      <FormErrorMessage>
        {errorMessage}
      </FormErrorMessage>
  , [errorMessage])

  const handleSwitchLabel = useMemo(() =>
    label &&
    <FormLabel
      htmlFor={name}
    >
      {label}
    </FormLabel>
  , [name, label])

  const handleSwitchInput = useMemo(() =>
    <Tooltip
      label={toolTip}
    >
      <SwitchChakra
        name={name}
        ref={inputRef}
        isDisabled={isDisabled}
        value={currentValue}
        isChecked={currentValue === checkedValue}
        onChange={handleSwitchChange}
      />
    </Tooltip>
  , [name, isDisabled, currentValue, checkedValue, toolTip])

  return (
    <FormControl
      isInvalid={Boolean(errorMessage)}
      isDisabled={isDisabled}
      marginBottom={'8px'}
    >
      {handleSwitchLabel}
      {handleSwitchInput}
      {handleInputHelpText}
      {handleInputErrorMessage}
    </FormControl>
  )
}
