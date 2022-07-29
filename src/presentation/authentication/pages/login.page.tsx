import React, { useCallback, useMemo, useRef, useState } from 'react'
import { CreateAccessSessionDTO } from '../../../domain/common'
import { Button, Input, InputType, ToastType, useAuthentication, useRequestValidator, useToast } from '../../../presentation/common'
import { makeLoginFieldsValidations } from '../../../presentation/authentication'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useHistory } from 'react-router-dom'
import { Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'

export const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<Partial<CreateAccessSessionDTO>>(undefined)
  const formRef = useRef<FormHandles>(undefined)
  const toast = useToast()
  const history = useHistory()
  const { login } = useAuthentication()
  const { requestValidator } = useRequestValidator()
  const fieldsValidation = makeLoginFieldsValidations()

  const handleLogin = useCallback(async (data: CreateAccessSessionDTO) => {
    const errors = requestValidator.validate(fieldsValidation, data)
    if (errors) {
      const newFormMessageError: Partial<CreateAccessSessionDTO> = {}
      errors.forEach(({ path, message }) => {
        if (!newFormMessageError[path]) {
          newFormMessageError[path] = message
        }
      })
      setErrorMessage(newFormMessageError)
    } else {
      try {
        await login(data)
        history.push('/list-finance-account')
      } catch {
        toast.show({
          title: 'Erro',
          message: 'Não foi possível autenticar',
          type: ToastType.Error
        })
      }
    }
  }, [])

  const handleLoginByGoogle = useCallback(async () => {
    const accessSession = await axios.request({
      url: 'http://localhost:3333/authentication/access-session/google/provider'
    })
  }, [])

  const handleInputs = useMemo(() =>
    <>
      <Input
        name='login'
        label='E-mail'
        type={InputType.Email}
        placeholder='Informe o endereço de e-mail cadastrado'
        toolTip='Informe o endereço de e-mail cadastrado'
        fieldValidations={fieldsValidation}
        errorMessage={errorMessage?.login}
      />
      <Input
        name='password'
        label='Senha'
        type={InputType.Password}
        placeholder='Informe a sua senha de acesso'
        toolTip='Informe a sua senha de acesso'
        fieldValidations={fieldsValidation}
        errorMessage={errorMessage?.password}
      />
    </>
  , [fieldsValidation, errorMessage])

  const handleActionButtons = useMemo(() =>
    <Flex
      justifyContent={'space-between'}
    >
      <Button
        label='Entrar'
        loadingLabel='Autenticando'
        onClick={async () => formRef.current.submitForm()}
      />
      <Button
        label='Entrar com o Google'
        loadingLabel='Autenticando'
        onClick={handleLoginByGoogle}
      />
    </Flex>
  , [])

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      height={'100%'}
    >
      <Heading>Login</Heading>
      <Form
        style={{
          width: '100%',
          maxWidth: '500px'
        }}
        ref={formRef}
        onSubmit={handleLogin}
      >
        {handleInputs}
        {handleActionButtons}
      </Form>
    </Flex>
  )
}
