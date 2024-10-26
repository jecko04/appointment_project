import React from 'react'
import { Link } from '@inertiajs/inertia-react';
import Logo from '@/Components/Logo';
import { useState } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'; 
import { motion, MotionConfig } from 'framer-motion';

const Navbar = ({ auth }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(false);



    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 0.5
          }
        }
      }

    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }

  return (
    <nav className="relative flex flex-col w-full px-6 lg:max-w-full border-solid border-b-2 lg:border-none">
        <div className="flex items-start justify-start">
            <MotionConfig 
            transition={{ 
                duration: "0.5",
                ease: "easeInOut",
             }}
            >
            <motion.button 
            variants={container}
            initial={false}
            onClick={() => {toggleMenu() ,setActive((pv) => !pv)}} 
            className="text-black lg:hidden relative h-[2.1rem] w-[2.1rem] rounded-full bg-white/0 transition-colors hover:bg-white/20"
            animate={active ? "open" : "closed"}
            >
                <motion.span 
                style={{ 
                    left: "50%",
                    top: "35%",
                    x: "-50%",
                    y: "-50%",
                 }}
                className='absolute h-[2px] w-[1rem] bg-[#FF4200]'
                variants={{ 
                    open: {
                        rotate: ["0deg", "0deg", "45deg"],
                        top: ["35%", "50%", "50%"],
                    },
                    closed: {
                        rotate: ["45deg", "0deg", "0deg"],
                        top: ["50%", "50%", "35%"],
                    }
                 }}
                />
                <motion.span 
                style={{ 
                    left: "50%",
                    top: "50%",
                    x: "-50%",
                    y: "-50%",
                 }}
                className='absolute h-[2px] w-[1rem] bg-[#FF4200]'
                variants={{ 
                    open: {
                        rotate: ["0deg", "0deg", "-45deg"],
                    },
                    closed: {
                        rotate: ["-45deg", "0deg", "0deg"],
                    }
                 }}
                />
                <motion.span 
                style={{ 
                    left: "calc(50% - 4px)",
                    bottom: "35%",
                    x: "-50%",
                    y: "50%",
                 }}
                className='absolute h-[2px] w-[0.5rem] bg-[#FF4200]'
                variants={{ 
                    open: {
                        rotate: ["0deg", "0deg", "45deg"],
                        left: "50%",
                        bottom: ["35%", "50%", "50%"],
                    },
                    closed: {
                        rotate: ["45deg", "0deg", "0deg"],
                        left: "calc(50% - 4px)",
                        bottom: ["50%", "50%", "35%"],
                    }
                 }}
                />
            </motion.button>
            </MotionConfig>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <>
            <MotionConfig 
            transition={{ 
                duration: "0.5",
                ease: "easeInOut",
            }}
            >
            <motion.div 
            initial="hidden"
            animate="show"
            
            variants={item}
            className="flex flex-col items-center w-full lg:hidden">
                <ResponsiveNavLink href={route('home')} className="text-black hover:text-amber-400 text-xs">Home</ResponsiveNavLink>
                <ResponsiveNavLink href={route('about')} className="text-black hover:text-amber-400 text-xs">About</ResponsiveNavLink>
                <ResponsiveNavLink href={route('services')} className="text-black hover:text-amber-400 text-xs">Services</ResponsiveNavLink>
                <ResponsiveNavLink href={route('location')} className="text-black hover:text-amber-400 text-xs">Contact Us / Location</ResponsiveNavLink>
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
            </motion.div>
            </MotionConfig>
            </>
        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-evenly lg:items-center w-full ">
            <>
            <div className='flex mr-48 text-sm'>
            <Logo />
            </div>
            <Link 
                        href={route('home')} 
                        className="flex items-center text-black hover:text-amber-400 text-sm"
                    >

                        Home
                    </Link>
                    <Link 
                        href={route('about')} 
                        className="flex items-center text-black hover:text-amber-400 text-sm"
                    >
                        About
                    </Link>
                    <Link 
                        href={route('services')} 
                        className="text-black0 hover:text-amber-400 text-sm"
                    >
                        Services
                    </Link>
                    <Link 
                        href={route('location')} 
                        className="flex items-center text-black hover:text-amber-400 text-sm"
                    >
                        Contact Us / Location
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