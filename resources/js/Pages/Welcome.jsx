import { Link, Head } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Navbar from '@/Pages/Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Header />
                <Head title="SMTC - Dental Care" />
                <div className="text-xs">
                    <div className="items-center justify-center selection:text-white shadow">
                        <div className="relative w-full px-6 mt-2 ">
                            <header>
                                <Navbar auth={auth} />
                            </header>
                            <main className="mt-6">
                                {/* Your main content goes here */}
                            </main>
                        </div>
                    </div>
                </div>
                <Footer />
           </>
    );
}
