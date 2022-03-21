import Layout from 'layout'
import { AppPage, TestComponents } from 'pages'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link as PageLink } from 'react-router-dom'

const routes = {
  home: '/',
  app: '/app',
  tesComponents: '/tesComponents',
}
const routeName = {
  home: 'Home',
  app: 'App',
  tesComponents: 'TestComponents',
}

const routeElement = {
  home: <div style={{display:'grid', placeContent:'center'}}>
      Hello Home!
    </div>,
  app: <AppPage/>,
  tesComponents: <TestComponents/>,
}

const App = () => {
  const pages = Object.keys(routes).map(route => <PageLink key={route} to={routes[route]}>{routeName[route]}</PageLink>)

  return (
    <Router>
      <Routes>
        <Route path={`${routes.home}`} element={<Layout pages={pages} />}>
          {Object.keys(routeElement).map(route => 
            <Route key={route} path={routes[route]} element={routeElement[route]}/>
          )}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
