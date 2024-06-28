import { memo } from 'react'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

const MainLayout = memo(MainLayoutInner)
export default MainLayout
