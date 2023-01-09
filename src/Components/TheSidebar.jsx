import React from "react";
import '../css/TheSidebar.css';
import { Link } from "react-router-dom";
import { SidebarData } from './TheSidebarData';

function TSidebar() {
    return (
        <>
            <nav className="nav-menu">
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <h3>Foodustry</h3>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default TSidebar;