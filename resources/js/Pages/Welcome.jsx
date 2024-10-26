import { Link, Head } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Navbar from '@/Pages/Navbar/Navbar';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Home from './Guest/Home';


export default function Welcome({ auth }) {

    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3000)
    // }, []);

    return (
        <>
        <div className='bg-gradient-to-t from-white to-[#FADC12]/30'>
                <Head title="SMTC - Dental Care" />
                <div className="text-xs ">
                    <div className="items-center justify-center selection:text-blue-500  ">
                        <div className="relative w-full px-6 pt-2 ">
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
        </div>
       </>
    );
}
