import React, { useCallback, useMemo } from 'react'
import { AppRouteModel } from '../../../application'
import { OpenningRoutes } from '../../../factories/home'
import { FinanceRoutes } from '../../../factories/finance'
import { Menu, useAuthentication } from '../../../../presentation/common'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Route } from 'react-router'

export const RoutesSetupFactory: React.FC = () => {
  const routes: AppRouteModel[] = [...OpenningRoutes, ...FinanceRoutes]
  const { accessSession, hasAccess, loading } = useAuthentication()

  const handleGetRoutes = useCallback(() => {
    return routes.filter(item => {
      if (accessSession) {
        return item.access_rule && hasAccess(item.access_rule)
      }
      return !item.access_rule
    })
  }, [accessSession, loading])

  const handleRoutes = useMemo(() =>
    !loading &&
    <>
      {handleGetRoutes().map((route, index) =>
        <Route
          key={`${route.path.toString()}-${index}`}
          path={route.path}
          exact={route.exact}
          component={route.component}/>
      )}
    </>
  , [accessSession, loading])

  const handleOpenRoutesRoutes = useMemo(() =>
    !loading &&
    <Switch>
      {handleRoutes}
    </Switch>
  , [accessSession, loading])

  const handleMenu = useMemo(() =>
    !loading &&
    <Menu
      brandTitle='Finance Service'
      items={handleGetRoutes().filter(item => item.viewInMenu)}
    >
      {handleOpenRoutesRoutes}
    </Menu>
  , [accessSession, loading])

  return (
    <BrowserRouter>
      {handleMenu}
    </BrowserRouter>
  )
}
