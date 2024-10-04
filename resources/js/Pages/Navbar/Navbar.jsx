import React from 'react'
import { Link } from '@inertiajs/inertia-react';
import Logo from '@/Components/Logo';
import { useState } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'; 

const Navbar = ({ auth }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <nav className="relative flex flex-col w-full px-6 lg:max-w-full border-solid border-b-2 lg:border-none">
        <div className="flex items-start justify-start">
            <button onClick={toggleMenu} className="text-black lg:hidden">
                {isOpen ? (
                    <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    className='w-5 h-8 text-[#ff4200]'
                  >
                     <path d="M1.5 0A1.5 1.5 0 000 1.5v2A1.5 1.5 0 001.5 5h13A1.5 1.5 0 0016 3.5v-2A1.5 1.5 0 0014.5 0h-13zm1 2h3a.5.5 0 010 1h-3a.5.5 0 010-1zm9.927.427A.25.25 0 0112.604 2h.792a.25.25 0 01.177.427l-.396.396a.25.25 0 01-.354 0l-.396-.396zM0 8a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2H2a2 2 0 01-2-2V8zm1 3v2a1 1 0 001 1h12a1 1 0 001-1v-2H1zm14-1V8a1 1 0 00-1-1H2a1 1 0 00-1 1v2h14zM2 8.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" />
                     </svg>
                ) : (
                    <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    className='w-5 h-8 text-[#ff4200]/80'
                    >
                     <path d="M1.5 0A1.5 1.5 0 000 1.5v2A1.5 1.5 0 001.5 5h13A1.5 1.5 0 0016 3.5v-2A1.5 1.5 0 0014.5 0h-13zm1 2h3a.5.5 0 010 1h-3a.5.5 0 010-1zm9.927.427A.25.25 0 0112.604 2h.792a.25.25 0 01.177.427l-.396.396a.25.25 0 01-.354 0l-.396-.396zM0 8a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2H2a2 2 0 01-2-2V8zm1 3v2a1 1 0 001 1h12a1 1 0 001-1v-2H1zm14-1V8a1 1 0 00-1-1H2a1 1 0 00-1 1v2h14zM2 8.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" />
                     </svg>
                )}
            </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div className="flex flex-col items-center w-full lg:hidden">
                <ResponsiveNavLink href={route('home')} className="text-black hover:text-amber-400 text-xs">Home</ResponsiveNavLink>
                <ResponsiveNavLink href={route('login')} className="text-black hover:text-amber-400 text-xs">About</ResponsiveNavLink>
                <ResponsiveNavLink href={route('login')} className="text-black hover:text-amber-400 text-xs">Services</ResponsiveNavLink>
                <ResponsiveNavLink href={route('login')} className="text-black hover:text-amber-400 text-xs">Contact</ResponsiveNavLink>
                {auth.user ? (
                
                <ResponsiveNavLink href={route('dashboard')} className="text-black text-xs "
                >
                    Dashboard
                </ResponsiveNavLink>

                
            ) : (
                <>
                <ResponsiveNavLink href={route('login')} className="rounded-md px-3 py-2 text-xs text-black ">Login</ResponsiveNavLink>
                <ResponsiveNavLink href={route('register')} className="rounded-md px-3 py-2 text-xs text-black ">Sign Up</ResponsiveNavLink>
                </>
            )} 
            </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-evenly lg:items-center w-full ">
            <>
            <div className='flex mr-48 text-sm'>
            <Logo />
            </div>
            <Link 
                        href={route('home')} 
                        className="flex items-center text-gray-500 hover:text-amber-400 text-sm"
                    >
                        <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className='mr-2 w-6 h-6'
                        >
                        <path 
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={32}
                            d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
                        />
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={32}
                            d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
                        />
                        </svg>

                        Home
                    </Link>
                    <Link 
                        href={route('login')} 
                        className="flex items-center text-gray-500 hover:text-amber-400 text-sm"
                    >
                        About
                    </Link>
                    <Link 
                        href={route('login')} 
                        className="text-gray-500 hover:text-amber-400 text-sm"
                    >
                        Services
                    </Link>
                    <Link 
                        href={route('login')} 
                        className="flex items-center text-gray-500 hover:text-amber-400 text-sm"
                    >
                        Contact
                    </Link>
                    </>
            {auth.user ? (
                <Link href={route('dashboard')} className=" flex items-center rounded-md px-4 py-2 text-white bg-[#FF4200] transition duration-150 ease-in-out hover:bg-[#FF4200]/80 focus:outline-none focus:ring-2 focus:ring-[#FF2D20] focus:ring-opacity-50"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    
                    <div className="flex gap-1">
                    <Link
                        href={route('login')}
                        className="rounded-md px-4 py-2 text-white bg-[#FF4200] transition duration-150 ease-in-out hover:bg-[#FF4200]/80 focus:outline-none focus:ring-2 focus:ring-[#FF2D20] focus:ring-opacity-50"
                    >
                        Login
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md px-4 py-2 text-white bg-[#FF4200] transition duration-150 ease-in-out hover:bg-[#FF4200]/80 focus:outline-none focus:ring-2 focus:ring-[#FF2D20] focus:ring-opacity-50"
                    >
                        Sign Up
                    </Link>
               </div>
                </>
            )}   
        </div>
    </nav>
    );
};

export default Navbar