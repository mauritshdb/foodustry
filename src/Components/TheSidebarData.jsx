import React from "react";
import * as IoIcons from 'react-icons/io';
import * as IoIcons5 from 'react-icons/io5';
import * as BiIcons from 'react-icons/bi';

const isLogin = Boolean(localStorage.getItem("token") || false)

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <IoIcons.IoIosHome/>,
        cName: 'nav-text',
    },
    {
        title: isLogin ? 'Sign out' : 'Sign in',
        path: isLogin ? '/logout' : '/login',
        icon: isLogin ? <BiIcons.BiLogOut/> : <BiIcons.BiLogIn/>,
        cName: 'nav-text',
    },
    {
        title: 'Favorites',
        path: '/favorites',
        icon: <IoIcons5.IoFastFoodSharp/>,
        cName: 'nav-text',
    }
]