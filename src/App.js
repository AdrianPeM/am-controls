import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link as PageLink } from 'react-router-dom'
import { useComposeProviders } from 'hooks'

import { AppPage, QuickTest, TestComponents } from 'pages'
import Layout from 'layout'
import { ScreenSizeContextProvider } from 'context/ScreenSizeContext'

const routes = {
  home: '/',
  app: '/app',
  testComponents: '/testComponents',
  quickTest: '/quickTest',
}
const routeName = {
  home: 'Home',
  app: 'App',
  testComponents: 'Test Components',
  quickTest: 'Quick Test',
}

const routeElement = {
  home: <div style={{ display: 'grid', placeContent: 'center' }}>
    Hello Home!
  </div>,
  app: <AppPage />,
  testComponents: <TestComponents />,
  quickTest: <QuickTest />,
}

const App = () => {
  const pages = Object.keys(routes).map(route => <PageLink key={route} to={routes[route]}>{routeName[route]}</PageLink>)

  const RouterProviders = useComposeProviders(Router, Routes)
  const AppProviders = useComposeProviders(ScreenSizeContextProvider)

  return (
    <AppProviders>
      <RouterProviders>
        <Route path={`${routes.home}`} element={<Layout pages={pages} />}>
          {Object.keys(routeElement).map(route =>
            <Route key={route} path={routes[route]} element={routeElement[route]} />
          )}
        </Route>
      </RouterProviders>
    </AppProviders>
  )
}

export default App
