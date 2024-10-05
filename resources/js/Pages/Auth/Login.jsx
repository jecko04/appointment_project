import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from 'antd';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { TbArrowBackUp } from "react-icons/tb";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
        <Header/>
        <GuestLayout>
        <Link href='/' className='text-lg'>
           <TbArrowBackUp />
        </Link>
        <div className="flex flex-col items-center mt-4">
            <div className="flex items-center sm:flex-row lg:flex-row">
                <span className="font-extrabold text-sm tracking-widest">Welcome To</span>
                <img src="/images/image.png" alt="Logo" className="h-10 w-10 mr-2" />
                <span style={{ color: '#FF4200' }} className="mr-2 text-sm tracking-widest">SMTC</span>
                <span style={{ color: '#2938DA' }} className="text-sm tracking-widest">Dental Care</span>
            </div>
            <span className="text-xs sm:text-xs lg:text-xs tracking-widest pb-5">General Dentistry & Orthodontics w/ Dental X-Ray</span>
        </div>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-xs"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <Input.Password
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="flex flex-1 mt-1 w-full"
                        size='middle'
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-xs text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <div className='ml-2'>
                    <PrimaryButton disabled={processing}>
                        Log in
                    </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
        <Header/>
        </>

    );
}
