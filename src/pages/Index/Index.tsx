import { Outlet } from 'react-router-dom'
import './Index.css'
const Index = () => {
  return (
    <div className='color-mode'>
        <Outlet />
    </div>
  )
}

export default Index