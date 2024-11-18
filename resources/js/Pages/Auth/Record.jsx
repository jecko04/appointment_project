
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DentalAppointmentHistory from '../Users/DentalAppointmentHistory';

export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            //header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Record of Appointment</h2>}
        >
            <Head title="Record" />
            <main className='bg-white'>
                <DentalAppointmentHistory/>
            </main>
        </AuthenticatedLayout>
    );
}
