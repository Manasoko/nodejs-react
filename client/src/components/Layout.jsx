import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../assets/Css/layout.css';
import axios from 'axios';

function Layout() {
    const location = useLocation();
    const isContactPage = location.pathname === '/contact';
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    const backdrop = useRef(null);
    const mobileNav = useRef(null);
    const navActions = useRef(null);
    const [isLogin, setIsLogin] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const backdropClickHandler = () => {
        if (backdrop) {
            backdrop.current.style.display = 'none';
        } else {
            console.log('Button not working');
        }
        if (mobileNav) {
            mobileNav.current.classList.remove('active');
        }
        setIsMenuOpen(false);
    };


    const toggleMenu = () => {
        if (backdrop) {
            backdrop.current.style.display = 'block';
        } else {
            console.log('Button not working');
        }
        if (mobileNav) {
            mobileNav.current.classList.add('active');
        }
        setIsMenuOpen(true);
    };

    useEffect(() => {
        const sideDrawer = document.querySelector('.hamburger-menu');
        const backdropHandler = backdrop.current;
        const mobileNavHandler = mobileNav.current;

        // Add event listeners
        if (backdropHandler) {
            backdropHandler.addEventListener('click', backdropClickHandler);
        }
        if (sideDrawer) {
            sideDrawer.addEventListener('click', toggleMenu);
        } else if (mobileNavHandler.classList.contains('active') && sideDrawer.classList.contains('active')) {
            sideDrawer.addEventListener('click', backdropClickHandler);
        }

        const fetchAPI = async () => {
            try {
                const response = await axios.get('http://localhost:7070/api');
                console.log(response.data.isLogin);
                setIsLogin(response.data.isLogin);
            } catch (error) {
                console.log(error);
            };
        };
        fetchAPI();

        return () => {
            if (backdropHandler) {
                backdropHandler.removeEventListener('click', backdropClickHandler);
            }
            if (sideDrawer) {
                sideDrawer.removeEventListener('click', toggleMenu);
            }
        };
    }, []);



    return (
        <>
            <div className='backdrop' ref={backdrop}></div>
            <header className={isContactPage ? 'header-contact' : ''}>
                <nav className={`navbar ${isContactPage || isLoginPage || isRegisterPage ? 'navbar-contact' : ''}`}>
                    <h2 style={{ "margin": "1rem" }}><Link to='/' >HomeHaven</Link></h2>
                    <ul className="nav-items">
                        <li>Properties</li>
                        <li>About Us</li>
                        {!isLogin ? <li><Link to='/register'>Register</Link></li> : <li><a href='http://localhost:7070/api/logout'>Logout</a></li>}
                        {!isLogin ? <li><Link to='/login'>Login</Link></li> : ''}
                        {isLogin ? <li><Link to='/add-properties'>Add Properties</Link></li> : ''}
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                </nav>
                <div className={`mobile-nav-action ${isMenuOpen ? 'disable' : ''}`} ref={navActions}>
                    <h2><Link>HomeHaven</Link></h2>
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`} ref={mobileNav}>
                    <div className="hamburger-menu active" onClick={backdropClickHandler}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    <ul className="mobile-nav__item-list" onClick={backdropClickHandler}>
                        <li className="mobile-nav__item">
                            <Link to="/">HomeHaven</Link>
                        </li>
                        <li className="mobile-nav__item">
                            Products
                        </li>
                        <li className="mobile-nav__item">
                            About Us
                        </li>
                        <li className="mobile-nav__item">
                            {!isLogin ? <Link to='/register'>Register</Link> : <a href='#'>Logout</a>}
                        </li>

                        {!isLogin ? <li className="mobile-nav__item"><Link to='/login'>Login</Link></li> : ''}

                        {isLogin ? <li className='mobile-nav__item'><Link to='/add-properties'>Add Properties</Link></li> : ''}
                        <li className="mobile-nav__item">
                            <Link className='a' to='/contact'>Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
            <footer className={isContactPage || isLoginPage || isRegisterPage ? 'footer-contact' : ''}>
                <div className="social">
                    <a href="facebook.com"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="instagram.com"><i className="fa-brands fa-instagram"></i></a>
                    <a href="twitter.com"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="linkedin.com"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="google.com"><i className="fa-brands fa-google"></i></a>
                </div>
                <p>&copy;Mana 2024.  All Rights Reserved</p>
            </footer>
        </>
    );
}

export default Layout;