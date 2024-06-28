import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import path from 'src/constants/path'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { getAvatarUrl } from 'src/utils/utils'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      console.log(111)
      setIsAuthenticated(false)
      setProfile(null)
      // queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <nav className='flex justify-between items-center'>
      <Link to='/'>
        <img
          src='https://medify.wgl-demo.net/wp-content/uploads/2019/08/logo01.png'
          alt=''
          className='w-[150px] h-auto'
        />
      </Link>
      <div>
        {isAuthenticated && (
          <Popover
            className='ml-6 flex cursor-pointer items-center py-1 hover:text-black/70'
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <Link
                  to={path.profile}
                  className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Tài khoản của tôi
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                src={getAvatarUrl(profile?.avatar)}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div>{profile?.email}</div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={path.register} className='mx-3 capitalize hover:text-black/70'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-[1px] border-r-black/40' />
            <Link to={path.login} className='mx-3 capitalize hover:text-black/70'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
