import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import path from 'src/constants/path'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.home,
          index: true,
          element: (
            <MainLayout>
              <Login />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}

// {
//   path: '/',
//   element: (
//     <MainLayout>
//       <Login />
//     </MainLayout>
//   )
// },
// {
//   path: path.login,
//   element: (
//     <RegisterLayout>
//       <Login />
//     </RegisterLayout>
//   )
// },
// {
//   path: path.register,
//   element: (
//     <RegisterLayout>
//       <Register />
//     </RegisterLayout>
//   )
// }
