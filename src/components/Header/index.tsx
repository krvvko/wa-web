import React, {useEffect, useState} from "react";
import './index.css';
import {NavLink, useLocation} from 'react-router-dom';
import HeaderSearch from "../Home/HeaderSearch";

const getPathName: (location : string) => string = (location) => {
    return location === '/' ? 'Home' : location.substring(1).charAt(0).toUpperCase() + location.slice(2);
}

const Header: React.FC = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    const handleScroll = (): void => {
        const offset = window.scrollY;
        setIsScrolled(offset > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (): void => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        document.title = `${getPathName(location.pathname)} - Westford Academy`;
    }, [location]);

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <span className="header-location">WA - {getPathName(location.pathname)}</span>
            <HeaderSearch apiRoute={getPathName(location.pathname)} />
            <div className="header-router">
                <NavLink className="header-router-link" to="/">Home</NavLink>
                <NavLink className="header-router-link" to="/events">Events</NavLink>
                <NavLink className="header-router-link" to="/news">News</NavLink>
                <NavLink className="header-router-link" to="/jobs">Jobs</NavLink>
            </div>
        </header>
    )
}

export default Header;