import { ToastContainer } from 'react-toastify'
import { useEffect, useContext } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      {routeElements}
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
