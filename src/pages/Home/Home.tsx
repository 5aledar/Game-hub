import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
const Home = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Home