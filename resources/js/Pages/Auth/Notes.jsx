import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DentalNotes from '../Users/DentalNotes';

export default function Reschedule({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            //header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reschedule</h2>}
        >
            <Head title="Dental Appointment" />
            <main className=''>

                <DentalNotes/>
            </main>
        </AuthenticatedLayout>
    );
}
