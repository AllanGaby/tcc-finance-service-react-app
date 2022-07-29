import React, { createContext, useContext, useCallback, useState, useEffect, PropsWithChildren } from 'react'
import { CreateAccessSessionDTO, AccessSessionModel, AuthenticationAccessRules } from '@/domain/common'
import { AuthenticationContextModel, AuthenticationProviderModel } from '../../../../common'
import { useLocalStorage } from '../../../../common/hooks'
import { useHistory } from 'react-router-dom'

const AuthenticationContext = createContext<AuthenticationContextModel>({
  loading: undefined,
  accessSession: undefined,
  hasAccess: undefined,
  login: undefined,
  logout: undefined
})

type AuthenticationProviderWirhChildrenProps = PropsWithChildren<AuthenticationProviderModel>

const AuthenticationProvider: React.FC<AuthenticationProviderWirhChildrenProps> = ({
  accessTokenKey,
  createAccessSessionUseCase,
  recoverAccessSessionUseCase,
  children
}: AuthenticationProviderWirhChildrenProps) => {
  const [accessSession, setAccessSession] = useState<AccessSessionModel>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const { addLocalStorageValue, recoverLocalStorageValue } = useLocalStorage()
  const history = useHistory()

  useEffect(() => {
    handleRecoverAccessSession()
  }, [])

  const handleRecoverAccessSession = useCallback(async () => {
    const recoveredAccessSession = await recoverLocalStorageValue(accessTokenKey) as AccessSessionModel
    if (recoveredAccessSession) {
      setAccessSession(recoveredAccessSession)
    }
    setLoading(false)
  }, [])

  const handleLogin = useCallback(async (params: CreateAccessSessionDTO): Promise<void> => {
    const createdAccessSession = await createAccessSessionUseCase.createAccessSession(params)
    if (createdAccessSession) {
      await addLocalStorageValue<AccessSessionModel>(accessTokenKey, createdAccessSession)
      setAccessSession(createdAccessSession)
    }
  }, [])

  const handleLogout = useCallback(async (): Promise<void> => {
    await addLocalStorageValue(accessTokenKey, undefined)
    setAccessSession(undefined)
    history.push('/login')
  }, [])

  const handleHasAccess = useCallback((accessRule: AuthenticationAccessRules) => {
    if (!accessSession) {
      return false
    }
    let userHasAccess: boolean = false
    const modulesKeys = Object.keys(accessSession.modules)
    modulesKeys.forEach(moduleKey => {
      userHasAccess = userHasAccess || accessSession.modules[moduleKey].access_profile_rules.findIndex(item => item === accessRule) >= 0
    })
    return userHasAccess
  }, [accessSession])

  return (
    <AuthenticationContext.Provider value={{
      loading: loading,
      accessSession: accessSession,
      login: handleLogin,
      logout: handleLogout,
      hasAccess: handleHasAccess
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuthentication = (): AuthenticationContextModel => {
  const context = useContext(AuthenticationContext)

  if (!context) {
    throw new Error('useAuthentication must be used within a AuthenticationProvider')
  }

  return context
}

export { AuthenticationProvider, useAuthentication }
