import { useState } from 'react';
import Logo from '@/Components/Logo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { notification } from 'antd';

export default function Authenticated({ user, header, children, }) {
    
    const { appointmentDetails = [] , allAppointmentDate, branches, categories, office_hours} = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
            try {
                const response = await fetch(route('logout'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
    
                const result = await response.json();
            
            if (response.ok) {
                notification.success({
                    message: 'Success',
                    description: result.message || 'Logout successfully!',
                    placement: 'bottomRight',
                    duration: 3,
                });
                window.location.href = route('home');
            }
            else {
                notification.error({
                    message: 'Error',
                    description: result.message || 'Logout Failed!',
                    placement: 'bottomRight', 
                    duration: 3,
                });
            }
            }
            catch (error) {
                notification.error({
                    message: 'Error',
                    description: result.message || 'Logout Failed!',
                    placement: 'bottomRight', 
                    duration: 3,
                });
            }
    };

    const hasCurrentAppointment = Array.isArray(appointmentDetails) &&
    appointmentDetails.some(appointment => 
        !['cancelled', 'completed', 'missed'].includes(appointment.status)
    );
    
    

    return (
<div className="min-h-screen flex bg-gray-100 ">
    {/* Sidebar */}
    <nav className="bg-white border-r border-gray-100 w-64 flex-col flex-shrink-0 hidden md:flex">
        
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col px-4 py-6">
                <div className="flex items-center mb-6">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 space-y-2">
                    {/* <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        className='mr-5 w-6 h-6'
                        >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M4 4h6v8H4zM4 16h6v4H4zM14 12h6v8h-6zM14 4h6v4h-6z" />
                    </svg>
                        Dashboard
                    </NavLink> */}
                    <NavLink href={route('appointment')} active={route().current('appointment')}>
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        className='mr-5 w-6 h-6'
                        >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M4 4h6v8H4zM4 16h6v4H4zM14 12h6v8h-6zM14 4h6v4h-6z" />
                    </svg>
                        Dashboard
                    </NavLink>
                    <NavLink href={route('record')} active={route().current('record')}>
                    <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className='mr-5 w-6 h-6'
                    >
                    <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z" />
                    </svg>
                        Appointment History
                    </NavLink>
                    {hasCurrentAppointment && (
                        <NavLink href={route('reschedule')} active={route().current('reschedule')}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className='mr-5 w-6 h-6'
    
                            >
                            <path d="M928 224H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496zM416 496H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 136H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm308.2-177.4L620.6 598.3l-52.8-73.1c-3-4.2-7.8-6.6-12.9-6.6H500c-6.5 0-10.3 7.4-6.5 12.7l114.1 158.2a15.9 15.9 0 0025.8 0l165-228.7c3.8-5.3 0-12.7-6.5-12.7H737c-5-.1-9.8 2.4-12.8 6.5z" />
                            </svg>
                            Reschedule
                        </NavLink>
                    )}
                    
                </div>
            </div>

            <div className="px-4 pb-6">
                <div className="block flex-col px-4">
                    {/* Logout Button */}
                    <Link href={route('logout')} method="post" as="button" className="flex text-center mt-4" onClick={handleLogout}>
                        <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className='mr-5 w-6 h-6 text-[#FF4200]'
                        >
                        <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-500 hover:text-gray-700 transition ease-in-out duration-150">
                            Log Out
                        </span>
                    </Link>

                    {/* User Name Clickable Link */}
                    <Link href={route('profile.edit')} className="flex mt-4 border-solid border-t-2 border-gray-400">

                            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" className='mt-5 mr-2 w-6 h-6 text-[#2938DA]'>
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            
                            <button
                                type="button"
                                className="mt-4 px-3 py-2 border border-transparent text-sm leading-4 font-medium text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                {user.name}
                            </button>
                        
                    </Link>
                </div>
            </div>
        </div>
    </nav>

    {/* Mobile Navigation */}
    <div
        className={`flex flex-col bg-white border-r border-gray-100 w-64 fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out z-50 ${
            showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
    >
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col px-4 py-6">
                {/* Logo and Close Button */}
                <div className="flex justify-between items-center mb-6">
                    <Link href="/">
                        <Logo />
                    </Link>
                    {/* Close Button */}
                    <button
                        onClick={() => setShowingNavigationDropdown(false)} // Close the mobile nav on click
                        className="text-gray-600 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                    {/* <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink> */}
                    <ResponsiveNavLink href={route('appointment')} active={route().current('appointment')}>
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('record')} active={route().current('record')}>
                        Appointment Records
                    </ResponsiveNavLink>
                    {hasCurrentAppointment && (
                    <ResponsiveNavLink href={route('reschedule')} active={route().current('reschedule')}>
                        Reschedule
                    </ResponsiveNavLink>
                    )}
                </div>
            </div>

            {/* Logout and User Profile */}
            <div className='px-4 pb-6 '>
            <div className="block flex-col px-4 ">
                    {/* Logout Button */}
                    <Link href={route('logout')} method="post" as="button" className="flex text-center mt-4" onClick={handleLogout}>
                        <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className='mr-5 w-6 h-6 text-[#FF4200]'
                        >
                        <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-500 hover:text-gray-700 transition ease-in-out duration-150">
                            Log Out
                        </span>
                    </Link>

                    {/* User Name Clickable Link */}
                    <Link href={route('profile.edit')} className="flex mt-4 border-solid border-t-2 border-gray-400">

                            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" className='mt-5 mr-2 w-6 h-6 text-[#2938DA]'>
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            
                            <button
                                type="button"
                                className="mt-4 px-3 py-2 border border-transparent text-sm leading-4 font-medium text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                {user.name}
                            </button>
                    </Link>
                </div>
            </div>

        </div>
    </div>

    {/* Button to Toggle Mobile Navigation */}
    <button
        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} 
        className="absolute md:hidden flex text-gray-600 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
    >
        <div className=''>
            <div className='py-2.5'>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-11 h-9"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
            </svg>
            </div>
        </div>
        
    </button>



    {/* Main Content Area */}
    <div className="flex-grow">
        {header && (
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>
        )}
        
        <main>{children}</main>
    </div>
</div>

    );
}
