import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          children={({ history, location, match }) => {
            const Page = lazy(() => {
              return location.pathname === '/'
                ? import('./pages/home')
                : import('./pages' + location.pathname).catch((e) => {
                    if (/not find module/.test(e.message)) {
                      return import('./pages/NotFound.js')
                    }
                    if (/Loading chunk \d+ failed/.test(e.message)) {
                      window.location.reload()
                      return
                    }
                    throw e
                  })
            })
            return (
              <Suspense fallback={<div>Loading..</div>}>
                <Page />
              </Suspense>
            )
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
