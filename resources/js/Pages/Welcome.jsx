import { Link, Head } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="SMTC - Dental Care" />
            <div className="">
                <div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className=" relative py-10">
                            <nav className="flex justify-between items-center mx-1.5">
                                {auth.user ? (
                                    <>

                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                    
                                    </>
                                ) : (
                                    <>
                                    <Logo/>
                                    <Link
                                    href={route('home')}
                                            className="rounded-md px-3 py-2  focus-visible:ring-[#FF2D20] text-black hover:text-amber-400"
                                        >
                                            Home
                                    </Link>
                                    <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2  focus-visible:ring-[#FF2D20] text-black hover:text-amber-400"
                                    >
                                            About
                                    </Link>
                                    <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2  focus-visible:ring-[#FF2D20] text-black hover:text-amber-400"
                                    >
                                            Services
                                    </Link>
                                    <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2  focus-visible:ring-[#FF2D20] text-black hover:text-amber-400 mr-9"
                                    >
                                            Contact
                                    </Link>

                                    <div className='flex mt-2'>
                                    <Link
                                            href={route('login')}
                                            className="mx-1.5 rounded-md px-3 py-2 text-white bg-[#FF4200] ring-1 ring-transparent transition hover:bg-[#FF4200]/80 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:bg-[#FF4200] dark:hover:bg-[#FF2D20]/80 dark:focus-visible:ring-white"
                                    >
                                            Login
                                        </Link>


                                        <Link
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 text-white bg-[#FF4200] ring-1 ring-transparent transition hover:bg-[#FF4200]/80 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:bg-[#FF4200] dark:hover:bg-[#FF2D20]/80 dark:focus-visible:ring-white"
                                    >
                                            Sign Up
                                        </Link>
                                    </div>
                                        
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
            
           </>
    );
}
