import { Link, Head } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Navbar from '@/Pages/Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Home from './Guest/Home';

export default function Welcome({ auth }) {

    return (
        <>
            <Header />
                <Head title="SMTC - Dental Care" />
                <div className="text-xs">
                    <div className="items-center justify-center selection:text-white">
                        <div className="relative w-full px-6 mt-2 ">
                            <header>
                                <Navbar auth={auth} />
                            </header>
                            <main className="mt-6">
                                {/* Your main content goes here */}
                                <Home/>

                            </main>
                        </div>
                    </div>
                </div>
                <Footer />
           </>
    );
}
