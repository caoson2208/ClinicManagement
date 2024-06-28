import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/app.context'
import NavHeader from '../NavHeader/NavHeader'

export default function Header() {
  const { isAuthenticated } = useContext(AppContext)
  return (
    // <div className='fixed top-0 w-full shadow-xl pb-2 pt-5 text-black'>
    //   <div className='container m-auto'>
    //     <NavHeader />
    //     <div className='mt-4 grid grid-cols-12 items-end gap-4'>
    //       <div className='col-span-1 justify-self-end'></div>
    //     </div>
    //   </div>
    // </div>

    <header className='fixed top-0 w-full shadow-xl py-5'>
      <div className='container m-auto'>
        <NavHeader />
      </div>
    </header>
  )
}
