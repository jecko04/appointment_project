import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardContent from '../Pages/Users/DashboardContent';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="sm:p-8 lg:p-8 p-8 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-md sm:rounded-lg lg:rounded-lg">
                        <DashboardContent/> 
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
