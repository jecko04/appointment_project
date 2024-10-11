
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AppointmentDetail from '../Users/AppointmentDetails';

export default function AdminDashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dental Appointment</h2>}
        >
            <Head title="Dental Appointment" />
            <main>
                <AppointmentDetail/>
            </main>
        </AuthenticatedLayout>
    );
}
