import { Link, useMatch } from 'react-router-dom'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='fixed top-0 w-full z-50 shadow-xl py-5'>
      <div className='container m-auto'>
        <nav className='flex items-end'>
          <Link to='/'>
            <img
              src='https://medify.wgl-demo.net/wp-content/uploads/2019/08/logo01.png'
              alt=''
              className='w-[150px] h-auto'
            />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
