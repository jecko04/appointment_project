
import { Link, Head } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
            <div>
                <Link href="/">
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-lg overflow-hidden sm:rounded-lg">
                    {children}
            </div>
        </div>
        </>
    );
}
