import React from "react";
import * as IoIcons from 'react-icons/io';
import * as IoIcons5 from 'react-icons/io5';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';

const isLogin = Boolean(localStorage.getItem("token") || false)

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <IoIcons.IoIosHome />,
        cName: 'nav-text',
    },
    {
        title: isLogin ? 'Sign out' : 'Sign in',
        path: isLogin ? '/logout' : '/login',
        icon: isLogin ? <BiIcons.BiLogOut /> : <BiIcons.BiLogIn />,
        cName: 'nav-text',
    },
    {
        title: !isLogin ? 'Sign up' : 'Favorites',
        path: !isLogin ? '/register' : '/favorites',
        icon: !isLogin ? <HiIcons.HiUserAdd/> : <IoIcons5.IoFastFoodSharp />,
        cName: 'nav-text',
    }
]