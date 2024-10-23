import './Navbar.css'
const Navbar = () => {
    return (
        <div className='navbar color-mode text-dark'>
            <img className='navbar-logo' src='/images/logo.png' />
            <div className='navbar-search'>
                <input type='text' placeholder='Search Games ..' />
                <img src='/icons/search.svg' />
            </div>
            <div className='navbar-darkmode'>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                </label>
                <p>Dark mode</p>
            </div>
        </div>
    )
}

export default Navbar