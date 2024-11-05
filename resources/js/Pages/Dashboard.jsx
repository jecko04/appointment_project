import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DashboardContent from '../Pages/Users/DashboardContent';
import { IoMdNotifications } from "react-icons/io";

export default function Dashboard({ auth }) {
    
    const user= usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div className='bg-white pt-10'>
            <div className='flex flex-col gap-1 px-4 py-3'>
                <div className='flex items-center justify-between'>
                    <span className='text-xs lg:text-sm text-[#ff4200]'>Welcome Back!</span>
                </div>

            <span className='text-lg lg:text-2xl '>{user.name}</span>
            <span className='text-xs lg:text-sm text-gray-500'>How are you Feeling Today?</span>
            </div>

            <div className='px-4'>
                <div className='bg-[#2938DA] w-full flex gap-32 rounded-lg px-2'>
                <div className='flex flex-col justify-center gap-2 lg:gap-0 text-white p-4 lg:p-0 '>
                <span className='text-sm lg:text-xl'>Take care of your smile—schedule your dental appointment today!</span>
                <span className='text-sm lg:text-xl'><b>Download</b> your <b>QRCode</b>  at Dental appointment page!</span>
                <img src="/images/QRCode.png" alt="" className='h-[100px] w-[100px] bg-white rounded-sm' />

                <div className='flex flex-col mt-[4rem]'>
                    <a href={route('guest.appointment')} className='hover:text-blue-300 transition ease-in-out 300 text-sm lg:text-lg '>Book an appointment Here!</a>
                    <a href={route('home')} className='hover:text-blue-300 transition ease-in-out 300 text-sm lg:text-lg '>Back to Home</a>
                </div>


                </div>
                <img src="/images/3.png" alt="" className='w-72 h-72 hidden md:block'/> 
                </div>
            </div>
                <div className="bg-white overflow-hidden shadow-sm rounded-md sm:rounded-lg lg:rounded-lg">
                    <DashboardContent/> 
                </div>
            </div>    
        </AuthenticatedLayout>
    );
}
